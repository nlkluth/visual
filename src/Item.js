import React from 'react';

const styles = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem'
};

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDoubeClick = this.handleDoubeClick.bind(this);
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

  handleDoubeClick(event) {
    event.stopPropagation();

    this.setState({
      editing: !this.state.editing
    });
  }

  render() {
    return (
      <div
        fill="transparent"
        stroke="black"
        onDoubleClick={this.handleDoubeClick}
        strokeWidth="2"
        style={styles}
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
