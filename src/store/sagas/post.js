import {takeEvery} from 'redux-saga'
import {fork, call, select, put} from 'redux-saga/effects'
import {Meteor} from 'meteor/meteor'
import {
  POST_LOAD_MORE,
  POST_LOAD,
  POST_VOTE,
  POST_CREATE,
  POST_APPEND,
  POST_PRIVATE_LOAD,
  POST_PRIVATE_GET,
  POST_UPDATE,
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
  const user = Meteor.userId()
  const posts = PostCollection.find(
    {
      hidden: false
    },
    {
      skip: alreadyLoaded,
      limit: 10
    }
  ).fetch()
  yield put({
    type: POST_LOAD,
    payload: posts
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

function* loadHidden() {
  yield call(callMeteor, 'posts.hidden')
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

export default function* configureSaga() {
  yield [
    takeEvery(AUTH_LOGIN, loadHidden),
    takeEvery(POST_VOTE, votePost),
    takeEvery(POST_UPDATE, updatePost),
    takeEvery(POST_PRIVATE_GET, getHidden),
    takeEvery(POST_CREATE, createPost),
    takeEvery(POST_LOAD_MORE, fetchMorePosts)
  ]
}