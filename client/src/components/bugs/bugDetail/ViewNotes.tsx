import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { SeeAllNotes, ShowBugDetails } from '../../../actions/bugActions';

export interface ViewNotesPropsType {
  // notes?: Array<any>;
}

export interface StateType {
  notes: Array<any>;
  type: string;
}

class ViewNotes extends React.Component<PropsType, StateType> {
  state = { notes: [], type: 'RECENT' };

  componentDidMount() {
    this.getNotes();
  }

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (this.state.notes.length !== this.props.notes.length) {
      this.getNotes();
    }
  }

  getNotes = () => {
    var i = 0;
    var date = '';

    var notes = this.props.notes.map((item: any) => {
      var itemDate = new Date(item.dateTime);
      var tempDate = itemDate.toLocaleDateString();
      var itemTime = itemDate.toLocaleTimeString();
      itemTime =
        itemTime.length === 11
          ? itemTime.substring(0, 5) + itemTime.substring(9)
          : itemTime.substring(0, 4) + itemTime.substring(8);
      i++;

      if (tempDate === date) {
        return (
          <div className="ui card RecentNote" key={i}>
            <div className="content">
              <div className="meta">{itemTime}</div>
              <div className="description">{item.content}</div>
            </div>
          </div>
        );
      } else {
        date = tempDate;
        return (
          <React.Fragment key={i}>
            <div className="NoteDate">{date}</div>
            <div className="ui card RecentNote">
              <div className="content">
                <div className="meta">{itemTime}</div>
                <div className="description">{item.content}</div>
              </div>
            </div>
          </React.Fragment>
        );
      }
    });

    this.setState({ notes: notes });
  };

  showNotes = (no: number = this.state.notes.length) => {
    var len = no <= this.state.notes.length ? no : this.state.notes.length;
    var notes: Array<any> = this.state.notes.slice(0, len);

    if (this.state.notes.length > 0) {
      notes.push(
        <p className="NoteDate SeeAllNotes" onClick={this.seeAllNotesClick}>
          See All
        </p>
      );
    }
    return notes;
  };

  seeAllNotesClick = () => {
    this.props.SeeAllNotes(true, this.state.notes);
  };

  render() {
    if (this.state.type === 'RECENT') {
      return (
        <div className="RecentNotes">
          <h3 className="header">Recent Notes</h3>
          {this.showNotes(5)}
        </div>
      );
    }
  }
}

const mapStatetoProps = (state: any, ownProps: ViewNotesPropsType) => {
  const { notes } = state.bugs.bugDetail.bug;
  return { notes };
};

const mapDispatchtoProps = {
  SeeAllNotes: SeeAllNotes,
  ShowBugDetails: ShowBugDetails,
};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PropsType = PropsFromRedux & ViewNotesPropsType;

export default connector(ViewNotes);
