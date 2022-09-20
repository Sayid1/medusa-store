import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm'
import { eventEmitter, Utils, OnMedusaEntityEvent } from 'medusa-extender'
import { Product } from '@medusajs/medusa/dist/models'

@EventSubscriber()
export default class ProductSubscriber
    implements EntitySubscriberInterface<Product>
{
    static attachTo(connection: Connection): void {
        Utils.attachOrReplaceEntitySubscriber(connection, ProductSubscriber)
    }

    public listenTo(): typeof Product {
        return Product
    }

    public async beforeInsert(
        event: InsertEvent<Product>,
    ): Promise<InsertEvent<Product>> {
        return eventEmitter.emitAsync<InsertEvent<Product>>(
            OnMedusaEntityEvent.Before.InsertEvent(Product),
            {
                event,
                transactionalEntityManager: event.manager,
            },
        )
    }
}
