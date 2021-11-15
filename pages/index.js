import { Grid } from '@mui/material'
import { useSession } from 'next-auth/client';
export default function Home() {

  const { data: session } = useSession()
  return ( 
    <div>
      {/*The grid container is a material UI element that helps you organize the web page and resize everything dynamically*/}
      <Grid container justifyContent='space-around'>
        {/*This container item will span the entire width of the page*/}
        <Grid item xs={10}>
          <p>Home page</p>
          <p>Link to <a href='/watch/WIN_20210128_13_20_53_Pro.mp4'>video</a></p>
        </Grid>
      </Grid>
    </div>

  )
}

    