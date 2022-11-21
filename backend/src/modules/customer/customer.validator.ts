import { Validator } from 'medusa-extender'
import { IsString, IsOptional, IsObject } from 'class-validator'
import { StorePostCustomersReq } from '@medusajs/medusa/dist/api/routes/store/customers'

@Validator({ override: StorePostCustomersReq })
export class PostPostCustomersValidator extends StorePostCustomersReq {
    @IsOptional()
    @IsObject()
    metadata?: Record<string, unknown>
}
