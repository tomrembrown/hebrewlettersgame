/* -----------------------------------------------------------------
Script to create the Hebrew Letter Game database
*** Note this will delete all tables and therefore delete all data
-------------------------------------------------------------------*/

-- Assume database has been created and we are logged into the 
--  database as user qt_computer_access

-- Drop tables in reverse order of creation
DROP TABLE IF EXISTS high_scores;
DROP TABLE IF EXISTS login;

-- This is a standalone table - for quotations
CREATE TABLE login(
  id SERIAL PRIMARY KEY,
  email CITEXT NOT NULL,
  password_encrypted TEXT NOT NULL,
  signup_date TIMESTAMP NOT NULL
);

CREATE TABLE high_scores(
  id INTEGER REFERENCES login(id) NOT NULL,
  user_handle TEXT NOT NULL UNIQUE,
  high_score NUMERIC(7,1) DEFAULT NULL
);

