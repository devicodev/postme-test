import React, {Component} from 'react'
import Post from './Post'
import PostForm from './PostForm'

export default class PostContainer extends Component {
  render() {
    return (
      <div className="container">
        <h3>{this.props.title}</h3>
        <PostForm />
        {this.props.posts.map(post => <Post post={post} key={post._id} />)}
      </div>
    )
  }
}