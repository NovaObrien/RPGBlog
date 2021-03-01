import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CommentService {
  createComment(data) {
    try {
      const res = api.post('api/comments/', data)
      AppState.comments = res.data
    } catch (error) {
      logger.error('Create Failed' + error)
    }
  }

  getComments(blogId) {
    try {
      const res = api.get('api/comments/' + blogId)
      logger.log(res.data)
      // AppState.comments = res.data
    } catch (error) {
      logger.error('Create Failed' + error)
    }
  }

  deleteComment(commentId) {
    try {
      api.delete('api/comments/' + commentId)
      const index = AppState.comments.findIndex(c => c._id === commentId)
      AppState.comments.splice(index, 1)
    } catch (error) {
      logger.error('Create Failed' + error)
    }
  }

  editComment(data) {
    try {
      const res = api.post('api/comments/', data)
      AppState.comments = res.data
    } catch (error) {
      logger.error('Create Failed' + error)
    }
  }
}
export const commentService = new CommentService()
