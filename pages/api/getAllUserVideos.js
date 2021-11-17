import nextConnect from 'next-connect';
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const apiRoute =  nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get((req, res) =>
{
    const userEmail = req.body.email;
    prisma.user.findFirst({
        select:
        {
            id:true
        },
        where:
        {
            email:userEmail
        },
    })
    .then(userID =>
    {
        prisma.video.findMany({
            where:
            {
                uId: userID.id
            }
        })
        .then( videos=>
        {
            res.json(videos)
        })
    })
    .catch(err=>
    {
        res.json({error: err})
    })
})

export default apiRoute;