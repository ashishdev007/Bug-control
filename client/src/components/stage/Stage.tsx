import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  OpenBugForm,
  AddBugToCategory,
  DeleteBug
} from '../../actions/bugActions';
import { AddDraggedBug } from '../../actions/dragActions';
import { bug } from '../../actions/types';

import BugCard from '../BugCard';
import '../../public/stage.css';

export class Stage extends Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  componentDidUpdate(prevProps: PropsType) {
    // console.log(this.props);
  }

  addButtonClick = () => {
    this.props.OpenBugForm(true, this.props.state);
  };

  getBugCards = () => {
    var i = 0;
    return this.props.items.map((item: any) => {
      i++;
      return (
        <BugCard
          key={item.id}
          id={item.id}
          userid={item.userid}
          title={item.title}
          description={item.description}
          category={item.category}
        />
      );
    });
  };

  allowDrop = (event: any) => {
    event.preventDefault();
  };

  onDrop = (event: any) => {
    event.preventDefault();

    this.props.DeleteBug(this.props.draggedBug);

    var draggedBug = { ...this.props.draggedBug };
    draggedBug.category = this.props.state;

    this.props.AddBugToCategory(draggedBug);
  };

  render() {
    return (
      <div className="stage" onDrop={this.onDrop} onDragOver={this.allowDrop}>
        <div className="stageHead">
          <h1 className="stageName">{this.props.stageType}</h1>
          <p className="stageNoItems">10 Items</p>
        </div>
        <button className="fluid ui icon button" onClick={this.addButtonClick}>
          <i className="plus icon"></i>
        </button>
        {this.getBugCards()}
      </div>
    );
  }
}

const mapStatetoProps = (state: any, ownProps: OtherPropsType) => {
  var items = Object.values(state.bugs.bugs[ownProps.state]);
  var draggedBug = state.dragElement.draggedElement;
  return { items, draggedBug };
};

const mapDispatchtoProps = {
  OpenBugForm: OpenBugForm,
  AddBugToCategory: AddBugToCategory,
  AddDraggedBug: AddDraggedBug,
  DeleteBug: DeleteBug
};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type OtherPropsType = {
  stageType: string;
  state: string;
};

type PropsType = PropsFromRedux & OtherPropsType;

export default connector(Stage);
