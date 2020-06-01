import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import '../../../public/BugDetail.css';
import { bug, updatableBugDetails } from '../../../actions/types';
import {
  ShowBugDetails,
  AddNewNote,
  EditBugDetails,
  DeleteBug,
} from '../../../actions/bugActions';
import { ShowAlert, HideAlert } from '../../../actions/alertActions';
import { StageHeadersObject } from '../../stage/stageHeaders';

import ViewNotes from './ViewNotes';
import ShowAllNotes from './ShowAllNotes';

import ModalForm from './BugDetailModal';

export interface Props {
  // test: boolean;
}

export interface StateType {
  newNote: string;
  showAllNotes: boolean;
  changeDone: boolean;
  editDescription: boolean;
  description: string;
}

class BugDetail extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      newNote: '',
      showAllNotes: false,
      changeDone: false,
      editDescription: false,
      description: '',
    };
  }

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.bug.id !== this.props.bug.id) {
      this.setState({ description: this.props.bug.description });
    }
  }

  bodyClick = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ editDescription: false });
  };

  descriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;

    this.state.changeDone
      ? this.setState({ description: value })
      : this.setState({ changeDone: true, description: value });
  };

  editDescriptionClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    this.setState({ editDescription: true });
  };

  newNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    this.setState({ newNote: value });
  };

  addNoteButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    this.props.AddNewNote(this.props.bug.id, this.state.newNote);
    this.setState({ newNote: '' });
  };

  saveButtonClick = (event?: React.MouseEvent<HTMLElement>) => {
    if (event) {
      event.stopPropagation();
    }
    this.props.EditBugDetails(`${this.props.bug.id}`, {
      update: updatableBugDetails.description,
      data: this.state.description,
    });

    this.setState({ editDescription: false, changeDone: false });
  };

  deleteButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    const deleteConfirmed = (confirm: boolean) => {
      if (confirm) {
        this.props.DeleteBug(this.props.bug);
        this.closeBugDetail(false);
      } else {
        this.props.HideAlert();
      }
    };

    this.props.ShowAlert({
      title: 'Confirm Delete',
      description: 'Are you sure you want to delete this bug?',
      icon: 'trash alternate',
      dismiss: deleteConfirmed,
    });
  };

  content = () => {
    const bug: bug = this.props.bug;

    return (
      <div className="BugDetail" onClick={this.bodyClick}>
        <div>
          <h1 className="ui header" id="BugDetailHeader">
            {bug.title}
          </h1>
          <p className="ui meta" id="BugDetailCategory">
            ({StageHeadersObject[bug.category]})
          </p>
          {this.state.editDescription ? (
            <textarea
              name="EditDescription"
              id="EditDescriptionTextArea"
              onChange={this.descriptionChange}
              onClick={(event) => event.stopPropagation()}
              value={this.state.description}
              rows={5}
            ></textarea>
          ) : (
            <React.Fragment>
              <div className="ui raised segment">
                <p className="BugDescription">{this.state.description}</p>
              </div>
              <p id="EditDescription" onClick={this.editDescriptionClick}>
                Edit Description
              </p>
            </React.Fragment>
          )}

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
              onChange={this.newNoteChange}
            ></textarea>
            <div
              className="ui primary button"
              id="AddNewNoteButton"
              onClick={this.addNoteButtonClick}
            >
              Add Note
            </div>
            <div id="ActionButtons">
              <button
                className="ui red button"
                onClick={this.deleteButtonClick}
              >
                Delete
              </button>
              {this.state.changeDone ? (
                <div
                  className="ui inverted green button"
                  id="SaveButton"
                  onClick={this.saveButtonClick}
                >
                  Save
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  };

  onDismiss = () => {
    if (this.state.changeDone) {
      this.props.ShowAlert({
        title: 'Save Changes?',
        description: 'Do you want to save the changes?',
        icon: 'save',
        dismiss: this.closeBugDetail,
      });
    } else {
      this.closeBugDetail(false);
    }
  };

  closeBugDetail = (save: boolean): void => {
    if (save) {
      this.saveButtonClick();
    }
    this.props.HideAlert();
    this.props.ShowBugDetails(0, false);
    this.setState({ editDescription: false, changeDone: false });
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
  EditBugDetails: EditBugDetails,
  ShowAlert: ShowAlert,
  HideAlert: HideAlert,
  DeleteBug,
};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PropsType = PropsFromRedux & Props;

export default connector(BugDetail);
