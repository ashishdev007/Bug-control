import React from 'react';
import { StageHeaders } from './stage/stageHeaders';
import { StageStates } from '../reducers/stageStates';

import SideBar from './sidebar/Sidebar';
import Stage from './stage/Stage';
import AddBug from './bugs/AddBug';
import BugDetails from './bugs/bugDetail/BugDetails';
import ShowAllNotes from './bugs/bugDetail/ShowAllNotes';

import { connect, ConnectedProps } from 'react-redux';
import { FetchBugs } from '../actions/bugActions';

import '../public/Home.css';
import history from '../history';
import { Link } from 'react-router-dom';

export interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
  componentDidMount() {
    this.pushLogin();
    this.props.FetchBugs();
  }

  componentDidUpdate() {
    this.pushLogin();
  }

  pushLogin = () => {
    while (this.props.loading) {}
    if (!this.props.isAuthenticated) {
      history.push('/login');
    }
  };

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <SideBar />
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
          <ShowAllNotes />
        </div>
      </div>
    );
  }
}

type PropsFromRedux = ConnectedProps<typeof connector>;

const mapStatetoProps = (state: any) => {
  const { isAuthenticated, loading } = state.auth;
  return { isAuthenticated, loading };
};

const mapDispatchtoProps = {
  FetchBugs: FetchBugs,
};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type HomeProps = PropsFromRedux;

export default connector(Home);
