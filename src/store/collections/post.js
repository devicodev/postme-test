import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {check} from 'meteor/check'

const PostCollection = new Mongo.Collection('posts')

export default PostCollection

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('posts', function () {
    return PostCollection.find({
      $or: [
        { hidden: { $ne: true } },
        { creator: this.userId },
      ],
    })
  })
  Meteor.publish('posts:hidden', function () {
    check(this.userId, String)
    return PostCollection.find({
      hidden: true,
      creator: this.userId
    })
  })
}

Meteor.methods({
  'posts.insert'(post) {

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized')
    }
 
    return PostCollection.insert({
      ...post,
      votes: [],
      comments: [],
      createdAt: new Date(),
      creator: this.userId,
      username: Meteor.users.findOne(this.userId).username
    })
  },
  'posts.update'(postId, data) {
    check(postId, String)
    let post = PostCollection.findOne(postId)
    if (!this.userId || post.creator != this.userId) {
      throw new Meteor.Error('not-authorized')
    }
    PostCollection.update(postId, { $set: {
      title: data.title,
      body: data.body,
      hidden: data.hidden
    }})
  },
  'posts.remove'(postId) {
    check(postId, String)
    const post = PostCollection.findOne(postId)
    if (!this.userId || post.creator != this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    PostCollection.remove(postId)
  },
  'posts.vote'(postId) {
    check(postId, String)
    const post = PostCollection.findOne(postId)
    if (post.votes.filter(vote => vote.creator == this.userId).length) {
      throw new Meteor.Error('already voted')
    }
 
    PostCollection.update(postId, { $set: { voteCount: post.votes.length + 1, votes: [...post.votes, {
      creator: this.userId,
      username: Meteor.users.findOne(this.userId).username 
    }] } })
  },
});
