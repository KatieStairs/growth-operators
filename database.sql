-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

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

CREATE TABLE "user_client" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    "client_id" INTEGER REFERENCES "client"
);

CREATE TABLE "client_assessments" (
    "id" SERIAL PRIMARY KEY,
    "client_id" INTEGER REFERENCES "client",
    "engagement_date" DATE,
    "status" VARCHAR
);

CREATE TABLE "buckets" (
    "id" SERIAL PRIMARY KEY,
    "bucket_index" INTEGER,
    "name" VARCHAR
);

CREATE TABLE "functions" (
	"id" SERIAL PRIMARY KEY,
	"bucket_id" INTEGER REFERENCES "buckets",
	"function_index" INTEGER,
	"name" VARCHAR
);
CREATE TABLE "subfunctions" (
	"id" SERIAL PRIMARY KEY,
	"function_id" INTEGER REFERENCES "functions",
	"subfunction_index" INTEGER,
	"name" VARCHAR NOT NULL,
	"level_rating_criteria" VARCHAR
);

CREATE TABLE "buckets_headlines" (
	"id" SERIAL PRIMARY KEY,
	"assessment_id" INTEGER REFERENCES "client_assessments",
	"bucket_id" INTEGER REFERENCES "buckets",
	"headline_text" VARCHAR(255)
);
	
CREATE TABLE "assessment_items" (
	"id" SERIAL PRIMARY KEY,
	"assessment_id" INTEGER REFERENCES "client_assessments",
    "bucket_id" INTEGER REFERENCES "buckets",
	"function_id" INTEGER REFERENCES "functions",
	"subfunction_id" INTEGER REFERENCES "subfunctions",
	"level_rating" INTEGER,
	"findings" VARCHAR,
	"impact" VARCHAR,
	"recommendations" VARCHAR,
	"phase" INTEGER
);

CREATE TABLE "tags" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR
);

CREATE TABLE "tags_assessment_items" (
	"id" SERIAL PRIMARY KEY,
	"assessment_item_id" INTEGER REFERENCES "assessment_items",
	"tag_id" INTEGER REFERENCES "tags"
);