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
}


Meteor.methods({
  'posts.hidden'() {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    if (Meteor.isServer) {
      Meteor.publish('posts:hidden', function () {
        return PostCollection.find({
          hidden: true,
          creator: this.userId
        })
      })
    }
  },
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
  'posts.remove'(postId) {
    check(postId, String);
 
    PostCollection.remove(postId)
  },
  'posts.vote'(postId) {
    check(postId, String)
    const post = PostCollection.findOne(postId)
    if (post.votes.filter(vote => vote.creator == this.userId).length) {
      throw new Meteor.Error('already voted')
    }
 
    PostCollection.update(postId, { $set: { votes: [...post.votes, {
      creator: this.userId,
      username: Meteor.users.findOne(this.userId).username 
    }] } })
  },
});
