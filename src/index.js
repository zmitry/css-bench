import React from 'react'
import ReactDOM from 'react-dom'

import styled from 'reshadow'

import Highligther from './Highligther'

const benches = require.context('./benchmarks', true, /\.js$/)

const libs = benches
  .keys()
  .map(x => x.replace(/\.\/(.*?)\.js/, '$1'))

const getLib = () => window.location.hash.replace('#', '')

/* dynamic import does not work with sandbox :( */
const loadBench = lib => ({
  Module: require(`./benchmarks/${lib}.js`).default,
  raw: require(`!!raw-loader!./benchmarks/${lib}.js`).default,
})

const {pathname} = window.location
const modes = {
  'development': '/',
  'production': '/production',
}


const App = () => {
  const [currentLib, setLib] = React.useState(
    getLib() || libs[0],
  )

  const [reload, setReload] = React.useState(true);

  const _setLib = lib => {
    window.history.pushState(null, null, `#${lib}`)

    if (reload) {
      window.location.reload()
    } else {
      setLib(lib)
    }
  }

  const {Module, raw} = loadBench(currentLib)

  const [mode, opposite] = Object.entries(modes).reduce((acc, [key, value]) => {
    if (value === pathname) return (acc[0] = key, acc)
    return (acc[1] = {key, value}, acc)
  }, [])

  return styled`
    h1 {
      font-size: 40px;
    }

    ul {
      padding-left: 20px;
    }
    
    li {
      font-size: 20px;
      cursor: pointer;
      color: steelblue;

      &:hover {
        color: pink;
      }

      &[aria-current] {
        color: fuchsia;
      }
    }

    benches {
      background: #fdfdfd;
      padding: 10px;
      display: flex;

      & pre {
        margin-left: 20px;
      }

      & > * {
        flex: 1;
      }
    }

    pre {
      font-size: 12px;
      margin: 0;
    }
  `(
    <app>
      <h1>cssinjs benchmarks</h1>
      <p>This is the <b>{mode}</b> mode. You can switch to the <b>{opposite.key}</b> mode <a href={opposite.value}>here</a></p>
      <label>
        <input type="checkbox" checked={reload} onChange={e => {
          setReload(!!e.target.checked)
        }} />
        reload page (to clean artefacts)
      </label>
      
      <ul>
        {libs.map(lib => (
          <li
            aria-current={lib === currentLib}
            onClick={() => {
              _setLib(lib)
            }}
            key={lib}
          >
            {lib}
          </li>
        ))}
      </ul>
      <benches>
        <Module />
        <pre>
          <Highligther language='jsx'>{raw}</Highligther>
        </pre>
      </benches>
      
    </app>,
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
