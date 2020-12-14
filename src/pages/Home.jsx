import React, { useEffect } from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authorize } from "../redux/actions/root.action";

const cookies = new Cookies();

const Wrapper = styled.div`
    margin-top: 40px;
    padding: 0 50px;
    text-align: center;
`;

const Heading = styled.h1`
    color: white;
`;

const Subheading = styled.h2`
    color: #312c42;
    margin: 10px 0;
`;

const GradientHeading = styled(Heading)`
    background: -webkit-linear-gradient(20deg, #fc604d 0%, #f23180 50%, #c229b1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const Connect = styled.div`
    display: flex;
    padding: 10px 0px;
    border-radius: 45px;
    width: 10em;
    font-weight: 600;
    font-size: 1.25em;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
`;

const SpotifyConnect = styled(Connect)`
    background: linear-gradient(120deg, #1db954, #3fd975);
`;

const RoomConnect = styled(Connect)`
    background: -webkit-linear-gradient(20deg, #fc604d 0%, #f23180 50%, #c229b1 100%);
    filter: drop-shadow(0 0 0.75rem #e62097);
`;

const Image = styled.img`
    border-radius: 45px;
    height: 2em;
    width: 2em;
`;

const SpotifyButton = styled.a`
    margin: 0 10px;
    background: transparent;
    color: white;
    text-decoration: none;
`;

const RoomButton = styled(SpotifyButton)`
    margin: 5px 10px;
`

const CodeContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const CodeInput = styled.input`
    margin-left: 20px;
    float: left;
    font-weight: 700;
    font-size: 1.25em;
    background: transparent;
    text-align: center;
    color: #504966;
    border-color: #504966;
    padding: 5px 10px;
    border-radius: 10px;
    border: 4px solid;
    outline: none;
    width: 5rem;
    &:focus {
        color: white;
        border-color: white;
    }
`;

const LoggedIn = props => {
    return (
        <>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Heading>Welcome back,</Heading>
            <GradientHeading>&nbsp;{props.data.display_name}</GradientHeading>
        </div>
        <Subheading>Create a room to start listening!</Subheading>
        <RoomConnect>
            <RoomButton href="/create">Create</RoomButton>
        </RoomConnect>
        </>
    );
};

const LoggedError = () => {
    return (
        <>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Heading>Something's wrong... Please try to</Heading>
            <GradientHeading>&nbsp;re-connect</GradientHeading>
            <Heading>!</Heading>
        </div>
        <Subheading>If the problem persists, reach out to us!</Subheading>
        <Subheading>Sign in with Spotify to start listening:</Subheading>
        <SpotifyConnect>
            <Image src="https://p1.hiclipart.com/preview/893/800/19/spotify-for-os-x-el-capitan-spotify-icon.jpg"></Image>
            <SpotifyButton href="/auth/spotify">Connect</SpotifyButton>
        </SpotifyConnect>
        </>
    );
}

const ExecDisplay = props => {
    if (props.data) {
        return <LoggedIn data={props.data}/>;
    } else {
        cookies.remove("access_token");
        cookies.remove("refresh_token");
        return <LoggedError/>;
    }
}

const Home = () => {
    const userObj = useSelector(state => state.userObj);
    const dispatch = useDispatch();
    const accessToken = cookies.get("access_token");
    const refreshToken = cookies.get("refresh_token");

    useEffect(() => {
        if (!userObj) {
            axios.get("https://api.spotify.com/v1/me", { 
                "headers": { "Authorization": "Bearer " + accessToken } 
            }).then(res => {
                dispatch(authorize(res.data));
            }).catch(err => {
                cookies.remove("access_token");
                cookies.remove("refresh_token");
            });
        }
    }, []);

    return (
        <Wrapper>
            { userObj ? // prevent forced relogin
                <>
                <ExecDisplay data={userObj}/>
                </>
            : 
                <>
                <Heading>Listen to music with others in real-time!</Heading>
                <Subheading>Sign in with Spotify to start listening:</Subheading>
                <SpotifyConnect>
                    <Image src="https://p1.hiclipart.com/preview/893/800/19/spotify-for-os-x-el-capitan-spotify-icon.jpg"></Image>
                        <SpotifyButton href="/auth/spotify">Connect</SpotifyButton>
                </SpotifyConnect>
                </>
            }
            <CodeContainer>
                <Subheading>or join a room:</Subheading>
                <CodeInput type="text" defaultValue="J63KL1"></CodeInput>
            </CodeContainer>
        </Wrapper>
    );
}

export default Home;