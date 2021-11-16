import React from 'react';
import { Grid } from '@mui/material'
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';

export function UploadForm(props)
{

    return (
        <Grid 
        container 
        direction='column' 
        alignItems='stretch' 
        spacing={2}>
            <Grid item xs={12}>
                <Typography>Video Title</Typography>
                <TextField style={{width:'100%'}}/>
            </Grid>
            <Grid item xs={12}>
                <Typography>Description</Typography>
                <TextField
                multiline
                fullWidth
                rows={5}/>
            </Grid>
        </Grid>
    )
}