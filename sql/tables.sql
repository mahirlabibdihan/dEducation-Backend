DROP TABLE Rates;
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


CREATE TABLE Users (
  user_id 		NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) Primary Key,
  name 			VARCHAR2(100) NOT NULL,
  image 		VARCHAR2(1000) DEFAULT ON NULL 'sample.jpg',
  email 		VARCHAR2(100) NOT NULL,
  pass 			VARCHAR2(1024) NOT NULL,
  role 			VARCHAR2(1024) NOT NULL,
  gender 		VARCHAR2(10),
  phone_number 	VARCHAR2(15),
  date_of_birth DATE
);

INSERT INTO Users(name,image,email,pass,role,gender,phone_number,date_of_birth)
VALUES('Mahir Labib Dihan','student1.jpg','mahirlabibdihan@gmail.com','$2a$10$8GBsWOPaNtD5gUZu1bNB7uCh0mk3Y6NY25SnGTr1mbuWwKsFPYY5G','STUDENT','Male','01851953433',to_date('19-AUG-01','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,role,gender,phone_number,date_of_birth)
VALUES ('Noushin Tarannum Subha','female_student.jpg','noushintarannum@gmail.com','$2a$10$t7tfxUp7R/loxmxKcuAbY.sObMjcHiwrps/mTpq0/1jJqlfj9BCl2','STUDENT','Female','01851953433',to_date('01-OCT-07','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,role,gender,phone_number,date_of_birth)
VALUES ('Muntasir Mamun Nahid','male_student.jpg','nahidtakla@gmail.com','$2a$10$cNR392ChvTW9rJ4BUY8fDep68xgk7MlJ0pgB.HIAkA/E69HKSSeM2','STUDENT','Male','01684828706',to_date('27-AUG-01','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,role,gender,phone_number,date_of_birth)
VALUES('Mahir Tazwar Ohi','tutor1.jpg','mahirtazwarohi@gmail.com','$2a$10$8GBsWOPaNtD5gUZu1bNB7uCh0mk3Y6NY25SnGTr1mbuWwKsFPYY5G','TUTOR','Male','01767493500',to_date('03-DEC-00','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,role,gender,phone_number,date_of_birth)
VALUES('Md Sharif Uddin','tutor2.jpg','sharif@gmail.com','$2a$10$8GBsWOPaNtD5gUZu1bNB7uCh0mk3Y6NY25SnGTr1mbuWwKsFPYY5G','TUTOR','Male','01867549950',to_date('03-MAR-00','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,role,gender,phone_number,date_of_birth)
VALUES ('Tareq Ahmed','tutor3.jpg','1905071@gmail.com','$2a$10$GgiK3IOV9GluNyOnl.P0xO/jnfIudswCvwdKLFm0SKd39sHi4Misq','TUTOR','Male','01478066006',to_date('01-JAN-00','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,role,gender,phone_number,date_of_birth)
VALUES ('Souvik Ghosh','tutor4.jpg','1905073@gmail.com','$2a$10$GgiK3IOV9GluNyOnl.P0xO/jnfIudswCvwdKLFm0SKd39sHi4Misq','TUTOR','Male','01911714385',to_date('01-JAN-00','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,role,gender,phone_number,date_of_birth)
VALUES ('Sadat Hossain','tutor5.jpg','1905001@gmail.com','$2a$10$GgiK3IOV9GluNyOnl.P0xO/jnfIudswCvwdKLFm0SKd39sHi4Misq','TUTOR','Male','01891578643',to_date('01-JAN-00','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,role,gender,phone_number,date_of_birth)
VALUES ('Anindya Haque','tutor6.jpg','1905070@gmail.com','$2a$10$GgiK3IOV9GluNyOnl.P0xO/jnfIudswCvwdKLFm0SKd39sHi4Misq','TUTOR','Male','01881536649',to_date('01-JAN-00','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,role,gender,phone_number,date_of_birth)
VALUES ('Syeda Rifah Tasfia','tutor7.jpg','1905019@gmail.com','$2a$10$GgiK3IOV9GluNyOnl.P0xO/jnfIudswCvwdKLFm0SKd39sHi4Misq','TUTOR','Female','01891556749',to_date('01-JAN-00','DD-MON-RR'));

CREATE TABLE Students (
	user_id 	NUMBER 	REFERENCES Users(user_id)
						ON DELETE CASCADE
						PRIMARY KEY,
	institution VARCHAR2(1024),
	version 	VARCHAR2(1024),
	class 		VARCHAR2(1024),
	address  	VARCHAR2(1024)
);

INSERT INTO Students (user_id,institution,version,class,address) 
VALUES (1,'NDC','Bangla','HSC - 2nd year','38/1, Indira Road, Farmgate, Dhaka');
INSERT INTO Students (user_id,institution,version,class,address) 
VALUES (2,'YWCA','Bangla','8','38/1, Indira road, Dhaka');
INSERT INTO Students (user_id,institution,version,class,address) 
VALUES (3,'NDC','Bangla','12','Banasree, Dhaka');
CREATE TABLE Tutors (
	user_id 			NUMBER 	REFERENCES Users(user_id)
								ON DELETE CASCADE
								PRIMARY KEY,
	expertise			VARCHAR2(1024),
	availability 		VARCHAR2(100),
	years_of_experience NUMBER,
	preffered_salary 	NUMBER
);


INSERT INTO Tutors (user_id,expertise,availability,years_of_experience,preffered_salary) 
VALUES (4,'Math, Physics, Chemistry','Available',4,10000);
INSERT INTO Tutors (user_id,expertise,availability,years_of_experience,preffered_salary) 
VALUES (5,'Math, ICT','Available',2,8000);
INSERT INTO Tutors (user_id,expertise,availability,years_of_experience,preffered_salary) 
VALUES (6,'Math','Available',3,10000);
INSERT INTO Tutors (user_id,expertise,availability,years_of_experience,preffered_salary) 
VALUES (7,'Physics','Available',3,10000);
INSERT INTO Tutors (user_id,expertise,availability,years_of_experience,preffered_salary) 
VALUES (8,'Math, Physics, Chemistry','Unavailable',3,10000);
INSERT INTO Tutors (user_id,expertise,availability,years_of_experience,preffered_salary) 
VALUES (9,'Math','Unavailable',3,10000);
INSERT INTO Tutors (user_id,expertise,availability,years_of_experience,preffered_salary) 
VALUES (10,'English','Available',3,10000);



CREATE TABLE Tutions (
	tution_id 		NUMBER  GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) Primary Key,
	subjects 		VARCHAR2(1024) NOT NULL,
	salary 			NUMBER NOT NULL,
	days_per_week 	NUMBER NOT NULL,
	type 			VARCHAR2(100) NOT NULL
);

INSERT INTO Tutions (subjects,salary,days_per_week,type) 
VALUES ('Math',10000,3,'Offline');
INSERT INTO Tutions (subjects,salary,days_per_week,type) 
VALUES ('Physics',5000,3,'Offline');
INSERT INTO Tutions (subjects,salary,days_per_week,type) 
VALUES ('Math',8000,3,'Offline');
INSERT INTO Tutions (subjects,salary,days_per_week,type) 
VALUES ('Math, Physics, Chemistry',10000,4,'Online');
INSERT INTO Tutions (subjects,salary,days_per_week,type) 
VALUES ('Bangla, English',5000,4,'Offline');
INSERT INTO Tutions (subjects,salary,days_per_week,type) 
VALUES ('Math, Physics, Chemistry',10000,4,'Online');
INSERT INTO Tutions (subjects,salary,days_per_week,type) 
VALUES ('C++',5000,3,'Online');
INSERT INTO Tutions (subjects,salary,days_per_week,type) 
VALUES ('Math, Physics, Chemistry',10000,3,'Online');
INSERT INTO Tutions (subjects,salary,days_per_week,type) 
VALUES ('English',8000,2,'Offline');
INSERT INTO Tutions (subjects,salary,days_per_week,type) 
VALUES ('Bangla',5000,3,'Online');
INSERT INTO Tutions (subjects,salary,days_per_week,type) 
VALUES ('Math',10000,3,'Offline');
INSERT INTO Tutions (subjects,salary,days_per_week,type) 
VALUES ('Math',12000,7,'Online');
INSERT INTO Tutions (subjects,salary,days_per_week,type) 
VALUES ('English, Bangla',5000,5,'Offline');

CREATE TABLE Tution_Posts (
	post_id 				NUMBER  GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) Primary Key,
	student_id 				NUMBER REFERENCES Students(user_id)
							ON DELETE CASCADE,
	tution_id 				NUMBER REFERENCES Tutions(tution_id)
							ON DELETE CASCADE,
	timestamp 				TIMESTAMP(6) DEFAULT systimestamp NOT NULL,
	desired_tutor_gender 	VARCHAR2(10) NOT NULL
);

INSERT INTO Tution_Posts (student_id,tution_id,desired_tutor_gender) 
VALUES (1,1,'Male');
INSERT INTO Tution_Posts (student_id,tution_id,desired_tutor_gender) 
VALUES (1,2,'Female');
INSERT INTO Tution_Posts (student_id,tution_id,desired_tutor_gender) 
VALUES (1,3,'Male');
INSERT INTO Tution_Posts (student_id,tution_id,desired_tutor_gender) 
VALUES (1,4,'Male');
INSERT INTO Tution_Posts (student_id,tution_id,desired_tutor_gender) 
VALUES (2,5,'Male');
INSERT INTO Tution_Posts (student_id,tution_id,desired_tutor_gender) 
VALUES (2,6,'Male');
INSERT INTO Tution_Posts (student_id,tution_id,desired_tutor_gender) 
VALUES (2,7,'Female');


CREATE TABLE Applies (
	tutor_id	NUMBER 	REFERENCES Tutors(user_id)
						ON DELETE CASCADE,
	post_id 	NUMBER 	REFERENCES Tution_Posts(post_id)
						ON DELETE CASCADE
);

INSERT INTO Applies (tutor_id,POST_ID) 
VALUES (4,1);
INSERT INTO Applies (tutor_id,POST_ID) 
VALUES (5,1);
INSERT INTO Applies (tutor_id,POST_ID) 
VALUES (6,1);
INSERT INTO Applies (tutor_id,POST_ID) 
VALUES (7,2);

CREATE TABLE Offers (
	student_id 	NUMBER 	REFERENCES Students(user_id) 
						ON DELETE CASCADE,
	tutor_id 	NUMBER 	REFERENCES Tutors(user_id) 
						ON DELETE CASCADE,
	tution_id 	NUMBER 	REFERENCES Tutions(tution_id)
						ON DELETE CASCADE,
	status 		VARCHAR2(100) DEFAULT ON NULL 'PENDING',
	PRIMARY KEY(student_id,tutor_id)
);

INSERT INTO Offers (student_id,tutor_id,tution_id,status) 
VALUES (1,4,8,'ACCEPTED');
INSERT INTO Offers (student_id,tutor_id,tution_id,status) 
VALUES (3,4,10,'PENDING');
INSERT INTO Offers (student_id,tutor_id,tution_id,status) 
VALUES (1,5,9,'ACCEPTED');
INSERT INTO Offers (student_id,tutor_id,tution_id,status) 
VALUES (1,6,10,'PENDING');
INSERT INTO Offers (student_id,tutor_id,tution_id,status) 
VALUES (2,4,11,'ACCEPTED');
INSERT INTO Offers (student_id,tutor_id,tution_id,status) 
VALUES (2,5,12,'PENDING');
INSERT INTO Offers (student_id,tutor_id,tution_id,status) 
VALUES (2,6,13,'PENDING');

CREATE TABLE Coachings(
	coaching_id    	NUMBER  GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) PRIMARY KEY,
	image          	VARCHAR2(100) DEFAULT ON NULL 'coaching.png',
	name           	VARCHAR2(100) NOT NULL,
	address			VARCHAR2(1024) NOT NULL,
	phone_number 	VARCHAR2(15) NOT NULL
);

INSERT INTO Coachings (name,image,phone_number,address) 
VALUES ('Break The Fear','coaching1.jpg','01851953433','Ahmed Mansion, Monoharpur, Cumilla');
INSERT INTO Coachings (name,image,phone_number,address) 
VALUES ('Incredibles','coaching10.jpg','01711130955','Puraton chowdhuri para, Cumilla');
INSERT INTO Coachings (name,image,phone_number,address) 
VALUES ('Alphateach','coaching2.jpg','01711130955','69/C, Monipuri Para, Tejgaon');
INSERT INTO Coachings (name,image,phone_number,address) 
VALUES ('Brilliant Minds','coaching3.jpg','01978290355','Indira Road, Farmgate, Dhaka');
INSERT INTO Coachings (name,image,phone_number,address) 
VALUES ('Bold Academy','coaching4.jpg','01755577908','House #285/3, Road #15 (old), Dhanmondi');
INSERT INTO Coachings (name,image,phone_number,address) 
VALUES ('Educatree','coaching5.jpg','01851953433','20, Central road, Dhanmondi Residential Aria');
INSERT INTO Coachings (name,image,phone_number,address) 
VALUES ('Education Hub','coaching6.jpg','01655567659','Samsur rahman road, Khulna, Khulna');
INSERT INTO Coachings (name,image,phone_number,address) 
VALUES ('Instant Academy','coaching7.jpg','01755533650','Bakshibazar, Dhaka medical college and hospital, Dhaka');
INSERT INTO Coachings (name,image,phone_number,address) 
VALUES ('Study Point','coaching8.jpg','01555556769','U-49, Noorjahan road, Mohammadpur, Dhaka');
INSERT INTO Coachings (name,image,phone_number,address) 
VALUES ('Coachify','coaching9.jpg','01313854014','145/28, Airport road super market (1st floor), Tejgaon, Dhaka');


CREATE TABLE MemberOf(
	user_id        	NUMBER  REFERENCES Users(user_id)
							ON DELETE CASCADE,
	coaching_id    	NUMBER  REFERENCES Coachings(coaching_id)
							ON DELETE CASCADE,
	type           	VARCHAR2(100),
	PRIMARY KEY   	(user_id,coaching_id)
);

INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (1,1,'MEMBER');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (1,2,'MEMBER');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (1,3,'MEMBER');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (2,2,'MEMBER');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (2,4,'MEMBER');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (3,5,'MEMBER');

INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (4,1,'ADMIN');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (5,2,'ADMIN');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (6,3,'ADMIN');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (7,4,'ADMIN');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (8,5,'ADMIN');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (9,6,'ADMIN');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (10,7,'ADMIN');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (4,8,'ADMIN');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (5,9,'ADMIN');


CREATE TABLE  Courses(
	course_id    	NUMBER  GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1)  PRIMARY KEY,
	coaching_id  	NUMBER 	REFERENCES Coachings(coaching_id)
							ON DELETE CASCADE,
	class        	VARCHAR2(100) NOT NULL,
	subject			VARCHAR2(100) NOT NULL
);
INSERT INTO Courses (coaching_id,class,subject)
VALUES (1,'Ten','Physics');
INSERT INTO Courses (coaching_id,class,subject)
VALUES (1,'Five','Bangla');
INSERT INTO Courses (coaching_id,class,subject)
VALUES (1,'Eight','Math');
INSERT INTO Courses (coaching_id,class,subject)
VALUES (1,'Twelve','Physics');
INSERT INTO Courses (coaching_id,class,subject)
VALUES (2,'Ten','Physics');
INSERT INTO Courses (coaching_id,class,subject)
VALUES (2,'Five','Bangla');
INSERT INTO Courses (coaching_id,class,subject)
VALUES (2,'Eight','Math');
INSERT INTO Courses (coaching_id,class,subject)
VALUES (3,'Five','English');
INSERT INTO Courses (coaching_id,class,subject)
VALUES (3,'Four','Bangla');
INSERT INTO Courses (coaching_id,class,subject)
VALUES (3,'Eleven','Chemistry');


CREATE TABLE  Batches(
	batch_id    	NUMBER  GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) PRIMARY KEY,
    course_id  	    NUMBER 	REFERENCES Courses(course_id)
							ON DELETE CASCADE,
	start_date		DATE NOT NULL,
	seats			NUMBER NOT NULL,
	students		NUMBER DEFAULT 0,
	class_days		VARCHAR2(100) NOT NULL,	
	class_time		VARCHAR2(100) NOT NULL
);
INSERT INTO Batches (course_id,start_date,seats,class_days,class_time)
VALUES (1,to_date('20-AUG-19','DD-MON-RR'),30,'Sun, Tue, Thu','1:00PM-2:00PM');
INSERT INTO Batches (course_id,start_date,seats,class_days,class_time)
VALUES (2,to_date('23-JUL-22','DD-MON-RR'),25,'Sun, Tue, Thu','12:00PM-1:00 PM');
INSERT INTO Batches (course_id,start_date,seats,class_days,class_time)
VALUES(3,to_date('10-OCT-22','DD-MON-RR'),30,'Thu, Fri, Sat','3:00PM-4:30PM');
INSERT INTO Batches (course_id,start_date,seats,class_days,class_time)
VALUES (4,to_date('10-AUG-22','DD-MON-RR'),30,'Sat, Mon, Wed','8:00AM-10:00AM');


CREATE TABLE  EnrolledIn(
	student_id    	NUMBER 	REFERENCES Students(user_id)
							ON DELETE CASCADE,
	course_id   	NUMBER REFERENCES Courses(course_id)
							ON DELETE CASCADE,
    batch_id   	    NUMBER REFERENCES Batches(batch_id)
							ON DELETE CASCADE,
	PRIMARY KEY (student_id,course_id)
);
INSERT INTO EnrolledIn
VALUES(1,1,1);
INSERT INTO EnrolledIn
VALUES(1,2,2);
INSERT INTO EnrolledIn
VALUES(1,3,3);

CREATE TABLE Rates (
	student_id 		NUMBER 	REFERENCES Students(user_id)
							ON DELETE CASCADE,
	tutor_id 		NUMBER 	REFERENCES Tutors(user_id)
							ON DELETE CASCADE,
	rating 			NUMBER NOT NULL,
	PRIMARY KEY (student_id,tutor_id)
);