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
import { StageHeaders, StageHeadersObject } from '../../stage/stageHeaders';
import { StageStates } from '../../../reducers/stageStates';

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
  category: string;
  severity: string;
  reproducible: string;
}

class BugDetail extends React.Component<PropsType> {
  state = {
    newNote: '',
    showAllNotes: false,
    changeDone: false,
    editDescription: false,
    description: '',
    category: '',
    severity: '',
    reproducible: '',
  };

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.bug.id !== this.props.bug.id) {
      this.setState({
        description: this.props.bug.description,
        category: this.props.bug.category,
        severity: this.props.bug.severity,
        reproducible: this.props.bug.reproducible,
      });
    }
  }

  bodyClick = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ editDescription: false });
  };

  descriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;

    this.setState({ changeDone: true, description: value });
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

    const { description, category, severity, reproducible } = this.state;
    const updatedBug = {
      ...this.props.bug,
      description,
      category,
      severity,
      reproducible,
    };
    delete updatedBug.notes;

    this.props.EditBugDetails(
      updatedBug,
      this.props.bug.category !== updatedBug.category ? 'category' : ''
    );

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

  optionsGenerator = (
    options: Array<{ [key: string]: string }>,
    type: 'category' | 'severity' | 'reproducible'
  ) => {
    var i = -1;
    var selectedOption = this.props.bug[type];
    var selected = '';
    return options.map((item) => {
      i++;
      selected = selectedOption === item ? 'selected' : '';
      return <option value={item.value}>{item.option}</option>;
    });
  };

  optionSelect = (event: any) => {
    this.setState({
      changeDone: true,
      [event.target.name]: event.target.value,
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
            <select
              className="ui dropdown"
              value={this.state.reproducible}
              name="reproducible"
              onChange={this.optionSelect}
            >
              {this.optionsGenerator(
                [
                  { value: 'None', option: 'None' },
                  { value: 'Consistently', option: 'Consistently' },
                  { value: 'Intermittently', option: 'Intermittently' },
                  { value: 'Rarely/Once', option: 'Rarely/Once' },
                ],
                'reproducible'
              )}
            </select>

            <div className="BugFeature">Bug Severity</div>
            <select
              className="ui dropdown"
              value={this.state.severity}
              name="severity"
              onChange={this.optionSelect}
            >
              {this.optionsGenerator(
                [
                  { value: 'None', option: 'None' },
                  { value: 'High', option: 'High' },
                  { value: 'Medium', option: 'Medium' },
                  { value: 'Low', option: 'Low' },
                ],
                'severity'
              )}
            </select>

            <div className="BugFeature">Category</div>
            <select
              className="ui dropdown"
              name="category"
              value={this.state.category}
              onChange={this.optionSelect}
            >
              {this.optionsGenerator(
                [
                  { value: StageStates.OPEN, option: StageHeadersObject.OPEN },
                  {
                    value: StageStates.IN_PROGRESS,
                    option: StageHeadersObject.IN_PROGRESS,
                  },
                  {
                    value: StageStates.TEST_PENDING,
                    option: StageHeadersObject.TEST_PENDING,
                  },
                  {
                    value: StageStates.RE_OPENED,
                    option: StageHeadersObject.RE_OPENED,
                  },
                  {
                    value: StageStates.CLOSED,
                    option: StageHeadersObject.CLOSED,
                  },
                ],
                'category'
              )}
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
