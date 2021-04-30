import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'

class NewTweet extends Component {
    state = {
        text: "",
        toHome: false,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { text } = this.state
        const { dispatch, id } = this.props

        dispatch(handleAddTweet(text, id))

        this.setState(() => ({ 
            text: "",
            toHome: id ? false : true 
        }))
    }

    handleChange = (e) => {
        this.setState(() => ({ text: e.target.value}))
    }

    render() {
        const { text, toHome } = this.state

        if(toHome === true) {
            return <Redirect to='/' />
        }

        const tweetLeft = 280 - text.length

        return (
            <div>
                <h3 className="center">Compose a new Tweet</h3>
                <form className="new-tweet" onSubmit={this.handleSubmit}>
                    <textarea 
                        placeholder="What's happening"
                        value={text}
                        onChange={this.handleChange}
                        className="textarea"
                        maxLength={280}    
                    />
                    {tweetLeft < 100 && (
                        <div className="tweet-length">
                            {tweetLeft}
                        </div>
                    )}
                    <button 
                        className='btn'
                        type='submit'
                        disabled={text === ""}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewTweet)