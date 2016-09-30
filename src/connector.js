import React from 'react'

const bgStyles = {
  strokeWidth: 3,
  strokeLinejoin: 'round',
  strokeLinecap: 'round',
  fill: 'none',
  stroke: '#c3fdff'
}

const fgStyles = {
  strokeWidth: 1,
  strokeLinejoin: 'round',
  strokeLinecap: 'round',
  fill: 'none',
  stroke: '#6CDADE'
}

function spline(a, b, n = 50) {
  return `M${a.x},${a.y} C${a.x + n},${a.y} ${b.x - n},${b.y} ${b.x},${b.y}`
}

export default function Connection({ from, to }) {
  return <g>
    <path d={spline(from, to)} style={bgStyles} />
    <path d={spline(from, to)} style={fgStyles} />
  </g>
}
