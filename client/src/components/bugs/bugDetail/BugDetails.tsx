import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../../public/BugDetail.css';

import ModalForm from './BugDetailModal';
import BugChars from './BugCharacteristics';
import ViewNotes from './ViewNotes';

import { stateType as bugsStateType } from '../../../reducers/bugReducer';
import { ShowBugDetails } from '../../../actions/bugActions';
import { ShowAlert } from '../../../actions/alertActions';

interface RootState {
  bugs: bugsStateType;
}

const BugDetails = () => {
  const {
    changeDone,
    showBugDetail,
    BugBasics,
    BugDeadline,
    BugActionButtons,
    addAnotherNote,

    closeBugDetail,
  } = BugChars();
  const dispatch = useDispatch();

  const [newNote, setNewNote] = useState('');

  const newNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setNewNote(value);
  };

  const addNoteButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    addAnotherNote(newNote);
    setNewNote('');
  };

  const content = () => {
    return (
      <div className="BugDetail">
        {BugBasics()}
        <div style={{ display: 'flex', marginTop: '2%', minHeight: '50vh' }}>
          <ViewNotes />
          <div className="OtherActions">
            {BugDeadline()}
            <div id="AddNoteHeader">Add Note</div>
            <textarea
              name="NewNote"
              id="NewNote"
              cols={30}
              rows={10}
              value={newNote}
              onChange={newNoteChange}
            ></textarea>
            <div
              className="ui primary button"
              id="AddNewNoteButton"
              onClick={addNoteButtonClick}
            >
              Add Note
            </div>
            {BugActionButtons()}
          </div>
        </div>
      </div>
    );
  };

  const onDismiss = () => {
    if (changeDone) {
      dispatch(
        ShowAlert({
          title: 'Save Changes?',
          description: 'Do you want to save the changes?',
          icon: 'save',
          dismiss: closeBugDetail,
        })
      );
    } else {
      dispatch(ShowBugDetails(0, false));
    }
  };

  if (showBugDetail) {
    return (
      <div>
        <ModalForm content={content} onDismiss={onDismiss} />
      </div>
    );
  } else {
    return null;
  }
};

export default BugDetails;
