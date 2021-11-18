import React from 'react'
import {Grid} from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {BottomNavigation} from '@mui/material'
import {BottomNavigationAction} from '@mui/material'
import { useRouter } from 'next/router'
import { getSession } from "next-auth/client"
import { PrismaClient } from "@prisma/client"

export default function Videos(props)
{
    const videos = JSON.parse(props.videos);
    const [navigationValue, setNavigationValue] = React.useState('videos');
    const router = useRouter()

    return(
        <div>        
            <BottomNavigation
            showLabels
            value={navigationValue}
            onChange={(event, newValue) => {
                router.push(`/account/${navigationValue}`)
                setNavigationValue(newValue)
               ;
            }}
            >
            <BottomNavigationAction label="Videos"  value='videos'/>
            <BottomNavigationAction label="Upload" value='upload' />
            </BottomNavigation>
            <Grid container justifyContent='center' >
                {
                    videos.length > 0?
                    videos.map((vid, index) => 

                    
                        <Grid item xs={10}  m={6} lg={4} xl ={3} style={{margin:'10px'}} key={`video-${index}`}>
                            <Card>
                                <CardMedia 
                                component='video'
                                controls
                                poster={vid.posterUrl}
                                src= {vid.vidUrl}
                                style={{maxHeight:'350px'}}/>
                                <Grid container justifyContent='center'>
                                    <Grid item>
                                        <Typography variant="h4">{vid.title}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent='space-between'>
                                    <Grid container item xs={3} justifyContent='flex-end'>
                                        <Typography variant="caption text">{vid.views}</Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    
                    )
                    :
                    <p>No videos to show</p>
                }
            </Grid>
        </div>
    )
}

export async function getServerSideProps(context) {
    const {req} = context
    const prisma = new PrismaClient();
    //Need the session to get the email because thats how we are identifying the user
    const session = await getSession({req});
    const userID = await prisma.user.findFirst({
                    select:
                    {
                        id:true
                    },
                    where:
                    {
                        email:session.user.email
                    },
                })
    const videos = await prisma.video.findMany({
                    where:
                    {
                        uId: userID.id
                    }
                    })           
    return {props:{ videos: JSON.stringify(videos)}}
}
