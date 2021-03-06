import React from 'react'

const Rank = ({ user_score_rank, user_handle, user_high_score }) => {
  return (
    <section id="rank">
      <p>
        {user_score_rank == null
          ? 'Currently signed in as ' + user_handle
          : user_handle +
            ', your current rank is #' +
            user_score_rank +
            ', with a personal all-time high score of ' +
            user_high_score}
      </p>
    </section>
  )
}

export default Rank
