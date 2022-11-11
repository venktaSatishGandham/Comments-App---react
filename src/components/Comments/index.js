import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeCommentInput = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }

  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Comments</h1>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-description">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <textarea
                placeholder="Your Comment"
                className="comment-input"
                value={commentInput}
                onChange={this.onChangeCommentInput}
                rows="6"
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="comments-count">{commentsList.length}</span>
            Comments
          </p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments

/*
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {formatDistanceToNow} from 'date-fns'

import CommentItem from '../CommentItem/index'

import './index.css'

// const initialContainerBackgroundClassNames = [
//   'amber',
//   'blue',
//   'orange',
//   'emerald',
//   'teal',
//   'red',
//   'light-blue',
// ]

// Write your code here

class Comments extends Component {
  state = {
    changeInputElement: '',
    changeTextareaElement: '',
    commentsList: [],
  }

  onFormSubmit = e => {
    e.preventDefault()
    const {changeInputElement, changeTextareaElement} = this.state
    const newList = {
      changeInputElement,
      changeTextareaElement,
      id: uuidv4(),
      isLiked: false,
      getDate: formatDistanceToNow(new Date()),
    }
    this.setState(prev => ({
      commentsList: [...prev.commentsList, newList],
      changeInputElement: '',
      changeTextareaElement: '',
    }))
  }

  onToggleLikeButton = id => {
    this.setState(prev => ({
      commentsList: prev.commentsList.map(each => {
        if (id === each.id) {
          return {
            ...each,
            isLiked: !each.isLiked,
          }
        }
        return each
      }),
    }))
  }

  onDeleteCommentFromList = id => {
    const {commentsList} = this.state
    const remainList = commentsList.filter(each => each.id !== id)
    this.setState({commentsList: remainList})
  }

  onChangeInputElement = e => {
    this.setState({
      changeInputElement: e.target.value,
    })
  }

  onChangeTextareaElement = e => {
    this.setState({
      changeTextareaElement: e.target.value,
    })
  }

  render() {
    const {changeInputElement, changeTextareaElement, commentsList} = this.state
    // console.log(commentsList[0].changeInputElement)
    return (
      <div className="container">
        <h1>Comments</h1>

        <div className="top-container">
          <div>
            <p>Say something about 4.0 Technologies</p>
            <form className="form" onSubmit={this.onFormSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={changeInputElement}
                onChange={this.onChangeInputElement}
              />
              <textarea
                placeholder="Your Comment"
                value={changeTextareaElement}
                onChange={this.onChangeTextareaElement}
              />
              <button type="submit">Add Comment</button>
            </form>
          </div>
          <div>
            <img
              alt="comments"
              className="big-img"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            />
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="bottom-section">
          <p className="count">{commentsList.length}</p>
          <p>Comments</p>
        </div>
        <ul>
          {commentsList.map(each => (
            <CommentItem
              key={each.id}
              onToggleLike={this.onToggleLikeButton}
              onDeleteCommentFromList={this.onDeleteCommentFromList}
              commentItem={each}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
*/
