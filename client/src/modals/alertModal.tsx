import React from 'react';
import ReactDOM from 'react-dom';
import { AlertType } from '../actions/alertActions';

const AlertModal: React.FC<AlertType> = ({
  title,
  description,
  icon,
  dismiss,
}) => {
  return ReactDOM.createPortal(
    <div className="ui dimmer modals visible active">
      <div className="ui icon header" style={{ color: 'white' }}>
        {icon ? <i className={`${icon} icon`}></i> : null}
        {title}
      </div>
      <div className="content">
        <p>{description}</p>
      </div>
      <div className="actions" style={{ marginTop: '1.5em' }}>
        <div
          className="ui red basic cancel inverted button"
          onClick={() => (dismiss ? dismiss(false) : {})}
        >
          <i className="remove icon"></i>
          No
        </div>
        <div
          className="ui green ok inverted button"
          onClick={() => (dismiss ? dismiss(true) : {})}
          style={{ marginLeft: '1em' }}
        >
          <i className="checkmark icon"></i>
          Yes
        </div>
      </div>
    </div>,
    document.querySelector('#modal') as HTMLInputElement
  );
};

export default AlertModal;
