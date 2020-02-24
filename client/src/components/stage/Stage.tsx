import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { OpenBugForm } from '../../actions/bugActions';
import { bug } from '../../actions/types';

import BugCard from '../BugCard';
import '../../public/stage.css';

export class Stage extends Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    // this.state = {items}
  }

  componentDidUpdate(prevProps: PropsType) {
    console.log(this.props);
  }

  addButtonClick = () => {
    this.props.OpenBugForm(true, this.props.state);
  };

  getBugCards = () => {
    var i = 0;
    return this.props.items.map((item: bug) => {
      i++;
      return (
        <BugCard
          key={i}
          title={item.title}
          description={item.description}
          category={item.category}
        />
      );
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className="stage">
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
  var items = state.bugs.bugs[ownProps.state];
  return { items };
};

const mapDispatchtoProps = {
  OpenBugForm: OpenBugForm
};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type OtherPropsType = {
  stageType: string;
  state: string;
};

type PropsType = PropsFromRedux & OtherPropsType;

export default connector(Stage);
