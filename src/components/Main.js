/** @jsx jsx */
import React from 'react';
import Form from './Form';
import { jsx } from 'theme-ui';
import Videos from './Videos';
export default function Main() {
  return (
    <main
      sx={{
        maxWidth: '980px',
        margin: '1rem auto'
      }}
    >
      <h1>Search Tik Tok Videos</h1>
      <Form />
      <Videos />
    </main>
  );
}
