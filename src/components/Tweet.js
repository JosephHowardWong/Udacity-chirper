import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
import { handleToggleTweet } from '../actions/tweets'
import { Link, withRouter } from 'react-router-dom'

class Tweet extends Component {
    handleLike = (e) => {
        e.preventDefault()
        const { dispatch, authedUser, tweet } = this.props
        dispatch(handleToggleTweet({ 
            id: tweet.id, 
            hasLiked: tweet.hasLiked, 
            authedUser
        }))
    }
    toParent = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/tweets/${id}`)
    }

    render() {
        const { tweet } = this.props
        const { 
            name, avatar, timestamp, text, hasLiked, likes, replies, parent, id 
        } = tweet

        if(tweet === null) {
            return <p>This tweet doesn't exist.</p>
        }

        // console.log("tweet props are: ", this.props)
        return (
            <Link to={`/tweet/${id}`} className="tweet">
                <img 
                    src={avatar}
                    alt={`Avatar of ${name}`}                
                    className="avatar"
                />
                <div className="tweet-info">
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className="replying-to" onClick={(e) => this.toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className="tweet-icons">
                        <TiArrowBackOutline className="tweet-icon" />
                        <span>{replies !== 0 && replies}</span>
                        <button className="heart-button" onClick={this.handleLike}>
                            {hasLiked === true
                                ? <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
                                : <TiHeartOutline className="tweet-icon" />}
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        )
    }
}

const mapStateToProps = ({ authedUser, tweets, users }, { id }) => {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        authedUser,
        tweet: tweet 
        ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
        : null
    }
}

export default withRouter(connect(mapStateToProps)(Tweet))