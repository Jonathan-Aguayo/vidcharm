import { PrismaClient } from "@prisma/client"
import S3 from "react-aws-s3"
import multer from 'multer'
const fs = require ('fs')
const upload = multer({storage: multer.memoryStorage()})

const prisma = new PrismaClient()
const s3config = {
    bucketName: process.env.AWS_BUCKET_NAME,
    region:process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}
const ReactS3Client = new S3(s3config);
export default (req, res) => 
{
  if(req.method === 'POST')
  {
    const form = new formidable.IncomingForm();
    form.uploadDir='./';
 
    form.parse(req, (err, fields, files) => 
    {
      
      //upload video first
      ReactS3Client.uploadFile(files, fields.title).then(data =>
      {
        prisma.video.create(
        {
          data:
          {
            title: fields.title,
            views: 0,
            like: 0,
            dislike:0,
            vidUrl:data.location,
            datePosted: Date.now(),

          }
        }
      ).
      then(vid => 
        {
          res.status(200).json(vid);
        })
      })
      //then create the table
    })
  }
  else if(req.method === 'GET')
  {
    const reqEmail = req.body.email;
    prisma.user.findFirst({
      where:
      {
        email: reqEmail
      }
    }).then( user => 
    {
      prisma.video.findMany({
        where:
        {
          uId: user.id
        }
      })
      .then(videos =>
        {
          res.json(videos)
        })
    })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

