import React from 'react';
import Html5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd';
import ItemRenderer from './ItemRenderer';
import { DropTarget } from 'react-dnd';
import Connection from './connector';
import './CanvasDisplay.css';

const itemTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    component.moveItem(item.id, left, top);
  },

  hover(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    component.moveItem(item.id, left, top);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class CanvasDisplay extends React.Component {
  static propTypes = {
    items: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.renderConnections = this.renderConnections.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  moveItem(id, left, top) {
    this.props.moveItem(id, left, top);
  }

  renderItem(key) {
    const { id, left, top, type } = this.props.items[key];

    return (
      <ItemRenderer
        id={id}
        left={left}
        top={top}
        key={key}
        type={type}
        updateItem={this.props.updateItem}
        drawLine={this.props.drawLine}
        drawProgress={this.props.drawProgress}
      />
    );
  }

  renderConnections() {
    const keys = Object.keys(this.props.lines);
    if (keys.length < 2) {
      return;
    }

    return keys.map((key) => this.props.lines[key].map((line) => {
      const fromId = this.props.items[key];
      const to = this.props.items[line];

      return (
        <Connection
          sound={this.props.sound}
          key={this.props.lines[key].id}
          from={{x: fromId.left, y: fromId.top}}
          to={{x: to.left, y: to.top}}
        />
      );
    }));
  }

  handleDoubleClick(event) {
    const { offsetX, offsetY } = event.nativeEvent;
    this.props.addItem(offsetX, offsetY);
  }

  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div className="canvas" onDoubleClick={this.handleDoubleClick}>
        {Object.keys(this.props.items).map(this.renderItem)}
        <svg width="100%" height="100%">
          {Object.keys(this.props.lines).length > 1 && this.renderConnections()}
        </svg>
      </div>
    );
  }
}

export default DragDropContext(Html5Backend)(DropTarget('item', itemTarget, collect)(CanvasDisplay));
