
import {Grid} from '@mui/material'
import React from 'react'
import PrimarySearchAppBar from '../../components/AppBar'
import {UploadForm} from '../../components/UploadForm'
import {Card} from '@mui/material'
import { CardMedia } from '@mui/material'
import { CardActions } from '@mui/material'
export default function AccountPage(props)
{
    const [poster, setPoster] = React.useState();
    const updatePoster = (event) =>
    {
        console.log(event.target.files[0])
    
        setPoster(URL.createObjectURL(event.target.files[0]))
    }
    return (
        <div>
        <PrimarySearchAppBar name='user' />
        <Grid container spacing={2} alignItems='center' justifyContent='center' 
        style={{marginTop:'10px'}}>
            <Grid item xs ={4}>
                {/** This is the area where the thumbnail will be previewed */}
                <Card>
                    <CardMedia
                    component='img'
                    height='400'
                    width='auto'
                    image={poster}
                    alt='Thumbnail preview'
                    style={{objectFit:'contain'}}
                    >
                
                    </CardMedia>
                    <CardActions>
                        <input type='file' onChange={updatePoster}/>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={9}>
                <UploadForm/>
            </Grid>
        </Grid>
        </div>

        
    )
}