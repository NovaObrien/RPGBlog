import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CommentService {
  createComment(data) {
    try {
      const res = api.post('/comments/', data)
      AppState.comments = res.data
    } catch (error) {
      logger.error('Create Failed' + error)
    }
  }
}
export const commentService = new CommentService()
