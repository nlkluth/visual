import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

const styles = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem'
};

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.state = {
      type: this.props.type || ''
    };
  }

  updateItem(event) {
    event.preventDefault();
    this.props.updateItem(this.props.id, 'type', this.state.type);
  }

  handleChange(event) {
    this.setState({
      type: event.target.value.trim()
    });
  }

  render() {
    return (
      <div
        fill="transparent"
        stroke="black"
        strokeWidth="2"
        style={{
          ...styles,
          opacity: this.props.isDragging ? 0.2 : 1,
          left: this.props.left,
          top: this.props.top,
        }}
      >
        {this.state.editing
          ? <form onSubmit={this.updateItem}>
              <input type="text" onChange={this.handleChange} />
            </form>
          : <p> item </p>
        }
      </div>
    );
  }
}

export default Item;
