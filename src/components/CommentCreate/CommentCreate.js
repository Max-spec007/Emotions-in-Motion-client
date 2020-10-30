import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

class CommentCreate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: {
        notes: '',
        date: ''
      },
      createdCommentId: ''
    }
  }

  handleChange = (event) => {
    // get value the user typed in
    const userInput = event.target.value
    // get the name of the input they typed in
    const commentKey = event.target.name
    // make a copy of the state
    const commentCopy = Object.assign({}, this.state.comment)
    // updating the key in our copy with what the user typed
    commentCopy[commentKey] = userInput
    // updating the state with our new copy
    this.setState({ comment: commentCopy })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const handleComment = this.state.comment
    // make POST request to API /games route with book data
    axios({
      url: `${apiUrl}/comments`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        comment: handleComment
      }
    })
      .then((response) => {
        this.setState({ createdCommentId: response.data.comment._id })
        this.props.msgAlert({
          heading: 'Successfully Created',
          message: messages.createCommentSuccess,
          variant: 'success'
        })
      })
      .catch(console.error)
  }

  render () {
    if (this.state.createdCommentId !== '') {
      return <Redirect to="/" />
    }

    return (
      <div className='create'>
        <h2>Create Words of Positivity</h2>
        <form onSubmit={this.handleSubmit}>
          <input name="notes" type="text" placeholder="Notes" value={this.state.comment.notes} onChange={this.handleChange} />
          <input name="date" type="text" placeholder="Date" value={this.state.comment.date} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default CommentCreate
