set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"userName" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"createdAt" DATETIME NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "favorites" (
	"exerciseId" integer NOT NULL,
	"exerciseName" TEXT NOT NULL,
	"exerciseType" TEXT NOT NULL,
	"exerciseReps" integer NOT NULL,
	"exerciseSets" integer NOT NULL,
	"addedBy" integer NOT NULL,
	CONSTRAINT "favorites_pk" PRIMARY KEY ("exerciseId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "routines" (
	"routineId" serial NOT NULL,
	"routineName" TEXT NOT NULL,
	"routineDescrip" TEXT NOT NULL,
	"createdBy" integer NOT NULL,
	CONSTRAINT "routines_pk" PRIMARY KEY ("routineId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "routineExercises" (
	"routineId" BINARY NOT NULL,
	"exerciseId" BINARY NOT NULL,
	CONSTRAINT "routineExercises_pk" PRIMARY KEY ("routineId","exerciseId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "workouts" (
	"workoutId" integer NOT NULL,
	"exerciseId" integer NOT NULL,
	"routineId" integer NOT NULL,
	"isCompleted" BOOLEAN NOT NULL,
	"completedAt" DATETIME NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "workouts_pk" PRIMARY KEY ("workoutId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk0" FOREIGN KEY ("addedBy") REFERENCES "users"("userId");

ALTER TABLE "routines" ADD CONSTRAINT "routines_fk0" FOREIGN KEY ("createdBy") REFERENCES "users"("userId");

ALTER TABLE "routineExercises" ADD CONSTRAINT "routineExercises_fk0" FOREIGN KEY ("routineId") REFERENCES "routines"("routineId");
ALTER TABLE "routineExercises" ADD CONSTRAINT "routineExercises_fk1" FOREIGN KEY ("exerciseId") REFERENCES "favorites"("exerciseId");

ALTER TABLE "workouts" ADD CONSTRAINT "workouts_fk0" FOREIGN KEY ("exerciseId") REFERENCES "favorites"("exerciseId");
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_fk1" FOREIGN KEY ("routineId") REFERENCES "routines"("routineId");
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_fk2" FOREIGN KEY ("userId") REFERENCES "users"("userId");
