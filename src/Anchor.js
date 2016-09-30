import React from 'react';
import { DragSource } from 'react-dnd';

const anchorStyle = {
  position: 'absolute',
  width: '5px',
  height: '10px',
  top: '25px',
  right: '-4px',
  background: 'black',
  cursor: 'pointer'
}

const anchorSource = {
  beginDrag(props) {
    const { id } = props;
    return { fromId: id };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Anchor extends React.Component {
  render() {
    return this.props.connectDragSource(
      <div
        style={anchorStyle}
      >
      </div>
    );
  }
}

export default DragSource('anchor', anchorSource, collect)(Anchor);
