import OSS from 'ali-oss'
import { Router } from 'express'
import cors from 'cors'
import multer from 'multer'
import { projectConfig } from '../../../medusa-config'
import { upload } from './file'

let oss = new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: 'oss-cn-shenzhen',
    // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
    accessKeyId: 'LTAI5t5yQGhoH8k1UV9MEx31',
    accessKeySecret: 'XP94DiVzgN6Au1PsTqhDpEnZNvIGcy',
    bucket: 'medusa-server',
})

const route = Router()

const up = multer({
    storage: {
        _handleFile(req, file, cb) {
            // console.log('req', req)
            console.log('file', file)
            oss.putStream(file.originalname, file.stream).then(result => {
                // console.log('result', result)
                const { url } = result
                cb(null, {
                    url,
                })
            })
        },
        _removeFile(req, file, cb) {
            oss.delete(file.filename).then(result => {
                console.log(result)
                cb(result)
            })
        },
    },
})

export default app => {
    app.use('/admin', route)

    route.use(
        cors({
            origin: projectConfig.admin_cors.split(','),
            credentials: true,
        }),
    )

    route.post('/upload', up.array('files'), upload)

    return app
}
