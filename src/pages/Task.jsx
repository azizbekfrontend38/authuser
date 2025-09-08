import React from 'react'
import { useParams } from 'react-router-dom'
import useDocument from '../hooks/useDocument'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useSelector } from 'react-redux'

export default function Task() {
  const { id } = useParams()
  const { data, error } = useDocument('tasks', id)
  const { user } = useSelector((store) => store.user)

  const handelSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const comment = formData.get('comment')

    const newComment = {
      text: comment,
      id: Math.random(),
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
    }

    const taskRef = doc(db, 'tasks', id)
    await updateDoc(taskRef, {
      comments: [...(data.comments || []), newComment],
    })

    e.target.reset()
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (!data) {
    return <p>Loading...</p>
  }

  return (
    <div className="task-container">
      <h1>Task - {data.title}</h1>

      <div className="comments-box">
        {data.comments?.length === 0 ? (
          <p className="no-comments">No comments</p>
        ) : (
          <div>
            {data.comments.map((comment) => (
              <div
                key={comment.id}
                className={`comment ${
                  comment.uid === user.uid ? 'me' : 'other'
                }`}
              >
                <img
                  src={comment.photoURL}
                  alt={comment.displayName}
                  className="avatar"
                />
                <span className="text">{comment.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handelSubmit} className="comment-form">
        <input type="text" placeholder="add comment" name="comment" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
