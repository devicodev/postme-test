import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createPost, updatePost} from '../../actions/post'
import Post from './Post'
import PostForm from './PostForm'

class PostContainer extends Component {
  render() {
    const {createPost, updatePost} = this.props
    return (
      <div className="container">
        <h3>{this.props.title}</h3>
        <PostForm onSave={createPost} />
        {this.props.posts.map(post => post.edit 
          ? <PostForm onSave={updatePost.bind(null, post._id)} post={post} key={post._id} />
          : <Post post={post} key={post._id} />)}
      </div>
    )
  }
}

export default connect(
  () => ({}),
  {createPost, updatePost}
)(PostContainer)