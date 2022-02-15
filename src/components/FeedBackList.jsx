import { motion, AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import React from 'react'
import FeedBackItem from './FeedBackItem'
import Spinner from './shared/spinner'
import FeedbackContext from '../context/FeedbackContext'

function FeedBackList() {
  const { feedback, isLoading } = useContext(FeedbackContext)

  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedback Yet</p>
  }
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedBackItem key={item._id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )

  //   return (
  //     <div className="feedback-list">
  //       {feedback.map((item) => (
  //         <FeedBackItem key={item.id} item={item} handleDelete={handleDelete} />
  //       ))}
  //     </div>
  //   );
}

// FeedBackList.propTypes = {
//   feedback: PropTypes.arrayOf(
//     PropTypes.shape({
//       //   id: PropTypes.number,
//       text: PropTypes.string.isRequired,
//       rating: PropTypes.number.isRequired,
//     })
//   ),
// };

export default FeedBackList
