import React from 'react';
import PropTypes from 'prop-types';

import './../../spinner.css';

const TweetsView = ({
    tweets,
    deleteTweet
}) => {
    if (!tweets) {
        return <div className='spinner'/>
    }
    return (
        <div>
            <p>
                Total Tweets: {tweets.length}
            </p>
            <ul>
                {
                    tweets.map((tweet, index) => {
                        return (
                            <li
                                key={index}
                            >
                                {tweet.tweet.text}
                                <button
                                    onClick={deleteTweet.bind(this, tweet.tweet.id_str)}
                                >
                                    DELETE
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
};

TweetsView.propTypes = {
    tweets: PropTypes.array,
    deleteTweet: PropTypes.func.isRequired
};

export default TweetsView;