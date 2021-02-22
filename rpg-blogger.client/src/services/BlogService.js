import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
class BlogService {
  async getBlogs() {
    try {
      const res = await api.get('api/blogs')
      AppState.blogs = res.data
    } catch (error) {
      logger.error('get blogs failed' + error)
    }
  }

  async getActiveBlog(blogId) {
    try {
      const res = await api.get('api/blogs/' + blogId)
      AppState.activeBlog = res.data
    } catch (error) {
      logger.error('Get blog failed' + error)
    }
  }

  async createBlogs(blogData) {
    try {
      const res = await api.post('api/blogs', blogData)
      AppState.blogs = [...AppState.blogs, res.data]
    } catch (error) {
      logger.error('Failed create blog' + error)
    }
  }

  async editActiveBlog(blog) {
    try {
      await api.put('api/blogs/' + blog._id)
      const index = AppState.blogs.findIndex(b => b._id === blog._id)
      AppState.blogs.splice(index, 1, blog)
    } catch (error) {
      logger.error('Edit failed' + error)
    }
  }

  async removeActiveBlog(blog) {
    try {
      await api.delete('api/blogs/' + blog._id)
      const index = AppState.blogs.findIndex(b => b._id === blog)
      AppState.blogs.splice(index, 1)
    } catch (error) {
      logger.error('Delete failed' + error)
    }
  }
}
export const blogService = new BlogService()