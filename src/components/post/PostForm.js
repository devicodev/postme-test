import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createPost} from '../../actions/post'

class PostForm extends Component {

  onSubmit(e) {
    e.preventDefault()
    const {title, body, hidden} = this.refs
    const data = {
      title: title.value,
      body: body.value,
      hidden: hidden.checked
    }
    this.props.createPost(data)
  }

  render() {
    if (!this.props.auth) {
      return <div />
    }
    return (
        <form className="panel panel-default" onSubmit={e => this.onSubmit(e)}>
          <div className="panel-heading">
            <input type="text" className="form-control" ref="title" placeholder="Title" />
          </div>
          <div className="panel-body">
            <textarea type="password" className="form-control" ref="body" placeholder="Body" />
          </div>
          <div className="panel-footer">
            <label>
              <input type="checkbox" ref="hidden" /> Private
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
  ({auth}) => ({auth}),
  {createPost}
)(PostForm)
