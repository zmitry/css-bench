// @jsx jsx
import React from "react";
import { jsx, css } from "@emotion/core";
import randomcolor from "randomcolor";

import Wrapper from "../BenchWrapper";

function Box({ color, ...props }) {
  return (
    <div
      {...props}
      // css={css({
      //   padding: "5px",
      //   backgroundColor: color,
      //   "&:after": {
      //     content: "attr(data-text)",
      //   },
      //   "& > div": {
      //     color: "red",
      //   },
      // })}
      css={css`
        padding: 5px;
        background-color: ${color};

        &:empty {
          background-color: white;
        }
        &:after {
          content: attr(data-text);
          color: ${color};
        }
        & > div {
          color: ${color};
          white-space: normal;
        }
      `}
    />
  );
}

const App = () => (
  <Wrapper
    info={{
      title: "emotion-css",
      link: "https://github.com/emotion-js/emotion-css",
    }}
    initial={1000}
  >
    {(index) => (
      <Box color={randomcolor()} key={index}>
        <Box color={randomcolor()}>
          <Box color={randomcolor()}>
            <Box data-text={`Box ${index + 1}`} color={randomcolor()} />
          </Box>
        </Box>
      </Box>
    )}
  </Wrapper>
);

export default App;
