import { useRouter } from 'next/router'

export default function index()
{
    const router = useRouter();
    if(true)
    {
        router.push('/url')
    }
}