import cors from 'cors'
import { Router } from 'express'
import bodyParser from 'body-parser'
import socialRoutes from './social-login'
import fileRoutes from './file'
import { projectConfig } from '../../../../medusa-config'

const route = Router()

export default (app, container, config) => {
    app.use('/store', bodyParser.json(), route)

    const storeCors = projectConfig.store_cors || ''
    route.use(
        cors({
            origin: storeCors.split(','),
            credentials: true,
        }),
    )

    socialRoutes(route)
    fileRoutes(route)
}
