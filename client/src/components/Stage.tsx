import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BugAdd as BugAddAction } from '../actions/bugActions';

import BugCard from './BugCard';
import '../public/stage.css';

export class Stage extends Component<PropsType> {
  addButtonClick = () => {
    this.props.BugAddAction(true);
  };

  render() {
    return (
      <div className="stage">
        <div className="stageHead">
          <h1 className="stageName">Open</h1>
          <p className="stageNoItems">10 Items</p>
        </div>
        <button className="fluid ui icon button" onClick={this.addButtonClick}>
          <i className="plus icon"></i>
        </button>
        <BugCard />
      </div>
    );
  }
}

const mapStatetoProps = (state: any) => {
  return null;
};

const mapDispatchtoProps = {
  BugAddAction: BugAddAction
};

const connector = connect(null, mapDispatchtoProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PropsType = PropsFromRedux;

export default connector(Stage);
