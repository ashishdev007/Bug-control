import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import '../../public/BugDetail.css';
import { bug } from '../../actions/types';
import { ShowBugDetails, AddNewNote } from '../../actions/bugActions';
import { StageHeadersObject } from '../stage/stageHeaders';

import ViewNotes from './ViewNotes';
import ShowAllNotes from './ShowAllNotes';

import ModalForm from './BugDetailModal';

export interface Props {
  // test: boolean;
}

export interface StateType {
  newNote: string;
  showAllNotes: boolean;
}

class BugDetail extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = { newNote: '', showAllNotes: false };
  }

  newNote = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    this.setState({ newNote: value });
  };

  addNewNote = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    this.props.AddNewNote(this.props.bug.id, this.state.newNote);
    this.setState({ newNote: '' });
  };

  content = () => {
    const bug: bug = this.props.bug;

    return (
      <div className="BugDetail">
        <div>
          <h1 className="ui header" id="BugDetailHeader">
            {bug.title}
          </h1>
          <p className="ui meta" id="BugDetailCategory">
            ({StageHeadersObject[bug.category]})
          </p>
          <div className="ui raised segment">
            <p className="BugDescription">{bug.description}</p>
          </div>

          <div className="BugFeatures">
            <div className="BugFeature">Bug Reproducible</div>
            <select className="ui dropdown">
              <option value="0">None</option>
              <option value="1">Consistently</option>
              <option value="2">Intermittently</option>
              <option value="3">Rarely/Once</option>
            </select>

            <div className="BugFeature">Bug Severity</div>
            <select className="ui dropdown">
              <option value="0">None</option>
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </select>

            <div className="BugFeature">Status</div>
            <select className="ui dropdown">
              <option value="0">None</option>
              <option value="1">Consistently</option>
              <option value="2">Intermittently</option>
              <option value="3">Rarely/Once</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: '2%', minHeight: '50vh' }}>
          <ViewNotes />
          <div className="OtherActions">
            <div id="AddNoteHeader">Add Note</div>
            <textarea
              name="NewNote"
              id="NewNote"
              cols={30}
              rows={10}
              value={this.state.newNote}
              onChange={this.newNote}
            ></textarea>
            <div
              className="ui primary button"
              style={{ margin: 'auto' }}
              onClick={this.addNewNote}
            >
              Add Note
            </div>
            <div
              className="ui inverted green button"
              style={{ marginLeft: 'auto' }}
            >
              Save
            </div>
          </div>
        </div>
      </div>
    );
  };

  seeAllNotesClick = () => (event: any) => {
    event.preventDefault();
  };

  actions = () => {
    return <React.Fragment></React.Fragment>;
  };

  onDismiss = () => {
    this.props.ShowBugDetails(0, false);
  };

  render() {
    if (this.props.show) {
      if (this.state.showAllNotes) {
        return <ShowAllNotes />;
      } else {
        return (
          <div>
            <ModalForm content={this.content} onDismiss={this.onDismiss} />
          </div>
        );
      }
    } else {
      return null;
    }
  }
}

const mapStatetoProps = (state: any, ownProps: Props) => {
  const { show, bug } = state.bugs.bugDetail;
  return { show, bug };
};

const mapDispatchtoProps = {
  ShowBugDetails: ShowBugDetails,
  AddNewNote: AddNewNote,
};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PropsType = PropsFromRedux & Props;

export default connector(BugDetail);
