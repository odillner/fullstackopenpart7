import axios from 'axios'

import {API_URL} from '../utils/config'
import logger from '../utils/logger'

const extension = 'api/blogs/'
const baseUrl = API_URL + extension

export default {
    getAll: async () => {
        try {
            logger.info(extension, 'Fetching blogs')

            const res = await axios.get(baseUrl)

            logger.info(extension, 'Blogs fetched', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    create: async (newBlog, token) => {
        try {
            logger.info(extension, 'Creating blog', newBlog)

            const res = await axios.post(baseUrl, newBlog, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            logger.info(extension, 'Blog created', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    getById: async (id) => {
        try {
            logger.info(extension, 'Fetching blog', id)

            const res = await axios.get(baseUrl + id)

            logger.info(extension, 'Blog fetched', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    remove: async (id, token) => {
        try {
            logger.info(extension, 'Deleting blog', id)

            const res = await axios.delete(baseUrl + id, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            logger.info(extension, 'Blog deleted', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    update: async (id, newBlog, token) => {
        try {
            logger.info(extension, 'Updating blog', id, newBlog)

            const res = await axios.put(`${baseUrl}${id}`, newBlog, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            logger.info(extension, 'Blog updated', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    }
}