import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Meteor} from 'meteor/meteor'
import {push} from 'react-router-redux'
import {votePost, editPost, deletePost} from '../../actions/post'
import CommentContainer from './CommentContainer'

class Post extends Component {
  render() {
    const {votePost, editPost, deletePost, push, full} = this.props
    const {_id, creator, username,  title, body, votes} = this.props.post
    const userId = Meteor.userId()
    const own = userId == creator
    const voted = !!userId && (own || votes.filter(vote => vote.creator == userId).length != 0)
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <strong>{title}</strong>
          <div className="pull-right">
            <button onClick={() => votePost(_id)} className="btn btn-xs btn-default" disabled={voted}>Vote({votes.length})</button>
          </div>
        </div>
        <div className="panel-body">
          {body.split('\n').map((part, index) => <p key={index}>{part}</p>)}
          <hr />
          Creator: <small style={{color: '#ff0000'}}>{username}</small>
        </div>
        {
          !full
          ? <div className="panel-footer clearfix">
            {
              own
              ? <div className="btn-group">
                  <button className="btn btn-xs btn-default" onClick={() => editPost(_id)}>Edit</button>
                  <button className="btn btn-xs btn-danger" onClick={() => deletePost(_id)}>Delete</button>
                </div>
              : null 
            }
            <div className="pull-right">
              <a href={`/posts/${_id}`} onClick={e => e.preventDefault() || push(`/posts/${_id}`)}>Discuss</a>
            </div>
          </div>
          : <div className="panel-footer">
            <h3>Comments:</h3>
            <CommentContainer post={_id} />
          </div>
        }
        
      </div>
    )
  }
}

export default connect(
  () => ({}),
  {votePost, editPost, deletePost, push}
)(Post)
