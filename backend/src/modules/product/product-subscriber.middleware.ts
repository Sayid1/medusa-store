import { NextFunction, Response } from 'express'
import {
    MEDUSA_RESOLVER_KEYS,
    MedusaAuthenticatedRequest,
    MedusaMiddleware,
    Middleware,
} from 'medusa-extender'
import { Connection } from 'typeorm'
import ProductSubscriber from './product.subscriber'

@Middleware({
    requireAuth: true,
    routes: [{ method: 'post', path: '/admin/products/' }],
})
export class AttachProductSubscribersMiddleware implements MedusaMiddleware {
    public consume(
        req: MedusaAuthenticatedRequest,
        res: Response,
        next: NextFunction,
    ): void {
        const { connection } = req.scope.resolve(
            MEDUSA_RESOLVER_KEYS.manager,
        ) as {
            connection: Connection
        }
        ProductSubscriber.attachTo(connection)
        return next()
    }
}
