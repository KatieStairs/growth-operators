DROP TABLE IF EXISTS "tags_assessment_items";
DROP TABLE IF EXISTS "user_client";
DROP TABLE IF EXISTS "buckets_headlines";
DROP TABLE IF EXISTS "assessment_items";
DROP TABLE IF EXISTS "client_assessments";
DROP TABLE IF EXISTS "client";

CREATE TABLE "client" (
    "id" SERIAL PRIMARY KEY, 
    "company_name" VARCHAR,
    "contact_name" VARCHAR,
    "contact_email" VARCHAR
);

INSERT INTO "client" 
("company_name", "contact_name", "contact_email")
VALUES 
('Target', 'Brian Cornell', 'bc@gmail.com'),
('3M', 'Mike Roman', 'mr@gmail.com'),
('Best Buy', 'Corie Barry', 'cb@gmail.com'),
('General Mills', 'Jeff Harmening', 'jh@gmail.com'),
('Optum', 'Wyatt Decker', 'wd@gmail.com'),
('Prime Digital Academy', 'Matt Black', 'matt@prime.com'),
('Boise Paper Company', 'Greg', 'greg@gmail.com');

CREATE TABLE "client_assessments" (
    "id" SERIAL PRIMARY KEY,
    "client_id" INTEGER REFERENCES "client" ON DELETE CASCADE,
    "engagement_date" DATE,
    "status" VARCHAR,
    "next_steps" VARCHAR,
    "future_state" VARCHAR
);

INSERT INTO "client_assessments" 
("client_id", "engagement_date", "status", "next_steps", "future_state")
VALUES 
(1, '03-07-2023', 'Edit in Progress', null, null),
(2, '03-08-2023', 'Active', null, null),
(3, '03-09-2023', 'Archived', null, null),
(4, '03-10-2023', 'Not Yet Started', null, null),
(5, '03-11-2023', 'Edit in Progress', null, null),
(6, '03-21-2023', 'Active', 'Careful steppin`!', 'Onwards and upwards!'),
(7, '03-21-2023', 'Not Yet Started', null, null);

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
(6,1,2,4,3,'Org chart exists and is accurate - however it is not shared with staff.  This is not a purposeful decision, but rather more of an oversight.','','',null),
(6,1,2,3,2,E'The company\'s strategic plan is well documented and the process to build-out the plan is comprehensive in terms of gaining input and buy in from many stakeholders.  However, accountability for executing the strategic plan is very lacking and leadership is nervous to hold people accountable due to potential turnover. The plan is not part of anyone\'s job duties and it is unclear if/where it fits into the annual performance review process or goal-setting with staff members.','','Simplify the strategic plan and assign clear accountability to people at the outset of the new plan.  Align on how/where these expectations fit into the performance management efforts for responsible staff members.  Set clear expectations as to what staff will be coached on and held accountable to.  Create quarterly/monthly milestones to check-in on progress toward the intended outcomes.  Follow best practices in project management.',2),
(6,1,3,8,3,'See 1.3.2.  Most processes are manual and use ""ad hoc"" tools as budget allows.  There is an ATS for the purpose of posting jobs and accepting applications.  Current tools are adequate for the needs of the company.','','',null),
(6,1,3,7,3,E'Job descriptions are quite detailed and generally match the org chart.  There doesn\'t typically exist much overlap between roles/job duties, although some staff do ""wear multiple hats"". As no workflow processes are documented, the role definition is primarily based on the specific responsibilities of each role ""in a silo"".','','Ensure team members are clear on their key responsibilities and are held accountable to those responsibilities.',4),
(6,1,3,5,0,'TBD','','',null),
(6,1,3,6,1,'Very few processes have been documented and those that have are not generally stored in a common accessible location.  This is leading to significant anxiety on the part of leadership, in the event that someone should leave, all knowledge leaves ""with them"".','','Near term: Require current process owners to identify all processes they own and then create documentation to support the process.  Hold recorded calls where the staff member must ""walk through"" the process step-by-step, explaining any key details and sharing screens if applicable.  Store the recording in a common location that can then be shared as-needed.

Long-term: Include documentation requirements in job descriptions and in annual performance reviews and/or regular check-in conversations.',1),
(6,1,4,9,1,'No Succession plan exists for any leadership roles.','','Adopt a basic annual calibration process to identify possible successors to key roles.  Communicate with those people to understand their career aspirations and express support of their continued path at the company.  Ensure the company is supportive of their development.',3),
(6,2,5,10,4,'Communications with staff are routine and planned on regular cadences and with various audiences.  Weekly emailed newsletters, weekly ""learning pod"" meetings and monthly all-staff updates are some of the communications opportunities.','','Continue with planned communications.  Incorporate a recognition item into each communication.  Re-evaluate the content/agenda to ensure they are a productive use of time for all participants.',3),
(6,2,5,11,4,'Staff are given opportunities to engage on the strategic plan, as well as in social and charity-based committees.  The charity/community-focused options seem to get the most traction.','','',null),
(6,2,6,12,1,'Employee opinion surveys are offered only when a salient issue has been identified.  Survey questions relate mostly to that specific issue and no two occurrences contain the same questions.','','Conduct regular basic staff feedback surveys each year (or each semester, if possible).  Use the same question set each time and ensure a dedicated effort to share results with the staff.  Measure improvements year-over-year.  Implement ideas/efficiencies as it makes sense.',2),
(6,2,7,13,3,E'Within the collective bargaining agreements (CBA\'s) there is a clear process outlined in the event that a grievance would be filed.  However, in the last 2 years there have been no grievances and all issues have been able to be resolved with a manager conversation.  There is a general need to address accountability as a culture issue at the company - managers either don\'t have the skills or the desire to hold staff accountable (ex: on-time arrival, execution of the strat plan, etc.)','','Evaluate manager capability/readiness to hold staff accountable to clear expectations.  Conduct a focus group to identify barriers and address those barriers to accountability at a systemic level.',2),
(6,2,8,15,3,'There are some activities that are made available for staff and family participation; they are somewhat infrequent and based on someone being willing to organize them.  When someone gets married or has a baby, there is staff recognition from the team to the individual.','','',null),
(6,2,8,14,2,'The leadership is aware that turnover is a problem, but does not have a plan to measure it or a formal retention plan.','','Implement exit interviews when someone resigns or indicates they do not intend to return.  Capture and track the data; take action to resolve any major issues.

Identify key ""backbone"" staff members and have managers conduct stay interviews.  Ensure staff are aware of the value they bring and take steps to help them feel recognized/ appreciated.',2),
(6,2,9,16,1,'There are no formal recognition programs in place other than a 1x per year event hosted by the leadership.  It is unclear how much ""informal"" staff recognition occurs.','','Encourage recognition protocols within the various meeting cadences.  Add recognition as an agenda item and model the desired behavior.',1),
(6,2,10,17,4,'Charitable giving is a large part of what staff ""rallies around"" within a given year - esp. with programs to help disadvantaged families.','','Keep it up - ensure the generosity of the staff is celebrated and acknowledged by the board and at appropriate meetings (i.e. share total $$ or total # of gifts that were donated by the staff).',null),
(6,2,11,19,3,'Newsletters are emailed occasionally to encourage staff to prioritize their wellbeing.  There is a wellness budget established by the state - however this is limited.  Staff participation is encouraged but is generally sparse.','','Identify 2-3 wellness focus areas at the beginning of each school year and focus energy/efforts around those (i.e. step challenge for staff, healthy food potluck/ recipes, some recognition when people share/meet wellness goals, etc.); Make them competitive if that resonates.',4),
(6,2,11,18,0,'See 2.7.2','','',null),
(6,2,12,20,1,'The company does not participate in incentive programs around hiring diverse staff.  They do complete staff development around cultural competencies and staff are expected to be aware of and respectful of a variety of cultures.','','Adopt a position statement about DE&I that resonates with the type of diversity in your area.  This will help build staff awareness that there is at least a thoughtful approach.  Ensure that monthly celebrations (i.e. Black History Month) have a place on staff calendars.',3),
(6,3,13,21,5,'The company uses a system for most compliance training.  They rely on a supplier for on-site training and certifications for custodians.  All is trackable and easily pulled.','','',null),
(6,3,14,24,2,'CBAs cover much of this information so that issues are handled with consistency.  However the template and process for a PIP is not readily available and next steps are not always clear.','','Create an online repository of the current performance support processes and templates so that supervisors have access to the most updated materials and are handling issues consistently.',1),
(6,3,14,23,0,'See 2.1.1.  Meetings cadence is regular and meetings occur as-expected.  TBD whether meetings are well-attended and productive.','','',1),
(6,3,14,22,0,'Meetings do have agendas, are well-attended, and generally productive.  They are working on shoring up the meetings even further so that all topics correspond to either the strategic plan or to the graduate profile.','','',null),
(6,3,15,25,3,E'NHO practices are adequate for their needs, however they are not documented.  There are likely opportunities to further engage the new hire and help him/her feel connected to the company\'s community.','','Document the NHO and on-boarding processes.  Assess the extent to which new hires feel truly engaged and connected to the company community after on-boarding and what could be done differently to help build more connection.',3),
(6,3,16,29,0,'','','',null),
(6,3,16,27,3,'OTJ training varies by role.  None of it is documented.  Would be good to at least provide a role-specific checklist of the information that needs to be covered with each new hire for OTJ.','','Provide a role-specific checklist of the information that needs to be covered with each new hire for OTJ.  This can be given to both the ""mentor"" and to the new hire to ensure everything is covered.',2),
(6,3,16,28,3,'Management has access to training via external associations.  However, it is not required for them to attend.','',E'Ensure that supervisors have a clearer understanding of areas in which they could further grow their people-management skills.  Once those areas are identified, encourage them to participate in applicable learning experiences.  Then ensure accountability (via ICD or annual reviews) for applying the skills they\'re practicing.',3),
(6,3,16,31,0,'','','',null),
(6,3,16,26,2,'There is no ICD at the company.  However, people are supported in their choices to pursue additional certifications and degrees.  The leadership tries to ensure they give people exposure in their certification topics so they receive the required hours needed to complete the credential.','',E'Provide a written template that can be filled out by the staff member to identify skills/knowledge they wish to develop or grow into.  Encourage supervisors to have a recurring conversation about the contents of the template and ask how they can support the person\'s development.',null),
(6,3,16,30,1,'No career paths.','','Build out experience maps for the most common roles.  Objective is to let people know what opportunities they have in their role - what committees and projects they could be involved in, what certifications they could pursue, what other jobs exist that might a logical change if they wanted a shift in their career.',2),
(6,3,16,32,0,'','','',null),
(6,3,17,33,2,'Performance reviews are done annually for staff.  It is a one-page self-evaluation and a one-page supervisor evaluation.  

Employees are observed 1-3 x per year by supervisors and given feedback.  Documentation is stored in personnel files.

Compensation is not tied to reviews because it is tied to CBA terms.','','Evaluate the content and method used for staff performance reviews.  Incorporate values, expected behaviors and strengths/opportunities discussion.  As a follow-up, determine whether there is an appropriate development plan for the person to focus on learning a new skill or process, which would help build their engagement and help the company.',2),
(6,3,17,34,1,'There is no talent review/calibration process that occurs with any regularity.','','Adopt a talent calibration conversation process as a method of identifying key ""backbone"" staff members, as well as providing recognition and alignment on development planning and potential successors for key roles.',3),
(6,3,17,35,0,'','','',null),
(6,4,18,36,4,E'Compensation is set by the CBA\'s.  Negotiations are the time at which changes can be made.  For staff, compensation is based on role and tenure - not performance.','','',1),
(6,4,18,37,2,E'Compensation of non-CBA staff needs to be reviewed.  We don\'t know if it\'s aligned to market or not, based on skills, years of experience, etc.','','Need to review the compensation of jobs (non-CBA) against market.  Make any associated recommendations.',1),
(6,4,18,38,2,'','','Current project in process to review pay ranges and provide recommendations based on objective data.',1),
(6,4,18,39,1,'The unions bring forward ideas around variable pay, however they budget approval and administration process is cumbersome.  The funding is unclear.','','Explore what other companies have put in place in terms of incentives and variable pay opportunities.  Determine if something like this might make a significant positive impact for staff.',4),
(6,4,18,40,3,'Job descriptions are quite detailed in many cases.','','Ensure staff members have access to their job descriptions at any time and communicate with them where to access them.  Use the conversation to help clarify and re-align expectations.',1),
(6,4,18,41,0,'','','',null),
(6,4,18,42,0,'','','',null),
(6,4,18,43,4,'Most roles are union roles and, as such, have union agreements.  These are tracked and signed upon hire.','','',null),
(6,4,18,44,0,'','','',null),
(6,4,19,45,4,'Broker relationship is well-established and benefits are reviewed every other year.','','',null),
(6,4,19,46,3,'','','Gather staff feedback about the benefits offerings and what staff members would appreciate.  Determine possible changes that might have a positive impact on staff experience and perception.',4),
(6,4,20,47,4,'','','',null),
(6,4,21,48,5,'Benefits info is provided upon hire and at OE.','','',null),
(6,4,22,49,3,'Current systems are adequate to meet the needs of the company.','','',null),
(6,4,23,50,4,'Broker is a critical partner in this process.  Staff member produces 195s with support from the systems.','','',null),
(6,4,23,51,3,'This information is documented in the CBAs.','','',null),
(6,4,23,52,3,'','','',null),
(6,4,23,53,4,'','','',null),
(6,5,24,54,0,'','','',null),
(6,5,26,59,5,'Job offers are scripted.  Many details are dictated by the CBAs and not open for negotiation.','','',null),
(6,5,26,60,3,'','','Ensure there is a clear back-up trained for benefits enrollment in case primary staff member is ever unexpectedly out of office.',1),
(6,5,26,58,3,'','','',null),
(6,5,26,61,0,'','','',null),
(6,6,27,62,0,'','','',null),
(6,6,27,63,3,'','','',null),
(6,6,28,66,5,'Policies are present, thorough and updated.','','',null),
(6,6,28,66,3,'A staff member is currently updating the handbook.  It has not been reviewed by an employment attorney, but that was not necessarily the intent.','','',null),
(6,6,29,68,4,'The company has several systems in place that meet this need.','','',null),
(6,6,29,67,4,'','','',null),
(6,6,30,69,3,'','','',null),
(6,6,31,71,1,'','','Implement a proactive approach to retention of key staff members by incorporating feedback loops with them.',1),
(6,6,31,70,3,'','','',1),
(6,6,32,72,3,'','','Document processes related to staff changes and ensure that there is a back-up person trained on how to handle these.',2),
(6,6,32,73,3,'CBAs cover these situations.','','',null),
(6,6,33,74,2,'','','Ensure all staff know the process and to whom they should be reporting any ethics or code of conduct violations.',1),
(6,6,34,75,3,'The company partners with a 3rd party provider for this information.','','',null);

CREATE TABLE "tags_assessment_items" (
	"id" SERIAL PRIMARY KEY,
	"assessment_item_id" INTEGER REFERENCES "assessment_items" ON DELETE CASCADE,
	"tag_id" INTEGER REFERENCES "tags"
);
    
INSERT INTO "tags_assessment_items" ("assessment_item_id")
SELECT "assessment_items"."id" FROM "assessment_items";

UPDATE "tags_assessment_items"
SET "tag_id" = 3
WHERE "assessment_item_id" = 59;

UPDATE "tags_assessment_items"
SET "tag_id" = 3
WHERE "assessment_item_id" = 15;

UPDATE "tags_assessment_items"
SET "tag_id" = 3
WHERE "assessment_item_id" = 8;

UPDATE "tags_assessment_items"
SET "tag_id" = 1
WHERE "assessment_item_id" = 14;

UPDATE "tags_assessment_items"
SET "tag_id" = 1
WHERE "assessment_item_id" = 54;

UPDATE "tags_assessment_items"
SET "tag_id" = 4
WHERE "assessment_item_id" = 6;

UPDATE "tags_assessment_items"
SET "tag_id" = 4
WHERE "assessment_item_id" = 13;

UPDATE "tags_assessment_items"
SET "tag_id" = 4
WHERE "assessment_item_id" = 10;

UPDATE "tags_assessment_items"
SET "tag_id" = 2
WHERE "assessment_item_id" = 64;

UPDATE "tags_assessment_items"
SET "tag_id" = 2
WHERE "assessment_item_id" = 68;

CREATE TABLE "user_client" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    "client_id" INTEGER REFERENCES "client" ON DELETE CASCADE
);

INSERT INTO "user_client"
("user_id","client_id")
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7);

UPDATE "subfunctions"
SET "level_criteria_adequate" = 
	CONCAT('Adequate', 
		SPLIT_PART("level_rating_criteria", 'Adequate', 2)
	);

UPDATE "subfunctions"
SET "level_criteria_adequate" = 
	SPLIT_PART("level_criteria_adequate", 'Weakness', 1);