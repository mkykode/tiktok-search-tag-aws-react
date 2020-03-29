/** @jsx jsx */
import React, { useState, useEffect, Fragment } from 'react';
import { API } from 'aws-amplify';
import { jsx, Flex, Box } from 'theme-ui';
export default function Videos() {
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState('');
  useEffect(() => {
    async function getTrending() {
      const {
        error,
        videosUrls: { collector }
      } = await API.get('tiktok', '/trending');
      //   console.log(data);
      setTrending(collector);
      setError(error);
      setHeading('trending');
    }
    getTrending();
  }, []);

  if (error !== null) {
    return <Box>There is an issue getting trending videos.</Box>;
  }
  return (
    <Fragment>
      <h2 sx={{ textAlign: 'left' }} className="list__heading">
        {heading}
      </h2>
      <Flex
        sx={{
          flexWrap: 'wrap'
        }}
      >
        {trending.length > 2 ? (
          trending.map(video => {
            return (
              <Box p={2} sx={{ wordBreak: 'break-all' }} key={video.id}>
                <video
                  controls
                  poster={video.imageUrl}
                  width="auto"
                  height="550"
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Sorry, your browser doesn't support embedded videos.
                </video>
              </Box>
            );
          })
        ) : (
          <p>Loading..</p>
        )}
      </Flex>
    </Fragment>
  );
}
