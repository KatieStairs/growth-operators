-- 1. Create database 'next_level' in your database manager.
-- 2. Copy, paste, and execute the below code into a new SQL query. 
-- 3. Import EvalTemplate.csv:
-- a. Uncheck 'First Row is Header' (if already checked)
-- b. Match the following columns up:
-- i. Column 1 // substring_name
-- ii. Column 3 // function_name
-- iii. Column 5 // level_rating_criteria
-- 4. Copy, paste, and execute the below code. 

-- Dummy data provided for all tables except "user" and "user_client"

-------------- ** FIRST HALF OF SQL CODE **

--! Database name: "next_level"

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR UNIQUE NOT NULL,
    "password" VARCHAR NOT NULL,
    "name" VARCHAR
);

CREATE TABLE "client" (
    "id" SERIAL PRIMARY KEY,
    "company_name" VARCHAR,
    "contact_name" VARCHAR,
    "contact_email" VARCHAR
);

INSERT INTO "client" 
("company_name", "contact_name", "contact_email")
VALUES 
('Target', 'Lauren H', 'lauren@gmail.com'),
('3M', 'Malik I', 'malik@gmail.com'),
('Best Buy', 'Mike S', 'mike@gmail.com'),
('General Mills', 'Adam B', 'adam@gmail.com'),
('Optum', 'Katie S', 'katie@gmail.com');


CREATE TABLE "user_client" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    "client_id" INTEGER REFERENCES "client" ON DELETE CASCADE
);

CREATE TABLE "client_assessments" (
    "id" SERIAL PRIMARY KEY,
    "client_id" INTEGER REFERENCES "client" ON DELETE CASCADE,
    "engagement_date" DATE,
    "status" VARCHAR
);

INSERT INTO "client_assessments" 
("client_id", "engagement_date", "status")
VALUES 
(1, '03-07-2023', 'Edit in Progress'),
(2, '03-07-2023', 'Edit in Progress'),
(3, '03-07-2023', 'Edit in Progress'),
(4, '03-07-2023', 'Edit in Progress'),
(5, '03-07-2023', 'Edit in Progress');

CREATE TABLE "buckets" (
    "id" SERIAL PRIMARY KEY,
    "bucket_index" INTEGER,
    "name" VARCHAR
);

INSERT INTO "buckets" 
("bucket_index", "name")
VALUES
(1, 'Organizational Effectiveness'),
(2, 'Employee Engagement'),
(3, 'Training & Development'),
(4, 'Benefits & Compensation'),
(5, 'Recruiting & Staffing'),
(6, 'HRIS, Payroll & Compliance');

CREATE TABLE "functions" (
	"id" SERIAL PRIMARY KEY,
	"bucket_id" INTEGER REFERENCES "buckets",
	"function_index" INTEGER,
	"name" VARCHAR
);

INSERT INTO "functions" 
("bucket_id", "function_index", "name")
VALUES
(1, 1, 'Mission, Vision, Values'),
(1, 2, 'Business Goals and Org Alignment'),
(1, 3, 'Workflow, Procedures, Structures & Systems'),
(1, 4, 'Succession Planning'),
(2, 1, 'Employee Communication'),
(2, 2, 'Measurement'),
(2, 3, 'Problem Resolution'),
(2, 4, 'Retention Planning & Analysis'),
(2, 5, 'Recognition'),
(2, 6, 'Charitable Giving'),
(2, 7, 'Health & Wellness'),
(2, 8, 'Diversity, Equity & Inclusion'),
(3, 1, 'Company-Wide Compliance'),
(3, 2, 'Employee Resources'),
(3, 3, 'New Hire Oritentation & Onboarding'),
(3, 4, 'Training & Tools'),
(3, 5, 'Assessment, Tracking, Measurement'),
(4, 1, 'Compensation Plan/Philosophy'),
(4, 2, 'Benefits Strategy'),
(4, 3, 'Enrollment'),
(4, 4, 'Employee Education'),
(4, 5, 'Administer Benefit & Comp Plans'),
(4, 6, 'Compliance'),
(5, 1, 'Team Rationalization & Synergies'),
(5, 2, 'Selection Process Design'),
(5, 3, 'Staffing Execution/Admin'),
(6, 1, 'Federal, State & Local Requirements'),
(6, 2, 'Employee Handbook'),
(6, 3, 'Employee Data'),
(6, 4, 'Unemployment'),
(6, 5, 'HR Legal & Risk Management'),
(6, 6, 'Payroll'),
(6, 7, 'Ethics/Corp Governance'),
(6, 8, 'Safety & Workers Compensation'),
(6, 9, 'Labor Relations'),
(6, 10, 'Safety Policies');

CREATE TABLE "subfunctions" (
	"id" SERIAL PRIMARY KEY,
	"function_id" INTEGER REFERENCES "functions",
	"function_name" VARCHAR,
	"subfunction_index" INTEGER,
	"substring_name" VARCHAR,
	"name" VARCHAR,
	"level_rating_criteria" VARCHAR
);


-------------- ** IMPORT CSV DATA, THEN: **

UPDATE "subfunctions"
	SET "function_name"='Compensation Plan/Philosophy'
	WHERE "function_name" = 'Compensation Plan/ Philosophy';

UPDATE "subfunctions"
	SET "function_name"='Company-Wide Compliance'
	WHERE "function_name" = 'Company Wide Compliance';
	
UPDATE "subfunctions"
	SET "function_name"='Team Rationalization & Synergies'
	WHERE "function_name" = 'Team rationalization & synergies';
	
UPDATE "subfunctions"
	SET "function_name"='Staffing Execution/Admin'
	WHERE "function_name" = 'Staffing Execution/ Admin';
	
UPDATE "subfunctions"
	SET "function_name"='Safety Policies'
	WHERE "function_name"='Safety Polices';	
	
UPDATE "subfunctions"
	SET "name"='Safety Policies'
	WHERE "name"='Safety Polices';	
	
UPDATE "subfunctions"
	SET "function_name"='Employee Data'
	WHERE "function_name"='Employee Data ';	

UPDATE "subfunctions"
	SET "function_id"="functions"."id"
	FROM "functions"
	WHERE "subfunctions"."function_name" = "functions"."name";

DELETE FROM "subfunctions"
WHERE "name" = 'Sub-function';

ALTER TABLE "subfunctions"
ALTER COLUMN "subfunction_index" TYPE VARCHAR;

UPDATE "subfunctions"
	SET "subfunction_index" = SUBSTRING("substring_name",3,4);

UPDATE "subfunctions"
	SET "subfunction_index" = RIGHT("subfunction_index",2);
	
UPDATE "subfunctions"
	SET "subfunction_index" = RTRIM("subfunction_index");

UPDATE "subfunctions"
	SET "subfunction_index" = LTRIM("subfunction_index", '.');
		
ALTER TABLE "subfunctions"
ALTER COLUMN "subfunction_index" TYPE INTEGER USING subfunction_index::integer;

ALTER TABLE "subfunctions"
DROP COLUMN "substring_name";

ALTER TABLE "subfunctions"
ADD "level_criteria_strong" VARCHAR;

ALTER TABLE "subfunctions"
ADD "level_criteria_adequate" VARCHAR;

ALTER TABLE "subfunctions"
ADD "level_criteria_weak" VARCHAR;

UPDATE "subfunctions"
SET "level_criteria_strong" = SPLIT_PART("level_rating_criteria", 'Adequate', 1);

UPDATE "subfunctions"
SET "level_criteria_adequate" = CONCAT('Adequate', SPLIT_PART("level_rating_criteria", 'Adequate', 2));

UPDATE "subfunctions"
SET "level_criteria_weak" = CONCAT('Weak', SPLIT_PART("level_rating_criteria", 'Weak', 2));

CREATE TABLE "buckets_headlines" (
	"id" SERIAL PRIMARY KEY,
	"assessment_id" INTEGER REFERENCES "client_assessments" ON DELETE CASCADE,
	"bucket_id" INTEGER REFERENCES "buckets",
	"headline_text" VARCHAR(255)
);

INSERT INTO "buckets_headlines"
("assessment_id", "bucket_id", "headline_text")
VALUES
(1,1,'Cheerleaders should start doing sad/interpretive dance when their team is losing.'),
(2,2,'Did I “kill a plant” or did the plant not have what it takes to thrive in this fast-paced environment'),
(3,3,'*at a job interview* “Can you perform under pressure?” *Me:* “Im not sure I know all the lyrics but here goes nothing.”'),
(4,4,'[Masterchef] *Gordon Ramsay:* describe the dish *Me, proudly:* ceramic, chef'),
(5,5, 'Mom, can you pick me up? im at a party and theres someone funnier than me here');
	
CREATE TABLE "assessment_items" (
	"id" SERIAL PRIMARY KEY,
	"assessment_id" INTEGER REFERENCES "client_assessments" ON DELETE CASCADE,
    "bucket_id" INTEGER REFERENCES "buckets",
	"function_id" INTEGER REFERENCES "functions",
	"subfunction_id" INTEGER REFERENCES "subfunctions",
	"level_rating" INTEGER,
	"findings" VARCHAR,
	"impact" VARCHAR,
	"recommendations" VARCHAR,
	"phase" INTEGER
);

INSERT INTO "assessment_items"
("assessment_id", "bucket_id", "function_id", "subfunction_id", "level_rating", "findings", "impact", "recommendations", "phase")
VALUES
(1,1,1,1,1,'Look what I found!','Deep Impact is a 1998 American science-fiction disaster film directed by Mimi Leder, written by Bruce Joel Rubin and Michael Tolkin, and starring Robert Duvall, Téa Leoni, Elijah Wood, Vanessa Redgrave, Maximilian Schell, and Morgan Freeman','No recommendations at this time.',1),
(2,2,2,2,2,'Look at all these findings','Steven Spielberg served as an executive producer of Deep Impact. It was released by Paramount Pictures in North America and by DreamWorks Pictures internationally on May 8, 1998. The film depicts the attempts to prepare for and destroy a 7-mile (11 km) wide comet set to collide with Earth and cause a mass extinction.','ONLY recommendations at this time.',2),
(3,3,3,3,3,'So many findings I have found tonight!','Deep Impact was released in the same summer as a similarly themed film, Armageddon, which fared better at the box office, while astronomers described Deep Impact as being more scientifically accurate. Both films were similarly received by critics, with Armageddon scoring 38% and Deep Impact scoring 44% on Rotten Tomatoes.','Too many recommendations at this time. 😔',3),
(4,4,4,4,4,'Life, uh... finds a way.','Deep Impact grossed over $349 million worldwide on an $80 million production budget. It was the final film by cinematographer Dietrich Lohmann, who died before the films release.','NO',null),
(5,5,5,5,5,'It took exactly this long for the word find to lose meaning.','A number of scientists worked as science consultants for the film including astronomers Gene Shoemaker, Carolyn Shoemaker, Josh Colwell and Chris Luchini, former astronaut David Walker, and the former director of the NASAs Lyndon B. Johnson Space Center Gerry Griffin.',null,5);

CREATE TABLE "tags" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR
);

INSERT INTO "tags"
("name")
VALUES
('🏆 Quick Win'),
('🔥 Fire Drill'),
('💪 Strength - Add to Slide'),
('✍️ Opportunity - Add to Slide');

CREATE TABLE "tags_assessment_items" (
	"id" SERIAL PRIMARY KEY,
	"assessment_item_id" INTEGER REFERENCES "assessment_items" ON DELETE CASCADE,
	"tag_id" INTEGER REFERENCES "tags"
);

INSERT INTO "tags_assessment_items"
("assessment_item_id", "tag_id")
VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(4,1);

INSERT INTO "user_client"
("user_id","client_id")
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5);