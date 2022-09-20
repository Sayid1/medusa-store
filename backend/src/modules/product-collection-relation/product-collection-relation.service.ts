import { Service } from 'medusa-extender'
import { TransactionBaseService } from '@medusajs/medusa'
import { EntityManager, DeepPartial } from 'typeorm'
import { ProductCollectionRelation } from './product-collection-relation.entity'
import { ProductCollectionRelationRepository } from './product-collection-relation.repository'

@Service()
export class ProductCollectionRelationService extends TransactionBaseService<ProductCollectionRelationService> {
    protected manager_: EntityManager
    protected transactionManager_: EntityManager | undefined
    protected productCollectionRelationRepository: typeof ProductCollectionRelationRepository
    static resolutionKey = 'product-collection-relationService'

    constructor(
        { manager, productCollectionRelationRepository },
        private readonly config: any,
    ) {
        super(arguments[0])
        this.productCollectionRelationRepository =
            productCollectionRelationRepository
        this.manager_ = manager
    }

    async findAllByCollectionId(collectionId: string) {
        const repo = this.manager_.getCustomRepository(
            this.productCollectionRelationRepository,
        )
        const existingRelations = await repo.find({
            product_collection_id: collectionId,
        })

        return existingRelations.map(relation => ({ id: relation.product_id }))
    }

    async add(productId: string, collectionId: string) {
        await this.atomicPhase_(async (transactionManager: EntityManager) => {
            const repo = this.manager_.getCustomRepository(
                this.productCollectionRelationRepository,
            )

            repo.save(
                repo.create({
                    product_id: productId,
                    product_collection_id: collectionId,
                }),
            )
        })
    }

    async create(productIds: string[], collectionId: string) {
        await this.atomicPhase_(async (transactionManager: EntityManager) => {
            const repo = this.manager_.getCustomRepository(
                this.productCollectionRelationRepository,
            )

            await repo.delete({
                product_collection_id: collectionId,
            })

            const instances: DeepPartial<ProductCollectionRelation>[] =
                productIds.map(productId => {
                    return repo.create({
                        product_id: productId,
                        product_collection_id: collectionId,
                    })
                })

            repo.save(instances)
        })
    }

    async remove(productId: string, collectionId: string) {
        const repo = this.manager_.getCustomRepository(
            this.productCollectionRelationRepository,
        )
        await repo.delete({
            product_collection_id: collectionId,
            product_id: productId,
        })
    }
}
