import { Column, Entity, BeforeInsert } from 'typeorm'
import { Entity as MedusaEntity } from 'medusa-extender'
import { SoftDeletableEntity } from '@medusajs/medusa'
import { generateEntityId } from '@medusajs/medusa/dist/utils'

@MedusaEntity()
@Entity()
export class ProductCollectionRelation extends SoftDeletableEntity {
    @Column()
    product_id: string

    @Column()
    product_collection_id: string

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, 'pcr')
    }
}
