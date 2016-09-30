import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import Anchor from './Anchor';
import Item from './Item';
import SoundSource from './SoundSource';
import Frequency from './Frequency';

const renderedList = {
  item: Item,
  soundsource: SoundSource,
  frequency: Frequency
};

const styles = {
  cursor: 'move',
  position: 'absolute'
};

const anchorTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    component.drawLine(item.fromId, component.props.id);
  },

  // hover(props, monitor, component) {
  //   const item = monitor.getItem();
  //   const delta = monitor.getDifferenceFromInitialOffset();
  //   const left = Math.round(item.left + delta.x);
  //   const top = Math.round(item.top + delta.y);

  //   component.drawProgress(item.fromId, null, left, top);
  // }
};

const itemSource = {
  beginDrag(props) {
    const { id, left, top } = props;
    return { id, left, top };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class ItemRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.openMenu = this.openMenu.bind(this);
    this.state = {
      editing: false
    };
  }

  drawLine(fromId, toId) {
    this.props.drawLine(fromId, toId);
  }

  openMenu(event) {
    event.preventDefault();
    event.stopPropagation();

    this.props.openMenu(this.props.id);
  }

  render() {
    const { id, left, top, type } = this.props;
    const Rendered = renderedList[type] || renderedList.item;

    return this.props.connectDragSource(this.props.connectDropTarget(
      <div
        style={{
          ...styles,
          opacity: this.props.isDragging ? 0.2 : 1,
          left: this.props.left,
          top: this.props.top,
        }}
        onContextMenu={this.openMenu}
      >
        <Rendered
          id={id}
          left={left}
          sound={this.props.sound}
          top={top}
          type={type}
          updateItem={this.props.updateItem}
          drawLine={this.props.drawLine}
          drawProgress={this.props.drawProgress}
        />
        <Anchor
          id={this.props.id}
        />
      </div>
    ));
  }
}

ItemRenderer = DropTarget('anchor', anchorTarget, dropCollect)(ItemRenderer);
export default DragSource('item', itemSource, collect)(ItemRenderer);
