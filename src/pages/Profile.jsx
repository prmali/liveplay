import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Wrapper = styled.div`
    display: flex;
    height: 75vh;
`;

const PlaylistContainer = styled.div`
    overflow: scroll;
    margin-left: 20px;
    background-color: #161124;
    padding: 7.5px 0;
    border-radius: 45px;
    z-index: 0;
    filter: drop-shadow(0 0 0.75rem #06040B);
`;

const PlaylistButton = styled.a`
    border: none;
    display: block;
    margin: 7.5px 0;
    padding: 0 10px;
    text-align: center;
    background: transparent;
`;

const PlaylistImage = styled.img`
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
`;

const SongContainer = styled.div`
    margin-right: 20px;
    overflow: scroll;
    margin-top: 40px;
    height: 63vh;
`;
const SongViewer = styled.div`
    padding: 10px;
`;

const SongListItem = styled.div`
    background-color: black;
    color: white;
    padding: 10px 15px;
    text-align: "center";

`;

const SongItem = async props => {
    axios.get("/song/search", { 
        name: "ooyy+for+the+record"
    }).then(res => {
        console.log(res);
        return (
            <SongListItem key={props.track.key} onClick={()=>{
                console.log("res", res);
            }}>{/*props.track.name*/}Yes</SongListItem>
        )
    }).catch(err => {
        console.log(err);
        return (
            <SongListItem key={props.track.key} onClick={()=>{
                console.log("err:", err);
            }}>{/*props.track.name*/}No</SongListItem>
        )
    });
}

const PlaylistItem = props => {
    return (
        <PlaylistButton onClick={() => getSongs(props.playlist.tracks.href, props.accessToken, props.playlist, props.setTracks, props.setPlaylist)}>
            <PlaylistImage src={props.playlist.images[0].url}/>
            {/*<PlaylistTitle>{props.playlist.name}</PlaylistTitle>*/}
        </PlaylistButton>
    );
};

const getSongs = (playlistUrl, accessToken, playlist, setTracks, setPlaylist) => {
    axios.get(playlistUrl, {
        "headers": { "Authorization": "Bearer " + accessToken }
    }).then(res => {
        setTracks(res.data.items);
        setPlaylist(playlist);
    }).catch(err => {
        console.log("err: ", err);
    })
};

function Profile(props) {
    const userObj = useSelector(state => state);
    const [playlists, setPlaylists] = useState([]); // user playlists
    const [playlist, setPlaylist] = useState(null); // actively viewed playlist
    const [tracks, setTracks] = useState([]); // tracks in current active playlist
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
                        setTracks(res.data.items);
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
        <Wrapper>
            {playlists ?
                <>
                <PlaylistContainer>
                    {playlists.map(item => {
                        return <PlaylistItem key={item.id} playlist={item} accessToken={accessToken} setTracks={setTracks} setPlaylist={setPlaylist}/>;
                    })}
                </PlaylistContainer>

                <SongContainer>
                    {tracks.length > 0 ?
                        tracks.map(item => {
                            return <SongItem key={item.track.id} track={item.track}/>;
                        })
                    : 
                        <SongListItem>No songs in this playlist...</SongListItem>
                    }
                </SongContainer>
                </>
                :
                <div>Make some playlists!</div> 
            }
        </Wrapper>
    );
}

export default Profile;