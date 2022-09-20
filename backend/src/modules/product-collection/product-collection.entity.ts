import { Column, Entity, TreeParent, TreeChildren, Tree } from 'typeorm'
import { ProductCollection as MedusaProductCollection } from '@medusajs/medusa/dist'
import { Entity as MedusaEntity } from 'medusa-extender'

@MedusaEntity({ override: ProductCollection })
@Entity()
export class ProductCollection extends MedusaProductCollection {
    @Column()
    parent_id: string

    @Column()
    thumbnail: string
}
