import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    height: 500px;
`;


const Left = styled.div`
    background-color: grey;
    flex-grow: 1;
`;

const Log = styled.div`

`;

const Middle = styled.div`
    flex-grow: 4;
    background-color: white;
`;

const Search = styled.div`

`;


const Right = styled.div`
    flex-grow: 1.5;
    background-color: black;
`;

const Chat = styled.div`

`;

const ChatEntry = styled.div`

`;

const Room = props => {
    return(
        <Wrapper>
            <Left>
                <Log></Log>
            </Left>
            <Middle>
                <Search></Search>
            </Middle>
            <Right>
                <Chat></Chat>
            </Right>
        </Wrapper>
    );
}

export default Room;