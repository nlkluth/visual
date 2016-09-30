import React from 'react';

const soundStyles = {
  width: '20px',
  padding: '0.5rem 1rem'
};

class SoundSource extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const source = window.context.createOscillator();
    source.frequency.value = 440;
    source.start(window.context.currentTime);
    source.stop(window.context.currentTime + 0.2);

    const vca = window.context.createGain();
    vca.gain.value = this.props.sound ? 2 : 0;

    source.connect(vca);
    vca.connect(window.context.destination);
  }

  render() {
    return (
      <div style={soundStyles} onClick={this.handleClick}>
        <img
          style={{ maxWidth: '100%' }}
          alt="sound source"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/1000px-Speaker_Icon.svg.png"
        />
      </div>
    );
  }
}

export default SoundSource;
