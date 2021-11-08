import { Grid } from '@mui/material'
import PrimarySearchAppBar from '../components/AppBar.jsx'
import { UploadForm } from '../components/UploadForm.jsx'

const mysql = require("mysql");

const db = mysql.createConnection({
    host: "rds-mysql-vidcharm.cww4xtjo4mzk.us-west-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "cmpe172vidcharm",
    database: "vidcharm",
});

db.connect((err) => {
    if(err){
        console.log(err.message);
        return;
    }
    console.log("database connected.");
});

export default function Home() {
  return ( 
    <div>

      <PrimarySearchAppBar name='user'/>
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
