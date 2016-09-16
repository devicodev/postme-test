import React, {Component} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import PostContainer from './post/PostContainer'

class PublicPost extends Component {

  render() {
    const {posts} = this.props
    return (
      <PostContainer title="Public Posts" posts={posts} />
    )
  }
}

const getPublicPosts = state => state.post.public
const publicPostSelector = createSelector(
  [getPublicPosts],
  posts => posts.slice()
)

export default connect(state => ({
  posts: publicPostSelector(state)
}))(PublicPost)