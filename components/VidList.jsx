import React from 'react';
import Vid from './Vid'

export default function VidLlist(props)
{
        return(
            <div className='container'>
                <div className="row">
                    {props.list.map(item => (
                        <Vid title={item.title} url={item.url} image={item.image} channel={item.channel}></Vid>
                    ))}
                </div>
            </div>  
        );
}