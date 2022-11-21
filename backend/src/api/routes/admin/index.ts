import cors from 'cors'
import { Router } from 'express'
import fileRoutes from './file'
import { projectConfig } from '../../../../medusa-config'

const route = Router()

export default (app, container, config) => {
    app.use('/admin', route)

    const adminCors = projectConfig.admin_cors || ''
    route.use(
        cors({
            origin: adminCors.split(','),
            credentials: true,
        }),
    )

    fileRoutes(route)
}
