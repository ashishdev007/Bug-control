import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import '../../../public/BugCharacteristics.css';

import { stateType as bugsStateType } from '../../../reducers/bugReducer';
import {
  DeleteBug,
  EditBugDetails,
  AddNewNote,
  ShowBugDetails,
} from '../../../actions/bugActions';
import { bug } from '../../../actions/types';
import { HideAlert, ShowAlert } from '../../../actions/alertActions';
import { StageHeadersObject } from '../../stage/stageHeaders';
import { StageStates } from '../../../reducers/stageStates';

interface RootState {
  bugs: bugsStateType;
}

interface Deadline {
  enabled: boolean;
  date: Date | null;
}

export interface BugCharsProps {}

const BugChars = () => {
  const bug: any = useSelector((state: RootState) => state.bugs.bugDetail.bug);
  const show: boolean = useSelector(
    (state: RootState) => state.bugs.bugDetail.show
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState({ edit: false, content: '' });
  const [features, setFeatures] = useState({
    reproducible: '',
    severity: '',
    category: '',
  });
  const [deadline, setDeadline] = useState<Deadline>({
    enabled: false,
    date: null,
  });
  const [changeDone, setChangeDone] = useState(false);
  const [showBugDetail, setShowBugDetail] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(bug.title);
    setDescription({ edit: false, content: bug.description });
    setFeatures({
      category: bug.category,
      severity: bug.severity || '',
      reproducible: bug.reproducible || '',
    });
  }, [bug]);

  useEffect(() => {
    console.log(features);
  }, [changeDone]);

  useEffect(() => {
    if (!changeDone) {
      setShowBugDetail(show);
    } else {
      if (changeDone) {
        ShowAlert({
          title: 'Save Changes?',
          description: 'Do you want to save the changes?',
          icon: 'save',
          dismiss: closeBugDetail,
        });
      } else {
        closeBugDetail(false);
      }
    }
  }, [show]);

  useEffect(() => {}, [deadline]);

  const descriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setDescription({ ...description, content: value });
    setChangeDone(true);
  };

  const editDescriptionClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setDescription({ ...description, edit: true });
  };

  const optionSelect = (event: any) => {
    setChangeDone(true);
    setFeatures({ ...features, [event.target.name]: event.target.value });
  };

  const deadlineChange = (date: Date) => {
    setChangeDone(true);
    setDeadline({ ...deadline, date });
  };

  const enableDeadlineButtonClick = (event: any) => {
    event.stopPropagation();
    const date = deadline.enabled ? null : new Date();
    setChangeDone(true);
    setDeadline({
      date,
      enabled: !deadline.enabled,
    });
  };

  const addAnotherNote = (note: string) => {
    dispatch(AddNewNote(bug.id, note));
  };

  const deleteButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    const deleteConfirmed = (confirm: boolean) => {
      if (confirm) {
        dispatch(DeleteBug(bug));
        closeBugDetail(false);
      } else {
        dispatch(HideAlert());
      }
    };

    dispatch(
      ShowAlert({
        title: 'Confirm Delete',
        description: 'Are you sure you want to delete this bug?',
        icon: 'trash alternate',
        dismiss: deleteConfirmed,
      })
    );
  };

  const saveButtonClick = (event?: React.MouseEvent<HTMLElement>) => {
    if (event) {
      event.stopPropagation();
    }

    const updatedBug = {
      ...bug,
      description: description.content,
      ...features,
    };
    delete updatedBug.notes;

    dispatch(
      EditBugDetails(
        updatedBug,
        bug.category !== updatedBug.category ? 'category' : ''
      )
    );

    setDescription({ ...description, edit: false });
    setChangeDone(false);
  };

  const closeBugDetail = (save: boolean): void => {
    if (save) {
      saveButtonClick();
    }
    dispatch(HideAlert());
    dispatch(ShowBugDetails(0, false));
    setDescription({ ...description, edit: false });
    setChangeDone(false);
  };

  const BugBasics = () => {
    const optionsGenerator = (
      options: Array<{ [key: string]: string }>,
      type: 'category' | 'severity' | 'reproducible'
    ) => {
      var i = 0;
      return options.map((item) => {
        i++;
        return (
          <option value={item.value} key={i}>
            {item.option}
          </option>
        );
      });
    };

    return (
      <div>
        <h1 className="ui header" id="BugDetailHeader">
          {title}
        </h1>
        <p className="ui meta" id="BugDetailCategory">
          ({StageHeadersObject[features.category]})
        </p>
        {description.edit ? (
          <textarea
            name="EditDescription"
            id="EditDescriptionTextArea"
            onChange={descriptionChange}
            onClick={(event) => event.stopPropagation()}
            value={description.content}
            rows={5}
          ></textarea>
        ) : (
          <React.Fragment>
            <div className="ui raised segment">
              <p className="BugDescription">{description.content}</p>
            </div>
            <p id="EditDescription" onClick={editDescriptionClick}>
              Edit Description
            </p>
          </React.Fragment>
        )}

        <div className="BugFeatures">
          <div className="BugFeature">Bug Reproducible</div>
          <select
            className="ui dropdown"
            value={features.reproducible}
            name="reproducible"
            onChange={optionSelect}
          >
            {optionsGenerator(
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
            value={features.severity}
            name="severity"
            onChange={optionSelect}
          >
            {optionsGenerator(
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
            value={features.category}
            onChange={optionSelect}
          >
            {optionsGenerator(
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
    );
  };

  const BugDeadline = () => {
    return (
      <div className="BugProperties">
        <div className="datePicker-container">
          <span>Deadline: </span>
          <span id="DatePicker">
            <DatePicker
              selected={deadline.date}
              onChange={deadlineChange}
              showTimeSelect
              disabled={!deadline.enabled}
              timeFormat="h:mm aa"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </span>
          <div
            id="EnableDeadlineButton"
            className="ui button"
            onClick={enableDeadlineButtonClick}
          >
            {deadline.enabled ? 'Disable' : 'Enable'}
          </div>
        </div>
      </div>
    );
  };

  const BugActionButtons = () => {
    return (
      <div id="ActionButtons">
        <button className="ui red button" onClick={deleteButtonClick}>
          Delete
        </button>
        {changeDone ? (
          <div
            className="ui inverted green button"
            id="SaveButton"
            onClick={saveButtonClick}
          >
            Save
          </div>
        ) : null}
      </div>
    );
  };

  return {
    changeDone,
    showBugDetail,
    BugBasics,
    BugDeadline,
    BugActionButtons,
    addAnotherNote,
    saveButtonClick,
    closeBugDetail,
  };
};

export default BugChars;
