/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { jsx, Flex, Box } from 'theme-ui';
export default function Videos() {
  const [trending, setTrending] = useState([]);
  console.log(trending);

  useEffect(() => {
    getTrending();
  }, []);
  async function getTrending() {
    const data = await API.get('tiktok', '/trending');
    console.log(data);
    setTrending(data.videosURLS);
  }

  return (
    <Flex
      sx={{
        flexWrap: 'wrap'
      }}
    >
      {trending.map(video => {
        return (
          <Box sx={{ wordBreak: 'break-all' }} key={video.user}>
            {JSON.stringify(video)}
            {/* <video src={video.src} controls></video> */}
          </Box>
        );
      })}
    </Flex>
  );
}
