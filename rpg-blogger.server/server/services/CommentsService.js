import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getCommentsByBlogId(blogId) {
    try {
      return await dbContext.Comment.find({ blogId: blogId })
    } catch (error) {
      throw new BadRequest(error)
    }
  }

  async postComment(reqBody) {
    try {
      return await dbContext.Comment.create(reqBody)
    } catch (error) {
      throw new BadRequest(error)
    }
  }

  async editCommentById(blogId, reqBody, userId) {
    try {
      if (userId !== reqBody.creatorId) {
        throw new BadRequest('Unathorized Action')
      } else {
        return dbContext.Comment.findByIdAndUpdate(blogId, reqBody, { new: true })
      }
    } catch (error) {
      throw new BadRequest(error)
    }
  }

  async deleteCommentById(commentId) {
    try {
      return await dbContext.Comment.findByIdAndRemove(commentId)
    } catch (error) {
      throw new BadRequest(error)
    }
  }
}
export const commentsService = new CommentsService()
