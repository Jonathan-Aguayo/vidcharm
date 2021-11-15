import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();
export default (req, res) =>
{
    prisma.user.findFirst({
        where: {
            email:'Jonathanaguayoalpha@gmail.com'
        }
    }).then(c => 
        {
            res.json({message: c})
        })

}