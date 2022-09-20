import { Service, OnMedusaEntityEvent } from 'medusa-extender'
import { EntityManager, Brackets, ILike, Not } from 'typeorm'

import { ProductCollectionService as MedusaProductCollectionService } from '@medusajs/medusa/dist/services'
import { ProductCollectionRepository } from '@medusajs/medusa/dist/repositories/product-collection'
import { ProductCollectionRelationRepository } from '../product-collection-relation/product-collection-relation.repository'
import { ProductCollectionRelation } from '../product-collection-relation/product-collection-relation.entity'
import { ProductCollectionRelationService } from '../product-collection-relation/product-collection-relation.service'

@Service({ override: MedusaProductCollectionService })
export class ProductCollectionService extends MedusaProductCollectionService {
    protected manage: EntityManager
    protected productCollectionRepository: ProductCollectionRepository
    protected productCollectionRelationRepository: ProductCollectionRelationRepository
    protected productCollectionRelationService: ProductCollectionRelationService

    constructor({
        manager,
        productCollectionRepository,
        productRepository,
        productCollectionRelationService,
        productCollectionRelationRepository,
        eventBusService,
    }) {
        super({
            manager,
            productCollectionRepository,
            productRepository,
            eventBusService,
        })
        this.manager = manager
        this.productCollectionRelationRepository =
            productCollectionRelationRepository
        this.productCollectionRepository = productCollectionRepository
        this.productCollectionRelationService = productCollectionRelationService
    }

    async all(query) {
        const productCollectionRepo = this.manager.getCustomRepository(
            this.productCollectionRepository,
        )
        const collection = await productCollectionRepo.find(query)
        return collection
    }

    async allChildren(query) {
        const productCollectionRepo = this.manager.getCustomRepository(
            this.productCollectionRepository,
        )
        const collection = await productCollectionRepo.find({
            where: {
                parent_id: Not('0'),
            },
        })
        return collection
    }

    async allProductsById(id) {
        return this.productCollectionRelationService.findAllByCollectionId(id)
    }

    async addCollection(parentId, ids) {
        const productCollectionRepo = this.manager.getCustomRepository(
            this.productCollectionRepository,
        )
        return await productCollectionRepo.addCollection(parentId, ids)
    }

    async delCollection(id, parentId) {
        const productCollectionRepo = this.manager.getCustomRepository(
            this.productCollectionRepository,
        )
        return await productCollectionRepo.delCollection(id, parentId)
    }

    async findCollectionProducts(collectionId, offset, limit, q) {
        const productCollectionRepo = this.manager.getCustomRepository(
            this.productCollectionRepository,
        )
        return await productCollectionRepo.findCollectionProducts(
            collectionId,
            offset,
            limit,
            q,
        )
    }

    async listAndCount(
        selector: any = {},
        config: any = { skip: 0, take: 20 },
    ) {
        const productCollectionRepo = this.manager.getCustomRepository(
            this.productCollectionRepository,
        )
        let q
        if (selector.q) {
            q = selector.q
            delete selector.q
        }
        config?.select?.push('parent_id')
        config.order = {
            created_at: 'ASC',
        }
        const query = this.buildQuery_(selector, config)
        if (q) {
            const where = query.where

            delete where.title
            delete where.handle
            delete where.created_at
            delete where.updated_at

            query.where = qb => {
                qb.where(where)

                qb.andWhere(
                    new Brackets(qb => {
                        qb.where({ title: ILike(`%${q}%`) }).orWhere({
                            handle: ILike(`%${q}%`),
                        })
                    }),
                )
            }
        }

        return await productCollectionRepo.findAndCount(query)
    }
}
