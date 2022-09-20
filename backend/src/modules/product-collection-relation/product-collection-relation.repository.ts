import { Repository as MedusaRepository } from 'medusa-extender'
import { EntityRepository, Repository } from 'typeorm'
import { ProductCollectionRelation } from './product-collection-relation.entity'

@MedusaRepository()
@EntityRepository(ProductCollectionRelation)
export class ProductCollectionRelationRepository extends Repository<ProductCollectionRelation> {}
