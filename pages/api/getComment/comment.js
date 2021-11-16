import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();
export default async (req,res) =>{
	if (req.method != 'POST'){
		return res.status(405).json({message: 'method not allowed'});
	}
	
	const commentData = JSON.parse(req.body);
	const savedComment = await prisma.contact.create({
		data:ContactData
	});
	res.json(savedContact);
	}
