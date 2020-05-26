import React, { Component, ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { OpenBugForm, AddBugToCategory } from '../../actions/bugActions';

import ModalForm from '../../modals/modalForm';

type formState = {
  title: string;
  description: string;
};

export class AddBug extends Component<propsType, formState> {
  constructor(props: propsType) {
    super(props);
    this.state = { title: '', description: '' };
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: event.target.value });
  };

  content = (): ReactElement => {
    return (
      <React.Fragment>
        <form
          className="ui big form"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              rows={4}
              cols={50}
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
          </div>
        </form>
      </React.Fragment>
    );
  };

  handleSubmit = (): void => {
    var category = this.props.addbug.requestedBy;
    this.props.AddBugToCategory({
      category: category,
      title: this.state.title,
      description: this.state.description,
      id: 1,
      userid: 1,
    });
    this.setState({ title: '', description: '' });

    this.props.OpenBugForm(false, '');
  };

  actions = (): ReactElement => {
    return (
      <div
        className="ui large teal right labeled icon button"
        onClick={this.handleSubmit}
      >
        Submit
        <i className="checkmark icon"></i>
      </div>
    );
  };

  onDismiss = (): void => {
    this.setState({ title: '', description: '' });
    this.props.OpenBugForm(false, '');
  };

  render() {
    if (this.props.addbug.state) {
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
  OpenBugForm: OpenBugForm,
  AddBugToCategory: AddBugToCategory,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type propsType = PropsFromRedux;

export default connector(AddBug);
