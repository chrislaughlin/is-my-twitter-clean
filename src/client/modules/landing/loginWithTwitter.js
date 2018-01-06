/* @flow */
import React from 'react';

export type Props = { onUserAuthClicked: Function };

const LoginWithTwitter = (props: Props) => {
    const {
        onUserAuthClicked
    } = props;

    return (
        <div>
            Login with your twitter account:
            <button
                onClick={onUserAuthClicked}
            >
                LOGIN
            </button>
        </div>
    );
};

export default LoginWithTwitter;