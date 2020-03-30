/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import Videos from './Videos';
export default function Main() {
  return (
    <main
      sx={{
        maxWidth: '980px',
        margin: '1rem auto',
        padding: '0 1.5em'
      }}
    >
      <h1>Search Tik Tok Videos</h1>
      <Videos />
    </main>
  );
}
