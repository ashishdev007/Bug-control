import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import '../../public/BugDetail.css';
import { bug } from '../../actions/types';

import ModalForm from './BugDetailModal';

export interface Props {}

class BugDetail extends React.Component<PropsType> {
  content = () => {
    return (
      <div className="BugDetail">
        <div>
          <h1 className="ui header" id="BugDetailHeader">
            Bug Name
          </h1>
          <p className="ui meta" id="BugDetailCategory">
            (To Be Tested)
          </p>
          <div className="ui raised segment">
            <p className="BugDescription">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna
              molestie at elementum eu facilisis. Phasellus faucibus scelerisque
              eleifend donec pretium vulputate sapien nec. Sem nulla pharetra
              diam sit amet nisl suscipit. Amet purus gravida quis blandit
              turpis cursus in hac habitasse. Ac feugiat sed lectus vestibulum.
              Sed ullamcorper morbi tincidunt ornare massa eget. Enim nec dui
              nunc mattis enim ut tellus elementum sagittis. Elementum pulvinar
              etiam non quam lacus suspendisse. Egestas pretium aenean pharetra
              magna ac placerat vestibulum lectus mauris. Egestas dui id ornare
              arcu odio ut. Elementum tempus egestas sed sed. In dictum non
              consectetur a erat nam at. Id aliquet lectus proin nibh nisl
              condimentum id. Sed arcu non odio euismod lacinia. Eleifend donec
              pretium vulputate sapien nec sagittis aliquam malesuada bibendum.
              Nulla at volutpat diam ut venenatis tellus.
            </p>
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
            <div className="NoteDate">03/04/2000</div>
            <div className="ui card RecentNote">
              <div className="content">
                <div className="meta">09:00</div>
                <div className="description">
                  Veronika Ossi is a set designer living in New York who enjoys
                  kittens, music, and partying.
                </div>
              </div>
            </div>
            <div className="ui card RecentNote">
              <div className="content">
                <div className="meta">09:00</div>
                <div className="description">
                  Veronika Ossi is a set designer living in New York who enjoys
                  kittens, music, and partying.
                </div>
              </div>
            </div>
            <div className="NoteDate">03/04/2000</div>
            <div className="ui card RecentNote">
              <div className="content">
                <div className="meta">09:00</div>
                <div className="description">
                  Veronika Ossi is a set designer living in New York who enjoys
                  kittens, music, and partying.
                </div>
              </div>
            </div>
            <div className="ui card RecentNote">
              <div className="content">
                <div className="meta">09:00</div>
                <div className="description">
                  Veronika Ossi is a set designer living in New York who enjoys
                  kittens, music, and partying.
                </div>
              </div>
            </div>
          </div>
          <div className="OtherActions">
            <div id="AddNoteHeader">Add Note</div>
            <textarea
              name="NewNote"
              id="NewNote"
              cols={30}
              rows={10}
            ></textarea>
            <div className="ui primary button" style={{ margin: 'auto' }}>
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

  actions = () => {
    return <React.Fragment></React.Fragment>;
  };

  onDismiss = () => {};

  render() {
    return (
      <div>
        <ModalForm content={this.content} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

const mapStatetoProps = (state: any, ownProps: bug) => {
  return {};
};

const mapDispatchtoProps = {};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PropsType = PropsFromRedux & Props;

export default BugDetail;
