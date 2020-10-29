import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'

class CommentUpdate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: {
        notes: '',
        date: ''
      },
      isLoaded: false,
      isUpdated: false
    }
  }
  componentDidMount () {
    axios.get(apiUrl + '/comments/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          isLoaded: true,
          comment: response.data.comment
        })
      })
      .catch(console.error)
  }
    handleChange = (event) => {
    // get value the user typed in
      const userInput = event.target.value
      // get the name of the input they typed in
      const commentKey = event.target.name // "title" or "author"
      // make a copy of the state (copy this javascript object)
      const commentCopy = Object.assign({}, this.state.comment)
      // updating the key in our copy with what the user typed
      commentCopy[commentKey] = userInput
      // updating the state with our new copy
      this.setState({ comment: commentCopy })
    }
  handleSubmit = (event) => {
    event.preventDefault()
    const newComment = this.state.comment
    // make POST request to API /games route with book data
    axios({
      url: `${apiUrl}/comments/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        comment: newComment
      }
    })
      .then((response) => this.setState({ isUpdated: true }))
      .catch(console.error)
  }
  render () {
    if (this.state.isUpdated !== false) {
      return <Redirect to="/" />
    }
    return (
      <div className='comment-update'>
        <h2>Comment Update</h2>
        <form onSubmit={this.handleSubmit}>
          <input name="notes" type="text" placeholder="Notes" value={this.state.comment.notes} onChange={this.handleChange} />
          <input name="date" type="text" placeholder="Date" value={this.state.comment.date} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
export default CommentUpdate
