import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Button, Container, Form, Header, Input } from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css';
import { signup } from '../../../store/users/actions';
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        company: '',
        email: '',
        password: '',
      },
    };

    autoBind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ user: { ...this.state.user, [name]: value }});
  }

  signup() {
    this.props.signup(this.state.user)
      .then(user => {
        console.log(user)
        this.props.history.push('/shoutouts/?teamId=TBMFNDYP2');
      })
      .catch(err => {
        Promise.resolve(err).then(err => {
          if (err.message) {
            alert(err.message);
          } else {
            alert(err);
          }
        })
      });
  }

  render() {
    return (
      <Container textAlign='left' style={{ marginTop: '2rem', paddingBottom: '1rem' }}>

        <Header as='h1' style={{paddingBottom: '1rem'}}>Signup</Header>

        <Form>
          <Header as='h3'>Your Account</Header>
          <Form.Field required width={6}>
            <label>Company Name</label>
            <Input name='name' placeholder="Your company's name" onChange={this.handleChange} />
          </Form.Field>
          <Form.Field required width={6}>
            <label>Email</label>
            <Input name='email' placeholder='Your email address' onChange={this.handleChange} />
          </Form.Field>
          <Form.Field required width={6}>
            <label>Password</label>
            <Input name='password' type='password' placeholder='Something super secret, at least 7 chars long' onChange={this.handleChange} />
          </Form.Field>
          <Button primary onClick={this.signup}>SIGN UP</Button>
        </Form>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    signup(user) {
      return dispatch(signup(user));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
