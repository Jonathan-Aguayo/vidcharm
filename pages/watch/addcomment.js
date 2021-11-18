import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSession } from 'next-auth/client';
import Avatar from '@mui/material/Avatar'


export default function InputWithIcon() {

const [session,loading] = useSession()
const[ comment,setComment] = React.useState()
function handleCommentChange(event){
    setComment(event.target.value)
}
console.log(comment)
  return (
    


      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Avatar alt={session?.user?.name} src={session?.user?.image} />
        <TextField id="input-with-sx" label={session?.user?.name} variant="outlined" 
        multiline rows={3} 
        value={comment} onchange = {handleCommentChange}/>
        
      </Box>
  );
}