import React, { Component } from 'react';
import BugCard from './BugCard';
import '../public/stage.css';

export class Stage extends Component {
  render() {
    return (
      <div className="stage">
        <div className="stageHead">
          <h1 className="stageName">Open</h1>
          <p className="stageNoItems">10 Items</p>
        </div>
        <button className="fluid ui icon button">
          <i className="plus icon"></i>
        </button>
        <BugCard />
      </div>
    );
  }
}

export default Stage;
