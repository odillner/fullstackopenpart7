/* used as a central module for all logging */
export default {
    info: (...params) => {
        if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') {
            console.log(...params)
        }
    },

    error: (...params) => {
        if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') {
            console.error(...params)
        }
    }
}
