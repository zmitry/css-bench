import React from "react";
import { css } from "otion";
import randomcolor from "randomcolor";
import Wrapper from "../BenchWrapper";

function Box({ color, ...props }) {
  const className = css({
    padding: "5px",
    backgroundColor: color,
    "&:empty": {
      backgroundColor: "white",
    },
    "&:after": {
      content: "attr(data-text)",
      color: color,
    },
    "& > div": {
      color: color,
      whiteSpace: "normal",
    },
  });
  return <div {...props} className={className} />;
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
