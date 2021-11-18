import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function Vid(props)
{
      return (
            <div className="card mx-5 mt-3" style={{width: '20rem'}}>
                  <img className="card-image-top" src={props.image} alt={props.title} />
                  <div className="card-body">
                        <h5 className="card-title">
                              <a className="stretched-link" href={props.url}>
                                    <a> {props.title} </a> 
                              </a>
                              <p className="card-text">Channel: {props.channel}</p>
                        </h5>
                  </div>
            </div>
    );
}
  