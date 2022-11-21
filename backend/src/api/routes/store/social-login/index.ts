import { Router } from 'express'
import { IsEmail, IsOptional, IsString, IsObject } from 'class-validator'
import { CustomerService, AuthService } from '@medusajs/medusa/dist/services'
import { Customer } from '@medusajs/medusa/dist/models'
import { validator } from '@medusajs/medusa/dist/utils/validator'
import {
    defaultStoreCustomersRelations,
    defaultStoreCustomersFields,
} from '@medusajs/medusa/dist/api/routes/store/customers'
import { EntityManager } from 'typeorm'
import jwt from 'jsonwebtoken'

const route = Router()

export default app => {
    app.use('/social-login', route)

    route.post('/', async (req, res) => {
        console.log(req.body)

        const validated = await validator(StorePostCustomersReq, {
            ...req.body,
            password: '421088202203120422',
        })
        const customerService: CustomerService =
            req.scope.resolve('customerService')

        const manager: EntityManager = req.scope.resolve('manager')

        try {
            const existsCustomer = await customerService.retrieveByEmail(
                validated.email,
                {
                    select: ['has_account'],
                },
            )

            const authService: AuthService = req.scope.resolve('authService')
            const result = await manager.transaction(
                async transactionManager => {
                    return await authService
                        .withTransaction(transactionManager)
                        .authenticateCustomer(
                            validated.email,
                            validated.password,
                        )
                },
            )

            const customer = await login(
                req,
                customerService,
                result.customer,
                ['orders', 'orders.items'],
            )

            res.status(200).json({ exists: existsCustomer.has_account })
        } catch (err) {
            let customer: Customer = await manager.transaction(
                async transactionManager => {
                    return await customerService
                        .withTransaction(transactionManager)
                        .create(validated)
                },
            )
            customer = await login(
                req,
                customerService,
                customer,
                defaultStoreCustomersRelations,
            )
            // // Add JWT to cookie
            // const {
            //     projectConfig: { jwt_secret },
            // } = req.scope.resolve('configModule')
            // req.session.jwt = jwt.sign(
            //     { customer_id: customer.id },
            //     jwt_secret!,
            //     {
            //         expiresIn: '30d',
            //     },
            // )

            // customer = await customerService.retrieve(customer.id, {
            //     relations: defaultStoreCustomersRelations,
            //     select: defaultStoreCustomersFields,
            // })

            res.status(200).json({ customer })
        }
    })

    return app
}

const login = async (req, customerService, customer, relations) => {
    // Add JWT to cookie
    const {
        projectConfig: { jwt_secret },
    } = req.scope.resolve('configModule')
    req.session.jwt = jwt.sign({ customer_id: customer.id }, jwt_secret!, {
        expiresIn: '30d',
    })

    const loginCustomer = await customerService.retrieve(customer.id, {
        relations,
        select: defaultStoreCustomersFields,
    })

    return loginCustomer
}

export class StorePostCustomersReq {
    @IsString()
    first_name: string

    @IsString()
    last_name: string

    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    phone?: string

    @IsString()
    password: string

    @IsOptional()
    @IsObject()
    metadata?: Record<string, unknown>
}
