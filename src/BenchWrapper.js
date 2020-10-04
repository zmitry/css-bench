import React from 'react'

const useBench = ({renderRef, count}) => {
  const bench = React.useRef()
  const history = React.useRef([])

  bench.current = performance.now()

  React.useEffect(() => {
    const t1 = performance.now()

    if (!count) {
      renderRef.current.textContent = ''
    } else {
      const diff = t1 - bench.current
      history.current.push(diff)
      const last = history.current.slice(-10)
      history.current = last
      const avg = last.reduce((a, b) => a + b) / last.length
      renderRef.current.textContent = `${diff} ms, avg (last 10) ${avg} ms`
    }
  }, [count])
}

const Bench = ({renderRef, count, total, children}) => {
  useBench({renderRef, count})
  return count > 0 && Array.from(Array(total).keys()).map(children)
}

const Wrapper = ({children, info, initial = 500}) => {
  const renderRef = React.useRef()
  const [count, setCount] = React.useState(0)
  const [total, setTotal] = React.useState(initial)

  return (
    <div>
      <a target="_blank" href={info.link}>
        {info.link}
      </a>
      <h1>{info.title}</h1>
      <h2>{total} boxes</h2>
      render: <span ref={renderRef} />
      <br />
      <input
        value={total}
        onChange={e => {
          setCount(0)
          setTotal(Number(e.target.value))
        }}
      />
      <br />
      <button onClick={() => setCount(x => x + 1)}>render boxes</button>
      <Bench renderRef={renderRef} count={count} total={total}>
        {children}
      </Bench>
    </div>
  )
}

export default Wrapper
