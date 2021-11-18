import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'
export default function Vid(props)
{
      return (
            <div className="card mx-5 mt-3" style={{width: '20rem'}}>
                  <img className="card-image-top" src={props.image} alt={props.title} width={320} height={180} />
                  <div className="card-body row">
                        <Avatar className="col-auto" colSpan={1} style={{marginLeft:"5px"}} alt={props.author.name} src={props.author.image}></Avatar>
                        <h5 className="card-title col-sm">
                              <Link className="stretched-link" href={props.url}>
                                    <a> {props.title} </a> 
                              </Link>
                        </h5>
                        <p className="card-text">{props.channel}</p>
                  </div>
            </div>
    );
}
  