//This handles getting the object from aws s3 if the object exists, if it does not exist, it responds with 404 error
import fetch from 'node-fetch'
export default (req, res) => {
    //Use fetch to attempt to retrieve the resource
    fetch(`https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/${req.query.videoName}`).then(data => 
    {
        //If aws has the resource, it will respond with the resource url and have status 200 (OK)
        if(data.status === 200)
        {
            res.status(200).json({videourl: data.url})
        }
        else
        {
            res.status(404).json({error:'Resource does not exist'})
        }
    })
}