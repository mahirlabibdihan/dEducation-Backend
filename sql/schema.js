const schema = `
BEGIN
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
  user_id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) Primary Key,
  name VARCHAR2(100) NOT NULL,
  image VARCHAR2(1000) DEFAULT ON NULL 'sample.jpg',
  email VARCHAR2(100) NOT NULL,
  pass VARCHAR2(1024) NOT NULL,
  type VARCHAR2(1024) NOT NULL,
  gender VARCHAR2(10),
  phone_number VARCHAR2(15),
  date_of_birth DATE
);

INSERT INTO Users(name,image,email,pass,type,gender,phone_number,date_of_birth)
VALUES('Mahir Labib Dihan','male_student.jpg','mahirlabibdihan@gmail.com','$2a$10$8GBsWOPaNtD5gUZu1bNB7uCh0mk3Y6NY25SnGTr1mbuWwKsFPYY5G','STUDENT','Male','01851953433',to_date('19-AUG-01','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,type,gender,phone_number,date_of_birth)
VALUES ('Noushin Tarannum Subha','female_student.jpg','noushintarannum@gmail.com','$2a$10$t7tfxUp7R/loxmxKcuAbY.sObMjcHiwrps/mTpq0/1jJqlfj9BCl2','STUDENT','Female','01851953433',to_date('01-OCT-07','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,type,gender,phone_number,date_of_birth)
VALUES('Mahir Tazwar Ohi','male_tutor.jpg','mahirtazwarohi@gmail.com','$2a$10$8GBsWOPaNtD5gUZu1bNB7uCh0mk3Y6NY25SnGTr1mbuWwKsFPYY5G','TUTOR','Male','01767493500',to_date('03-DEC-00','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,type,gender,phone_number,date_of_birth)
VALUES ('Muntasir Mamun Nahid','male_tutor.jpg','nahidtakla@gmail.com','$2a$10$cNR392ChvTW9rJ4BUY8fDep68xgk7MlJ0pgB.HIAkA/E69HKSSeM2','TUTOR','Male','01684828706',to_date('27-AUG-01','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,type,gender,phone_number,date_of_birth)
VALUES ('Tareq Ahmed','male_tutor.jpg','1905071@gmail.com','$2a$10$GgiK3IOV9GluNyOnl.P0xO/jnfIudswCvwdKLFm0SKd39sHi4Misq','TUTOR','Male','01478066006',to_date('01-JAN-00','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,type,gender,phone_number,date_of_birth)
VALUES ('Shouvik Ghosh','male_tutor.jpg','1905073@gmail.com','$2a$10$GgiK3IOV9GluNyOnl.P0xO/jnfIudswCvwdKLFm0SKd39sHi4Misq','TUTOR','Male','01911714385',to_date('01-JAN-00','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,type,gender,phone_number,date_of_birth)
VALUES ('Sadat Hossain','male_tutor.jpg','1905001@gmail.com','$2a$10$GgiK3IOV9GluNyOnl.P0xO/jnfIudswCvwdKLFm0SKd39sHi4Misq','TUTOR','Male','01891578643',to_date('01-JAN-00','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,type,gender,phone_number,date_of_birth)
VALUES ('Anindya Hoque','male_tutor.jpg','1905070@gmail.com','$2a$10$GgiK3IOV9GluNyOnl.P0xO/jnfIudswCvwdKLFm0SKd39sHi4Misq','TUTOR','Male','01881536649',to_date('01-JAN-00','DD-MON-RR'));
INSERT INTO Users(name,image,email,pass,type,gender,phone_number,date_of_birth)
VALUES ('Sayed Tasfia Rifah','female_tutor.jpg','1905070@gmail.com','$2a$10$GgiK3IOV9GluNyOnl.P0xO/jnfIudswCvwdKLFm0SKd39sHi4Misq','TUTOR','Female','01891556749',to_date('01-JAN-00','DD-MON-RR'));

CREATE TABLE Students (
	student_id NUMBER 	REFERENCES Users(user_id)
						ON DELETE CASCADE
						PRIMARY KEY,
	institution VARCHAR2(1024),
	version VARCHAR2(1024),
	class VARCHAR2(1024),
	address  VARCHAR2(1024)
);

INSERT INTO Students (student_id,institution,version,class,address) 
VALUES (1,'NDC','Bangla','HSC - 2nd year','38/1, Indira Road, Farmgate, Dhaka');
INSERT INTO Students (student_id,institution,version,class,address) 
VALUES (2,'YWCA','Bangla','8','38/1, Indira road, Dhaka');

CREATE TABLE Tutors (
	tutor_id NUMBER REFERENCES Users(user_id)
					ON DELETE CASCADE
					PRIMARY KEY,
	expertise VARCHAR2(1024),
	availability VARCHAR2(100),
	years_of_experience NUMBER,
	preffered_salary NUMBER
);


INSERT INTO Tutors (tutor_id,expertise,availability,years_of_experience,preffered_salary) 
VALUES (3,'Math, Physics, Chemistry','Available',4,10000);
INSERT INTO Tutors (tutor_id,expertise,availability,years_of_experience,preffered_salary) 
VALUES (4,'Math, ICT','Available',2,8000);
INSERT INTO Tutors (tutor_id,expertise,availability,years_of_experience,preffered_salary) 
VALUES (5,'Math','Available',3,10000);
INSERT INTO Tutors (tutor_id,expertise,availability,years_of_experience,preffered_salary) 
VALUES (6,'Physics','Available',3,10000);
INSERT INTO Tutors (tutor_id,expertise,availability,years_of_experience,preffered_salary) 
VALUES (7,'Math, Physics, Chemistry','Unavailable',3,10000);
INSERT INTO Tutors (tutor_id,expertise,availability,years_of_experience,preffered_salary) 
VALUES (8,'Math','Unavailable',3,10000);
INSERT INTO Tutors (tutor_id,expertise,availability,years_of_experience,preffered_salary) 
VALUES (9,'English','Available',3,10000);



CREATE TABLE Tutions (
	tution_id NUMBER  GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) Primary Key,
	subjects VARCHAR2(1024),
	salary NUMBER,
	days_per_week NUMBER,
	type VARCHAR2(100)
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
	post_id NUMBER  GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) Primary Key,
	student_id NUMBER REFERENCES Students(student_id) NOT NULL,
	tution_id NUMBER REFERENCES Tutions(tution_id) NOT NULL,
	timestamp TIMESTAMP(6) DEFAULT systimestamp NOT NULL,
	desired_tutor_gender VARCHAR2(10)
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
	tutor_id NUMBER REFERENCES Tutors(tutor_id) NOT NULL,
	post_id NUMBER REFERENCES Tution_Posts(post_id) NOT NULL
);

INSERT INTO Applies (tutor_id,POST_ID) 
VALUES (3,1);
INSERT INTO Applies (tutor_id,POST_ID) 
VALUES (5,1);
INSERT INTO Applies (tutor_id,POST_ID) 
VALUES (3,2);
INSERT INTO Applies (tutor_id,POST_ID) 
VALUES (3,3);

CREATE TABLE Offers (
	student_id NUMBER REFERENCES Students(student_id) NOT NULL,
	tutor_id NUMBER REFERENCES Tutors(tutor_id) NOT NULL,
	tution_id NUMBER REFERENCES Tutions(tution_id) NOT NULL,
	status VARCHAR2(100)
);

INSERT INTO Offers (student_id,tutor_id,tution_id,status) 
VALUES (1,3,8,'ACCEPTED');
INSERT INTO Offers (student_id,tutor_id,tution_id,status) 
VALUES (1,4,9,'ACCEPTED');
INSERT INTO Offers (student_id,tutor_id,tution_id,status) 
VALUES (1,5,10,'ACCEPTED');
INSERT INTO Offers (student_id,tutor_id,tution_id,status) 
VALUES (2,3,11,'PENDING');
INSERT INTO Offers (student_id,tutor_id,tution_id,status) 
VALUES (2,4,12,'PENDING');
INSERT INTO Offers (student_id,tutor_id,tution_id,status) 
VALUES (2,5,13,'PENDING');

CREATE TABLE Coachings(
	coaching_id    	NUMBER  GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) PRIMARY KEY,
	image          	VARCHAR2(100) DEFAULT ON NULL 'coaching.png',
	name           	VARCHAR2(100),
	address			VARCHAR2(1024),
	phone_number 	VARCHAR2(15)
);

INSERT INTO Coachings (name,image,phone_number,address) 
VALUES ('Break The Fear','coaching1.jpg','01851953433','Ahmed Mansion, Monoharpur, Cumilla');
INSERT INTO Coachings (name,image,phone_number,address) 
VALUES ('Alphateach','coaching2.jpg','01711130955','69/C, Monipuri Para, Tejgaon');
INSERT INTO Coachings (name,image,phone_number,address) 
VALUES ('Brilliant Minds','coaching3.jpg','01978290355','Indira Road, Farmgate, Dhaka');
INSERT INTO Coachings (name,phone_number,address) 
VALUES ('Bold Academy','01755577908','House #285/3, Road #15 (old), Dhanmondi');
INSERT INTO Coachings (name,phone_number,address) 
VALUES ('Educatree','01851953433','20, Central road, Dhanmondi Residential Aria');
INSERT INTO Coachings (name,phone_number,address) 
VALUES ('Education Hub','01655567659','Samsur rahman road, Khulna, Khulna');
INSERT INTO Coachings (name,phone_number,address) 
VALUES ('Instant Academy','01755533650','Bakshibazar, Dhaka medical college and hospital, Dhaka');
INSERT INTO Coachings (name,phone_number,address) 
VALUES ('Study Point','01555556769','U-49, Noorjahan road, Mohammadpur, Dhaka');
INSERT INTO Coachings (name,phone_number,address) 
VALUES ('Coachify','01313854014','145/28, Airport road super market (1st floor), Tejgaon, Dhaka');


CREATE TABLE MemberOf(
	user_id        	NUMBER  REFERENCES Users(user_id),
	coaching_id    	NUMBER  REFERENCES Coachings(coaching_id),
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
VALUES (2,5,'MEMBER');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (3,1,'ADMIN');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (3,2,'ADMIN');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (4,3,'ADMIN');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (4,4,'ADMIN');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (5,5,'ADMIN');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (5,6,'ADMIN');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (6,7,'ADMIN');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (6,8,'ADMIN');
INSERT INTO MemberOf (user_id,coaching_id,type) 
VALUES (7,9,'ADMIN');


CREATE TABLE  Courses(
	course_id    	NUMBER  GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1)  PRIMARY KEY,
	coaching_id  	NUMBER REFERENCES Coachings(coaching_id),
	class        	VARCHAR2(100),
	subject			VARCHAR2(100)
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
    course_id  	    NUMBER REFERENCES Courses(course_id),
	start_date		DATE,
	seats			NUMBER,
	students		NUMBER DEFAULT 0,
	class_days		VARCHAR2(100),	
	class_time		VARCHAR2(100)
);
INSERT INTO Batches (course_id,start_date,seats,class_days,class_time)
VALUES (1,to_date('20-AUG-19','DD-MON-RR'),30,'SUN-TUE-THU','1.00PM-2.00PM');
INSERT INTO Batches (course_id,start_date,seats,class_days,class_time)
VALUES (2,to_date('23-JUL-22','DD-MON-RR'),25,'Sun,Tue,Thu','12:00 PM-1:00 PM');
INSERT INTO Batches (course_id,start_date,seats,class_days,class_time)
VALUES(3,to_date('10-OCT-22','DD-MON-RR'),30,'THU-FRI-SAT','3.00PM-4.30PM');
INSERT INTO Batches (course_id,start_date,seats,class_days,class_time)
VALUES (4,to_date('10-AUG-22','DD-MON-RR'),30,'SAT-MON-WED','8.00AM-10.00AM');


CREATE TABLE  EnrolledIn(
	student_id    	NUMBER REFERENCES Students(student_id),
	course_id   	NUMBER REFERENCES Courses(course_id),
    batch_id   	    NUMBER REFERENCES Batches(batch_id),
	PRIMARY KEY   (student_id,course_id)
);
INSERT INTO EnrolledIn
VALUES(1,1,1);
INSERT INTO EnrolledIn
VALUES(1,2,2);
INSERT INTO EnrolledIn
VALUES(1,3,3);

CREATE TABLE Rates (
	student_id 		NUMBER REFERENCES Students(student_id) NOT NULL,
	tutor_id 		NUMBER REFERENCES Tutors(tutor_id) NOT NULL,
	rating 			NUMBER,
	PRIMARY KEY (student_id,tutor_id)
);
END;
`;
module.exports = schema;
