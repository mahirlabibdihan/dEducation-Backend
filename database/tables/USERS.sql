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