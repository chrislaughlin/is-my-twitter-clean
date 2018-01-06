/* @flow */
import React from 'react';
import PropTypes from 'prop-types';

import './../../spinner.css';

export type Props = {
    tweets?: Array<any>,
    deleteTweet: Function,
};

const TweetsView = (props: Props) => {
    const {
        tweets,
        deleteTweet
    } = props;

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

export default TweetsView;