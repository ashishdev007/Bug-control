import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  content: () => ReactElement;
  onDismiss: () => void;
}

const LoginModal: React.FC<Props> = ({ content, onDismiss }) => {
  return ReactDOM.createPortal(
    <div className="ui dimmer modals visible active" onClick={onDismiss}>
      <div
        className="ui big test visible modal transition active"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="content">{content()}</div>
      </div>
    </div>,
    document.querySelector('#modal') as HTMLInputElement
  );
};

export default LoginModal;
