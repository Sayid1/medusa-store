import { Request, Response } from 'express'

type Req = Request & { files: string[] }

export const upload = (req: Req, res: Response) => {
    res.json({
        uploads: req.files,
    })
}
