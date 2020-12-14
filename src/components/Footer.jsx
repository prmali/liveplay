import React from "react";
import styled from "styled-components";


const Wrapper = styled.div`
    margin-top: 25px;
    display: flex;
    align-items: start;
    justify-content: center;
    padding: 15px 75px;
    flex-wrap: wrap;
    text-align: center;
`;

const Column = styled.section`
    display: block;
    flex: 1 1;
    margin: 0 15px;
    margin-bottom: 25px;
`;

const Heading = styled.h1`
    font-size: 1.25em;
    color: #312c42;
`;

const Subheading = styled.h2`
    font-size: 1.1em;
    color: #504966;
    margin: 5px 0;
    margin-bottom: 10px;
`;

const SubContainer = styled.div`
    word-wrap: normal;
`;

const SpecialContainer = styled(SubContainer)`
    margin: auto;
    width: 100px;
    background-color: white;
    border-radius: 45px;
    padding: 5px 10px;
`;

const Content = styled.a`
    color: white;
    text-decoration: none;
    font-weight: 700;
    margin-bottom: 5px;
    line-height: 1rem;
    display: block;
    text-align: center;
`;

const Marker = styled(Content)`
    color: #504966;
    padding: 0 50px;
    text-align: right;
`

const Donate = styled.a`
    font-weight: 700;
    margin: 0 25px;
    background: -webkit-linear-gradient(20deg, #fc604d 0%, #f23180 50%, #c229b1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

function Footer(props) {
    return(
        <>
        <Wrapper>
            <Column>
                <Heading>Diggin' Liveplay?</Heading>
                <Subheading>I can barely keep the servers up. I'd appreciate any bit of help ❤️</Subheading>
                <SpecialContainer>
                    <Donate href="">Donate</Donate>
                </SpecialContainer>
            </Column>

            <Column>
                <Heading>More links</Heading>
                <Subheading>Check out my other creations 😁</Subheading>
                <SubContainer>
                    <Content href="">Deals.me</Content>
                    <Content href="">Hermes</Content>
                </SubContainer>
            </Column>

            <Column>
                <Heading>Socials</Heading>
                <Subheading>I'm lookin' for internships 😉</Subheading>
                <SubContainer>
                    <Content href="">LinkedIn</Content>
                    <Content href="">Instagram</Content>
                    <Content href="">Twitter</Content>
                    <Content href="">Github</Content>
                    <Content href="">Email</Content>
                </SubContainer>
            </Column>
        </Wrapper>
        <Marker>prathik {new Date().getFullYear()}</Marker>
        </>
    );
}

export default Footer;