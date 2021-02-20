import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BlogsService {
  async postBlog(reqBody) {
    try {
      return await dbContext.Blog.create(reqBody)
    } catch (error) {
      throw new BadRequest(error)
    }
  }

  async getAllBlogs() {
    try {
      return await dbContext.Blog.find()
    } catch (error) {
      throw new BadRequest(error)
    }
  }

  async getBlogById(blogId) {
    try {
      return await dbContext.Blog.findById(blogId)
    } catch (error) {
      throw new BadRequest(error)
    }
  }

  async editBlogByID(blogId, reqBody, userId) {
    try {
      if (userId !== reqBody.creatorId) {
        throw new BadRequest('UnAuthorized Action')
      } else {
        return await dbContext.Blog.findByIdAndUpdate(blogId, reqBody, { new: true })
      }
    } catch (error) {
      throw new BadRequest(error)
    }
  }

  async deleteBlogById(blogId, userId) {
    try {
      return await dbContext.Blog.findOneAndDelete({ _id: blogId, creatorId: userId })
    } catch (error) {
      throw new BadRequest(error)
    }
  }
}
export const blogsService = new BlogsService()
