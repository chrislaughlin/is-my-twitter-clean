import React from 'react';
import PropTypes from 'prop-types';

const LoginWithTwitter = ({
    onUserAuthClicked
}) => {
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

LoginWithTwitter.propTypes = {
    onUserAuthClicked: PropTypes.func.isRequired
};

export default LoginWithTwitter;