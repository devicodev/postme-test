import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Meteor} from 'meteor/meteor'
import {votePost, editPost} from '../../actions/post'

class Post extends Component {
  render() {
    const {votePost, editPost} = this.props
    const {_id, creator, title, body, votes, comments} = this.props.post
    const userId = Meteor.userId()
    const own = userId == creator
    const voted = votes.filter(vote => vote.creator == userId).length != 0
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {title}
          <div className="pull-right">
            <button onClick={() => votePost(_id)} className="btn btn-xs btn-default" disabled={voted}>Vote({votes.length})</button>
          </div>
        </div>
        <div className="panel-body">
          {body.split('\n').map((part, index) => <p key={index}>{part}</p>)}
        </div>
        <div className="panel-footer clearfix">
          {
            own
            ? <div className="btn-group">
                <button className="btn btn-xs btn-default" onClick={() => editPost(_id)}>Edit</button>
                <button className="btn btn-xs btn-danger">Delete</button>
              </div>
            : null 
          }
          <div className="pull-right">
            <a href="#">Discuss</a>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  () => ({}),
  {votePost, editPost}
)(Post)
