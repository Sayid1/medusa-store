import { MedusaAuthenticatedRequest, Router } from 'medusa-extender'
import { EntityManager } from 'typeorm'
import { Response } from 'express'
import { User } from '@medusajs/medusa/dist'
import wrapHandler from '@medusajs/medusa/dist/api/middlewares/await-middleware'
import { ProductCollectionRelationService } from './product-collection-relation.service'

const add = async (req, res) => {
    const { productId, collectionId } = req.body

    const productCollectionRelationService: ProductCollectionRelationService =
        req.scope.resolve('productCollectionRelationService')

    const created = await productCollectionRelationService.add(
        productId,
        collectionId,
    )
    res.status(200).json({ created })
}

const create = async (req, res) => {
    const { productIds, collectionId } = req.body

    const productCollectionRelationService: ProductCollectionRelationService =
        req.scope.resolve('productCollectionRelationService')

    const created = await productCollectionRelationService.create(
        productIds,
        collectionId,
    )
    res.status(200).json({ created })
}

const remove = async (req, res) => {
    const { productId, collectionId } = req.body

    const productCollectionRelationService: ProductCollectionRelationService =
        req.scope.resolve('productCollectionRelationService')

    const created = await productCollectionRelationService.remove(
        productId,
        collectionId,
    )
    res.status(200).json({ created })
}

@Router({
    routes: [
        {
            requiredAuth: true,
            path: '/admin/product-collection-relation/extender',
            method: 'post',
            handlers: [wrapHandler(create)],
        },
        {
            requiredAuth: true,
            path: '/admin/product-collection-relation/extender/add',
            method: 'post',
            handlers: [wrapHandler(add)],
        },
        {
            requiredAuth: true,
            path: '/admin/product-collection-relation/extender',
            method: 'delete',
            handlers: [wrapHandler(remove)],
        },
    ],
})
export class ProductCollectionRelationRouter {}
