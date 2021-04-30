import { connect } from "react-redux"
import React, { Component } from "react"
import Tweet from './Tweet'

class Dashboard extends Component {
    render() {
        console.log("props for dashboard are: ", this.props)
        return(
            <>
                <h3 className="center">Your Timeline</h3>
                <ul className="dashboard-list">
                    {this.props.tweetIds.map(id => (
                        <li key={id}>
                            <Tweet id={id} />
                        </li>
                    ))}
                </ul>               
            </>
        )
    }
}

const mapStateToProps = ({ tweets }) => {
    return {
        tweetIds: Object.keys(tweets)
            .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp) 
    }
}

export default connect(mapStateToProps)(Dashboard)