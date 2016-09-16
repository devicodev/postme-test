import React, {Component} from 'react'
import {connect} from 'react-redux'
import PostCollection from '../store/collections/post'
import Post from './post/Post'

class SinglePost extends Component {
  render() {
    if (!this.props.post) { //Still waiting for load
      return (
        <div className="container">
        </div>
      )
    }
    return (
      <div className="container">
        <Post full={true} post={this.props.post} />
      </div>
    )
  }
}

export default connect(
  (state, props) => ({
    post: props.params.id ? PostCollection.findOne(props.params.id) : null
  })
)(SinglePost)