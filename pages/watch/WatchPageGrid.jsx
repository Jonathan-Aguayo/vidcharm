import { Grid } from '@mui/material'
import { maxHeight } from '@mui/system'
import { useRouter } from 'next/router'
import React from 'react'
//import commentBox from'./.../components/commentBox.tsx'

import { PrismaClient, Comment, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export async function getServerSideProps() {
  const comment = await prisma.Comment.findUnique({
	where: {
		comId: 1,
	}
});
  return {
   props: comment
    }
  };
async function saveContact(contact){
	const response = await fetch('/api/getComment/comment', {
		method: 'Post',
		body: JSON.stringify(contact)
	});
	if(!response.ok){
		throw new Error(response.StatusText);
	}
	return await response.json();
}
export default function WatchPageGrid(props) {
      const recommendationCSS ={
            display:"grid",
            gridTemplateColumns: "30% 30% 30% 30% 30% 30% 30%" , 
            marginTop : "10px",
            marginLeft : "50px",
            margineRight : "50px",
            //margin: "15% auto",
            //background: "gray",
            overflow: "auto",

      }
      const recommendationcontainer={
            display:"block",
            margin: "10 px",
            padding: "10px",

      }
      const recVideos = {
            maxWidth:"100px",
            maxHeight:"90px",
            height: "75px",
      }
      const vid ={
            margin:"auto",
            display:"block",
            maxWidth: "100%",
            maxHeight: "100%",
      }

      const router = useRouter() 
    //Video will just be whatever string is after the /watch in the url
    const {video} = router.query
    //Initialize the urls to empty string to avoid errors
    const [state, setState] = React.useState({url: ''})

    //use effect will only run when the value of video changes
    React.useEffect( () => 
    {
      //Upon first render, video will be null but it will eventuall be equal to the string after/watch/
      if(!video)
        return
      getObject()        
    },[video]);

    //Function to attempt to retrieve the object from s3 bucket through our rest api
    function getObject()
    {
      //Fetch is the library I used to make api calls to our backend
      fetch(`/api/getVideo/${video}`).then(res =>
      {
        if(res.ok)
        {
          res.json().then(data =>
          {
            setState({url: data.videourl})
          })
        }
      })
    }
    
    return(
<>
<title> VidCharm Watch Page</title>
      <Grid container spacing={2} style={{}}>
      <Grid container direction={'row'} item xs={10} style={{}}>
      <video width='100%' height='550' autoPlay controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg' style={{marginTop:'10px'}} key={state.url}> 
                  <source src= {state.url}/>
                 </video>
                 
</Grid>
<Grid item xs={2} style={{}}>
      <h1> Comments </h1>
      <Grid container style={{}}>
                        <Grid item xs={12} style={{ "border-bottom": '1px solid gray'}}>
 <h1> 



 </h1>
</Grid>
                        <Grid item xs={12} style={{ "border-bottom":'1px solid gray' }} 
	onSubmit={async (data, e) => {
	try {
		await saveContact(data);
		setContacts([...contacts.data]);
		e.target.reset();
		} catch(err){
			console.log(err);
		}
	}}>
      <textarea rows={'5'} className='mb-4 border-b-2' id='name' name='name' type='text' autoComplete='name' style={{height:'400 px'}}  textarea />

<button type='submit' style={{marginLeft: '20px'}}>Comment</button>
</Grid>
                        <Grid item xs={12} style={{ "border-bottom": '1px solid gray'}}>
comment: <span> {props.comment.body}</span>
{/* 
     {comments.map((c, i: number) => (
            <div className="mb-3" key={i}>
              <commentBox contact={c} />
            </div>
          ))}
*/}
</Grid>
</Grid>

</Grid>

<Grid item xs={10} style={{ }}>
  <h1>Recommendations</h1>
</Grid>

<Grid container spacing={2} style={{}}>
      <div class="recommendationCSS" style={recommendationCSS}>
                  <div class= "recommendationcontainer"style={recommendationcontainer}>
                  <div class = "recVideos" style={{recVideos}}>
                  <video style={{recVideos}} width='100%' height='275' controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/WIN_20210929_11_19_32_Pro (2).jpg' style={{ vid}}key={state.url}> 
                  <source src= {state.url}/>    </video>
                        </div>
                  </div>
                  <div class= "recommendationcontainer"style={recommendationcontainer}>
                  <div class = "recVideos" style={{recVideos}}>
                  <video width='100%' height='275' controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg' key={state.url}> 
                  <source src= {state.url}/>    </video>
                        </div>
                  </div>
                  <div class= "recommendationcontainer"style={recommendationcontainer}>
                  <div class = "recVideos">
                  <video width='100%' height='275' controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/WIN_20210929_11_19_32_Pro (2).jpg'  key={state.url}> 
                  <source src= {state.url}/>    </video>
                        </div>
                  </div>
                  <div class= "recommendationcontainer"style={recommendationcontainer}>
                  <div class = "recVideos">
                  <video width='100%' height='275' controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg'  key={state.url}> 
                  <source src= {state.url}/>    </video>
                        </div>
                  </div>
                  <div class= "recommendationcontainer"style={recommendationcontainer}>
                  <div class = "recVideos">
                  <video width='100%' height='275' controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/WIN_20210929_11_19_32_Pro (2).jpg' key={state.url}> 
                  <source src= {state.url}/>    </video>
                        </div>
                  </div>
                  <div class= "recommendationcontainer"style={recommendationcontainer}>
                  <div class = "recVideos">
                  <video width='100%' height='275' controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg'  key={state.url}> 
                  <source src= {state.url}/>    </video>
                        </div>
                  </div>


      </div>

</Grid>

</Grid>
</>
    );
  }

  