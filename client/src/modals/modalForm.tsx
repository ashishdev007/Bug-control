import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  header: String;
  content: () => ReactElement;
  actions: () => ReactElement;
  onDismiss: () => void;
}

const LoginModal: React.FC<Props> = ({
  header,
  content,
  actions,
  onDismiss
}) => {
  return ReactDOM.createPortal(
    <div className="ui dimmer modals visible active" onClick={onDismiss}>
      <div
        className="ui tiny test visible modal transition active"
        onClick={event => event.stopPropagation()}
      >
        <div className="header">{header}</div>
        <div className="content">{content()}</div>
        <div className="actions">{actions()}</div>
      </div>
    </div>,
    document.querySelector('#modal') as HTMLInputElement
  );
};

export default LoginModal;
