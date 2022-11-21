import { Column, Entity, BeforeInsert } from 'typeorm'
import { generateEntityId } from '@medusajs/medusa/dist/utils'
import { Entity as MedusaEntity } from 'medusa-extender'
import { BaseEntity } from '@medusajs/medusa'

@MedusaEntity()
@Entity()
export class Artwork extends BaseEntity {
    @Column({ type: 'varchar' })
    describe: string | null

    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'varchar' })
    email: string

    @Column({ type: 'varchar' })
    phone: string

    @Column({ type: 'varchar' })
    artwork_files: string

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, 'artwork')
    }
}
