import nextConnect from 'next-connect';
import multer from 'multer';
import { PrismaClient } from "@prisma/client"
import { getSession } from "next-auth/client"
import AWS from 'aws-sdk'


let s3bucket = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION
});

const storage = multer.memoryStorage();
const upload = multer({storage:storage});
const prisma = new PrismaClient()


const apiRoute =  nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.fields([{name: 'video'}, {name:'poster'}]))

apiRoute.post((req, res) => {
  //Files
  const session = getSession({req})
  const files = req.files
  const video = files.video[0].buffer
  const poster = files.poster[0].buffer
  const videoTitle = req.body.title
  const description = req.body.description
  const id = prisma.session.findFirst({
    select:{userId:true},
    where:{accessToken: session.accessToken}
  })
  .then(userId =>
  {
    prisma.user.findFirst({
      where:
      {
        id: userId.userId
      }
    })
    .then(userRow =>
    {
      //upload files to s3
      //only mp4 video and only jpg images

      const videoParams = 
      {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${userId.userId}/${videoTitle}.mp4`,
        Body: video,
      };
      const posterParams = 
      {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${userId.userId}/${videoTitle}-poster.jpg`,
        Body: poster,
      };
      s3bucket.upload(videoParams).promise()
      .then( videoData =>
      {
        s3bucket.upload(posterParams).promise()
        .then(posterData=>
        {
          prisma.video.create({
            data:
            {
              title: videoTitle,
              dislike: 0,
              like: 0,
              views: 0,
              vidUrl: videoData.Location,
              posterUrl: posterData.Location,
              author: {connect: {id: userRow.id}},
              description: description
            }
          }).then(() => 
          {
            res.json({message :'complete'})
          })
        })
      }) 
    })
  })
  .catch(err =>
  {
    res.json({message :'err'})
  })
  
  //add to s3 bucket. REMEMBER TO ADD MP4 AT END OF VIDEO AND JPG TO END OF POSTER
  

});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

