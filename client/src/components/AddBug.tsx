import React, { Component, ReactElement } from 'react';
import ModalForm from '../modals/modalForm';

export class AddBug extends Component {
  content = (): ReactElement => {
    return (
      <React.Fragment>
        <form className="ui big form">
          <div className="field">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" />
          </div>
          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea name="description" rows={4} cols={50} />
          </div>
        </form>
      </React.Fragment>
    );
  };

  actions = (): ReactElement => {
    return (
      <div className="ui large teal right labeled icon button">
        Submit
        <i className="checkmark icon"></i>
      </div>
    );
  };

  onDismiss = (): void => {};

  render() {
    return (
      <div>
        <ModalForm
          header="Add a Bug"
          content={this.content}
          actions={this.actions}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

export default AddBug;
