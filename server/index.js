require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require("pg")
const ClientError = require("./client-error")
const errorMiddleware = require("./error-middleware");
const { user } = require('pg/lib/defaults');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
})

const app = express();

app.use(staticMiddleware);

app.use(express.json())


//exercise-detail page
app.post("/api/favorites", (req,res,next)=>{
  const {exerciseId, name, type, reps, sets, userId} = req.body

  const sql = `
  insert into "favorites" ("exerciseId","name","type","reps","sets","userId")
  values ($1, $2, $3, $4, $5, $6)
  returning *
  `
  const params = [exerciseId, name, type, reps, sets, userId]

  db.query(sql,params)
    .then(result=>{
      res.status(201).json(result.rows[0])
    })
    .catch(err=>next(err))
})

//below was attempted but will do later (used in favorites page)
app.delete("/api/favorites/:exerciseId", (req,res,next)=>{
  const exerciseId = req.params.exerciseId

  const sql = `
  delete from "favorites"
  where "exerciseId" = $1
  returning *
  `
  const params = [exerciseId]

  db.query(sql,params)
    .then(result=>{
      res.status(204).json(result.rows[0])
    })
    .catch(err=>next(err))
})


//favorites page
app.get("/api/favorites", (req,res,next)=>{
  const sql = `
  select *
    from "favorites"
  `
  db.query(sql)
    .then(result=>{
      res.status(200).json(result.rows)
    })
    .catch(err=>next(err))
})

app.get("/api/favorites/:exerciseId", (req,res,next)=>{
  const exerciseId = req.params.exerciseId

  const sql = `
  select *
  from "favorites"
  where "exerciseId" = $1
  `
  const params = [exerciseId]

  db.query(sql,params)
    .then(result=>{
      res.status(200).json(result.rows)
    })
    .catch(err=>next(err))
})


//exercise-detail-fav page
app.patch("/api/favorites/:exerciseId", (req,res,next)=>{
  const exerciseId = req.params.exerciseId
  const {sets, reps} = req.body

  const sql = `
  update "favorites"
  set "sets" = $1,
      "reps" = $2
  where "exerciseId" = $3
  `
  const params = [sets, reps, exerciseId]

  db.query(sql,params)
    .then(result=>{
      res.status(200).json(result.rows[0])
    })
    .catch(err=>next(err))
})


//routine-form page
app.post("/api/routines", (req,res,next)=>{
  const {name, description, day, userId} = req.body

  const sql=`
  insert into "routines" ("name","description","day","userId")
  values ($1, $2, $3, $4)
  returning *
  `
  const params = [name, description, day, userId]

  db.query(sql,params)
    .then(result=>{
      res.status(201).json(result.rows[0])
    })
    .catch(err=>next(err))
})

app.patch("/api/routines/:routineId", (req, res, next) => {
  const { name, description, day } = req.body
  const routineId = req.params.routineId

  const sql = `
  update "routines"
  set "name" = $1,
      "description" = $2,
      "day" = $3
  where "routineId" = $4
  `
  const params = [name, description, day, routineId]

  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows[0])
    })
    .catch(err => next(err))
})


//routines page
app.get("/api/routines", (req,res,next)=>{
  const sql = `
  select *
  from "routines"
  `
  db.query(sql)
    .then(result=>{
      res.status(200).json(result.rows)
    })
    .catch(err=>next(err))
})

app.delete("/api/routines/:routineId", (req,res,next)=>{
  const routineId = req.params.routineId

  const sql = `
  delete from "routines"
  where "routineId" = $1
  returning *
  `
  const params = [routineId]

  db.query(sql,params)
    .then(result=>{
      res.status(204).json(result.rows[0])
    })
    .catch(err=>next(err))
})


//routine-detail page (also used in routine-form page)
app.get("/api/routines/:routineId", (req,res,next)=>{
  const routineId = req.params.routineId

  const sql = `
  select *
  from "routines"
  where "routineId"=$1
  `
  const params = [routineId]

  db.query(sql,params)
    .then(result=>{
      res.status(200).json(result.rows[0])
    })
    .catch(err=>next(err))
})


//favorites-add page (to routine-detail; delete endpoint also used in routine-detail page)
app.post("/api/routineExercises", (req,res,next)=>{
  const {routineId, exerciseId} =req.body

  const sql = `
  insert into "routineExercises" ("routineId", "exerciseId")
  values ($1, $2)
  returning *
  `
  let params=[routineId, exerciseId]

  db.query(sql,params)
    .then(result=>{
      res.status(201).json(result.rows[0])
    })
    .catch(err=>next(err))
})

app.delete("/api/routineExercises/:exerciseId", (req,res,next)=>{
  const exerciseId = req.params.exerciseId

  const sql = `
  delete from "routineExercises"
  where "exerciseId" = $1
  returning *
  `
  const params = [exerciseId]

  db.query(sql,params)
    .then(result=>{
      res.status(204).json(result.rows[0])
    })
    .catch(err=>next(err))
})


//routine-detail page
app.get("/api/routineExercises/:routineId", (req,res,next)=>{
  const routineId = req.params.routineId

  const sql = `
  select *
  from "routineExercises"
  join "favorites" using ("exerciseId")
  where "routineId" = $1
  `
  const params = [routineId]

  db.query(sql,params)
    .then(result=>{
      res.status(200).json(result.rows)
    })
    .catch(err=>next(err))
})




app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
