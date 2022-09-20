import express from 'express'
import config from '../medusa-config'
import { Medusa } from 'medusa-extender'
import { resolve } from 'path'
import { ProductModule } from './modules/product/product.module'
import { ProductCollectionModule } from './modules/product-collection/product-collection.module'
import { ProductCollectionRelationModule } from './modules/product-collection-relation/product-collection-relation.module'

async function bootstrap() {
    const expressInstance = express()

    await new Medusa(resolve(__dirname, '..'), expressInstance).load([
        // ProductModule,
        ProductCollectionModule,
        ProductCollectionRelationModule,
    ])

    const port = 9000
    expressInstance.listen(port, () => {
        console.info('Server successfully started on port ' + port)
    })
}

bootstrap()
