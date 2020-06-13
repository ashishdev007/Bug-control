import React, { useState } from 'react';
import { LogoutUser } from '../actions/authActions';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
  const [clicked, setClicked] = useState(false);

  const dispatch = useDispatch();

  const HambtnClick = () => {
    setClicked(true);
  };

  return (
    <div className="HamburgerContainer">
      <button className="toggle-button" onClick={HambtnClick}>
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
      </button>
      {clicked ? (
        <div
          className="ui dimmer modals page transition visible active SidebarDimmer"
          onClick={() => {
            setClicked(false);
          }}
        >
          <div className="Sidebar" onClick={(event) => event.stopPropagation()}>
            <button
              className="ui basic button options"
              onClick={() => dispatch(LogoutUser())}
            >
              Logout
            </button>
            <button className="ui basic button options">Deadline</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
