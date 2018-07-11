import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
// import Header from './Header/Header';
// import Landing from './Landing/Landing';
// import Signup from './Signup/Signup';
// import Login from './Login/Login';
// import Thanks from './Thanks/Thanks';
// import Discover from './Discover/Discover';
// import Profile from './Profile/Profile';
// import Chat from './Chat/Chat';
import { Container } from 'semantic-ui-react';
import store from '../../store';
// import { fetchLoggedInUser } from '../../store/users/actions';
// import { getAllPosts } from '../../store/posts/actions';

class App extends Component {
  constructor(props) {
    super(props);

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
    //   this.loading = false;
    //   this.forceUpdate();
    // }

    fetch(process.env.REACT_APP_API_URL + '/posts', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(posts => {
        console.log(posts)
        this.setState({ posts: posts })
      })
  }

  render() {
    if (!this.state.posts) {
      return null;
    }

    return (
      <Provider store={store}>
        <BrowserRouter>
          <Container className='App' fluid>
            {
              this.state.posts.map(post => {
                return (
                  <div>{post.message}</div>
                )
              })
            }
            {/* { this.error ? <Redirect from='/' to='login' /> : '' } */}
            {/* <Header /> */}
            {/* <Switch>
              <Route exact path='/' component={Landing} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/thanks' component={Thanks} />
              <Route path='/discover' component={Discover} />
              <Route path='/profile' component={Profile} />
              <Route path='/chat' component={Chat} />
              <Route render={function () {
                return <p>Not Found</p>
              }} />
            </Switch> */}
          </Container>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
