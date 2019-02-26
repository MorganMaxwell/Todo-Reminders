-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS reminder_db;
-- Creates the "blogger" database --
CREATE DATABASE reminder_db;
USE reminder_db;
CREATE TABLE users
(
    id int NOT NULL AUTO_INCREMENT,
    First_Name varchar(35) NOT NULL,
    Last_Name varchar(35) NOT NULL,
    User_Name varchar(35) NOT NULL,
    pword varchar(255) NOT NULL,
    User_ID INT(10) NOT NULL,
    PRIMARY KEY (id)
    
);

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
