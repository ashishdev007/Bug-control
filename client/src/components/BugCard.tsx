import React, { Component } from 'react';
import '../public/BugCard.css';

import { bug } from '../actions/types';
export class BugCard extends Component<bug> {
  render() {
    return (
      <div className="ui card bugcard">
        <div className="content">
          <div className="header">{this.props.title}</div>
          <div className="meta">By Friend</div>
          <div className="description">{this.props.description}</div>
        </div>
      </div>
    );
  }
}

export default BugCard;
