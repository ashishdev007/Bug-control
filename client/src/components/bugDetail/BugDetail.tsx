import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import '../../public/BugDetail.css';
import { bug } from '../../actions/types';
import { ShowBugDetails, AddNewNote } from '../../actions/bugActions';
import { StageHeadersObject } from '../stage/stageHeaders';

import ModalForm from './BugDetailModal';

export interface Props {
  test: boolean;
}

export interface StateType {
  notes: Array<any>;
  getNotes: boolean;
  newNote: string;
}

class BugDetail extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = { notes: [], getNotes: true, newNote: '' };
  }

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (
      !prevProps.show ||
      (this.props.bug.notes &&
        this.state.notes.length !== this.props.bug.notes.length)
    ) {
      this.getNotes();
    }
  }

  getNotes = () => {
    var i = 0;
    var date = '';

    var notes = this.props.bug.notes.map((item: any) => {
      var itemDate = new Date(item.dateTime);
      var tempDate = itemDate.toLocaleDateString();
      var itemTime = itemDate.toLocaleTimeString();
      itemTime =
        itemTime.length === 11
          ? itemTime.substring(0, 5) + itemTime.substring(9)
          : itemTime.substring(0, 4) + itemTime.substring(8);
      i++;

      if (tempDate === date) {
        return (
          <div className="ui card RecentNote" key={i}>
            <div className="content">
              <div className="meta">{itemTime}</div>
              <div className="description">{item.content}</div>
            </div>
          </div>
        );
      } else {
        date = tempDate;
        return (
          <React.Fragment key={i}>
            <div className="NoteDate">{date}</div>
            <div className="ui card RecentNote">
              <div className="content">
                <div className="meta">{itemTime}</div>
                <div className="description">{item.content}</div>
              </div>
            </div>
          </React.Fragment>
        );
      }
    });

    this.setState({ notes: notes, getNotes: false });
  };

  showNotes = (no: number = this.state.notes.length) => {
    var len = no <= this.state.notes.length ? no : this.state.notes.length;
    var notes = this.state.notes.slice(0, len);

    if (this.state.notes.length > 0) {
      notes.push(
        <a
          href="#"
          className="NoteDate SeeAllNotes"
          onClick={this.seeAllNotesClick}
        >
          See All
        </a>
      );
    }
    return notes;
  };

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
          <div className="RecentNotes">
            <h3 className="header">Recent Notes</h3>
            {this.showNotes(5)}
          </div>
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
