import axios from 'axios'

import {API_URL} from '../utils/config'
import logger from '../utils/logger'

const extension = 'api/users/'
const baseUrl = API_URL + extension

export default {
    getAll: async () => {
        try {
            logger.info(extension, 'Fetching users')

            const res = await axios.get(baseUrl)

            logger.info(extension, 'Users fetched', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    create: async (newUser) => {
        try {
            logger.info(extension, 'Creating user', newUser)

            const res = await axios.post(baseUrl, newUser)

            logger.info(extension, 'User created', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    getById: async (id) => {
        try {
            logger.info(extension, 'Fetching user', id)

            const res = await axios.get(baseUrl + id)

            logger.info(extension, 'User fetched', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    getByName: async (name) => {
        try {
            logger.info(extension, 'Fetching user', name)

            const res = await axios.get(baseUrl + 'name/' + name)

            logger.info(extension, 'User fetched', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    remove: async (id) => {
        try {
            logger.info(extension, 'Deleting user', id)

            const res = await axios.delete(baseUrl + id)

            logger.info(extension, 'User deleted', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
    update: async (id, newUser) => {
        try {
            logger.info(extension, 'Updating user', id, newUser)

            const res = await axios.put(`${baseUrl}${id}`, newUser)

            logger.info(extension, 'User updated', res)

            return res.data
        } catch (err) {
            logger.error(extension, err)
            throw err
        }
    },
}