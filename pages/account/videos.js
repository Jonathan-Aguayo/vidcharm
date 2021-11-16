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
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function Videos(props)
{
    const video = 
        {
            title: 'Jonathan is cool',
            username: 'Jonathan Aguayo',
            views: 10,
            date: Date.now(),
        }
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
            <BottomNavigationAction label="Playlists" value = 'playlists' />
            </BottomNavigation>
            <Grid container justifyContent='center' spacing={1} >
                <Grid item xs={10}  m={6} lg={4} xl ={3} style={{margin:'10px'}} >
                    <Card>
                        <CardMedia 
                        component='video'
                        controls
                        src='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/WIN_20210128_13_20_53_Pro.mp4'
                        style={{maxHeight:'350px'}}/>
                        <Grid container justifyContent='center'>
                            <Grid item xs={3}>
                                <Typography>{video.title}</Typography>
                            </Grid>
                        </Grid>
                            <Grid container justifyContent='space-between'>
                            <Grid item xs={3}>
                                <Typography>{video.username}</Typography>
                            </Grid>
                            <Grid container item xs={3} justifyContent='flex-end'>
                                <Typography>{video.views}</Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </div>


        


    )
}