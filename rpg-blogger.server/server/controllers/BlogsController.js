import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { blogsService } from '../services/BlogsService'
import { logger } from '../utils/Logger'
export class BlogsController extends BaseController {
  constructor() {
    super('api/blogs')
    this.router
      .get('', this.getAllBlogs)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:blogId', this.getBlogById)
      .post('', this.postBlog)
      .put('/:blogId', this.editBlogById)
      .delete('/:blogId', this.deleteBlogById)
  }

  async postBlog(req, res, next) {
    try {
      const user = req.userInfo
      req.body.creatorId = user.id
      req.body.createdBy = user.name
      res.send(await blogsService.postBlog(req.body))
    } catch (error) {
      logger.error('Failed to Post Blog')
      next(error)
    }
  }

  async getAllBlogs(req, res, next) {
    try {
      res.send(await blogsService.getAllBlogs())
    } catch (error) {
      logger.error('Failed to get all blogs')
      next(error)
    }
  }

  async getBlogById(req, res, next) {
    try {
      res.send(await blogsService.getBlogById(req.params.blogId))
    } catch (error) {
      logger.error('Failed to get blog by Id')
      next(error)
    }
  }

  async editBlogById(req, res, next) {
    try {
      const userId = req.userInfo.id
      res.send(await blogsService.editBlogById(req.params.blogId, req.body, userId))
    } catch (error) {
      logger.error(error + 'Failed to Edit Blog')
      next(error)
    }
  }

  async deleteBlogById(req, res, next) {
    try {
      const userId = req.userInfo.id
      res.send(await blogsService.deleteBlogById(req.params.blogId, userId))
    } catch (error) {
      logger.error('Failed to delete blog')
      next(error)
    }
  }
}
