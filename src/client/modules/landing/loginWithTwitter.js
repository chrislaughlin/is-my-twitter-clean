/* @flow */
import React from 'react';
import StyledLoginWithTwitterContainer from "../../styles/landing/styledLoginWithTwitterContainer";
import StyledLoginWithTwitterList from "../../styles/landing/styledLoginWithTwitterList";
import StyledLoginWithTwitterListItem from "../../styles/landing/styledLoginWithTwitterListItem";
import StyledLoginWithTwitterListItemEmoji from "../../styles/landing/styledLoginWithTwitterListItemEmoji";

export type Props = { onUserAuthClicked: Function };

const LoginWithTwitter = (props: Props) => {
    const {
        onUserAuthClicked
    } = props;

    return (
        <StyledLoginWithTwitterContainer>
            <StyledLoginWithTwitterList>
                <StyledLoginWithTwitterListItem>
                    About to get famous?  <br/>
                    <StyledLoginWithTwitterListItemEmoji>
                        💃
                    </StyledLoginWithTwitterListItemEmoji>
                </StyledLoginWithTwitterListItem>
                <li>
                    About to go viral? ️ <br/>
                    <StyledLoginWithTwitterListItemEmoji>
                        ☣
                    </StyledLoginWithTwitterListItemEmoji>
                </li>
                <li>
                    Haven't checked your tweets in a while? <br/>
                    <StyledLoginWithTwitterListItemEmoji>
                        🐤
                    </StyledLoginWithTwitterListItemEmoji>
                </li>
            </StyledLoginWithTwitterList>
            <p>
                Maybe its time you checked if your twitter is clean!
                    ♻️
                <br/>
                In a few seconds we can process your Twitter timeline and tell you if there are any dirty tweets
                    💩️
            </p>
            <button
                onClick={onUserAuthClicked}
            >
                LOGIN
            </button>
        </StyledLoginWithTwitterContainer>
    );
};

export default LoginWithTwitter;