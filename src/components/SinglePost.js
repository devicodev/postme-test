import React, {Component} from 'react'

export default class SinglePost extends Component {
  render() {
    const {title, body, votes, comments} = this.props.post
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {title}
          <div className="pull-right">
            <button className="btn btn-xs btn-default">Vote({votes.length})</button>
          </div>
        </div>
        <div className="panel-body">
          {body.split('\n').map((part, index) => <p key={index}>{part}</p>)}
          <hr/>
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