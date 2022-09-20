import { Router } from 'medusa-extender'
import { Request, Response } from 'express'
import wrapHandler from '@medusajs/medusa/dist/api/middlewares/await-middleware'
import { ProductCollectionService } from './product-collection.service'

const getAllProductCollection = async (req: Request, res: Response) => {
    const productCollectionService: ProductCollectionService =
        req.scope.resolve('productCollectionService')
    const collections = await productCollectionService.all(req.query)

    res.status(200).json(collections)
}

const getAllProductCollectionChildren = async (req: Request, res: Response) => {
    const productCollectionService: ProductCollectionService =
        req.scope.resolve('productCollectionService')
    const collections = await productCollectionService.allChildren(req.query)

    res.status(200).json(collections)
}

const getAllProductById = async (req: Request, res: Response) => {
    const { id } = req.params
    const productCollectionService: ProductCollectionService =
        req.scope.resolve('productCollectionService')
    const products = await productCollectionService.allProductsById(id)
    res.status(200).json({ products })
}

const addCollection = async (req: Request, res: Response) => {
    const productCollectionService: ProductCollectionService =
        req.scope.resolve('productCollectionService')
    const { id: parentId } = req.params
    const ids = req.body
    const collections = await productCollectionService.addCollection(
        parentId,
        ids,
    )
    res.status(200).json(collections)
}

const delCollection = async (req: Request, res: Response) => {
    const { id, parentId } = req.params

    const productCollectionService: ProductCollectionService =
        req.scope.resolve('productCollectionService')
    await productCollectionService.delCollection(id, parentId)

    res.status(200).json({})
}

const getCollectionProducts = async (req: Request, res: Response) => {
    const { collectionId, offset, limit, q } = req.query

    const productCollectionService: ProductCollectionService =
        req.scope.resolve('productCollectionService')
    const products = await productCollectionService.findCollectionProducts(
        collectionId,
        offset,
        limit,
        q,
    )

    let count = 0
    // findCollectionProducts(id)
    if (products.length > 0) {
        count = Number(products[0].count)
    }

    res.status(200).json({
        products,
        offset: Number(offset),
        limit: Number(limit),
        count,
    })
}

@Router({
    routes: [
        {
            // 添加子分类
            requiredAuth: true,
            path: '/admin/collections/extender/add-children/:id',
            method: 'post',
            handlers: [wrapHandler(addCollection)],
        },
        {
            // 删除分类或者子分类
            requiredAuth: true,
            path: '/admin/collections/extender/:id/:parentId?',
            method: 'delete',
            handlers: [wrapHandler(delCollection)],
        },
        {
            // 查询所有分类 用于新建分类时唯一标识判断
            requiredAuth: true,
            path: '/admin/collections/extender/all',
            method: 'get',
            handlers: [wrapHandler(getAllProductCollection)],
        },
        {
            // 查询所有子分类 用于新建产品时关联分类
            requiredAuth: true,
            path: '/admin/collections/extender/all-children',
            method: 'get',
            handlers: [wrapHandler(getAllProductCollectionChildren)],
        },
        {
            // 分页查询分类下的产品
            requiredAuth: true,
            path: '/admin/collections/extender/products',
            method: 'get',
            handlers: [wrapHandler(getCollectionProducts)],
        },
        {
            // 查询分类下的所有产品
            requiredAuth: true,
            path: '/admin/collections/extender/products/all/:id',
            method: 'get',
            handlers: [wrapHandler(getAllProductById)],
        },

        {
            // 分页查询分类下的产品
            requiredAuth: false,
            path: '/store/collections/extender/products',
            method: 'get',
            handlers: [wrapHandler(getCollectionProducts)],
        },
    ],
})
export class ProductCollectionRouter {}
