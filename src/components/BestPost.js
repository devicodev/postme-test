import React, {Component} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import PostContainer from './post/PostContainer'

class BestPost extends Component {

  render() {
    const {posts} = this.props
    return (
      <PostContainer title="Best Posts" posts={posts} />
    )
  }
}

const getPublicPosts = state => state.post.public
const bestPostSelector = createSelector(
  [getPublicPosts],
  posts => posts.slice().sort((p1, p2) => {
    if (p1.votes.length > p2.votes.length) {
      return 1
    } else if (p1.votes.length == p2. votes.length) {
      return 0
    } else {
      return -1
    }
  })
)

export default connect(state => ({
  posts: bestPostSelector(state)
}))(BestPost)