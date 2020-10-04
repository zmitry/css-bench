import React from 'react'
import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm//languages/prism/jsx'
import style from 'react-syntax-highlighter/dist/esm/styles/prism/coy'

function styledJSX(Prism) {
  const result = jsx(Prism)
  const {languages} = Prism

  languages.insertBefore('jsx', 'template-string', {
    'styled-template-string': {
      pattern: /(styled(\((.|[\r\n])*?\))?|css)`(?:\$\{[^}]+\}|\\\\|\\?[^\\])*?`/,
      lookbehind: true,
      greedy: true,
      inside: {
        interpolation: {
          pattern: /\$\{[^}]+\}/,
          inside: {
            'interpolation-punctuation': {
              pattern: /^\$\{|\}$/,
              alias: 'punctuation',
            },
            rest: languages.jsx,
          },
        },
        attr: {
          pattern: /\[.*?\]/,
        },
        string: {
          pattern: /(.|[\r\n])*/,
          inside: languages.scss,
          alias: 'language-scss',
        },
      },
    },
  })

  return result
}

styledJSX.displayName = 'styledJSX'

SyntaxHighlighter.registerLanguage('jsx', styledJSX)

const Highligher = props => <SyntaxHighlighter style={style} {...props} />

export default Highligher
