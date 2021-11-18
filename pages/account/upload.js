import {CardHeader, Grid} from '@mui/material'
import React from 'react'
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
import FormData from 'form-data'
import { useSession} from "next-auth/client"

export default function AccountPage(props)
{
    const [video, setVideo] = React.useState();
    const [poster, setPoster] = React.useState();
    const [navigationValue, setNavigationValue] = React.useState('upload');
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [session, loading] = useSession()

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
        if(event.target.files[0].type.split('/')[0] ==='image')
        {
            setPoster(event.target.files[0])
        }
    }
    
    const uploadFiles = () => 
    {
        setOpen(true);
        const data = new FormData(); 
        data.append('video', video);
        data.append('poster', poster);
        data.append('title', title);
        data.append('description', description)
        data.append('email', session.user.email)
        fetch('/api/videos', {
            method: 'POST',
            body: data,
        })
        .then(status =>
        {
            if(status.ok)
            {
                status.json().then(data => console.log(data))
                setOpen(false)
            }
            else
            {
                status.json().then(data => console.log(data))
            }
        })
    }

    const handleTitleUpdate = (event) =>
    {
        setTitle(event.target.value);
    }

    const handleDescriptionUpdate = (event) =>
    {
        setDescription(event.target.value);
    }

    return (
        
        <div>
        <Button onClick={handleToggle}>Show backdrop</Button>
            <Backdrop
            sx={{zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
            >
            <CircularProgress color="inherit"/>
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
                    src={video? URL.createObjectURL(video): ''}
                    controls
                    style={{objectFit:'contain', maxHeight:'350px'}}
                    >
                
                    </CardMedia>
                    <CardActions>
                        <input type='file' onChange={updateVideo} style={{color:'white'}} accept='.mp4'/>
                    </CardActions>
                </Card>
 
            </Grid>
            <Grid item xs={5} >
                <Card>
                    <CardHeader title='Thumbnail'/>
                    <CardMedia
                    component='img'                    
                    src={poster? URL.createObjectURL(poster): ''}
                    style={{objectFit:'contain', maxHeight:'350px'}}>
                        
                    </CardMedia>
                    <CardActions>
                        <input type='file' onChange={updatePoster} style={{color:'white'}} accept='.jpg'/>
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
                        rows={5}
                        value={description} 
                        onChange ={handleDescriptionUpdate}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={10} justifyContent='flex-end'>
                <Button 
                style={{color:'black', borderColor:'black'}}
                variant='outlined'
                type='submit'
                onClick = {() => {uploadFiles();setOpen(true);}}
                disabled={poster? false:true}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>

        </div>

        
    )
}