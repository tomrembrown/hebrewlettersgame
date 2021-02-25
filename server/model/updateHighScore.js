'use strict'

const updateHighScore = async function (client, id, high_score) {
  try {
    await client.query('UPDATE high_scores SET high_score=$1 WHERE id=$2', [
      high_score,
      id,
    ])

    const getRanksQuery =
      'SELECT   RANK () OVER (ORDER BY high_score DESC) AS score_rank, ' +
      '         id ' +
      'FROM high_scores ' +
      'WHERE high_score IS NOT NULL;'
    const ranks = await client.query(getRanksQuery)

    const updateRanksQuery =
      'UPDATE high_scores AS t SET ' +
      '       score_rank = c.score_rank ' +
      'FROM (VALUES ' +
      ranks.rows
        .map((row) => '(' + row.id + ', ' + row.score_rank + ')')
        .join() +
      ') as c(id, score_rank) where c.id = t.id;'

    await client.query(updateRanksQuery)
  } catch (error) {
    console.error(`Error in updateHighScore: ${error.message}`)
    throw new Error(`Error in updateHighScore: ${error.message}`)
  }
}

module.exports = updateHighScore
