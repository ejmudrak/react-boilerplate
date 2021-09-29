// JS Pragma: enables css prop: https://emotion.sh/docs/css-prop
/** @jsxImportSource @emotion/react */

import React from 'react';
import logo from './logo.svg';

import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
// or, import via:
// import { styled } from '@mui/system';

// components
import {
  Button,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@mui/material';

// api
import { useUsersQuery } from 'api/users';

function App() {
  const { data = [], isLoading: isQuerying } = useUsersQuery();

  // Styled example that use props. Using `styled` allows you to target html elements
  const ListWrapper = styled('div')((props) => ({
    border: '1px solid #ffffff80',
    borderRadius: 10,
    marginBottom: 16,
  }));

  return (
    <div css={app}>
      <header css={appHeader}>
        <img src={logo} css={appLogo} alt='logo' />

        <p css={orange}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <Grid container direction='row' justifyContent='center' spacing={2}>
          <Grid item xs={12} sm={8} md={4}>
            {isQuerying ? (
              <CircularProgress />
            ) : (
              <ListWrapper>
                <List>
                  <ListSubheader
                    sx={{
                      background: 'none',
                      color: 'white',
                      borderBottom: '1px solid #ffffff80',
                    }}
                  >
                    Users
                  </ListSubheader>

                  {data?.map((item: User) => (
                    <ListItem key={item.id} sx={{ textAlign: 'center' }}>
                      <ListItemText>
                        {item.first_name} {item.last_name}
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </ListWrapper>
            )}
          </Grid>
        </Grid>

        <Button variant='contained'>Learn React</Button>
      </header>
    </div>
  );
}

/* styles:
  Quoted version provides css syntax
  Object version provides camelCased, Css-in-Js syntax
*/

// Css-syntax, string version
const app = css`
  text-align: center;
`;

// Object version
const orange = css({ color: 'orange', textAlign: 'center' });

const appHeader = css`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

// Example of keyframes
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }`;

const appLogo = css`
  height: 40vmin;
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} infinite 20s linear;
  }
`;

export default App;
