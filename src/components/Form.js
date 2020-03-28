/** @jsx jsx */
import { jsx, Flex, Input, Button, Label } from 'theme-ui';
import { useState, useEffect } from 'react';

export default function Form(props) {
  const [search, setSearch] = useState([]);
  const onInputSearch = e => {
    setSearch([...search, e.target.value]);
  };
  useEffect(() => {
    // call trending api
  }, []);
  return (
    <Flex sx={{ mb: 4, flexWrap: 'wrap' }}>
      <Label
        sx={{
          flex: '1 1 100%',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: '.75rem',
          paddingBottom: '.125em',
          color: 'tertiary'
        }}
        htmlFor="search"
      >
        Type a tag
      </Label>
      <Input
        id="search"
        name="search"
        {...props}
        onChange={onInputSearch}
        sx={{ borderRadius: 0, flex: '1 1 80%' }}
      />
      <Button
        sx={{
          width: '100%',
          borderRadius: 0,
          flex: '1 1 20%'
        }}
      >
        Go
      </Button>
    </Flex>
  );
}
