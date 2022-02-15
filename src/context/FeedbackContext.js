import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // Fetch Feedback
  const fetchFeedback = async () => {
    // const response = await fetch(`/feedbacks?_sort=id&_order=desc`)
    const response = await fetch(`/feedbacks`)

    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
  }

  // Add Feedback
  const addFeedback = async (newFeedback) => {
    console.log(JSON.stringify(newFeedback))
    const response = await fetch('/feedbacks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()
    console.log(data)

    setFeedback([data, ...feedback])
  }

  // DeleteFeedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedbacks/${id}`, { method: 'DELETE' })
      setFeedback(feedback.filter((item) => item._id !== id))
    }
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  // Update feedback item
  const updateFeedback = async (id, updItem) => {
    console.log(updItem)
    const response = await fetch(`/feedbacks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })
    console.log(id)

    const data = await response.json()
    setFeedback(
      feedback.map((item) => (item._id === id ? { ...item, ...data } : item))
    )
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        // same as
        // feedback: feedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
