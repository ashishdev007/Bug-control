import React, { useEffect, useState } from 'react';
import '../../public/Deadlines.css';

import ModalForm from '../bugs/bugDetail/BugDetailModal';
import { bug } from '../../actions/types';
import { Link } from 'react-router-dom';
import history from '../../history';

interface propsType {
  setShowDeadlines: (showDeadlines: boolean) => void;
}

interface DeadlinedBug {
  id: number;
  bugDeadline: string;
  title: string;
}
const Deadlines = (Props: propsType) => {
  const [overdue, setOverdue] = useState<Array<DeadlinedBug>>([]);
  const [upcoming, setUpcoming] = useState<Array<DeadlinedBug>>([]);

  useEffect(() => {
    fetch('http://localhost:1500/bugs/data/dealines')
      .then(async (response) => {
        var result = await response.json();
        if (response.status >= 200 && response.status <= 299) {
          return result;
        } else {
          throw result;
        }
      })
      .then((jsonResponse) => {
        setDeadlines(jsonResponse.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(overdue);
  }, [overdue]);

  const setDeadlines = (data: Array<any>) => {
    const today = new Date();
    var tempdate;
    var tempOverdue: Array<DeadlinedBug> = [];
    var tempUpcoming: Array<DeadlinedBug> = [];

    data.map((item: DeadlinedBug) => {
      tempdate = new Date(item.bugDeadline);

      if (today > tempdate) {
        tempOverdue.push(item);
      } else {
        tempUpcoming.push(item);
      }
    });
    setOverdue(tempOverdue);
    setUpcoming(tempUpcoming);
  };

  const showDealines = (dealines: Array<DeadlinedBug>) => {
    var key = 0;
    return dealines.map((item) => {
      key++;
      return (
        <div
          className="ui segment"
          key={key}
          onClick={() => deadlineClick(item.id)}
          style={{ cursor: 'pointer' }}
        >
          <p>{item.title}</p>
        </div>
      );
    });
  };

  const deadlineClick = (id: number) => {
    history.push(`/home/bug/${id}`);
  };

  const modalContent = () => {
    return (
      <div className="deadlines">
        {overdue.length > 0 ? (
          <React.Fragment>
            <div className="deadlineHeader" id="overdue">
              Overdue
            </div>
            <div className="ui segments">{showDealines(overdue)}</div>
          </React.Fragment>
        ) : null}
        {upcoming.length > 0 ? (
          <React.Fragment>
            <div className="deadlineHeader" id="overdue">
              Upcoming
            </div>
            <div className="ui segments">{showDealines(upcoming)}</div>
          </React.Fragment>
        ) : null}
      </div>
    );
  };

  const modalDismiss = () => {};
  return (
    <ModalForm
      content={modalContent}
      onDismiss={() => {
        Props.setShowDeadlines(false);
        modalDismiss();
      }}
    />
  );
};

export default Deadlines;
