import * as React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import '../../../public/ShowAllNotes.css';

import { SeeAllNotes } from '../../../actions/bugActions';

import ModalForm from './BugDetailModal';

export interface ShowAllNotesProps {}

export interface ShowAllNotesState {
  show: boolean;
}

class ShowAllNotes extends React.Component<PropsType, ShowAllNotesState> {
  content = () => {
    return (
      <div className="AllNotes">
        <p id="Notes">Notes</p>
        <button
          id="CloseButton"
          className="circular ui icon button"
          onClick={this.close}
        >
          <i className="close icon"></i>
        </button>

        {this.props.notes}
      </div>
    );
  };

  close = () => {
    this.props.SeeAllNotes(false, []);
  };

  onDismiss = () => {};

  render() {
    if (this.props.show) {
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
  // const { notes } = state.bugs.bugDetail.bug;
  const { notes, show } = state.bugs.bugDetail.seeAllNotes;
  return { notes, show };
};

const mapDispatchtoProps = {
  SeeAllNotes: SeeAllNotes,
};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PropsType = PropsFromRedux & ShowAllNotesProps;

export default connector(ShowAllNotes);
