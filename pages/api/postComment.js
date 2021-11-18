import nextConnect from 'next-connect';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const apiRoute =  nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post((req,res)=>
{
    const comment = req.body.comment
    const videoId = req.body.videoId
    const email = req.body.email
    prisma.comment.create({
        data:{
            body:comment,
            dislike:0,
            like:0,
            author:{connect:{email:email}},
            source:{connect:{vId:videoId}},
        }
        , include:{author:true}
    })
    .then(newComment=>
    {
        res.json(newComment)
    })
    .catch(err=>
    {
        res.json({Error:err})
    })
    
})

export default apiRoute;