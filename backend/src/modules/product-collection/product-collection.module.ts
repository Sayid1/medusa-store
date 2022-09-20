import { Module } from 'medusa-extender'
import {
    PostProductCollectionValidator,
    GetProductCollectionValidator,
    AdminPostCollectionsCollectionReqValidator,
} from './product-collection.validator'
import { ProductCollection } from './product-collection.entity'
import ProductCollectionRepository from './product-collection.repository'
import { ProductCollectionService } from './product-collection.service'
import { ProductCollectionRouter } from './product-collection.router'
import addParentIdToProductCollection1645034402086 from './product-collection.migration'

@Module({
    imports: [
        ProductCollection,
        ProductCollectionRepository,
        ProductCollectionService,
        addParentIdToProductCollection1645034402086,
        PostProductCollectionValidator,
        GetProductCollectionValidator,
        AdminPostCollectionsCollectionReqValidator,
        ProductCollectionRouter,
        ProductCollection,
    ],
})
export class ProductCollectionModule {}
