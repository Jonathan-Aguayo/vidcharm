import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();
export default (req, res) =>
{
    prisma.user.count().then(c => 
        {
            res.json({message: c})
        })

}