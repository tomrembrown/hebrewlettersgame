'use strict'

const checkHandleTaken = async function (client, user_handle) {
  try {
    const response = await client.query(
      'SELECT id FROM high_scores WHERE user_handle=$1;',
      [user_handle]
    )
    return !(response.rowCount === 0)
  } catch (error) {
    console.error(`Error in checkHandleTaken: ${error.message}`)
    throw new Error(`Error in checkHandleTaken: ${error.message}`)
  }
}

module.exports = checkHandleTaken
