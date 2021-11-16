{/*}import {PrismaClient} from '@prisma/client'


export default function index()
{
    return (
        <p>he</p>
    )
}
const prisma = new PrismaClient();

	export async function getStaticProps(){
	const comments = await prisma.comment.findMany();
	return {
		props: {
			initialComments: {comments}
		}
	};
}