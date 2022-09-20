import { ProductService as MedusaProductService } from '@medusajs/medusa/dist/services'
import {
    Service,
    OnMedusaEntityEvent,
    MedusaEventHandlerParams,
    EntityEventType,
} from 'medusa-extender'
import { EntityManager } from 'typeorm'
import { Product } from '@medusajs/medusa/dist/models'
import { ProductCollectionRelationService } from '../product-collection-relation/product-collection-relation.service'
// import ProductSubscriber from './product.subscriber'

@Service()
export class ProductService extends MedusaProductService {
    static resolutionKey = 'productService'

    private readonly manager: EntityManager
    private readonly productCollectionRelationService: ProductCollectionRelationService

    constructor({
        productCollectionRelationService,
        manager,
        productOptionRepository,
        productRepository,
        productVariantRepository,
        eventBusService,
        productVariantService,
        productTypeRepository,
        productTagRepository,
        imageRepository,
        searchService,
        featureFlagRouter,
    }) {
        super({
            manager,
            productOptionRepository,
            productRepository,
            productVariantRepository,
            eventBusService,
            productVariantService,
            productTypeRepository,
            productTagRepository,
            imageRepository,
            searchService,
            featureFlagRouter,
        })
        this.productCollectionRelationService = productCollectionRelationService
        // this.manager = manager
        // ProductSubscriber.attachTo(container.manager.connection)
    }

    // @OnMedusaEntityEvent.Before.Insert(Product, { async: true })
    // public async attachStoreToProduct(
    //     params: MedusaEventHandlerParams<Product, 'Insert'>,
    // ): Promise<EntityEventType<Product, 'Insert'>> {
    //     const { event } = params
    //     console.info('event.entity', event.entity)
    //     if (event.entity.collection_id) {
    //         this.productCollectionRelationService.create()
    //     }
    //     return event
    // }
}
