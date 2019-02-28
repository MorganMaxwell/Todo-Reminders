-- Drops the reminder_db if it exists currently --
DROP DATABASE IF EXISTS reminder_db;
-- Creates the "reminder" database --
CREATE DATABASE reminder_db;
USE reminder_db;

CREATE TABLE items
(
    title varchar(20) NOT NULL,
    description_field varchar(255),
    category varchar(255),
    due_date INT(10),
    reocurring BOOLEAN,
    reocurring_monthly BOOLEAN,
    reocurring_weekly BOOLEAN,
    reocurring_daily BOOLEAN,
    inprogress BOOLEAN,
    user_ID INT(10) NOT NULL,
    deleted BOOLEAN NOT NULL,
    deleted_at INT(10)

);
