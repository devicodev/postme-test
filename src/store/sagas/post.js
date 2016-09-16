import {takeEvery} from 'redux-saga'
import {fork, call, select, put} from 'redux-saga/effects'
import {Meteor} from 'meteor/meteor'
import {
  POST_LOAD,
  POST_BEST_LOAD,
  POST_LOAD_MORE,
  POST_BEST_LOAD_MORE,
  POST_VOTE,
  POST_CREATE,
  POST_APPEND,
  POST_PRIVATE_LOAD,
  POST_PRIVATE_GET,
  POST_UPDATE,
  POST_DELETE,
  POST_HIDDEN,
  AUTH_LOGIN
} from '../../constants'
import PostCollection from '../collections/post'

function callMeteor(action, ...data) {
  return new Promise((resolve, reject) => Meteor.call(action, ...data, (err, result) => {
    if (err) {
      reject(err)
    } else {
      resolve(result)
    }
  }))
}

function* fetchMorePosts() {
  const alreadyLoaded = yield select(state => state.post.public.length)
  const posts = PostCollection.find(
    {
      hidden: false
    },
    {
      skip: alreadyLoaded,
      limit: 11,
      sort: {
        createdAt: -1
      }
    }
  ).fetch()
  const hasMore = !!posts[10] //Hack to prevent making two different queries: one for count, another for getting
  yield put({
    type: POST_LOAD,
    hasMore,
    payload: posts.slice(0, 10)
  })
}

function* fetchBestPosts() {
  const alreadyLoaded = yield select(state => state.post.best.length)
  const posts = PostCollection.find(
    {
      hidden: false
    },
    {
      skip: alreadyLoaded,
      limit: 11,
      sort: {
        voteCount: -1
      }
    }
  ).fetch()
  const hasMore = !!posts[10] //Hack to prevent making two different queries: one for count, another for getting
  yield put({
    type: POST_BEST_LOAD,
    hasMore,
    payload: posts.slice(0, 10)
  })
}

function insertPost(post) {
  return callMeteor('posts.insert', post).then(
    postId => PostCollection.findOne(postId, {reactive: false})
  )
}

function* createPost(action) {
  const rawData = action.payload
  const user = Meteor.userId()
  const post = yield call(insertPost, rawData)
  yield put({
    type: POST_APPEND,
    payload: post
  })
}

function* getHidden() {
  const posts = PostCollection.find({hidden: true}).fetch()
  if (posts.length) {
    yield put({
      type: POST_PRIVATE_LOAD,
      payload: posts
    })
  }
}

function* votePost(action) {
  yield call(callMeteor, 'posts.vote', action.payload.postId)
}
function* updatePost(action) {
  yield call(callMeteor, 'posts.update', action.payload.postId, action.payload.data)
}
function* deletePost(action) {
  yield call(callMeteor, 'posts.remove', action.payload.postId)
}

export default function* configureSaga() {
  yield [
    takeEvery(POST_VOTE, votePost),
    takeEvery(POST_UPDATE, updatePost),
    takeEvery(POST_DELETE, deletePost),
    takeEvery(POST_PRIVATE_GET, getHidden),
    takeEvery(POST_CREATE, createPost),
    takeEvery(POST_LOAD_MORE, fetchMorePosts),
    takeEvery(POST_BEST_LOAD_MORE, fetchBestPosts)
  ]
}