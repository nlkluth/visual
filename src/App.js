import React, { Component } from 'react';
import update from 'react/lib/update';
import OptionMenu from './OptionMenu';
import ContextMenu from './ContextMenu';
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
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {
      items: {},
      lines: {},
      sound: true,
      contextMenu: {}
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
    let contextMenu = this.state.contextMenu;
    if (id === this.state.contextMenu.id) {
      contextMenu = update(this.state.contextMenu, {
        $merge: {
          left: left,
          top: top
        }
      });
    }

    this.setState(update(this.state, {
      items: {
        [id]: {
          $merge: {
            left: left,
            top: top
          }
        }
      },
      contextMenu: {
        $set: contextMenu
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

  closeMenu() {
    this.setState({
      contextMenu: {
        open: false
      }
    });
  }

  openMenu(id) {
    this.setState({
      contextMenu: {
        open: true,
        id,
        top: this.state.items[id].top,
        left: this.state.items[id].left
      }
    });
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
          openMenu={this.openMenu}
          closeMenu={this.closeMenu}
        />
        <ContextMenu
          menu={this.state.contextMenu}
        />
      </div>
    );
  }
}

export default App;
