/*mfchat-server sql-base */
/* CREATE DATABASE STATEMENT IF NOT EXISTS!
CREATE DATABASE mfchat_server DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
*/
/*MYSQL
CREATE TABLE IF NOT EXISTS users (
    uid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    tel VARCHAR(255) NOT NULL,
    information VARCHAR(255) NOT NULL,
    ugid INT NOT NULL,
    soft_delete ENUM("0","1") DEFAULT "0"
);

CREATE TABLE IF NOT EXISTS user_groups (
    ugid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    uid int NOT NULL,
    gid int NOT NULL
);

CREATE TABLE IF NOT EXISTS groups (
    gid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    admin_uid INT,
    soft_delete ENUM("0","1") DEFAULT "0"
);

CREATE TABLE IF NOT EXISTS roles (
    rid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS connections (
    cid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    time_of_connect TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type_of_connect VARCHAR(255) NOT NULL DEFAULT "WEB",
    uid INT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
    mid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    text TEXT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    sender_uid INT NOT NULL,
    recipient_uid INT,
    recipient_gid INT,
    time_of_send TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    soft_delete ENUM("0","1") DEFAULT "0"
);

CREATE TABLE IF NOT EXISTS messages_read (
    time_of_read TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    uid INT NOT NULL,
    mid INT NOT NULL
);
*/


/*PostgreSQL
CREATE TABLE IF NOT EXISTS users (
    uid SERIAL NOT NULL PRIMARY KEY ,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    tel VARCHAR(255) NOT NULL,
    information VARCHAR(255) NOT NULL,
    ugid INT NOT NULL,
    soft_delete boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS user_groups (
    ugid SERIAL NOT NULL PRIMARY KEY ,
    uid int NOT NULL,
    gid int NOT NULL
);

CREATE TABLE IF NOT EXISTS groups (
    gid SERIAL NOT NULL PRIMARY KEY ,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    admin_uid INT,
    soft_delete boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS roles (
    rid SERIAL NOT NULL PRIMARY KEY ,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS connections (
    cid SERIAL NOT NULL PRIMARY KEY ,
    time_of_connect TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type_of_connect VARCHAR(255) NOT NULL DEFAULT "WEB",
    uid INT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
    mid SERIAL NOT NULL PRIMARY KEY ,
    text TEXT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    sender_uid INT NOT NULL,
    recipient_uid INT,
    recipient_gid INT,
    time_of_send TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    soft_delete boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS messages_read (
    time_of_read TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    uid INT NOT NULL,
    mid INT NOT NULL
);

*/

INSERT INTO groups (name,description) VALUES("users","Base User");