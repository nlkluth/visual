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

export default class Connection extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const source = window.context.createOscillator();
    source.frequency.value = this.refs.line.getTotalLength();
    source.start(window.context.currentTime);
    source.stop(window.context.currentTime + 0.2);

    const vca = window.context.createGain();
    vca.gain.value = this.props.sound ? 2 : 0;

    source.connect(vca);
    vca.connect(window.context.destination);
  }

  render() {
    const { from, to } = this.props;
    return <g onClick={this.handleClick}>
      <path d={spline(from, to)} style={bgStyles} ref="line" />
      <path d={spline(from, to)} style={fgStyles} />
    </g>
  }
}
