import React from 'react';
import Vid from './Vid'

export default function VidLlist(props)
{
    function URLify(string) 
    {
        return string.trim().replace(/\s/g, '%20');
    }

    console.log(props)
    return(
        <div className="container">
            <div className="row">
                {props.list.map(item => (
                    <Vid title={item.title} url={`/watch?video=${URLify(item.title)}&channel=${item.author.id}`} image={item.posterUrl} channel={item.author.email}></Vid>
                ))}
            </div>
        </div>  
    );
}