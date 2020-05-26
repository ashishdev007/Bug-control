import React from 'react';
import '../../public/Landing.css';
import homeImage from '../../public/bug_fixing.svg';

import Login from './Login';

export interface HomePageProps {}

export interface HomePageState {}

class HomePage extends React.Component<HomePageProps, HomePageState> {
  render() {
    return (
      <div className="HomeScreen">
        <div className="ImageField">
          <img src={homeImage} alt="homeImage" />
        </div>
        <Login />
      </div>
    );
  }
}

export default HomePage;
