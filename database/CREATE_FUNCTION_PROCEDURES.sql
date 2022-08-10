CREATE OR REPLACE PROCEDURE CREATE_STUDENT(
	u_id 		Users.user_id%TYPE
)
IS
BEGIN
INSERT INTO Students (user_id) VALUES (u_id);
END;
/

CREATE OR REPLACE PROCEDURE CREATE_TUTOR(
	u_id 		Users.user_id%TYPE
)
IS
BEGIN
INSERT INTO Tutors (user_id) VALUES (u_id);
END;
/


CREATE OR REPLACE PROCEDURE CREATE_USER(
	user_name 	Users.name%TYPE,
	user_email	Users.email%TYPE,
	user_pass		Users.pass%TYPE,
	user_type		Users.role%TYPE
)
IS
BEGIN
	INSERT INTO Users (name,email,pass,role) 
	VALUES (user_name,user_email,user_pass,user_type);
END;
/
 
CREATE OR REPLACE PROCEDURE UPDATE_USER_PROFILE(
	u_id 						Users.user_id%TYPE,
	u_name 					Users.name%TYPE,
	u_phone_number 	Users.phone_number%TYPE,
	u_date_of_birth VARCHAR2,
	u_gender 				Users.gender%TYPE
)
IS
BEGIN
	UPDATE Users 
  SET name = u_name, phone_number = u_phone_number, date_of_birth = TO_DATE(u_date_of_birth,'MM/DD/YYYY'), gender = u_gender
  WHERE user_id = u_id;
END;
/

CREATE OR REPLACE PROCEDURE UPDATE_STUDENT_PROFILE(
	u_id 						Users.user_id%TYPE,
	u_name 					Users.name%TYPE,
	u_phone_number 	Users.phone_number%TYPE,
	u_date_of_birth VARCHAR2,
	u_gender 				Users.gender%TYPE,
	s_institution		Students.institution%TYPE,
	s_version				Students.version%TYPE,
	s_class					Students.class%TYPE,
	s_address				Students.address%TYPE
)
IS
BEGIN
	UPDATE Students 
	SET institution = s_institution, version = s_version, class = s_class, address = s_address
	WHERE user_id = u_id;
	UPDATE_USER_PROFILE(u_id, u_name, u_phone_number, u_date_of_birth, u_gender);
END;
/

CREATE OR REPLACE PROCEDURE UPDATE_TUTOR_PROFILE(
	u_id 									Users.user_id%TYPE,
	u_name 								Users.name%TYPE,
	u_phone_number 				Users.phone_number%TYPE,
	u_date_of_birth 			VARCHAR2,
	u_gender 							Users.gender%TYPE,
	t_availability				Tutors.availability%TYPE,
	t_years_of_experience	Tutors.years_of_experience%TYPE,
	t_preffered_salary		Tutors.preffered_salary%TYPE,
	t_expertise						Tutors.expertise%TYPE
)
IS
BEGIN
	UPDATE Tutors 
	SET availability = t_availability, years_of_experience = t_years_of_experience, preffered_salary = t_preffered_salary, expertise = t_expertise
	WHERE user_id = u_id;
	UPDATE_USER_PROFILE(u_id, u_name, u_phone_number, u_date_of_birth, u_gender);
END;
/

-- CREATE OR REPLACE PROCEDURE CHANGE_PASSWORD(
-- 	id 	Users.user_id%TYPE
-- )
-- IS
-- BEGIN
-- INSERT INTO Users (name,email,pass,type) 
-- VALUES (user_name,user_email,user_pass,user_type);
-- END;
-- /

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
AS
BEGIN
	INSERT INTO Tution_Posts (student_id,tution_id,desired_tutor_gender)
	VALUES(tp_student_id,CREATE_TUTION(t_subjects,t_salary,t_days_per_week,t_type),tp_desired_tutor_gender);
END;
/

CREATE OR REPLACE FUNCTION GET_TUTION_POST_DETAILS(
	tp_post_id	Tution_Posts.post_id%TYPE
)
return TUTION_POST
AS
tution_post_row TUTION_POST;
BEGIN
	FOR r IN (
		SELECT *
		FROM Tution_Posts NATURAL JOIN Tutions 
		JOIN Students ON student_id = user_id
		NATURAL JOIN Users
		WHERE post_id = tp_post_id
	)LOOP
		tution_post_row := TUTION_POST(
				r.gender,
				r.version,
				r.class,
				r.address,
				r.post_id, 
				r.desired_tutor_gender, 
				r.subjects, 
				r.salary,
				r.days_per_week,
				r.type,
				r.timestamp,
				0);
	END LOOP;
	SELECT COUNT(*) INTO tution_post_row.applicant_count
	FROM Applies
	WHERE post_id = tp_post_id;
	return tution_post_row;
END;
/


CREATE OR REPLACE FUNCTION GET_ALL_TUTION_POSTS
return TUTION_POST_ARRAY
AS
tution_post_list TUTION_POST_ARRAY := TUTION_POST_ARRAY();
BEGIN
	FOR r IN (
		SELECT post_id
		FROM Tution_Posts
		ORDER BY post_id DESC
	)LOOP
		tution_post_list.EXTEND;
		tution_post_list(tution_post_list.LAST) := GET_TUTION_POST_DETAILS(r.post_id);
	END LOOP;
	return tution_post_list;
END;
/

CREATE OR REPLACE FUNCTION GET_FILTERED_TUTION_POSTS(
	u_gender				Users.gender%TYPE,
	t_start					Tutions.salary%TYPE,
	t_end						Tutions.salary%TYPE,
	t_days_per_week	Tutions.days_per_week%TYPE,
	s_version				Students.version%TYPE,
	t_type					Tutions.type%TYPE,
	s_class					Students.class%TYPE
)
return TUTION_POST_ARRAY
AS
tution_post_list TUTION_POST_ARRAY := TUTION_POST_ARRAY();
BEGIN
	FOR r IN (
		SELECT post_id
		FROM Tution_Posts Natural Join Tutions
		JOIN Students 
		ON student_id = user_id
		NATURAL JOIN Users
		WHERE salary >= t_start AND salary <= t_end
		AND days_per_week <= t_days_per_week
		AND (u_gender = 'Any' OR gender = u_gender)
		AND (s_version = 'Any' OR version = s_version)
		AND (t_type = 'Any' OR type = t_type)
		AND (s_class = 'Any' OR class = s_class)
		ORDER BY post_id DESC
	)LOOP
		tution_post_list.EXTEND;
		DBMS_OUTPUT.PUT_LINE(r.post_id);
		tution_post_list(tution_post_list.LAST) := GET_TUTION_POST_DETAILS(r.post_id);
	END LOOP;
	return tution_post_list;
END;
/

CREATE OR REPLACE FUNCTION IS_APPLIED_FILTERED(
	t_tutor_id 			Tutors.user_id%TYPE,
	u_gender				Users.gender%TYPE,
	t_start					Tutions.salary%TYPE,
	t_end						Tutions.salary%TYPE,
	t_days_per_week	Tutions.days_per_week%TYPE,
	s_version				Students.version%TYPE,
	t_type					Tutions.type%TYPE,
	s_class					Students.class%TYPE
)
return STRING_ARRAY 
AS
apply_list STRING_ARRAY := STRING_ARRAY();
BEGIN	
	FOR r IN (
	SELECT tutor_id
	FROM Tution_Posts T
	Natural Join Tutions
	JOIN Students 
	ON student_id = user_id
	NATURAL JOIN Users
	LEFT OUTER JOIN Applies A
	ON A.post_id = T.post_id AND tutor_id = t_tutor_id
	WHERE salary >= t_start AND salary <= t_end
	AND days_per_week <= t_days_per_week
	AND (u_gender = 'Any' OR gender = u_gender)
	AND (s_version = 'Any' OR version = s_version)
	AND (t_type = 'Any' OR type = t_type)
	AND (s_class = 'Any' OR class = s_class)
	ORDER BY T.post_id DESC
	)LOOP
	apply_list.EXTEND;
	IF r.tutor_id IS NULL  THEN
		apply_list(apply_list.LAST) := 'NO';
	ELSE 
		apply_list(apply_list.LAST) := 'YES';
	END IF;
	END LOOP;
	return apply_list;
END;
/

CREATE OR REPLACE FUNCTION IS_APPLIED(
	t_tutor_id Tutors.user_id%TYPE
)
return STRING_ARRAY 
AS
apply_list STRING_ARRAY := STRING_ARRAY();
BEGIN	
	FOR r IN (
	SELECT tutor_id
	FROM Tution_Posts T
	LEFT OUTER JOIN Applies A
	ON A.post_id = T.post_id AND tutor_id = t_tutor_id
	ORDER BY T.post_id DESC
	)LOOP
	apply_list.EXTEND;

	IF r.tutor_id IS NULL  THEN
		apply_list(apply_list.LAST) := 'NO';
	ELSE 
		apply_list(apply_list.LAST) := 'YES';
	END IF;
	END LOOP;
	return apply_list;
END;
/

CREATE OR REPLACE FUNCTION IS_JOINED(
	s_student_id	Students.user_id%TYPE
)
return STRING_ARRAY 
AS
join_list STRING_ARRAY := STRING_ARRAY();
BEGIN	
	FOR r IN (
	SELECT user_id
	FROM Coachings C
	LEFT OUTER JOIN MemberOf M
	ON C.coaching_id = M.coaching_id AND user_id = s_student_id
	ORDER BY C.coaching_id ASC
	)LOOP
	join_list.EXTEND;
	IF r.user_id IS NULL  THEN
		join_list(join_list.LAST) := 'NO';
	ELSE 
		join_list(join_list.LAST) := 'YES';
	END IF;
	END LOOP;
	return join_list;
END;
/

CREATE OR REPLACE FUNCTION GET_MY_TUTION_POSTS(
	s_student_id	Students.user_id%TYPE
)
return TUTION_POST_ARRAY
AS
tution_post_list TUTION_POST_ARRAY := TUTION_POST_ARRAY();
BEGIN
	FOR r IN (
		SELECT *
		FROM Tution_Posts
		WHERE student_id = s_student_id
		ORDER BY post_id DESC
	)LOOP
		tution_post_list.EXTEND;
		tution_post_list(tution_post_list.LAST) := GET_TUTION_POST_DETAILS(r.post_id);
	END LOOP;
	return tution_post_list;
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
		RAISE_APPLICATION_ERROR(-20000,'Invalid credentials');
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

CREATE OR REPLACE PROCEDURE MAKE_ADMIN(
	t_tutor_id			Tutors.user_id%TYPE,
	c_coaching_id		Coachings.coaching_id%TYPE
)
AS 
BEGIN
	INSERT INTO MemberOf
  VALUES(t_tutor_id,c_coaching_id,'ADMIN');
END;
/

CREATE OR REPLACE PROCEDURE CREATE_COACHING(
	c_tutor_id			Tutors.user_id%TYPE,
	c_name					Coachings.name%TYPE,
	c_phone_number 	Coachings.phone_number%TYPE,
	c_address 			Coachings.address%TYPE
)
AS
c_id		Coachings.coaching_id%TYPE;
BEGIN
	INSERT INTO Coachings(name,phone_number,address)
	VALUES(c_name,c_phone_number,c_address)
	RETURNING coaching_id
	INTO c_id;
	MAKE_ADMIN(c_tutor_id, c_id);
END;
/
-- CREATE OR REPLACE FUNCTION IS_ALREADY_OFFERED(email_address Users.email%TYPE)
-- return VARCHAR2 
-- AS
-- user_count NUMBER;
-- BEGIN	
-- 	SELECT COUNT(*) INTO user_count
-- 	FROM Users WHERE email = email_address;
-- 	IF user_count = 0 THEN
-- 		return 'NO';
-- 	ELSE 
-- 		return 'YES';
-- 	END IF;
-- END;
-- /

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

-- DECLARE
-- 	TYPE user_list_type IS VARRAY(10) OF Users%ROWTYPE NOT NULL;
-- 	user_list		user_list_type();
-- BEGIN
	
CREATE OR REPLACE FUNCTION GET_STUDENT_DETAILS(
	s_student_id Students.user_id%TYPE
)
return STUDENT
AS 
	student_row STUDENT := STUDENT(NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
BEGIN
	FOR r IN (
		SELECT * 	 	
		FROM Users NATURAL JOIN Students
		WHERE user_id = s_student_id
	)LOOP
		student_row := Student(
			r.user_id,
			r.name,
			r.image,
			r.gender,
			r.phone_number,
			r.date_of_birth,
			r.institution,
			r.version,
			r.class,
			r.address
	);
	END LOOP;
	return student_row;
END;
/

CREATE OR REPLACE FUNCTION GET_ALL_STUDENTS
return STUDENT_ARRAY
AS
	student_list		STUDENT_ARRAY := STUDENT_ARRAY();
BEGIN
	FOR r IN (
		SELECT * 	 	
		FROM Students
		ORDER BY user_id ASC
	)LOOP
		student_list.EXTEND;
		student_list(student_list.LAST) := GET_STUDENT_DETAILS(r.user_id);
	END LOOP;
	return student_list;
END;	
/

CREATE OR REPLACE FUNCTION GET_MY_STUDENTS(
	t_tutor_id Tutors.user_id%TYPE
)
return STUDENT_ARRAY
AS
	student_list		STUDENT_ARRAY := STUDENT_ARRAY();
BEGIN
	FOR r IN (
		SELECT * 	 	
		FROM Offers 
		WHERE tutor_id = t_tutor_id AND status = 'ACCEPTED'
		ORDER BY student_id ASC
	)LOOP
		student_list.EXTEND;
		student_list(student_list.LAST) := GET_STUDENT_DETAILS(r.student_id);
	END LOOP;
	return student_list;
END;	
/

CREATE OR REPLACE FUNCTION GET_PENDING_STUDENTS(
	t_tutor_id Tutors.user_id%TYPE
)
return STUDENT_ARRAY
AS
	student_list		STUDENT_ARRAY := STUDENT_ARRAY();
BEGIN
	FOR r IN (
		SELECT * 	 	
		FROM Offers 
		WHERE tutor_id = t_tutor_id AND status = 'PENDING'
		ORDER BY student_id ASC
	)LOOP
		student_list.EXTEND;
		student_list(student_list.LAST) := GET_STUDENT_DETAILS(r.student_id);
	END LOOP;
	return student_list;
END;	
/

CREATE OR REPLACE FUNCTION GET_PENDING_TUTIONS(
	t_tutor_id Tutors.user_id%TYPE
)
return TUTION_ARRAY
AS
	tution_list TUTION_ARRAY := TUTION_ARRAY();
BEGIN
	FOR r IN (
		SELECT *
		FROM Offers
		WHERE tutor_id = t_tutor_id 
		AND status = 'PENDING'
		ORDER BY student_id ASC 
	)LOOP
		tution_list.EXTEND;
		tution_list(tution_list.LAST) := GET_TUTION_DETAILS(t_tutor_id,r.student_id);
	END LOOP;
	return tution_list;
END;
/

CREATE OR REPLACE FUNCTION GET_COACHING_STUDENTS(
	c_coaching_id	Coachings.coaching_id%TYPE
)
return STUDENT_ARRAY
AS
	student_list		STUDENT_ARRAY := STUDENT_ARRAY();
BEGIN
	FOR r IN (
		SELECT user_id 	 	
		FROM MemberOf
		WHERE coaching_id = c_coaching_id
		AND type = 'MEMBER'
		ORDER BY user_id ASC
	)LOOP
		student_list.EXTEND;
		student_list(student_list.LAST) := GET_STUDENT_DETAILS(r.user_id);
	END LOOP;
	return student_list;
END;	
/

CREATE OR REPLACE FUNCTION GET_COURSE_STUDENTS(
	c_coaching_id	Coachings.coaching_id%TYPE,
	c_class				Courses.class%TYPE,
	c_subject			Courses.subject%TYPE,
	b_batch_id		Batches.batch_id%TYPE
)
return STUDENT_ARRAY
AS
	student_list		STUDENT_ARRAY := STUDENT_ARRAY();
BEGIN
	FOR r IN (
		SELECT student_id
    FROM EnrolledIn NATURAL JOIN Courses NATURAL JOIN Batches 
    WHERE coaching_id = c_coaching_id
    AND (c_class IS NULL OR class = c_class)
    AND (c_subject IS NULL OR subject = c_subject)
    AND (b_batch_id IS NULL OR batch_id = b_batch_id)
		ORDER BY student_id ASC
	)LOOP
		student_list.EXTEND;
		student_list(student_list.LAST) := GET_STUDENT_DETAILS(r.student_id);
	END LOOP;
	return student_list;
END;	
/

CREATE OR REPLACE FUNCTION GET_AVG_RATING(
	t_tutor_id Tutors.user_id%TYPE
)
return NUMBER
AS
	avg_rating		Offers.rating%TYPE;
	total_rating 	Offers.rating%TYPE;
	count					NUMBER;
BEGIN
	SELECT SUM(rating)/COUNT(*) INTO avg_rating
	FROM Offers
	WHERE tutor_id = t_tutor_id AND rating IS NOT NULL
	GROUP BY tutor_id;
	return avg_rating;
EXCEPTION
	WHEN NO_DATA_FOUND THEN	
		return -1;
END;
/

CREATE OR REPLACE FUNCTION GET_TUTOR_DETAILS(
	t_tutor_id Tutors.user_id%TYPE
)
return TUTOR
AS 
	tutor_row TUTOR := TUTOR(NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
BEGIN
	FOR r IN (
		SELECT * 	 	
		FROM Users NATURAL JOIN Tutors
		WHERE user_id = t_tutor_id
	)LOOP
		tutor_row := TUTOR(
			r.user_id,
			r.name,
			r.image,
			r.gender,
			r.phone_number,
			r.date_of_birth,
			r.expertise,
			r.availability,
			r.years_of_experience,
			r.preffered_salary,
			NULL
	);
	END LOOP;
	tutor_row.rating := GET_AVG_RATING(t_tutor_id);
	return tutor_row;
END;
/


CREATE OR REPLACE FUNCTION GET_ALL_TUTORS
return TUTOR_ARRAY
AS
	tutor_list TUTOR_ARRAY := TUTOR_ARRAY();
BEGIN
	FOR r IN (
		SELECT * 	 	
		FROM Tutors
		ORDER BY user_id ASC
	)LOOP
		tutor_list.EXTEND;
		tutor_list(tutor_list.LAST) := GET_TUTOR_DETAILS(r.user_id);
	END LOOP;
	return tutor_list;
END;	
/

CREATE OR REPLACE FUNCTION GET_ALL_EDUCATIONS
return EDUCATION_2D_ARRAY
AS
	education_list 	EDUCATION_2D_ARRAY := EDUCATION_2D_ARRAY();
	education		 		EDUCATION_ARRAY := EDUCATION_ARRAY();
BEGIN
-- 		education_list.EXTEND;
-- 		education := GET_EDUCATIONS(5);
-- 		education_list(education_list.LAST) := education;
	FOR r IN (
		SELECT * 	 	
		FROM Tutors
		ORDER BY user_id ASC
	)LOOP	
		education_list.EXTEND;
		education_list(education_list.LAST) := GET_EDUCATIONS(r.user_id);
	END LOOP;
	return education_list;
END;	
/

CREATE OR REPLACE FUNCTION GET_FILTERED_TUTORS(
	u_gender			Users.gender%TYPE,
	t_start				Tutions.salary%TYPE,
	t_end					Tutions.salary%TYPE,
	t_status			Tutors.availability%TYPE,
	t_experience	Tutors.years_of_experience%TYPE
)
return TUTOR_ARRAY
AS
	tutor_list TUTOR_ARRAY := TUTOR_ARRAY();
BEGIN
	FOR r IN (
		SELECT * 	 	
		FROM Tutors NATURAL JOIN Users
		WHERE (u_gender = 'Any' OR gender = u_gender)
		AND	preffered_salary >= t_start AND preffered_salary <= t_end
		AND (t_status = 'Any' OR availability = t_status)
		AND years_of_experience >= t_experience
		ORDER BY user_id ASC
	)LOOP
		tutor_list.EXTEND;
		tutor_list(tutor_list.LAST) := GET_TUTOR_DETAILS(r.user_id);
	END LOOP;
	return tutor_list;
END;	
/

CREATE OR REPLACE FUNCTION GET_FILTERED_EDUCATIONS(
	u_gender			Users.gender%TYPE,
	t_start				Tutions.salary%TYPE,
	t_end					Tutions.salary%TYPE,
	t_status			Tutors.availability%TYPE,
	t_experience	Tutors.years_of_experience%TYPE
)
return EDUCATION_2D_ARRAY
AS
	education_list EDUCATION_2D_ARRAY := EDUCATION_2D_ARRAY();
BEGIN
	FOR r IN (
		SELECT * 	 	
		FROM Tutors NATURAL JOIN Users
		WHERE (u_gender = 'Any' OR gender = u_gender)
		AND	preffered_salary >= t_start AND preffered_salary <= t_end
		AND (t_status = 'Any' OR availability = t_status)
		AND years_of_experience >= t_experience
		ORDER BY user_id ASC
	)LOOP
		education_list.EXTEND;
		education_list(education_list.LAST) := GET_EDUCATIONS(r.user_id);
	END LOOP;
	return education_list;
END;	
/

CREATE OR REPLACE FUNCTION GET_MY_TUTORS(
	s_student_id 	Students.user_id%TYPE
)
return TUTOR_ARRAY
AS
	tutor_list TUTOR_ARRAY := TUTOR_ARRAY();
BEGIN
	FOR r IN (
		SELECT * 	 	
		FROM Offers
		WHERE student_id = s_student_id AND status = 'ACCEPTED'
		ORDER BY tutor_id ASC
	)LOOP
		tutor_list.EXTEND;
		tutor_list(tutor_list.LAST) := GET_TUTOR_DETAILS(r.tutor_id);
	END LOOP;
	return tutor_list;
END;	
/



CREATE OR REPLACE FUNCTION GET_COACHING_DETAILS(
	c_coaching_id Coachings.coaching_id%TYPE
)
return COACHING
AS 
	coaching_row COACHING := COACHING(NULL,NULL,NULL,NULL,NULL);
BEGIN
	FOR r IN (
		SELECT * 	 	
		FROM Coachings
		WHERE coaching_id = c_coaching_id
	)LOOP
		coaching_row := COACHING(
				r.coaching_id,
				r.image,
				r.name,
				r.address,
				r.phone_number
		);
	END LOOP;
	return coaching_row;
END;
/

CREATE OR REPLACE FUNCTION GET_ALL_COACHINGS
return COACHING_ARRAY
AS
	coaching_list COACHING_ARRAY := COACHING_ARRAY();
BEGIN
	FOR r IN (
		SELECT *
    FROM Coachings
		ORDER BY coaching_id ASC
	)LOOP
		coaching_list.EXTEND;
		coaching_list(coaching_list.LAST) := GET_COACHING_DETAILS(r.coaching_id);
	END LOOP;
	return coaching_list;
END;	
/

CREATE OR REPLACE FUNCTION GET_MY_COACHINGS(
	id	Users.user_id%TYPE
)
return COACHING_ARRAY
AS
	coaching_list COACHING_ARRAY := COACHING_ARRAY();
BEGIN
	FOR r IN (
		SELECT *
		FROM MemberOf
		WHERE user_id = id AND (type = 'MEMBER'  OR type = 'ADMIN')
		ORDER BY coaching_id ASC
	)LOOP
		coaching_list.EXTEND;
		coaching_list(coaching_list.LAST) := GET_COACHING_DETAILS(r.coaching_id);
	END LOOP;
	return coaching_list;
END;	
/

CREATE OR REPLACE PROCEDURE JOIN_COACHING(
	u_user_id			Users.user_id%TYPE,
	c_coaching_id	Coachings.coaching_id%TYPE
) 
AS
BEGIN
	INSERT INTO MemberOf
  VALUES(u_user_id,c_coaching_id,'MEMBER');
END;
/

CREATE OR REPLACE PROCEDURE UPDATE_COACHING_INFO(
	c_coaching_id 	Coachings.coaching_id%TYPE,
	c_name					Coachings.name%TYPE,
	c_phone_number	Coachings.phone_number%TYPE,
	c_address				Coachings.address%TYPE
) 
AS
BEGIN
	UPDATE Coachings 
	SET name = c_name, phone_number = c_phone_number, address = c_address
	WHERE coaching_id = c_coaching_id;
END;
/
CREATE OR REPLACE FUNCTION GET_ALL_APPLICANTS(
	tp_post_id Tution_Posts.post_id%TYPE
)
return TUTOR_ARRAY
AS
	tutor_list TUTOR_ARRAY := TUTOR_ARRAY();
BEGIN
	FOR r IN (
		SELECT * 	 	
		FROM Tution_Posts NATURAL JOIN APPLIES
		WHERE post_id = tp_post_id
		ORDER BY tutor_id ASC
	)LOOP
		tutor_list.EXTEND;
		tutor_list(tutor_list.LAST) := GET_TUTOR_DETAILS(r.tutor_id);
	END LOOP;
	return tutor_list;
END;	
/


CREATE OR REPLACE FUNCTION GET_TUTION_DETAILS(
	t_tutor_id Tutors.user_id%TYPE,
	s_student_id Students.user_id%TYPE
)
return TUTION
AS
tution_row TUTION := TUTION(NULL,NULL,NULL,NULL,NULL,NULL);
BEGIN
	FOR r IN (
		SELECT *
		FROM Offers NATURAL JOIN Tutions
		WHERE tutor_id = t_tutor_id
		AND student_id = s_student_id
	)LOOP
		tution_row := TUTION(r.status, r.subjects, r.salary, r.days_per_week, r.type,r.rating);
	END LOOP;
	return tution_row;
END;
/

CREATE OR REPLACE FUNCTION GET_EDUCATION_DETAILS(
	e_eq_id Educations.eq_id%TYPE
)
return EDUCATION
AS
education_row EDUCATION := EDUCATION(NULL,NULL,NULL,NULL,NULL);
BEGIN
	FOR r IN (
		SELECT *
		FROM Educations
		WHERE eq_id = e_eq_id
	)LOOP
		education_row := EDUCATION(r.eq_id, r.institute, r.field_of_study, r.degree, r.passing_year);
	END LOOP;
	return education_row;
END;
/

CREATE OR REPLACE FUNCTION GET_EDUCATIONS(
	t_tutor_id Tutors.user_id%TYPE
)
return EDUCATION_ARRAY
AS
	education_list EDUCATION_ARRAY := EDUCATION_ARRAY();
BEGIN
	FOR r IN (
		SELECT *
		FROM Educations
		WHERE tutor_id = t_tutor_id
		ORDER BY passing_year DESC
	)LOOP
		education_list.EXTEND;
		education_list(education_list.LAST) := GET_EDUCATION_DETAILS(r.eq_id);
	END LOOP;
	return education_list;
END;
/

CREATE OR REPLACE PROCEDURE ADD_EDUCATION(
	t_tutor_id 	Tutors.user_id%TYPE,
	e_institute 	Educations.institute%TYPE,
	e_field_of_study 	Educations.field_of_study%TYPE,
	e_degree 	Educations.degree%TYPE,
	e_passing_year 	Educations.passing_year%TYPE
)
AS
BEGIN
INSERT INTO Educations(tutor_id,institute,field_of_study,degree,passing_year)
VALUES(t_tutor_id,e_institute,e_field_of_study,e_degree,e_passing_year);
END;
/
CREATE OR REPLACE PROCEDURE UPDATE_EDUCATION(
	e_eq_id						Educations.eq_id%TYPE,
	t_tutor_id 				Tutors.user_id%TYPE,
	e_institute 			Educations.institute%TYPE,
	e_field_of_study 	Educations.field_of_study%TYPE,
	e_degree 					Educations.degree%TYPE,
	e_passing_year 		Educations.passing_year%TYPE
)
AS
BEGIN
UPDATE Educations SET 
tutor_id = t_tutor_id,
institute = e_institute,
field_of_study = e_field_of_study,
degree = e_degree,
passing_year = e_passing_year
WHERE eq_id = e_eq_id;
END;
/
CREATE OR REPLACE PROCEDURE DELETE_EDUCATION(
	e_eq_id 	Educations.eq_id%TYPE
)
AS
BEGIN
DELETE FROM Educations
WHERE eq_id = e_eq_id;
END;
/
CREATE OR REPLACE FUNCTION GET_TUTION_DETAILS_FROM_POST(
	tp_post_id Tution_Posts.post_id%TYPE
)
return TUTION
AS
tution_row TUTION := TUTION(NULL,NULL,NULL,NULL,NULL,NULL);
BEGIN
	FOR r IN (
		SELECT *
		FROM Tution_Posts NATURAL JOIN Tutions
		WHERE post_id = tp_post_id
	)LOOP
		tution_row := TUTION(NULL, r.subjects, r.salary, r.days_per_week, r.type,NULL);
	END LOOP;
	return tution_row;
END;
/


CREATE OR REPLACE FUNCTION GET_APPLICANTS_TUTION_DETAILS(
	tp_post_id Tution_Posts.post_id%TYPE,
	s_student_id Students.user_id%TYPE
)
return TUTION_ARRAY
AS
tution_list TUTION_ARRAY := TUTION_ARRAY();
BEGIN
	FOR r IN (
		SELECT A.tutor_id, O.status
		FROM Tution_Posts NATURAL JOIN Applies A
		LEFT OUTER JOIN Offers O
		ON A.tutor_id = O.tutor_id AND O.student_id = s_student_id
		WHERE post_id = tp_post_id 
		ORDER BY A.tutor_id ASC
	)LOOP
		tution_list.EXTEND;
		IF r.status IS NULL THEN
			tution_list(tution_list.LAST) := GET_TUTION_DETAILS_FROM_POST(tp_post_id);
		ELSE 
			tution_list(tution_list.LAST) := GET_TUTION_DETAILS(r.tutor_id,s_student_id);
		END IF;
	END LOOP;
	return tution_list;
END;
/

select * from user_errors;
/

CREATE OR REPLACE FUNCTION GET_ALL_TUTIONS(
	s_student_id Students.user_id%TYPE
)
return TUTION_ARRAY
AS
	tution_list TUTION_ARRAY := TUTION_ARRAY();
BEGIN
	FOR r IN (
		SELECT *
		FROM Tutors
		ORDER BY user_id ASC 
	)LOOP
		tution_list.EXTEND;
		tution_list(tution_list.LAST) := GET_TUTION_DETAILS(r.user_id,s_student_id);
	END LOOP;
	return tution_list;
END;
/
CREATE OR REPLACE FUNCTION GET_FILTERED_TUTIONS(
	s_student_id 	Students.user_id%TYPE,
	u_gender			Users.gender%TYPE,
	t_start				Tutions.salary%TYPE,
	t_end					Tutions.salary%TYPE,
	t_status			Tutors.availability%TYPE,
	t_experience	Tutors.years_of_experience%TYPE
)
return TUTION_ARRAY
AS
	tution_list TUTION_ARRAY := TUTION_ARRAY();
BEGIN
	FOR r IN (
		SELECT *
		FROM Tutors NATURAL JOIN Users
		WHERE (u_gender = 'Any' OR gender = u_gender)
		AND	preffered_salary >= t_start AND preffered_salary <= t_end
		AND (t_status = 'Any' OR availability = t_status)
		AND years_of_experience >= t_experience
		ORDER BY user_id ASC 
	)LOOP
		tution_list.EXTEND;
		tution_list(tution_list.LAST) := GET_TUTION_DETAILS(r.user_id,s_student_id);
	END LOOP;
	return tution_list;
END;
/
CREATE OR REPLACE FUNCTION GET_MY_TUTIONS_BY_STUDENT(
	s_student_id Students.user_id%TYPE
)
return TUTION_ARRAY
AS
	tution_list TUTION_ARRAY := TUTION_ARRAY();
BEGIN
	FOR r IN (
		SELECT *
		FROM Offers
		WHERE student_id = s_student_id 
		AND status = 'ACCEPTED'
		ORDER BY tutor_id ASC 
	)LOOP
		tution_list.EXTEND;
		tution_list(tution_list.LAST) := GET_TUTION_DETAILS(r.tutor_id,s_student_id);
	END LOOP;
	return tution_list;
END;
/

CREATE OR REPLACE FUNCTION GET_MY_TUTIONS_BY_TUTOR(
	t_tutor_id Tutors.user_id%TYPE
)
return TUTION_ARRAY
AS
	tution_list TUTION_ARRAY := TUTION_ARRAY();
BEGIN
	FOR r IN (
		SELECT *
		FROM Offers
		WHERE tutor_id = t_tutor_id 
		AND status = 'ACCEPTED'
		ORDER BY student_id ASC 
	)LOOP
		tution_list.EXTEND;
		tution_list(tution_list.LAST) := GET_TUTION_DETAILS(t_tutor_id,r.student_id);
	END LOOP;
	return tution_list;
END;
/

CREATE or REPLACE PROCEDURE CHANGE_PASSWORD(
	u_id			Users.user_id%TYPE,
	new_pass	Users.pass%TYPE
)
AS
BEGIN
	UPDATE Users
	SET pass = new_pass
	where user_id = u_id;
EXCEPTION
	WHEN no_data_found THEN
		RAISE_APPLICATION_ERROR(-20999,'No such user');
END;
/

CREATE OR REPLACE FUNCTION GET_COURSE_ID(
	b_batch_id	Batches.batch_id%TYPE
)
return NUMBER
AS
c_course_id Courses.course_id%TYPE;
BEGIN
SELECT course_id INTO c_course_id
FROM Batches  
WHERE batch_id = b_batch_id;
return c_course_id;
END;
/

CREATE OR REPLACE PROCEDURE CREATE_BATCH(
	c_course_id		Courses.course_id%TYPE,
	b_start_date	VARCHAR2,
	b_seats				Batches.seats%TYPE,
	b_class_days	Batches.class_days%TYPE,
	b_class_time	Batches.class_time%TYPE
)
AS
BEGIN
	INSERT INTO Batches (course_id,start_date,seats,class_days,class_time)
	VALUES(c_course_id,TO_DATE(b_start_date,'MM/DD/YYYY'),b_seats,b_class_days,b_class_time);
END;
/

CREATE OR REPLACE PROCEDURE CREATE_COURSE(
	c_coaching_id	Coachings.coaching_id%TYPE,
	c_class				Courses.class%TYPE,
	c_subject			Courses.subject%TYPE
)
AS
BEGIN
INSERT INTO Courses (coaching_id,class,subject)
VALUES(c_coaching_id,c_class,c_subject);
END;
/

CREATE OR REPLACE PROCEDURE ENROLL_COURSE(
	u_user_id		Users.user_id%TYPE,
	b_batch_id	Batches.batch_id%TYPE
)
AS
BEGIN
INSERT INTO EnrolledIn
VALUES(u_user_id,GET_COURSE_ID(b_batch_id),b_batch_id);
EXCEPTION
	WHEN DUP_VAL_ON_INDEX THEN
		RAISE_APPLICATION_ERROR(-20999,'Already enrolled in this course');
END;
/

CREATE OR REPLACE FUNCTION  GET_BATCH_DETAILS(
	b_batch_id	Batches.batch_id%TYPE
)
return BATCH
AS 
	batch_row BATCH := BATCH(NULL,NULL,NULL,NULL,NULL,NULL,NULL);
BEGIN
	FOR r IN (
		SELECT * 	 	
		FROM Batches
		WHERE batch_id = b_batch_id
	)LOOP
		batch_row := BATCH(
				r.batch_id,
				r.start_date,
				r.seats,
				r.students,
				r.class_days,
				r.class_time,
				0
		);
	END LOOP;
	batch_row.student_count := GET_BATCH_STUDENT_COUNT(b_batch_id);
	return batch_row;
END;
/

CREATE OR REPLACE FUNCTION  GET_COURSE_DETAILS(
	c_course_id	Courses.course_id%TYPE,
	b_batch_id  Batches.batch_id%TYPE
)
return COURSE
AS 
	course_row COURSE := COURSE(NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
BEGIN
	FOR r IN (
		SELECT C.course_id,name,class,subject,start_date,seats,students,class_days,class_time
		FROM Courses C NATURAL JOIN Coachings
		LEFT OUTER JOIN Batches B
		ON B.course_id = C.course_id
		WHERE C.course_id = c_course_id 
		AND (b_batch_id IS NULL OR B.batch_id = b_batch_id)
	)LOOP
		course_row := COURSE(
				r.course_id,
				r.name,
				r.class,
				r.subject,
				r.start_date,
				r.seats,
				r.students,
				r.class_days,
				r.class_time,
				0,
				0
		);
		course_row.batch_count := GET_BATCH_COUNT(c_course_id);
		course_row.student_count := GET_COURSE_STUDENT_COUNT(c_course_id);
	END LOOP;
	return course_row;
END;
/
CREATE OR REPLACE FUNCTION  GET_BATCHES(
	c_course_id	Courses.course_id%TYPE
)
return BATCH_ARRAY
AS
batch_list BATCH_ARRAY := BATCH_ARRAY();
BEGIN
	FOR r IN (
			SELECT *
      FROM Batches 
      WHERE course_id = c_course_id
			ORDER BY batch_id ASC
	)LOOP
		batch_list.EXTEND;
		batch_list(batch_list.LAST) := GET_BATCH_DETAILS(r.batch_id);
	END LOOP;
	return batch_list;
END;
/

CREATE OR REPLACE FUNCTION  GET_BATCH_OPTIONS(
	c_coaching_id	Coachings.coaching_id%TYPE,
	c_class				Courses.class%TYPE,
	c_subject			Courses.subject%TYPE
)
return BATCH_ARRAY
AS
batch_list BATCH_ARRAY := BATCH_ARRAY();
BEGIN
	FOR r IN (
			SELECT *
      FROM Courses NATURAL JOIN Batches 
      WHERE coaching_id = c_coaching_id
      AND class = c_class
      AND subject = c_subject
	)LOOP
		batch_list.EXTEND;
		batch_list(batch_list.LAST) := GET_BATCH_DETAILS(r.batch_id);
	END LOOP;
	return batch_list;
END;
/

CREATE OR REPLACE FUNCTION  GET_SUBJECT_OPTIONS(
	c_coaching_id	Coachings.coaching_id%TYPE,
	c_class				Courses.class%TYPE
)
return STRING_ARRAY
AS
subject_list STRING_ARRAY := STRING_ARRAY();
BEGIN
	FOR r IN (
			SELECT DISTINCT subject
      FROM Courses 
      WHERE coaching_id = c_coaching_id
      AND class = c_class
	)LOOP
		subject_list.EXTEND;
		subject_list(subject_list.LAST) := r.subject;
	END LOOP;
	return subject_list;
END;
/

CREATE OR REPLACE FUNCTION  GET_CLASS_OPTIONS(
	c_coaching_id	Coachings.coaching_id%TYPE
)
return STRING_ARRAY
AS
class_list STRING_ARRAY := STRING_ARRAY();
BEGIN
	FOR r IN (
			SELECT DISTINCT class
      FROM Courses 
      WHERE coaching_id = c_coaching_id
	)LOOP
		class_list.EXTEND;
		class_list(class_list.LAST) := r.class;
	END LOOP;
	return class_list;
END;
/

CREATE OR REPLACE FUNCTION GET_PASSWORD(
	u_email			Users.email%TYPE,
	u_role 			Users.role%TYPE
)
return 	Users.pass%TYPE
AS
curr_pass	Users.pass%TYPE;
BEGIN
	SELECT pass INTO curr_pass
	FROM Users
	where email = u_email
	AND role = u_role;
	return curr_pass;
EXCEPTION
	WHEN others THEN
		return NULL;
END;
/

CREATE OR REPLACE PROCEDURE CANCEL_APPLICATION(
	t_tutor_id	Tutors.user_id%TYPE,
	tp_post_id 	Tution_Posts.post_id%TYPE
)
AS
BEGIN
	DELETE FROM Applies
  WHERE tutor_id = t_tutor_id AND post_id = tp_post_id;
END;
/

CREATE OR REPLACE PROCEDURE APPLY_FOR_TUTION(
	t_tutor_id	Tutors.user_id%TYPE,
	tp_post_id 	Tution_Posts.post_id%TYPE
)
AS
BEGIN
	INSERT INTO Applies (tutor_id, post_id)
  VALUES(t_tutor_id,tp_post_id);
END;
/

CREATE OR REPLACE PROCEDURE MAKE_OFFER(
	s_student_id		Students.user_id%TYPE,
	t_tutor_id 			Tutors.user_id%TYPE,
	t_subjects 			Tutions.subjects%TYPE,
	t_salary 				Tutions.salary%TYPE,
	t_days_per_week Tutions.days_per_week%TYPE,
	t_type					Tutions.type%TYPE
)
AS
BEGIN
	 INSERT INTO Offers (student_id, tutor_id, tution_id, status)
   VALUES(s_student_id,t_tutor_id,CREATE_TUTION(t_subjects,t_salary,t_days_per_week,t_type),'PENDING');
END;
/


CREATE OR REPLACE FUNCTION IS_VALID_TOKEN(
	u_id			Users.user_id%TYPE, 
	u_email		Users.email%TYPE, 
	u_pass		Users.pass%TYPE,  
	u_role		Users.role%TYPE
)
return VARCHAR2
AS
user_row Users%ROWTYPE;
BEGIN
	user_row := GET_USER_BY_EMAIL(u_email);
	IF user_row.pass = u_pass AND user_row.user_id = u_id AND user_row.role = u_role THEN
		return 'YES';
	ELSE
		return 'NO';
	END IF;
END;
/

CREATE OR REPLACE PROCEDURE CHANGE_PROFILE_PICTURE(
	u_user_id	Users.user_id%TYPE,
	u_image		Users.image%TYPE
)
AS 
BEGIN
	UPDATE Users
  SET image = u_image
  WHERE user_id = u_user_id;
END;
/

CREATE OR REPLACE PROCEDURE CHANGE_COACHING_PICTURE(
	c_coaching_id	Coachings.coaching_id%TYPE,
	c_image				Coachings.image%TYPE
)
AS 
BEGIN
	UPDATE Coachings
	SET image = c_image
	WHERE coaching_id = c_coaching_id;
END;
/
CREATE OR REPLACE PROCEDURE ACCEPT_OFFER(
	t_tutor_id 		Tutors.user_id%TYPE,
	s_student_id 	Students.user_id%TYPE
)
AS
BEGIN
	UPDATE Offers
	SET status = 'ACCEPTED'
	WHERE tutor_id = t_tutor_id AND student_id = s_student_id;
END;
/
CREATE OR REPLACE PROCEDURE DELETE_OFFER(
	t_tutor_id 		Tutors.user_id%TYPE,
	s_student_id 	Students.user_id%TYPE
)
AS
BEGIN
	DELETE FROM Offers
	WHERE tutor_id = t_tutor_id AND student_id = s_student_id;
END;
/
CREATE OR REPLACE PROCEDURE REJECT_OFFER(
	t_tutor_id 		Tutors.user_id%TYPE,
	s_student_id 	Students.user_id%TYPE
)
AS
BEGIN
	DELETE FROM Offers
	WHERE tutor_id = t_tutor_id AND student_id = s_student_id;
END;
/

CREATE OR REPLACE FUNCTION GET_ADMIN_COURSES(
	t_tutor_id	Tutors.user_id%TYPE
)
return COURSE_ARRAY
AS
course_list COURSE_ARRAY := COURSE_ARRAY();
BEGIN
	FOR r IN (
		SELECT *
		FROM MemberOf NATURAL JOIN Courses
		WHERE user_id = t_tutor_id AND type = 'ADMIN'
		ORDER BY course_id ASC
	)LOOP
		course_list.EXTEND;
		course_list(course_list.LAST) := GET_COURSE_DETAILS(r.course_id, NULL);
	END LOOP;
	return course_list;
END;
/

CREATE OR REPLACE FUNCTION GET_COACHING_COURSES(
	c_coaching_id	Coachings.coaching_id%TYPE
)
return COURSE_ARRAY
AS
course_list COURSE_ARRAY := COURSE_ARRAY();
BEGIN
	FOR r IN (
		SELECT *
		FROM Courses
		WHERE coaching_id = c_coaching_id
		ORDER BY course_id ASC
	)LOOP
		course_list.EXTEND;
		course_list(course_list.LAST) := GET_COURSE_DETAILS(r.course_id, NULL);
	END LOOP;
	return course_list;
END;
/

CREATE OR REPLACE FUNCTION GET_MEMBER_COURSES(
	s_student_id	Students.user_id%TYPE
)
return COURSE_ARRAY
AS
course_list COURSE_ARRAY := COURSE_ARRAY();
BEGIN
	FOR r IN (
		SELECT *
		FROM EnrolledIn
		WHERE student_id = s_student_id
		ORDER BY course_id ASC
	)LOOP
		course_list.EXTEND;
		course_list(course_list.LAST) := GET_COURSE_DETAILS(r.course_id,r.batch_id);
	END LOOP;
	return course_list;
END;
/

CREATE OR REPLACE PROCEDURE CANCEL_OFFER(
	t_tutor_id 		Tutors.user_id%TYPE,
	s_student_id 	Students.user_id%TYPE
)
AS
BEGIN
	DELETE FROM Offers
	WHERE tutor_id = t_tutor_id AND student_id = s_student_id;
END;
/

CREATE OR REPLACE PROCEDURE RATE(
	s_student_id 	Students.user_id%TYPE,
	t_tutor_id 		Tutors.user_id%TYPE,
	o_rating			Offers.rating%TYPE
)
AS
BEGIN
	UPDATE Offers SET rating = o_rating
	WHERE tutor_id = t_tutor_id AND student_id = s_student_id AND status = 'ACCEPTED';
END;
/

CREATE OR REPLACE FUNCTION GET_BATCH_STUDENT_COUNT(
	b_batch_id	Batches.batch_id%TYPE
)
return NUMBER
AS
student_count	NUMBER;
BEGIN
	SELECT COUNT(*) INTO student_count
	FROM EnrolledIn 
	WHERE batch_id = b_batch_id;
	return student_count;
END;
/

CREATE OR REPLACE FUNCTION GET_BATCH_COUNT(
	c_course_id	Courses.course_id%TYPE
)
return NUMBER
AS
batch_count	NUMBER;
BEGIN
	SELECT COUNT(*) INTO batch_count
	FROM Batches
	WHERE course_id = c_course_id;
	return batch_count;
END;
/

CREATE OR REPLACE FUNCTION GET_COURSE_STUDENT_COUNT(
	c_course_id	Courses.course_id%TYPE
)
return NUMBER
AS
student_count	NUMBER;
BEGIN
	SELECT COUNT(*) INTO student_count
	FROM EnrolledIn 
	WHERE course_id = c_course_id;
	return student_count;
END;
/

CREATE OR REPLACE FUNCTION GET_SEAT_COUNT(
	b_batch_id	Batches.batch_id%TYPE
)
return NUMBER
AS
seat_count	NUMBER;
BEGIN
	SELECT seats INTO seat_count
	FROM Batches 
	WHERE batch_id = b_batch_id;
	return seat_count;
END;
/

DECLARE
curr_pass	Users.pass%TYPE;
BEGIN
curr_pass := GET_PASSWORD(1);
DBMS_OUTPUT.PUT_LINE(curr_pass);
END;
/