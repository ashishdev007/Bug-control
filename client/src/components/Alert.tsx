import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import AlertModal from '../modals/alertModal';

export interface AlertPropsType {
  show: boolean;
  title: string;
  description: string;
  icon: string | null;
  dismiss: () => void;
}

export interface AlertState {}

class Alert extends React.Component<PropsType> {
  render() {
    console.log(this.props.icon);

    if (this.props.show) {
      return (
        <AlertModal
          icon={this.props.icon}
          title={this.props.title}
          description={this.props.description}
          dismiss={this.props.dismiss}
        />
      );
    } else {
      return null;
    }
  }
}

const mapStatetoProps = (state: any) => {
  const { show, title, description, icon, dismiss } = state.alert;
  return { show, title, description, icon, dismiss };
};

const mapDispatchtoProps = {};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PropsType = PropsFromRedux & AlertPropsType;

export default connector(Alert);
