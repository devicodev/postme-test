import React, {Component} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import PostContainer from './post/PostContainer'

class HiddenPost extends Component {

  render() {
    const {posts} = this.props
    return (
      <PostContainer title="Private Posts" posts={posts} />
    )
  }
}

const getHiddenPosts = state => state.post.hidden
const hiddenPostSelector = createSelector(
  [getHiddenPosts],
  posts => posts.slice()
)

export default connect(state => ({
  posts: hiddenPostSelector(state),
  hasMore: false
}))(HiddenPost)