import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
class CommentShow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: {},
      isLoaded: false,
      deleted: false
    }
  }
  componentDidMount () {
    axios.get(apiUrl + '/comments/' + this.props.match.params.id)
      .then(response => {
        // troubleshoot step 1 - are we getting a response from the API?
        this.setState({
          isLoaded: true,
          comment: response.data.comment
        })
      })
      .catch(console.error)
  }
  destroy = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/comments/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => {
        this.props.msgAlert({
          heading: 'Successfully Deleted',
          message: messages.deleteEventSuccess,
          variant: 'success'
        })
        this.props.history.push('/')
      })
      // don't need the deleted state, instead just gonna redirect home
      // right after the axios call success
      .catch(console.error)
  }
  like = (event) => {
    event.preventDefault()
    if (this.state.comment.likes.every(like => like.owner._id !== this.props.user._id)) {
      axios({
        url: `${apiUrl}/likes`,
        method: 'POST',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        },
        data: {
          commentId: this.props.match.params.id
        }
      })
        .then(() => {
          axios.get(apiUrl + '/comments/' + this.props.match.params.id)
            .then(response => {
              // troubleshoot step 1 - are we getting a response from the API?
              this.setState({
                isLoaded: true,
                comment: response.data.comment
              })
            })
            .catch(console.error)
        })
    } else {
      this.props.msgAlert({
        heading: 'YOU HAVE ALREADY LIKED THE COMMENTED',
        message: 'UNSUCCESSFUL LIKE',
        variant: 'danger'
      })
    }
  }
  destroyLike = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/likes/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => {
        this.props.msgAlert({
          heading: 'Successfully Unliked Comment',
          message: messages.deleteEventSuccess,
          variant: 'success'
        })
        this.props.history.push('/')
      })
      // don't need the deleted state, instead just gonna redirect home
      // right after the axios call success
      .catch(console.error)
  }
  render () {
    // troubleshoot step 2 - is the render for BookShow.js being called?
    let jsx
    // while the book is loading
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    } else {
      let button = ''
      if (this.state.comment.likes.some(like => like.owner._id === this.props.user._id)) {
        button = <button onClick={this.destroyLike}>Unlike Comment</button>
      }
      let deleteButton = ''
      if (this.state.comment.owner === this.props.user._id) {
        deleteButton = <button onClick={this.destroy}>Delete Comment</button>
      }
      jsx = (
        <div>
          <ul>
            <li>{this.state.comment._id}</li>
            <li>{this.state.comment.notes}</li>
            <li>{this.state.comment.date}</li>
          </ul>
          {deleteButton}
          <button onClick={this.like}>Like Comment</button>
          {button}
          <ul>
            {this.state.comment.likes.map(like => (
              <li key={like.owner._id}>{like.owner.email}</li>
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div className='comment-page'>
        <h2>Comments Page</h2>
        {jsx}
      </div>
    )
  }
}
export default withRouter(CommentShow)
// withRouter we can get access to this.props.history
