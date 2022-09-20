import { Validator } from 'medusa-extender'

import {
    AdminPostCollectionsReq,
    AdminGetCollectionsParams,
    AdminPostCollectionsCollectionReq,
} from '@medusajs/medusa/dist/api/routes/admin/collections'

import { IsString, IsOptional, IsNumber } from 'class-validator'

@Validator({ override: AdminPostCollectionsReq })
export class PostProductCollectionValidator extends AdminPostCollectionsReq {
    @IsOptional()
    @IsString()
    parent_id: string

    @IsOptional()
    @IsString()
    thumbnail: string
}

@Validator({ override: AdminGetCollectionsParams })
export class GetProductCollectionValidator extends AdminGetCollectionsParams {
    @IsOptional()
    @IsString()
    parent_id: string

    @IsOptional()
    @IsString()
    thumbnail: string
}

@Validator({ override: AdminPostCollectionsCollectionReq })
export class AdminPostCollectionsCollectionReqValidator extends AdminPostCollectionsCollectionReq {
    @IsOptional()
    @IsString()
    parent_id: string

    @IsOptional()
    @IsString()
    thumbnail: string
}
