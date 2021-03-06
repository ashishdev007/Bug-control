import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  OpenBugForm,
  AddBugToCategory,
  EditBugDetails,
  DeleteBug,
} from '../../actions/bugActions';
import { AddDraggedBug } from '../../actions/dragActions';

import BugCard from '../bugs/BugCard';
import '../../public/stage.css';

export class Stage extends Component<PropsType> {
  addButtonClick = () => {
    this.props.OpenBugForm(true, this.props.state);
  };

  getBugCards = () => {
    const items = Object.values(this.props.items);

    return items.map((item: any) => {
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

    var draggedBug = { ...this.props.draggedBug };
    draggedBug.category = this.props.state;

    this.props.EditBugDetails(draggedBug, 'category');
  };

  render() {
    const noOfItems = Object.keys(this.props.items).length;

    return (
      <div className="stage" onDrop={this.onDrop} onDragOver={this.allowDrop}>
        <div className="stageHead">
          <h1 className="stageName">{this.props.stageType}</h1>
          <p className="stageNoItems">
            {noOfItems === 1 ? `${noOfItems} Item` : `${noOfItems} Items`}
          </p>
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
  var items = state.bugs.bugs[ownProps.state];
  var draggedBug = state.dragElement.draggedElement;
  return { items, draggedBug };
};

const mapDispatchtoProps = {
  OpenBugForm: OpenBugForm,
  AddBugToCategory: AddBugToCategory,
  AddDraggedBug: AddDraggedBug,
  DeleteBug: DeleteBug,
  EditBugDetails,
};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type OtherPropsType = {
  stageType: string;
  state: string;
};

type PropsType = PropsFromRedux & OtherPropsType;

export default connector(Stage);
