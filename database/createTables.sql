/* -----------------------------------------------------------------
Script to create the Hebrew Letter Game database
*** Note this will delete all tables and therefore delete all data
-------------------------------------------------------------------*/

-- Assume database has been created and we are logged into the 
--  database as user qt_computer_access

-- Drop tables in reverse order of creation
DROP TABLE IF EXISTS high_scores;
DROP TABLE IF EXISTS login;

CREATE TABLE login(
  id SERIAL PRIMARY KEY,
  email CITEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  signup_date TIMESTAMP NOT NULL
);

-- This table has same primary key as previous table - so 1 to 1 relation
-- You could put all of the information in high_scores into login
-- I made a choice to separate them - since high_scores has no 'confidential'
-- information, whereas login does, such as the email and the hashed password
CREATE TABLE high_scores(
  id INTEGER REFERENCES login(id) PRIMARY KEY,
  user_handle CITEXT NOT NULL UNIQUE,
  high_score NUMERIC(7,1) DEFAULT NULL,
  score_rank SMALLINT DEFAULT NULL
);

