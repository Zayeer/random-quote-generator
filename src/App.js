import React from 'react';
import QuoteContainer from './QuoteContainer';
import './App.css';
import styled from 'styled-components';

function App() {
  const MainContainer = styled.div`
  background-color: #f8bd7f;
  min-height: 150px;
  min-width: 150px;
  padding: 20px;
  border-radius: 10px;
  `
  return (
    <MainContainer>
      <QuoteContainer />   
    </MainContainer>
  )
}

export default App;
