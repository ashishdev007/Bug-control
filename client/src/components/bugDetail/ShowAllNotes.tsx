import * as React from 'react';
import { ConnectedProps, connect } from 'react-redux';

import ModalForm from './BugDetailModal';

export interface ShowAllNotesProps {}

export interface ShowAllNotesState {
  show: boolean;
}

class ShowAllNotes extends React.Component<PropsType, ShowAllNotesState> {
  state = { show: false };

  content = () => {
    return <div className="AllNotes"></div>;
  };

  onDismiss = () => {};

  render() {
    if (this.state.show) {
      return (
        <div>
          <ModalForm content={this.content} onDismiss={this.onDismiss} />
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStatetoProps = (state: any, ownProps: ShowAllNotesProps) => {
  const { notes } = state.bugs.bugDetail.bug;
  return { notes };
};

const mapDispatchtoProps = {};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PropsType = PropsFromRedux & ShowAllNotesProps;

export default connector(ShowAllNotes);
