import React from 'react';

const styles = {
  position: 'absolute',
  border: '1px solid black',
  background: '#ddd',
  height: '150px',
  width: '130px'
};

const ContextMenu = ({ menu }) => {
  if (!menu.open) {
    return null;
  }

  return (
    <div
      style={{
        ...styles,
        top: menu.top + 50,
        left: menu.left + 50
      }}
    >
      Menu
    </div>
  );
};

export default ContextMenu
