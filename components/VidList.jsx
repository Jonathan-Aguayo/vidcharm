import React from 'react';
import Vid from './Vid'
import { Box, SimpleGrid } from "@chakra-ui/layout";
export default function VidLlist(props)
{
    function URLify(string) 
    {
        return string.trim().replace(/\s/g, '%20');
    }
    return(
        <Box width="100%" mx="auto" my={4}>
            <SimpleGrid columns={[1,2,3]} spacing={6}>
                {props.list.map(item => (
                    <Vid title={item.title} url={`/watch?video=${URLify(item.title)}&channel=${item.author.id}`} image={item.posterUrl} channel={item.author.email} author={item.author}></Vid>
                ))}
            </SimpleGrid>
        </Box> 
    );
}