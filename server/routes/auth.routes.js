const express = require("express");
const axios = require("axios");
const qs = require("query-string");

const authenticator = require("../services/auth-service/authenticator");

let authRouter = express.Router();

const SPOTIFY = {
    CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    REDIRECT_URI: "http://192.168.86.82:3000/auth/spotify/callback", // "http://localhost:3000/auth/spotify/callback"
    STATE: "spotify_auth_state",
};

// authorize with spotify
authRouter.get("/spotify", async(req, res) => {
    let currState = authenticator.genRandomString(10);
    res.cookie(SPOTIFY.STATE, currState);
    res.redirect("https://accounts.spotify.com/authorize?"
        + qs.stringify({
            client_id: SPOTIFY.CLIENT_ID,
            response_type: "code",
            redirect_uri: SPOTIFY.REDIRECT_URI,
            state: currState,
            scope: "user-library-read playlist-read-collaborative playlist-read-private",
        }));
});


authRouter.get("/spotify/callback", (req, res) => {
    let code = req.query.code || null,
        state = req.query.state || null,
        err = req.query.err || null,
        storedState = req.cookies ? req.cookies[SPOTIFY.STATE] : null;

    if (state === null || state !== storedState) {
        res.redirect("/#"
        + qs.stringify({
            error: "state_mismatch"
        }));
    } else if (err !== null) {
        res.redirect("/#"
        + qs.stringify({
            error: "access_denied"
        }));
    } else {
        res.clearCookie(SPOTIFY.STATE);
        let params = {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: SPOTIFY.REDIRECT_URI,
        },
        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " +
                Buffer.from(`${SPOTIFY.CLIENT_ID}:${SPOTIFY.CLIENT_SECRET}`, "utf-8").toString("base64")
        }
        axios.post("https://accounts.spotify.com/api/token", qs.stringify(params), {
            "headers": headers
        }).then(resp => {
            let access_token = resp.data.access_token,
                refresh_token = resp.data.refresh_token,
                headers = { 
                    "Authorization": "Bearer " + access_token
                };
            axios.get("https://api.spotify.com/v1/me", { 
                "headers": headers 
            }).then(respo => {
                res.cookie("access_token", access_token);
                res.cookie("refresh_token", refresh_token);

                res.redirect("/?" +
                qs.stringify(respo.data));
            }).catch(err => {
                res.redirect("/?"
                + qs.stringify({
                    error: "invalid_access"
                }));
            });
        }).catch(err => {
            res.redirect("/?"
            + qs.stringify({
                error: "invalid_auth"
            }));
        })
    }
})

module.exports.authRouter = authRouter;