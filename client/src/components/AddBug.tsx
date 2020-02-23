import React, { Component, ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { BugAdd as BugAddAction } from '../actions/bugActions';

import ModalForm from '../modals/modalForm';

export class AddBug extends Component<propsType> {
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
    if (this.props.addbug) {
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
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state: any) => {
  const { addbug } = state.bugs;
  return { addbug };
};

const mapDispatchToProps = {
  BugAddAction: BugAddAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type propsType = PropsFromRedux;

export default connector(AddBug);
