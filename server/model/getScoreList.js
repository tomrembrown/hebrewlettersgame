'use strict'

const getScoreList = async function (client) {
  try {
    const getScoreListQuery =
      'SELECT   score_rank, ' +
      '         user_handle, ' +
      '         high_score ' +
      'FROM high_scores ' +
      'WHERE high_score IS NOT NULL ' +
      'ORDER BY high_score DESC;'
    const data = await client.query(getScoreListQuery)
    return data.rows
  } catch (error) {
    console.error(`Error in getScoreListQuery: ${error.message}`)
    throw new Error(`Error in getScoreListQuery: ${error.message}`)
  }
}

module.exports = getScoreList
