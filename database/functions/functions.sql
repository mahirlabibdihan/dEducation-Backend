CREATE OR REPLACE PROCEDURE CREATE_STUDENT(
	user_id 		Users.user_id%TYPE
)
IS
BEGIN
INSERT INTO Students (student_id) VALUES (user_id);
END;
/

CREATE OR REPLACE PROCEDURE CREATE_TUTOR(
	user_id 		Users.user_id%TYPE
)
IS
BEGIN
INSERT INTO Tutors (tutor_id) VALUES (user_id);
END;
/


CREATE OR REPLACE PROCEDURE CREATE_USER(
	user_name 	Users.name%TYPE,
	user_email	Users.email%TYPE,
	user_pass		Users.pass%TYPE,
	user_type		Users.type%TYPE
)
IS
BEGIN
INSERT INTO Users (name,email,pass,type) 
VALUES (user_name,user_email,user_pass,user_type);
END;
/

CREATE OR REPLACE FUNCTION CREATE_TUTION(
	t_subjects 			Tutions.subjects%TYPE,
	t_salary 				Tutions.salary%TYPE,
	t_days_per_week Tutions.days_per_week%TYPE,
	t_type					Tutions.type%TYPE
)
return Tutions.tution_id%TYPE
AS 
t_id 	Tutions.tution_id%TYPE;
BEGIN
	INSERT INTO Tutions (subjects,salary,days_per_week,type)
	VALUES(t_subjects,t_salary,t_days_per_week,t_type)
	RETURNING tution_id 
	INTO t_id;
	return t_id;
END;
/

CREATE OR REPLACE PROCEDURE POST_TUTION(
	tp_student_id 						Tution_Posts.student_id%TYPE,
	tp_desired_tutor_gender 	Tution_Posts.desired_tutor_gender%TYPE,
	t_subjects 								Tutions.subjects%TYPE,
	t_salary 									Tutions.salary%TYPE,
	t_days_per_week 					Tutions.days_per_week%TYPE,
	t_type										Tutions.type%TYPE
)
IS
BEGIN
	INSERT INTO Tution_Posts (student_id,tution_id,desired_tutor_gender)
	VALUES(tp_student_id,CREATE_TUTION(t_subjects,t_salary,t_days_per_week,t_type),tp_desired_tutor_gender);
END;
/

CREATE OR REPLACE
FUNCTION GET_USER_BY_ID (id Users.user_id%TYPE)
RETURN Users%ROWTYPE 
AS
user_row Users%ROWTYPE;
BEGIN	
	SELECT * INTO user_row
	FROM Users WHERE user_id = id;
	return user_row;
EXCEPTION
 WHEN no_data_found THEN
    return NULL;
 WHEN too_many_rows THEN
    return NULL;
END;
/

CREATE OR REPLACE FUNCTION GET_USER_BY_EMAIL(email_address Users.email%TYPE)
return Users%ROWTYPE 
AS
user_row Users%ROWTYPE;
user_count NUMBER;
BEGIN	
	SELECT * INTO user_row
	FROM Users WHERE email = email_address;
	return user_row;
EXCEPTION
 WHEN no_data_found THEN
		return NULL;
 WHEN too_many_rows THEN
		return NULL;
END;
/

CREATE OR REPLACE FUNCTION IS_EMAIL_TAKEN(email_address Users.email%TYPE)
return VARCHAR2 
AS
user_count NUMBER;
BEGIN	
	SELECT COUNT(*) INTO user_count
	FROM Users WHERE email = email_address;
	IF user_count = 0 THEN
		return 'NO';
	ELSE 
		return 'YES';
	END IF;
END;
/


CREATE OR REPLACE FUNCTION IS_VALID_USERID(id Users.user_id%TYPE)
return VARCHAR2 
AS
user_count NUMBER;
BEGIN	
	SELECT COUNT(*) INTO user_count
	FROM Users WHERE user_id = id;
	IF user_count = 0 THEN
		return 'NO';
	ELSE 
		return 'YES';
	END IF;
END;
/


BEGIN
	DBMS_OUTPUT.PUT_LINE(GET_USER_BY_EMAIL('mahirlabibdihan@gmail.com').user_id);
END;
/
-- select * from user_errors;