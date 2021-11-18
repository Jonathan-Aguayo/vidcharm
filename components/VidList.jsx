import React from 'react';
import Vid from './Vid'

export default function VidLlist(props)
{
        return(
            <div className="container">
                <div className="row">
                    {props.list.map(item => (
                        <Vid title={item.title} url='watch/{item.vidUrl}' image={item.posterUrl} channel={item.author.email}></Vid>
                    ))}
                </div>
            </div>  
        );
}