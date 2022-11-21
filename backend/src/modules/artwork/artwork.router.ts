import { MedusaAuthenticatedRequest, Router } from 'medusa-extender'
import { ArtworkService } from './artwork.service'
import { Response, NextFunction } from 'express'
import { Artwork } from './artwork.entity'
import { v4 as uuidv4 } from 'uuid'

@Router({
    routes: [
        {
            requiredAuth: true,
            path: '/store/artwork',
            method: 'post',
            handlers: [
                async (
                    req: MedusaAuthenticatedRequest,
                    res: Response,
                    next: NextFunction,
                ): Promise<Response<Artwork>> => {
                    const artworkService = req.scope.resolve(
                        'artworkService',
                    ) as ArtworkService
                    const artwork = await artworkService.create({
                        id: uuidv4(),
                        created_at: new Date(),
                        ...req.body,
                    })
                    return res.send(artwork)
                },
            ],
        },
        {
            requiredAuth: true,
            path: '/admin/artwork',
            method: 'get',
            handlers: [
                async (
                    req: MedusaAuthenticatedRequest,
                    res: Response,
                    next: NextFunction,
                ): Promise<Response<Artwork[]>> => {
                    const artworkService = req.scope.resolve(
                        'artworkService',
                    ) as ArtworkService
                    const artworks = await artworkService.list()
                    return res.send(artworks)
                },
            ],
        },
    ],
})
export class ArtworkRouter {}
