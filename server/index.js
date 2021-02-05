require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require("pg")
const ClientError = require("./client-error")
const errorMiddleware = require("./error-middleware")

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

app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
