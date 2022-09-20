import { ProductCollection as ExtendedProductCollection } from './product-collection.entity'
import { ProductCollectionService as ExtendedProductCollectionService } from './product-collection.service'

declare module '@medusajs/medusa/dist/models/ProductCollection' {
    export declare class ProductCollection extends ExtendedProductCollection {}
}

declare module '@medusajs/medusa/dist/services/product-collection' {
    export declare class ProductCollectionService {
        all: Function
    }
}
