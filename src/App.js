import React, { Suspense } from 'react';
import { connect } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import stl from './App.module.css';
import HeaderConteiner from './components/Header/HeaderConteiner';
import NavBar from './components/NavBar/NavBar';
import ProfileContainer from './components/ProFile/ProfileConteiner';

import Preloader from './components/common/Preloader/Preloader';
import Login from './components/login/login';
import News from './components/news/news';
import { initializedApp } from './redux/app-reducer';


const DialogsConteiner = React.lazy(() => import('./components/Dialogs/DialogsConteiner'));
const UsersConteiner = React.lazy(() => import('./components/Users/UsersConteiner'));
const Music = React.lazy(() => import('./components/music/Music'));

class App extends React.Component {

  componentDidMount() {
    this.props.initializedApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <HashRouter>
        <div className={stl.App}>
          <HeaderConteiner className={stl.header} />
          <div className={stl.appWrapper}>
            <NavBar />
            <div className={stl.main}>
              <Suspense >
                <Routes>
                  <Route path="/" element={<Navigate to="/profile" />} />
                  <Route path='/profile/:userId?' element={<ProfileContainer />} />
                  <Route path='/dialogs/*' element={<DialogsConteiner />} />
                  <Route path='/friends/*' element={<UsersConteiner />} />
                  <Route path='/music/*' element={<Music />} />
                  <Route path='/news/*' element={<News />} />
                  <Route path='/login/*' element={<Login />} />

                </Routes>
              </Suspense>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})
export default connect(mapStateToProps, { initializedApp })(App);

