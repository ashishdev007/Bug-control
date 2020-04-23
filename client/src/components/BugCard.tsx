import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ShowBugDetails } from '../actions/bugActions';
import { AddDraggedBug } from '../actions/dragActions';
import { bug } from '../actions/types';

import '../public/BugCard.css';

export class BugCard extends Component<PropsType> {
  drag = (event: any) => {
    const { id, userid, title, description, category } = this.props;

    this.props.AddDraggedBug({ id, userid, title, description, category });
  };

  onClick = () => {
    this.props.ShowBugDetails(this.props.id, true);
  };

  render() {
    return (
      <div
        className="ui card bugcard"
        draggable="true"
        onDragStart={this.drag}
        onClick={this.onClick}
      >
        <div className="content">
          <div className="header">{this.props.title}</div>
          <div className="meta">By Friend</div>
          <div className="description">{this.props.description}</div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state: any, ownProps: bug) => {
  return {};
};

const mapDispatchtoProps = {
  AddDraggedBug: AddDraggedBug,
  ShowBugDetails: ShowBugDetails,
};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PropsType = PropsFromRedux & bug;

export default connector(BugCard);
