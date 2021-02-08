set client_min_messages to warning;

create table "users" (
    "userId" serial not null,
    "username" text not null,
    "email" text not null,
    "password" text not null,
    "createdAt" timestamp not null default now(),
    constraint "users_pk" primary key ("userId")
) with (
  oids=false
);
create table "favorites" (
    "exerciseId" serial not null,
    "name" text not null,
    "type" text not null,
    "reps" integer not null,
    "sets" integer not null,
    "userId" integer not null,
    constraint "favorites_pk" primary key ("exerciseId")
) with (
  oids=false
);
create table "routines" (
    "routineId" serial not null,
    "name" text not null,
    "description" text not null,
    "day" text not null,
    "userId" integer not null,
    constraint "routines_pk" primary key ("routineId")
) with (
  oids=false
);
create table "routineExercises" (
    "routineId" integer not null,
    "exerciseId" integer not null,
    "isCompleted" boolean not null,
    "completedAt" timestamp not null default now(),
    constraint "routineExercises_pk" primary key ("routineId","exerciseId")
) with (
  oids=false
);
alter table "favorites" add constraint "favorites_fk0" foreign key ("userId") references "users"("userId");
alter table "routines" add constraint "routines_fk0" foreign key ("userId") references "users"("userId");
alter table "routineExercises" add constraint "routineExercises_fk0" foreign key ("routineId") references "routines"("routineId");
alter table "routineExercises" add constraint "routineExercises_fk1" foreign key ("exerciseId") references "favorites"("exerciseId");
