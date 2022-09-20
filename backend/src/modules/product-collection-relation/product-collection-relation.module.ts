import { Module } from 'medusa-extender'
import { ProductCollectionRelationRepository } from './product-collection-relation.repository'
import { ProductCollectionRelationRouter } from './product-collection-relation.router'
import { ProductCollectionRelationService } from './product-collection-relation.service'
import { ProductCollectionRelation } from './product-collection-relation.entity'

@Module({
    imports: [
        ProductCollectionRelationRepository,
        ProductCollectionRelationRouter,
        ProductCollectionRelationService,
        ProductCollectionRelation,
    ],
})
export class ProductCollectionRelationModule {}
