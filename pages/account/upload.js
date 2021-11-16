import {CardHeader, Grid} from '@mui/material'
import React from 'react'
import AWS from 'aws-sdk'
import {Card} from '@mui/material'
import { CardMedia } from '@mui/material'
import { CardActions } from '@mui/material'
import { Button } from '@mui/material'
import {BottomNavigation} from '@mui/material'
import {BottomNavigationAction} from '@mui/material'
import { useRouter } from 'next/router'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

const S3_BUCKET = process.env.AWS_BUCKET_NAME
const REGION = process.env.AWS_BUCKET_REGION
AWS.config.update({
    accessKeyId: 'AKIAZY7Q4E4UIE5OJR5O' ,
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: {Bucket:'vidcharm-bucket-1'},
    region: 'us-west-1',
})
export default function AccountPage(props)
{
    const [video, setVideo] = React.useState();
    const [poster, setPoster] = React.useState();
    const [posterProgress , setPosterProgress] = React.useState(0);
    const [videoProgress , setVideoProgress] = React.useState(0);
    const [navigationValue, setNavigationValue] = React.useState('upload');
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');


    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    const updateVideo = (event) =>
    {
        console.log(event.target.files[0].type)
        if(event.target.files[0].type.split('/')[0] ==='video')
        {
            setVideo(event.target.files[0])
        }
    }

    const updatePoster = (event) =>
    {
        console.log(event.target.files[0].type)
        if(event.target.files[0].type.split('/')[0] ==='image')
        {
            setPoster(event.target.files[0])
        }
    }
    
    const uploadFiles = (file, name, stateUpdater) => 
    {
        const params = 
        {
            Body: file,
            Bucket: 'vidcharm-bucket-1',
            Key: name
        }


        myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            stateUpdater(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err) => {
            if (err) console.log(err)
        })
    }

    const handleTitleUpdate = (event) =>
    {
        setTitle(event.target.value);
    }
    return (
        
        <div>

        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
        >
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" value={videoProgress} />
                <Box
                    sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}
                >
                    <Typography variant="caption" component="div" color="text.secondary">
                    {`${videoProgress}%`}
                    </Typography>
                </Box>
            </Box>
        </Backdrop>

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
        <Grid container spacing={4} alignItems='center' justifyContent='center' 
        style={{marginTop:'10px'}}>
            
            <Grid item xs ={5}>
                {/** This is the area where the thumbnail will be previewed */}
                <Card
                >
                    <CardHeader title='Video'/>
                    <CardMedia
                    component='video'
                    height='250px'
                    src={video? URL.createObjectURL(video): ''}
                    controls
                    style={{objectFit:'contain', maxHeight:'350px'}}
                    >
                
                    </CardMedia>
                    <CardActions>
                        <input type='file' onChange={updateVideo} style={{color:'white'}}/>
                    </CardActions>
                </Card>
 
            </Grid>
            <Grid item xs={5} >
                <Card>
                    <CardHeader title='Thumbnail'/>
                    <CardMedia
                    component='img'
                    height='auto'                    
                    src={poster? URL.createObjectURL(poster): ''}
                    style={{objectFit:'contain', maxHeight:'350px'}}>
                        
                    </CardMedia>
                    <CardActions>
                        <input type='file' onChange={updatePoster} style={{color:'white'}}/>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={10}>
                <Grid 
                container 
                direction='column' 
                alignItems='stretch' 
                spacing={2}>
                    <Grid item xs={12}>
                        <Typography>Video Title</Typography>
                        <TextField style={{width:'100%'}} value={title} onChange ={handleTitleUpdate}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Description</Typography>
                        <TextField
                        multiline
                        fullWidth
                        rows={5}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={10} justifyContent='flex-end'>
                <Button 
                style={{color:'black', borderColor:'black'}}
                variant='outlined'
                type='submit'
                onClick = {() => {uploadFiles(video, `jonathan/${title}`, setVideoProgress);uploadFiles(poster, `jonathan/${title}-poster`, setPosterProgress); setOpen(true);}}
                disabled={poster? false:true}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>

        </div>

        
    )
}