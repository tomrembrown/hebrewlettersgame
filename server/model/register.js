'use strict'

const register = async function (
  client,
  email,
  password_hash,
  signup_date,
  user_handle
) {
  try {
    await client.query('BEGIN TRANSACTION;')

    const response = await client.query(
      'INSERT INTO login (email, password_hash, signup_date) ' +
        'VALUES ($1, $2, $3) ' +
        'RETURNING id;',
      [email, password_hash, signup_date]
    )
    const id = parseInt(response.rows[0].id)

    await client.query(
      'INSERT INTO high_scores (id, user_handle) VALUES ($1, $2);',
      [id, user_handle]
    )

    await client.query('COMMIT TRANSACTION;')
    const data = {
      id: id,
      user_handle: user_handle,
      high_score: null,
      score_rank: null,
    }
    return data
  } catch (error) {
    console.error(`Error in register: ${error.message}`)
    throw new Error(`Error in register: ${error.message}`)
  }
}

module.exports = register
