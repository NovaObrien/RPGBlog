import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Comment = new Schema({
  content: {
    type: String,
    required: true
  },
  creatorId: {
    type: String,
    required: true,
    ref: 'Account'
  },
  createdBy: {
    type: String,
    required: true,
    ref: 'Account'
  },
  blogId: {
    type: String,
    required: true,
    ref: 'Blog'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
})

Comment.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

Comment.virtual('blog', {
  localField: 'blogId',
  ref: 'Blog',
  foreignField: '_id',
  justOne: true
})

export default Comment
