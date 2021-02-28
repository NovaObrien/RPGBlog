import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:blogId', this.getCommentsByBlogId)
      .post('', this.postComment)
      .put('/:commentId', this.editCommentById)
      .delete('/:commentId', this.deleteCommentById)
  }

  async postComment(req, res, next) {
    try {
      const user = req.userInfo
      req.body.creatorId = user.id
      req.body.createdBy = user.name
      res.send(await commentsService.postComment(req.body))
    } catch (error) {
      logger.error('Failed to Post Comment' + error)
      next(error)
    }
  }

  async getCommentsByBlogId(req, res, next) {
    try {
      res.send(await commentsService.getCommentsByBlogId(req.params.commentId))
    } catch (error) {
      logger.error('Failed to get comment by Id')
      next(error)
    }
  }

  async editCommentById(req, res, next) {
    try {
      const userId = req.userInfo.id
      res.send(await commentsService.editCommentById(req.params.commentId, req.body, userId))
    } catch (error) {
      logger.error('Failed to Edit Comment')
      next(error)
    }
  }

  async deleteCommentById(req, res, next) {
    try {
      const userId = req.userInfo.id
      res.send(await commentsService.deleteCommentById(req.params.commentId, userId))
    } catch (error) {
      logger.error('Failed to delete comment')
      next(error)
    }
  }
}
