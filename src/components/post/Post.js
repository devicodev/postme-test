import React, {Component} from 'react'
import {connect} from 'react-redux'
import {votePost} from '../../actions/post'

class Post extends Component {
  render() {
    const {votePost} = this.props
    const {_id, title, body, votes, comments} = this.props.post
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {title}
          <div className="pull-right">
            <button onClick={() => votePost(_id)} className="btn btn-xs btn-default">Vote({votes.length})</button>
          </div>
        </div>
        <div className="panel-body">
          {body.split('\n').map((part, index) => <p key={index}>{part}</p>)}
        </div>
        <div className="panel-footer clearfix">
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
  {votePost}
)(Post)
