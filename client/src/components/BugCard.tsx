import React, { Component } from 'react';
import '../public/BugCard.css';

export class BugCard extends Component {
  render() {
    return (
      <div className="ui card bugcard">
        <div className="content">
          <div className="header">Elliot Fu</div>
          <div className="meta">By Friend</div>
          <div className="description">
            Elliot Fu is a film-maker from New York. Elliot Fu is a film-maker
            from New York.
          </div>
        </div>
      </div>
    );
  }
}

export default BugCard;
