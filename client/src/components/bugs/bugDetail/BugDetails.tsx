import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../../../public/BugDetail.css';
import '../../../public/react-datepicker.css';

import ModalForm from './BugDetailModal';
import BugChars from './BugCharacteristics';
import ViewNotes from './ViewNotes';

import { ShowBugDetails } from '../../../actions/bugActions';
import { ShowAlert } from '../../../actions/alertActions';
import history from '../../../history';

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
  const { bugId } = useParams();

  useEffect(() => {
    if (!bugId) history.push('/home');
    else dispatch(ShowBugDetails(bugId, true));
  }, []);

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
      history.push('/home');
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
