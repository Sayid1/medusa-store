import { Router } from 'express'
import admin from './routes/admin'
import store from './routes/store'

export default (container, config) => {
    const app = Router()

    admin(app, container, config)
    store(app, container, config)

    return app
}
