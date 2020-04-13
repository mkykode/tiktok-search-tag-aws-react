/** @jsx jsx */
import React, { useRef, useState } from 'react';
import { jsx, Flex, Box, Button } from 'theme-ui';

function Video({ video }) {
  const [playing, setPlaying] = useState(false);

  const videoElement = useRef(null);

  function onPlaying(e) {
    setPlaying(true);
    // e.target.defaultPlaybackRate = 1;
    console.log('video playing');
  }
  function onPause(e) {
    setPlaying(false);
    // e.target.defaultPlaybackRate = 1;
    console.log('video not playing');
  }
  //   function onHover(e) {
  //     // console.log('hovering video, playbackRate ', e.target.playbackRate);
  //     if (playing === true) {
  //       e.target.playbackRate = 0.5;
  //     }
  //   }
  function onLeave(e) {
    // console.log('leaving video');
    if (playing === true) {
      e.target.playbackRate = 1;
    }
  }

  function playbackSpeed(event) {
    event.preventDefault();
    const currentVideo = videoElement.current;
    const speed = event.target.dataset.speed;
    currentVideo.playbackRate = Number(speed);
    currentVideo.play();

    console.log(speed);
    console.log(currentVideo);
  }
  return (
    <Box
      p={2}
      m={1}
      sx={{
        wordBreak: 'break-all',
        flex: ['1 100%', '1 50%', '1 30%'],
        maxWidth: 'calc(980px - 66%)',
        borderBottom: '1px solid black',
        borderLeft: '1px solid black',
        borderRight: '1px solid black',
        borderTop: '1px solid black',
      }}
      key={video.id}
    >
      <video
        ref={videoElement}
        controls
        poster={video.imageUrl}
        width="auto"
        height="550"
        onPlaying={onPlaying}
        onPause={onPause}
        // onMouseEnter={onHover}
        onMouseLeave={onLeave}
        sx={{
          maxWidth: '100%',
        }}
      >
        <source src={video.videoUrl} type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
      <Flex sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={playbackSpeed} mx={1} data-speed="0.25">
          0.25x
        </Button>
        <Button onClick={playbackSpeed} mx={1} data-speed="0.5">
          0.5x
        </Button>
        <Button onClick={playbackSpeed} mx={1} data-speed="1">
          1x
        </Button>
      </Flex>
    </Box>
  );
}

export default Video;
