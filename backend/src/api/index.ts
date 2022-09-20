import { Router } from 'express'
import cors from 'cors'
// import routes from './routes'
import { projectConfig } from '../../medusa-config'
import fileRoute from './routes/file'
import productcollectionrelationRoute from './product-collection-relation'

export default (_, config) => {
    const app = Router()
    const router = Router()

    const adminCors = config.admin_cors || ''
    app.use(
        cors({
            origin: projectConfig.admin_cors.split(','),
            credentials: true,
        }),
    )

    app.use('/admin', router)
    fileRoute(router)
    // productcollectionrelationRoute(router)
    // router.post()
    // router.post('/product-collection-relation', (req, res) => {
    //     console.log(req.body)
    //     res.status(200).json({})
    // })

    return app
}
