-- BEGIN
-- 	EXECUTE IMMEDIATE 'DROP TABLE Rates';
-- EXCEPTION
-- 	WHEN others THEN
-- 		DBMS_OUTPUT.PUT_LINE('No such table');
-- END;
-- /
DROP TABLE EDUCATIONS;
-- DROP TABLE Rates;
DROP TABLE EnrolledIn;
DROP TABLE Batches;
DROP TABLE Courses;
DROP TABLE MemberOf;
DROP TABLE Coachings;
DROP TABLE Offers;
DROP TABLE Applies;
DROP TABLE Tution_Posts;
DROP TABLE Tutions;
DROP TABLE Tutors;
DROP TABLE Students;
DROP TABLE Users;
DROP TABLE Classes;
DROP TABLE Mediums;

CREATE TABLE Classes (
	class_id		NUMBER PRIMARY KEY,
	class 			VARCHAR2(100) NOT NULL
);
INSERT INTO Classes VALUES(1,'Class 1');
INSERT INTO Classes VALUES(2,'Class 2');
INSERT INTO Classes VALUES(3,'Class 3');	
INSERT INTO Classes VALUES(4,'Class 4');
INSERT INTO Classes VALUES(5,'Class 5');
INSERT INTO Classes VALUES(6,'Class 6');
INSERT INTO Classes VALUES(7,'Class 7');
INSERT INTO Classes VALUES(8,'Class 8');
INSERT INTO Classes VALUES(9,'Class 9');
INSERT INTO Classes VALUES(10,'Class 10');
INSERT INTO Classes VALUES(11,'Class 11');
INSERT INTO Classes VALUES(12,'Class 12');
INSERT INTO Classes VALUES(13,'SSC');
INSERT INTO Classes VALUES(14,'HSC');
INSERT INTO Classes VALUES(15,'A Level');
INSERT INTO Classes VALUES(16,'O Level');
INSERT INTO Classes VALUES(17,'Admission');

CREATE TABLE Mediums (
	medium_id		NUMBER PRIMARY KEY,
	medium 			VARCHAR2(100) NOT NULL
);
INSERT INTO Mediums VALUES(1,'Bangla Medium');
INSERT INTO Mediums VALUES(2,'English Medium');
INSERT INTO Mediums VALUES(3,'English Version');	

CREATE TABLE Users (
  user_id 			NUMBER Primary Key,
  name 					VARCHAR2(100) NOT NULL,
  image 				VARCHAR2(1000) DEFAULT ON NULL 'sample.jpg',
  email 				VARCHAR2(100) NOT NULL UNIQUE,
  pass 					VARCHAR2(1024) NOT NULL,
  role 					VARCHAR2(1024) NOT NULL,
  gender 				VARCHAR2(10),
  phone_number 	VARCHAR2(15),
  date_of_birth DATE
);

CREATE TABLE Students (
	user_id 		NUMBER 	REFERENCES Users(user_id)
							ON DELETE CASCADE
							PRIMARY KEY,
	institution VARCHAR2(1024),
	version 		VARCHAR2(1024),
	class 			VARCHAR2(1024),
	address  		VARCHAR2(1024)
);

CREATE TABLE Tutors (
	user_id 						NUMBER 	REFERENCES Users(user_id)
											ON DELETE CASCADE
											PRIMARY KEY,
	expertise						VARCHAR2(1024),
	availability 				VARCHAR2(100),
	years_of_experience NUMBER,
	preffered_salary 		NUMBER
);

CREATE TABLE Tutions (
	tution_id 		NUMBER Primary Key,
	subjects 			VARCHAR2(1024) NOT NULL,
	salary 				NUMBER NOT NULL,
	days_per_week NUMBER NOT NULL,
	type 					VARCHAR2(100) NOT NULL
);

CREATE TABLE Tution_Posts (
	post_id 							NUMBER Primary Key,
	student_id 						NUMBER REFERENCES Students(user_id)
												ON DELETE CASCADE,
	tution_id 						NUMBER REFERENCES Tutions(tution_id)
												ON DELETE CASCADE,
	timestamp 						DATE DEFAULT sysdate NOT NULL,
	desired_tutor_gender 	VARCHAR2(10) NOT NULL
);

CREATE TABLE Applies (
	tutor_id	NUMBER 	REFERENCES Tutors(user_id)
						ON DELETE CASCADE,
	post_id 	NUMBER 	REFERENCES Tution_Posts(post_id)
						ON DELETE CASCADE
);

CREATE TABLE Offers (
	student_id 	NUMBER 	REFERENCES Students(user_id) 
							ON DELETE CASCADE,
	tutor_id 		NUMBER 	REFERENCES Tutors(user_id) 
							ON DELETE CASCADE,
	tution_id 	NUMBER 	REFERENCES Tutions(tution_id)
							ON DELETE CASCADE,
	status 			VARCHAR2(100) DEFAULT ON NULL 'PENDING',
	rating 			NUMBER,
	PRIMARY KEY(student_id,tutor_id)
);

CREATE TABLE Coachings(
	coaching_id    	NUMBER PRIMARY KEY,
	image          	VARCHAR2(100) DEFAULT ON NULL 'coaching.png',
	name           	VARCHAR2(100) NOT NULL,
	address					VARCHAR2(1024) NOT NULL,
	phone_number 		VARCHAR2(15) NOT NULL
);

CREATE TABLE MemberOf(
	user_id        	NUMBER  REFERENCES Users(user_id)
									ON DELETE CASCADE,
	coaching_id    	NUMBER  REFERENCES Coachings(coaching_id)
									ON DELETE CASCADE,
	type           	VARCHAR2(100),
	PRIMARY KEY   	(user_id,coaching_id)
);

CREATE TABLE  Courses(
	course_id    	NUMBER  PRIMARY KEY,
	coaching_id  	NUMBER 	REFERENCES Coachings(coaching_id)
								ON DELETE CASCADE,
	class        	VARCHAR2(100) NOT NULL,
	subject				VARCHAR2(100) NOT NULL
);


CREATE TABLE  Batches(
	batch_id    	NUMBER  PRIMARY KEY,
  course_id  		NUMBER 	REFERENCES Courses(course_id)
								ON DELETE CASCADE,
	start_date		DATE NOT NULL,
	seats					NUMBER NOT NULL,
	students			NUMBER DEFAULT 0,
	class_days		VARCHAR2(100) NOT NULL,	
	class_time		VARCHAR2(100) NOT NULL
);

CREATE TABLE  EnrolledIn(
	student_id    NUMBER 	REFERENCES Students(user_id)
								ON DELETE CASCADE,
	course_id   	NUMBER REFERENCES Courses(course_id)
								ON DELETE CASCADE,
	batch_id   	  NUMBER REFERENCES Batches(batch_id)
								ON DELETE CASCADE,
	PRIMARY KEY (student_id,course_id)
);

CREATE TABLE Educations (
	eq_id 					NUMBER PRIMARY KEY,
	tutor_id 				NUMBER 	REFERENCES Tutors(user_id)
									ON DELETE CASCADE,
	institute 			VARCHAR2(100),
	field_of_study 	VARCHAR2(100),
	degree					VARCHAR2(100),
	passing_year		NUMBER
);

-- CREATE TABLE Rates (
-- 	student_id 		NUMBER 	REFERENCES Students(user_id)
-- 								ON DELETE CASCADE,
-- 	tutor_id 		NUMBER 	REFERENCES Tutors(user_id)
-- 							ON DELETE CASCADE,
-- 	rating 			NUMBER NOT NULL,
-- 	PRIMARY KEY (student_id,tutor_id)
-- );
