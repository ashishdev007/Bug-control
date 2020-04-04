import React, { Component } from 'react';
import Stage from './stage/Stage';
import AddBug from './AddBug';
import { connect, ConnectedProps } from 'react-redux';
import { FetchBugs } from '../actions/bugActions';

import { StageHeaders } from './stage/stageHeaders';
import { StageStates } from './stage/stageStates';

import './App.css';

export class App extends Component<PropsType> {
  render() {
    this.props.FetchBugs();

    return (
      <div className="App">
        <Stage stageType={StageHeaders.OPEN} state={StageStates.OPEN} />
        <Stage
          stageType={StageHeaders.IN_PROGRESS}
          state={StageStates.IN_PROGRESS}
        />
        <Stage
          stageType={StageHeaders.TEST_PENDING}
          state={StageStates.TEST_PENDING}
        />
        <Stage
          stageType={StageHeaders.RE_OPENED}
          state={StageStates.RE_OPENED}
        />
        <Stage stageType={StageHeaders.CLOSED} state={StageStates.CLOSED} />
        <AddBug />
      </div>
    );
  }
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type OtherPropsType = {
  stageType?: string;
  state?: string;
};

const mapStatetoProps = (state: any, ownProps: OtherPropsType) => {
  return {};
};

const mapDispatchtoProps = {
  FetchBugs: FetchBugs
};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type PropsType = PropsFromRedux & OtherPropsType;

export default connector(App);
