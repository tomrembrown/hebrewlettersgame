'use strict'

const updateHandle = async function (client, id, user_handle) {
  try {
    await client.query('UPDATE high_scores SET user_handle=$1 WHERE id=$2', [
      user_handle,
      id,
    ])
  } catch (error) {
    console.error(`Error in updateHandle: ${error.message}`)
    throw new Error(`Error in updateHandle: ${error.message}`)
  }
}

module.exports = updateHandle
