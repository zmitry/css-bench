import React from 'react'

import styled from 'reshadow'
import randomcolor from 'randomcolor'

import Wrapper from '../BenchWrapper'

const Box = ({color, ...props}) => styled`
  box {
    padding: 5px;
    background-color: ${color};
    
    &:empty {
      background-color: white;
    }
    &:after {
      content: attr(data-text);
    }
    & > box {
      color: ${color};
    }
  }
`(<box {...props} />)

const App = () => (
  <Wrapper
    info={{
      title: 'reshadow',
      link: 'https://github.com/reshadow',
    }}
    initial={1000}
  >
    {index => (
      <Box color={randomcolor()} key={index}>
        <Box color={randomcolor()}>
          <Box color={randomcolor()}>
            <Box data-text={`Box ${index + 1}`} color={randomcolor()} />
          </Box>
        </Box>
      </Box>
    )}
  </Wrapper>
)

export default App
