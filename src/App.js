import React, { Component } from 'react';
import update from 'react/lib/update';
import OptionMenu from './OptionMenu';
import CanvasDisplay from './CanvasDisplay';
import uuid from 'node-uuid';

class App extends Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.moveItem = this.moveItem.bind(this);
    this.drawLine = this.drawLine.bind(this);
    this.drawProgress = this.drawProgress.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.state = {
      items: {},
      lines: {},
      sound: true
    };
  }

  componentDidMount() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      window.context = new AudioContext();
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
    }
  }

  toggleSound() {
    this.setState({
      sound: !this.state.sound
    });
  }

  addItem(x = 80, y = 20) {
    const id = uuid.v4();

    this.setState(update(this.state, {
      items: {
        $merge: {
          [id]: {
            id,
            top: y,
            left: x,
            lines: []
          }
        }
      },
      lines: {
        $merge: {
          [id]: []
        }
      }
    }))
  }

  updateItem(id, key, value) {
    this.setState(update(this.state, {
      items: {
        [id]: {
          $merge: {
            [key]: value
          }
        }
      }
    }));
  }

  moveItem(id, left, top) {
    this.setState(update(this.state, {
      items: {
        [id]: {
          $merge: {
            left: left,
            top: top
          }
        }
      }
    }));
  }

  drawLine(fromId, toId) {
    this.setState(update(this.state, {
      lines: {
        [fromId]: {
          $push: [toId]
        }
      }
    }))
  }

  drawProgress(fromTop, fromLeft, toTop, toLeft) {
    this.setState({
      progress: {
        fromTop, fromLeft, toTop, toLeft
      }
    })
  }

  render() {
    return (
      <div className="App">
        <OptionMenu
          addItem={this.addItem}
          toggleSound={this.toggleSound}
          sound={this.state.sound}
        />
        <CanvasDisplay
          items={this.state.items}
          lines={this.state.lines}
          moveItem={this.moveItem}
          drawLine={this.drawLine}
          sound={this.state.sound}
          drawProgress={this.drawProgress}
          addItem={this.addItem}
          updateItem={this.updateItem}
        />
      </div>
    );
  }
}

export default App;
