import React from 'react';
import { StageHeaders } from './stage/stageHeaders';
import { StageStates } from '../reducers/stageStates';
import Stage from './stage/Stage';
import AddBug from './bugs/AddBug';
import BugDetail from './bugs/bugDetail/BugDetail';
import ShowAllNotes from './bugs/bugDetail/ShowAllNotes';
import { connect, ConnectedProps } from 'react-redux';
import { FetchBugs } from '../actions/bugActions';

import '../public/Home.css';
import history from '../history';

export interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
  componentDidMount() {
    console.log('this.props.isAuthenticated');
    console.log(this.props.isAuthenticated);

    if (!this.props.isAuthenticated) {
      history.push('/login');
    }
  }

  componentDidUpdate() {
    if (!this.props.isAuthenticated) {
      history.push('/login');
    }
  }

  render() {
    this.props.FetchBugs();
    return (
      <div className="Home">
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
        <BugDetail />
        <ShowAllNotes />
      </div>
    );
  }
}

type PropsFromRedux = ConnectedProps<typeof connector>;

const mapStatetoProps = (state: any) => {
  const { isAuthenticated } = state.auth;
  return { isAuthenticated };
};

const mapDispatchtoProps = {
  FetchBugs: FetchBugs,
};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type HomeProps = PropsFromRedux;

export default connector(Home);