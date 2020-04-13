/** @jsx jsx */
import React, { useState, useEffect, Fragment } from 'react';
import { API } from 'aws-amplify';
import { jsx, Box, Flex, Input, Button, Label } from 'theme-ui';
import Video from './Video';
export default function Videos() {
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState('');
  const [search, setSearch] = useState(undefined);
  const [loadingText, setLoadingText] = useState('Loading...');

  useEffect(() => {
    async function getTrending() {
      try {
        const {
          error,
          videosUrls: { collector },
        } = await API.get('tiktok', '/trending');
        setTrending(collector);
        setError(error);
        setHeading('trending');
      } catch (error) {
        setError(error);
      }
      //   console.log(data);
    }
    getTrending();
  }, []);

  function onInputChange(e) {
    const value = e.target.value;
    const sanitizedSearch = value.replace(/[^a-zA-Z0-9]/g, '');
    setSearch(sanitizedSearch);
  }

  async function getSearch() {
    setTrending([]);
    setHeading('');
    try {
      const {
        error,
        videosUrls: { collector },
      } = await API.get('searchfunction', `/search/${search}`);
      setTrending(collector);
      setError(error);
      setHeading(`#${search}`);
      if (collector.length <= 2) {
        setLoadingText('Sorry, no videos match this search tag.');
      }
    } catch (error) {
      setError(error);
    }
  }

  if (error !== null) {
    return <Box>There is an issue getting trending videos. Error:{error}</Box>;
  }

  return (
    <Fragment>
      <Flex sx={{ mb: 4, flexWrap: 'wrap' }}>
        <Label
          sx={{
            flex: '1 1 100%',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: '.75rem',
            paddingBottom: '.125em',
            color: 'tertiary',
          }}
          htmlFor="search"
        >
          Input Tag
        </Label>
        <Input
          id="search"
          name="search"
          onChange={onInputChange}
          onKeyDown={(e) => {
            if (e.keyCode === 13) getSearch();
          }}
          sx={{ borderRadius: 0, flex: '1 1 80%' }}
        />
        <Button
          sx={{
            width: '100%',
            borderRadius: 0,
            flex: '1 1 20%',
          }}
          onClick={getSearch}
        >
          Go
        </Button>
      </Flex>
      <h2 sx={{ textAlign: 'left' }} className="list__heading">
        {heading}
      </h2>
      <Flex
        sx={{
          flexWrap: 'wrap',
        }}
      >
        {trending.length > 2 ? (
          trending.map((video) => {
            return <Video key={video.id} video={video} />;
          })
        ) : (
          <p>{loadingText}</p>
        )}
      </Flex>
    </Fragment>
  );
}
