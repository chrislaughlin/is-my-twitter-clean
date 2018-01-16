/* @flow */
import React from 'react';
import StyledLoginWithTwitterContainer from "../../styles/landing/styledLoginWithTwitterContainer";
import StyledLoginWithTwitterList from "../../styles/landing/styledLoginWithTwitterList";
import StyledLoginWithTwitterListItem from "../../styles/landing/styledLoginWithTwitterListItem";
import StyledLoginWithTwitterListItemEmoji from "../../styles/landing/styledLoginWithTwitterListItemEmoji";
import StyledLoginWithTwitterButton from "../../styles/landing/styledLoginWithTwitterButton";

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
                <li>
                    Maybe its time you checked if your twitter is clean! <br/>
                    <StyledLoginWithTwitterListItemEmoji>
                        ♻️
                    </StyledLoginWithTwitterListItemEmoji>
                </li>
                <li>
                    <StyledLoginWithTwitterButton
                        onClick={onUserAuthClicked}
                    >
                        Login with your Twitter account
                    </StyledLoginWithTwitterButton>
                </li>
            </StyledLoginWithTwitterList>
        </StyledLoginWithTwitterContainer>
    );
};

export default LoginWithTwitter;