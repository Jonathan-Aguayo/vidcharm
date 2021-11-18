import React from 'react';
import Vid from './Vid'
import { Box, Heading, SimpleGrid } from "@chakra-ui/layout";

export default function VidLlist(props)
{
        return(
            // <div className="container">
            <Box width="100%" mx="auto" my={4}>
                <SimpleGrid columns={[1,2,3]} spacing={6}>
                    {props.list.map(item => (
                        <Vid title={item.title} url='watch/{item.vidUrl}' image={item.posterUrl} channel={item.author.email} author={item.author}></Vid>
                    ))}
                </SimpleGrid>
            </Box>
                // <div className="row">
                //     {props.list.map(item => (
                //         <Vid title={item.title} url='watch/{item.vidUrl}' image={item.posterUrl} channel={item.author.email}></Vid>
                //     ))}
                // </div>
            // </div>  
        );
}