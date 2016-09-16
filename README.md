# PostMe test task
Test task uses:

1. Meteor 1.4
2. React 15.3
3. Redux 3.6
4. React Router 2.8
5. Reselect 2.5
6. Redux Saga 0.11

## Installation

```meteor npm install```

```meteor```

## Limitations

1. Server publish all public posts to collection. It's limitation of test task. For real product it must be done 
with partial loading sort of posts (Public/Best must be also different)
2. There's no Gravatar included. It can be implemeted using https://atmospherejs.com/jparker/gravatar and adding 
callback for Accounts.onCreateUser
3. It's not realtime. So user don't receive updates without page refresh
4. There's no comments implemeted (because it's really not something that's hard to implement, but just waste of 
time for test task)

## Description

All components are located in `src/components`. Root component with router definition located in `src/Root.js`

Post actions located in `src/actions/post.js`. Async logic of execution located in Post saga `src/store/sagas/post.js`
 it's contains all logic related to fetching from Meteor Collections, meteor calls, etc.

Actions related to Post Collection and publishing data located in `src/store/collections/post.js`
