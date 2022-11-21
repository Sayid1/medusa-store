import { TransactionBaseService } from '@medusajs/medusa'
import { Service } from 'medusa-extender'
import { ArtworkRepository } from './artwork.repository'
import { EntityManager } from 'typeorm'
import { Artwork } from './artwork.entity'

type InjectedDependencies = {
    manager: EntityManager
    artworkRepository: typeof ArtworkRepository
}

@Service()
export class ArtworkService extends TransactionBaseService<ArtworkService> {
    protected manager_: EntityManager
    protected transactionManager_: EntityManager
    protected artworkRepository: typeof ArtworkRepository
    static resolutionKey = 'artworkService'

    constructor({ artworkRepository, manager }: InjectedDependencies) {
        super({ artworkRepository, manager })

        this.artworkRepository = artworkRepository
        this.manager_ = manager
    }

    async list() {
        const artworkRepository: ArtworkRepository =
            this.manager_.getCustomRepository(this.artworkRepository)
        return await artworkRepository.find()
    }

    async create(artwork: Artwork) {
        const artworkRepository: ArtworkRepository =
            this.manager_.getCustomRepository(this.artworkRepository)

        const result = await artworkRepository.save(artwork)
        return result
    }
}
