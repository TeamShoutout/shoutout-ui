import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import { Redirect, Route, Switch } from 'react-router';
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
import { Card, Container, Grid, Image, Menu, } from 'semantic-ui-react';
import store from '../../store';
// import { fetchLoggedInUser } from '../../store/users/actions';
// import { getAllPosts } from '../../store/posts/actions';
import slackdown from 'slackdown';

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
          <Container className='App' textAlign='left' style={{ marginTop: '2em', paddingBottom: '150px' }}>
            <Menu size='small'>
              <Menu.Item>
                <Image
                  size='mini'
                  src='/images/logos/party-popper.png'
                />
              </Menu.Item>
              <Menu.Item header>
                BCGDV Shoutout
              </Menu.Item>
            </Menu>
            <Grid style={{ marginTop: '1em' }}>
              <Grid.Column width={16}>
                <Card.Group>
                  {
                    this.state.posts.map(post => {
                      return (
                        <Card key={ post.id }>
                          <Card.Content>
                            <Card.Header>{ post.slackRecipientRealName }</Card.Header>
                            <Card.Description>{ post.message.replace(/\<.*?\>/g, post.slackRecipientRealName) }</Card.Description>
                            <Card.Meta textAlign='right'>{ '- ' + post.slackSenderRealName }</Card.Meta>
                          </Card.Content>
                          <Card.Content extra>
                            {
                              post.categories ?
                                post.categories.map(category => {
                                  return <div key={ category.id }>{ category }</div>
                                })
                              : ''
                            }
                          </Card.Content>
                        </Card>
                      )
                    })
                  }
                </Card.Group>
              </Grid.Column>
            </Grid>
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
