import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import qs from "query-string";

const cookies = new Cookies();

const PlaylistContainer = styled.div`
    overflow: scroll;
    margin-left: 20px;
`;

const PlaylistButton = styled.a`
    border: none;
    display: block;
    margin-bottom: 20px;
    padding: 0 10px;
    text-align: center;
`;

const PlaylistImage = styled.img`
    height: 7rem;
    width: 7rem;
`;

const PlaylistTitle = styled.h1`
    color: white;
    font-size: 1em;
`;

const SongViewer = styled.div`

`;

const PlaylistItem = props => {
    return (
        <PlaylistButton onClick={() => getSongs(props.playlist.tracks.href, props.accessToken)}>
            <PlaylistImage src={props.playlist.images[0].url}/>
            <PlaylistTitle>{props.playlist.name}</PlaylistTitle>
        </PlaylistButton>
    );
};

const getSongs = (playlistUrl, accessToken) => {
    axios.get(playlistUrl, {
        "headers": { "Authorization": "Bearer " + accessToken }
    }).then(res => {
        console.log("res:", res.data.items);
    }).catch(err => {
        console.log("err: ", err);
    })
};

function Profile(props) {
    const userObj = useSelector(state => state);
    const [playlists, setPlaylists] = useState([]); // user playlists
    const [playlist, setPlaylist] = useState(null); // actively viewed playlist
    const [tracks, setTrack] = useState([]); // tracks in current active playlist
    let accessToken = cookies.get("access_token");

    useEffect(() => {
        if (userObj) {
            if (accessToken) {
                axios.get("https://api.spotify.com/v1/me/playlists", { 
                    "headers": { "Authorization": "Bearer " + accessToken } 
                }).then(res => {
                    setPlaylists(res.data.items);
                }).catch(err => {
                    cookies.remove("access_token");
                    cookies.remove("refresh_token");
                    window.location.replace("/auth/spotify");
                });
                if (playlists.length > 0) {
                    setPlaylist(playlists[0]);
                    const trackHref = playlists[0].tracks.href;
                    axios.get(trackHref, {
                        "headers": { "Authorization": "Bearer " + accessToken }
                    }).then(res => {
                        setTrack(tracks.concat(res.data.items));
                    }).catch(err => {
                        cookies.remove("access_token");
                        cookies.remove("refresh_token");
                        window.location.replace("/auth/spotify");
                    });
                }
            } else {
                window.location.replace("/auth/spotify");
            }
        }
    }, []);

    return (
        <>
        { playlists ?
            <PlaylistContainer>
                {playlists.map(item => {
                    return <PlaylistItem key={item.id} playlist={item} accessToken={accessToken}/>;
                })}
            </PlaylistContainer>
            :
            <div>Test</div> 
        }
        </>
    );
}

export default Profile;