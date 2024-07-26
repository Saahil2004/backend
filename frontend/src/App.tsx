import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Chat from './homepage/homepage';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Chat />
    </ThemeProvider>
  );
}

export default App;