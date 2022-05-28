import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import "./Topbar.css";

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 50px;
	@media (max-width: 600px) {
		padding: 5px;
	}
	filter: drop-shadow(0 0 0.75rem #06040b);
	margin-bottom: 40px;
`;

const Right = styled.a`
	flex-shrink: 1;
	color: white;
	margin: 5px;
	padding: 5px 0;
	font-size: 1.75em;
	font-weight: 700;
	background: -webkit-linear-gradient(
		20deg,
		#fc604d 0%,
		#f23180 50%,
		#c229b1 100%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font-family: "Pacifico", cursive;
	text-decoration: none;
`;

const Middle = styled.section``;

const Left = styled.div``;

const Button = styled.a`
	font-size: 1.15em;
	border-radius: 15px;
	color: white;
	font-weight: 600;
	padding: 5px 15px;
	margin: 5px;
	text-decoration: none;
`;

const FilledButton = styled(Button)`
	color: white;
	background: -webkit-linear-gradient(
		20deg,
		#fc604d 0%,
		#f23180 50%,
		#c229b1 100%
	);
	filter: drop-shadow(0 0 0.75rem #e62097);
`;

function Topbar(props) {
	const userObj = useSelector((state) => state.userObj);

	return (
		<Wrapper>
			<Right href="/">Liveplay</Right>
			<Left>
				{userObj ? (
					<Button href="/profile">Profile</Button>
				) : (
					<>
						<Button href="/auth/spotify">Log In</Button>
						<FilledButton>Sign Up</FilledButton>
					</>
				)}
			</Left>
		</Wrapper>
	);
}

export default Topbar;
