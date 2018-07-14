import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Grid, Image, Menu } from 'semantic-ui-react'
import './Shoutouts.css'
import queryString from 'query-string'

class Shoutouts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    let urlParams = queryString.parse(this.props.location.search)

    fetch(process.env.REACT_APP_API_URL + '/posts/?slackTeamId=' + urlParams.teamId, {
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
      return null
    }

    return (
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
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Shoutouts)
