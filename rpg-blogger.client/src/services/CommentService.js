import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CommentService {
  async createComment(data) {
    try {
      const res = await api.post('api/comments/', data)
      AppState.comments = [...AppState.comments, res.data]
    } catch (error) {
      logger.error('Create Failed' + error)
    }
  }

  async getComments(blogId) {
    try {
      const res = await api.get('api/comments/' + blogId)
      AppState.comments = res.data
    } catch (error) {
      logger.error('Create Failed' + error)
    }
  }

  async deleteComment(commentId) {
    try {
      await api.delete('api/comments/' + commentId)
      const index = AppState.comments.findIndex(c => c._id === commentId)
      AppState.comments.splice(index, 1)
    } catch (error) {
      logger.error('Create Failed' + error)
    }
  }

  async editComment(data) {
    try {
      const res = await api.post('api/comments/', data)
      AppState.comments = res.data
    } catch (error) {
      logger.error('Create Failed' + error)
    }
  }
}
export const commentService = new CommentService()
