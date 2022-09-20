import { Module } from 'medusa-extender'
import { ProductService } from './product.service'
// import { AttachProductSubscribersMiddleware } from './product-subscriber.middleware'

@Module({
    imports: [ProductService],
})
export class ProductModule {}
