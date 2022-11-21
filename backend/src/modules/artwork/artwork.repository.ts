import { Repository as MedusaRepository } from 'medusa-extender'
import { EntityRepository, Repository } from 'typeorm'
import { Artwork } from './artwork.entity'

@MedusaRepository()
@EntityRepository(Artwork)
export class ArtworkRepository extends Repository<Artwork> {}
