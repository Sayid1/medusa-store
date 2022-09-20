import { Repository as MedusaRepository, Utils } from 'medusa-extender'
import { EntityRepository } from 'typeorm'
import { ProductCollectionRepository as MedusaProductCollectionRepository } from '@medusajs/medusa/dist/repositories/product-collection'
import { ProductCollection } from './product-collection.entity'
import { ProductCollectionRelationRepository } from '../product-collection-relation/product-collection-relation.repository'

@MedusaRepository({ override: MedusaProductCollectionRepository })
@EntityRepository(ProductCollection)
export default class ProductCollectionRepository extends Utils.repositoryMixin<
    ProductCollection,
    MedusaProductCollectionRepository
>(MedusaProductCollectionRepository) {
    public async addCollection(parentId: string, ids: string[]) {
        return await this.update(ids, { parent_id: parentId })
    }

    public async delCollection(id, parentId) {
        await this.delete(id)
        if (parentId) await this.delete({ parent_id: parentId })

        const collectionId = parentId ?? id

        const relationRepo = this.manager.getCustomRepository(
            ProductCollectionRelationRepository,
        )
        relationRepo.delete({
            product_collection_id: collectionId,
        })
    }

    public async findCollectionProducts(collectionId, offset, limit, q) {
        let where = `a.id = '${collectionId}'`
        if (q) {
            where += ` AND c.title LIKE '%${q}%'`
        }
        const rawData = await this.query(`
            SELECT
                b.product_collection_id "collectionId", b.product_id "id", c.title, c.thumbnail, c.status, count(*) OVER() as count
            FROM
                product_collection as a inner join product_collection_relation as b
                on a.id = b.product_collection_id
                inner join product c on c.id = b.product_id
            WHERE ${where}
            ORDER by b.created_at
            OFFSET ${offset} LIMIT ${limit}
        `)

        return await rawData
    }
}
