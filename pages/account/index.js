
import {CardHeader, Grid} from '@mui/material'
import React from 'react'
import PrimarySearchAppBar from '../../components/AppBar'
import {UploadForm} from '../../components/UploadForm'
import {Card} from '@mui/material'
import { CardMedia } from '@mui/material'
import { CardActions } from '@mui/material'
import { Button } from '@mui/material'
export default function AccountPage(props)
{
    const [video, setVideo] = React.useState();
    const [poster, setPoster] = React.useState();
    const updateVideo = (event) =>
    {
        console.log(event.target.files[0].type)
        if(event.target.files[0].type.split('/')[0] ==='video')
        {
            setVideo(URL.createObjectURL(event.target.files[0]))
        }
    }

    const updatePoster = (event) =>
    {
        console.log(event.target.files[0].type)
        if(event.target.files[0].type.split('/')[0] ==='image')
        {
            setPoster(URL.createObjectURL(event.target.files[0]))
        }
    }
    return (
        <div>
        <Grid container spacing={4} alignItems='center' justifyContent='center' 
        style={{marginTop:'10px'}}>
            
            <Grid item xs ={5}>
                {/** This is the area where the thumbnail will be previewed */}
                <Card
                >
                    <CardHeader title='Video'/>
                    <CardMedia
                    component='video'
                    height='auto'
                    src={video}
                    controls
                    style={{objectFit:'contain', maxHeight:'350px'}}
                    >
                
                    </CardMedia>
                    <CardActions>
                        <input type='file' onChange={updateVideo}/>
                    </CardActions>
                </Card>
 

            </Grid>
            <Grid item xs={5} >
                <Card>
                    <CardHeader title='Thumbnail'/>
                    <CardMedia
                    component='img'
                    height='auto'                    
                    src={poster}
                    style={{objectFit:'contain', maxHeight:'350px'}}>
                        
                    </CardMedia>
                    <CardActions>
                        <input type='file' onChange={updatePoster}/>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={9}>
                <UploadForm/>
            </Grid>
            <Grid container item xs={10} justifyContent='flex-end'>
                <Button 
                style={{color:'black', borderColor:'black'}}
                variant='outlined'>
                    Submit
                </Button>
            </Grid>
        </Grid>
        </div>

        
    )
}