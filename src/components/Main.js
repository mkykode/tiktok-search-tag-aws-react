/** @jsx jsx */
import React from 'react';
import Form from './Form';
import { jsx } from 'theme-ui';
export default function Main() {
  return (
    <main
      sx={{
        maxWidth: '80vw',
        margin: '2rem auto'
      }}
    >
      <h1>Search Tik Tok Videos</h1>
      <Form />
    </main>
  );
}
