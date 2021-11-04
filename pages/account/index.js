
import {Grid} from '@mui/material'
import PrimarySearchAppBar from '../../components/AppBar'
export default function AccountPage(props)
{
    return (
        <div>
        <PrimarySearchAppBar name='user'/>
        <Grid container>
            <Grid item>
             <p>upload video</p>
             <input type='file'/>
            </Grid>
        </Grid>
        </div>

        
    )
}