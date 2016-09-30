import React from 'react';
import './OptionMenu.css';

const OptionMenu = ({ addItem, toggleSound, sound }) => {
  const addDefaultItem = () => addItem();
  return (
    <div className="option-menu">
      <div
        className="option-item"
        onClick={addDefaultItem}
      >
        +
      </div>
      <div
        className={`option-item ${sound ? '' : 'disabled'}`}
        onClick={toggleSound}
      >
        <img
          style={{ width: '20px' }}
          alt="sound toggle"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/1000px-Speaker_Icon.svg.png"
        />
      </div>
    </div>
  );
}

OptionMenu.propTypes = {
  addItem: React.PropTypes.func,
  toggleSound: React.PropTypes.func,
  sound: React.PropTypes.bool
};

export default OptionMenu;
