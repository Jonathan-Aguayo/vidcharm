import React from 'react';
import { Grid } from '@mui/material'
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import  {Paper} from '@mui/material'

export function UploadForm(props)
{

    return (
        <Grid container direction='column' 
        justifyContent='flex-end' 
        alignItems='stretch' 
        spacing={3}>
            <Grid item xs={12}>
                <Typography>Video Title</Typography>
                <TextField></TextField>
            </Grid>
            <Grid item xs={12}>
                <Typography>Description</Typography>
                <TextField
                multiline
                rows={5}/>
            </Grid>
        </Grid>
    )
}