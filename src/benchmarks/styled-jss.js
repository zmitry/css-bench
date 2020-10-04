import React from 'react'
import styled from 'styled-jss'
import randomcolor from 'randomcolor'

import Wrapper from '../BenchWrapper'

const Box = styled('div')({
  padding: 5,
  backgroundColor: props => props.color,

  '&:empty': {
    backgroundColor: 'white',
  },
  '&:after': {
    content: 'attr(data-text)',
  },
  '& > div': {
    color: props => props.color,
  },
})

const App = () => (
  <Wrapper
    info={{
      title: 'styled-jss',
      link: 'https://github.com/cssinjs/styled-jss',
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
