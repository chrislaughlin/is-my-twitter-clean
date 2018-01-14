/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import './../../spinner.css';
import * as tweetActions from "../../actions/tweetActions";
import type {Tweet} from "../../types/tweet";
import {post} from "../../utils/restUtils";

export type Props = {
    tweetsState: {
        isLoading: Boolean,
        tweets: Array<Tweet>
    },
    onDeleteTweet: Function,
};

const deleteTweet = (
    accessToken,
    accessTokenSecret,
    onDeleteTweet,
    uuid
) => {
    return () => {
        post(
            '/delete-tweet',
            {
                uuid: uuid,
                accessToken,
                accessTokenSecret
            }
        ).then(() => {
            onDeleteTweet(uuid);
        });
    }
};

const TweetsView = (props: Props) => {
    const {
        tweetsState: {
            tweets,
            isLoading
        },
        session: {
            accessToken,
            accessTokenSecret
        },
        onDeleteTweet,

    } = props;

    if (isLoading) {
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
                                    onClick={deleteTweet(
                                        accessToken,
                                        accessTokenSecret,
                                        onDeleteTweet,
                                        tweet.tweet.id_str
                                    )}
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

const mapStateToProps = ({session, tweets}) => {
    return {session, tweetsState: tweets};
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteTweet: (uuid) => {
            dispatch(tweetActions.deleteTweet(uuid));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TweetsView);