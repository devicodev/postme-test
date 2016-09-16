import React, {Component} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import PostContainer from './post/PostContainer'
import {loadMore} from '../actions/post'

class PublicPost extends Component {

  render() {
    const {posts} = this.props
    return (
      <PostContainer hasMore={this.props.hasMore} loadMore={this.props.loadMore} title="Public Posts" posts={posts} />
    )
  }
}

const getPublicPosts = state => state.post.public
const publicHasMore = state => state.post.publicHasMore
const publicPostSelector = createSelector(
  [getPublicPosts],
  posts => posts.slice()
)

export default connect(
  state => ({
    posts: publicPostSelector(state),
    hasMore: publicHasMore(state)
  }),
  {
    loadMore: loadMore.bind(null, false)
  }
)(PublicPost)