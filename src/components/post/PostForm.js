import React, {Component} from 'react'
import {connect} from 'react-redux'

class PostForm extends Component {

  onSubmit(e) {
    e.preventDefault()
    const {title, body, hidden} = this.refs
    const data = {
      votes: [],
      voteCount: 0,
      ...(this.props.post || {}),
      title: title.value,
      body: body.value,
      hidden: hidden.checked
    }
    this.props.onSave(data)
  }

  render() {
    if (!this.props.auth) {
      return <div />
    }
    const {post = {}} = this.props
    return (
        <form className="panel panel-default" onSubmit={e => this.onSubmit(e)}>
          <div className="panel-heading">
            <input type="text" className="form-control" defaultValue={post.title} ref="title" placeholder="Title" />
          </div>
          <div className="panel-body">
            <textarea type="password" className="form-control" defaultValue={post.body} ref="body" placeholder="Body" />
          </div>
          <div className="panel-footer">
            <label>
              <input type="checkbox" ref="hidden" defaultChecked={post.hidden} /> Private
            </label>
            <div className="pull-right">
              <button type="submit" className="btn btn-xs btn-default">Submit</button>
            </div>
          </div>
        </form>
    )
  }
}

export default connect(
  ({auth}) => ({auth})
)(PostForm)
