import React, {Component} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import PostContainer from './post/PostContainer'
import {loadMore} from '../actions/post'

class BestPost extends Component {

  render() {
    const {posts} = this.props
    return (
      <PostContainer hasMore={this.props.hasMore} loadMore={this.props.loadMore} title="Best Posts" posts={posts} />
    )
  }
}

const getBestPosts = state => state.post.best
const bestHasMore = state => state.post.bestHasMore
const bestPostSelector = createSelector(
  [getBestPosts],
  posts => posts.slice()
)

export default connect(
  state => ({
    posts: bestPostSelector(state),
    hasMore: bestHasMore(state)
  }),
  {loadMore: loadMore.bind(null, true)}
)(BestPost)