import mongoose from 'mongoose'
const Schema = mongoose.Schema
// const objectId = schema.Types.ObjectId
const Blog = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: 'No Content...'
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
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
})

Blog.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Blog
