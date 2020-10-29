import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
class CommentIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: [],
      isLoaded: false
    }
  }
  componentDidMount () {
    axios.get(apiUrl + '/comments')
      .then(response => {
        this.setState({
          isLoaded: true,
          comments: response.data.comments
        })
      })
      .catch(console.error)
  }
  render () {
    let jsx
    // while the books are loading
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    // if no books
    } else if (this.state.comments.length === 0) {
      jsx = <p>No comments inputted, please add one.</p>
    // if there are books
    } else {
      jsx = (
        <ul>
          {this.state.comments.map(event => {
            return <li key={event._id}><Link to={`/comments/${event._id}`}>{event.notes}</Link></li>
          })}
        </ul>
      )
    }
    return (
      <div className='comments-page'>
        {jsx}
      </div>
    )
  }
}
export default CommentIndex
