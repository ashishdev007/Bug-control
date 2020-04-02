import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AddDraggedBug } from '../actions/dragActions';
import { bug } from '../actions/types';

import '../public/BugCard.css';

export class BugCard extends Component<PropsType> {
  drag = (event: any) => {
    var bug: bug = {
      title: this.props.title,
      description: this.props.description,
      category: this.props.category
    };

    this.props.AddDraggedBug(bug);
  };

  render() {
    console.log('jhasdgfjashfjsdgjhsdaglhsghsag');
    console.log(this.props);
    return (
      <div className="ui card bugcard" draggable="true" onDragStart={this.drag}>
        <div className="content">
          <div className="header">{this.props.title}</div>
          <div className="meta">By Friend</div>
          <div className="description">{this.props.description}</div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state: any, ownProps: OtherPropsType) => {
  return {};
};

const mapDispatchtoProps = {
  AddDraggedBug: AddDraggedBug
};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type OtherPropsType = {
  title: string;
  description: string;
  category: string;
};

type PropsType = PropsFromRedux & OtherPropsType;

export default connector(BugCard);
