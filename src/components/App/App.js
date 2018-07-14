import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
// import Header from './Header/Header';
import Shoutouts from './Shoutouts/Shoutouts'
import Signup from './Signup/Signup';
import store from '../../store'
// import { fetchLoggedInUser } from '../../store/users/actions';
// import { getAllPosts } from '../../store/posts/actions';

class App extends Component {
  constructor(props) {
    super(props)

    // this.loading = true;
    // this.error = false;
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    // restore last session
    // let user = localStorage.getItem('liu');
    // if (user) {
    //   user = JSON.parse(user).user;
    //   if (!user || !user.token) {
    //     console.error('faulty liu in localstorage');
    //     return;
    //   }
    //   store.dispatch(fetchLoggedInUser(user.id, user.token))
    //     .then(user => {
    //       this.loading = false;
    //       this.forceUpdate();
    //     })
    //     .catch(err => {
    //       this.loading = false;
    //       this.error = true;
    //       this.forceUpdate();
    //     });
    // } else {
    //   this.loading = false
    //   this.forceUpdate();
    // }
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
            {/* { this.error ? <Redirect from='/' to='login' /> : '' } */}
            {/* <Header /> */}
            <Switch>
              {/* <Route exact path='/' component={ Landing } /> */}
              <Route path='/shoutouts' component={ Shoutouts } />
              <Route path='/signup' component={Signup} />
              <Route render={function () {
                return <p>Not Found</p>
              }} />
            </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
