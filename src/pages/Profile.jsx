import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import qs from "querystring";
import fs from "fs";

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
	filter: drop-shadow(0 0 0.75rem #06040b);
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
	cursor: pointer;
`;

const PlaylistInfoView = styled.a`
	position: absolute;
	width: 100px;
`;

const SongContainer = styled.div`
	margin-right: 20px;
	overflow: scroll;
	margin-top: 40px;
	height: 60vh;
	width: 75%;
	@media (max-width: 600px) {
		width: 100%;
		padding: -2em;
	}
`;
const SongViewer = styled.div`
	padding: 10px;
`;

const SongListItem = styled.div`
	background-color: black;
	color: white;
	padding: 10px 15px;
	cursor: pointer;
	word-wrap: normal;
`;

const searchSong = (props) => {
	let artists = [];
	props.track.artists.forEach((artist) => {
		artists.push(artist.name);
	});

	axios
		.get("/search/youtube", {
			params: {
				ref:
					artists.join("+") +
					"+" +
					props.track.name.split(" ").join("+"),
			},
		})
		.then((res) => {
			axios
				.get("/search/youtube/stream", {
					params: {
						trackUrl: res.data.url,
					},
					//responseType: "blob"
				})
				.then((res) => {
					/*let encoder = new TextEncoder();
            const view = encoder.encode(res.data.stream);
            let blob = new Blob([view], { type: res.data.type });
            props.setSource(URL.createObjectURL(blob));*/
					props.setSource(res.data.url);
				});
			//window.open(res.data.url, "_blank");
		})
		.catch((err) => {
			console.log(err);
		});
};

const SongItem = (props) => {
	if (props && props.track) {
		return (
			<SongListItem
				key={props.track.key}
				onClick={() => {
					searchSong({
						track: props.track,
						setSource: props.setSource,
					});
				}}
				onMouseEnter={(e) => {
					//console.log(e);
				}}
			>
				{props.track.name}
			</SongListItem>
		);
	} else {
		return <></>;
	}
};

const PlaylistItem = (props) => {
	return (
		<PlaylistButton
			onClick={() =>
				getSongs(
					props.playlist.tracks.href,
					props.accessToken,
					props.playlist,
					props.setTracks,
					props.setPlaylist
				)
			}
		>
			<PlaylistImage
				src={
					props.playlist.images[0] ? props.playlist.images[0].url : ""
				}
			/>
			{/*<PlaylistTitle>{props.playlist.name}</PlaylistTitle>*/}
		</PlaylistButton>
	);
};

const getSongs = (
	playlistUrl,
	accessToken,
	playlist,
	setTracks,
	setPlaylist
) => {
	axios
		.get(playlistUrl, {
			headers: { Authorization: "Bearer " + accessToken },
		})
		.then((res) => {
			setTracks(res.data.items);
			setPlaylist(playlist);
		})
		.catch((err) => {
			console.log("err: ", err);
		});
};

function Profile(props) {
	const userObj = useSelector((state) => state);
	const [playlists, setPlaylists] = useState([]);
	const [playlist, setPlaylist] = useState(null);
	const [tracks, setTracks] = useState([]);
	const [source, setSource] = useState(null);

	let accessToken = cookies.get("access_token");

	useEffect(() => {
		if (userObj) {
			if (accessToken) {
				axios
					.get(
						"https://api.spotify.com/v1/me/playlists?" +
							qs.stringify({
								limit: 50,
							}),
						{
							headers: { Authorization: "Bearer " + accessToken },
						}
					)
					.then((res) => {
						setPlaylists(res.data.items);
					})
					.catch((err) => {
						cookies.remove("access_token");
						cookies.remove("refresh_token");
						window.location.replace("/auth/spotify");
					});

				axios
					.get("https://api.spotify.com/v1/me/tracks", {
						headers: { Authorization: "Bearer " + accessToken },
					})
					.then((res) => {
						res.data["name"] = "Saved";
						//setPlaylists(playlists.unshift(res.data));
					})
					.catch((err) => {
						//console.log(err);
						//cookies.remove("access_token");
						//cookies.remove("refresh_token");
						//window.location.replace("/auth/spotify");
					});

				if (playlists.length > 0) {
					setPlaylist(playlists[0]);
					const trackHref = playlists[0].tracks.href;
					axios
						.get(trackHref, {
							headers: { Authorization: "Bearer " + accessToken },
						})
						.then((res) => {
							let temp = {};
							console.log(res.data.items);
							setTracks(res.data.items);
						})
						.catch((err) => {
							//console.log(err);
							//cookies.remove("access_token");
							//cookies.remove("refresh_token");
							//window.location.replace("/auth/spotify");
						});
				}
			} else {
				console.log("Access token not availible");
				//window.location.replace("/auth/spotify");
			}
		}
	}, []);

	return (
		<Wrapper>
			<audio autoplay controls src={source} type="" />
			{playlists ? (
				<>
					<PlaylistContainer>
						{playlists.map((item) => {
							return (
								<PlaylistItem
									key={item.id}
									playlist={item}
									accessToken={accessToken}
									setTracks={setTracks}
									setPlaylist={setPlaylist}
								/>
							);
						})}
					</PlaylistContainer>

					<SongContainer>
						{tracks.length > 0 ? (
							tracks.map((item) => {
								return (
									<SongItem
										key={item.track ? item.track.id : -1}
										track={item.track}
										setSource={setSource}
									/>
								);
							})
						) : (
							<SongListItem>
								No songs in this playlist...
							</SongListItem>
						)}
					</SongContainer>
				</>
			) : (
				<div>Make some playlists!</div>
			)}
		</Wrapper>
	);
}

export default Profile;
