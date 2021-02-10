require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require("pg")
const ClientError = require("./client-error")
const errorMiddleware = require("./error-middleware");
const { user } = require('pg/lib/defaults');
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")

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
app.delete("/api/favorites/:userId/:exerciseId", (req,res,next)=>{
  const userId = req.params.userId
  const exerciseId = req.params.exerciseId

  const sql = `
  delete from "favorites"
  where "exerciseId" = $1
  and "userId" = $2
  returning *
  `
  const params = [exerciseId, userId]

  db.query(sql,params)
    .then(result=>{
      res.status(204).json(result.rows[0])
    })
    .catch(err=>next(err))
})


//favorites page
app.get("/api/favorites/:userId", (req,res,next)=>{
  const userId = req.params.userId

  const sql = `
  select *
    from "favorites"
    where "userId" = $1
  `
  const params = [userId]

  db.query(sql,params)
    .then(result=>{
      res.status(200).json(result.rows)
    })
    .catch(err=>next(err))
})


//exercise-detail-fav page
app.get("/api/favorites/:userId/:exerciseId", (req, res, next) => {
  const exerciseId = req.params.exerciseId
  const userId = req.params.userId

  const sql = `
  select *
  from "favorites"
  where "exerciseId" = $1
  and "userId" = $2
  `
  const params = [exerciseId, userId]

  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows)
    })
    .catch(err => next(err))
})

app.patch("/api/favorites/:userId/:exerciseId", (req,res,next)=>{
  const exerciseId = req.params.exerciseId
  const userId= req.params.userId
  const {sets, reps} = req.body

  const sql = `
  update "favorites"
  set "sets" = $1,
      "reps" = $2
  where "exerciseId" = $3
  and "userId" = $4
  `
  const params = [sets, reps, exerciseId, userId]

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
app.get("/api/routines/:userId", (req,res,next)=>{
  const userId = req.params.userId

  const sql = `
  select *
  from "routines"
  where "userId" = $1
  `
  const params = [userId]

  db.query(sql, params)
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


//favorites-add page
app.post("/api/routineExercises", (req,res,next)=>{
  const {routineId, exerciseId, isCompleted} =req.body

  const sql = `
  insert into "routineExercises" ("routineId", "exerciseId", "isCompleted")
  values ($1, $2, $3)
  returning *
  `
  let params=[routineId, exerciseId, isCompleted]

  db.query(sql,params)
    .then(result=>{
      res.status(201).json(result.rows[0])
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
  order by "isCompleted"
  `
  const params = [routineId]

  db.query(sql,params)
    .then(result=>{
      res.status(200).json(result.rows)
    })
    .catch(err=>next(err))
})

app.delete("/api/routineExercises/:routineId/:exerciseId", (req, res, next) => {
  const routineId = req.params.routineId
  const exerciseId = req.params.exerciseId

  const sql = `
  delete from "routineExercises"
  where "routineId" = $1
  and "exerciseId" = $2
  returning *
  `
  const params = [routineId, exerciseId]

  db.query(sql, params)
    .then(result => {
      res.status(204).json(result.rows[0])
    })
    .catch(err => next(err))
})

app.patch("/api/routineExercises/:routineId/:exerciseId", (req,res,next)=>{
  const routineId = req.params.routineId
  const exerciseId = req.params.exerciseId
  const {isCompleted} = req.body

  const sql = `
  update "routineExercises"
  set "isCompleted" = $1
  where "routineId" = $2
  and "exerciseId" = $3
  returning *
  `
  const params = [isCompleted, routineId, exerciseId]

  db.query(sql,params)
    .then(result=>{
      res.status(200).json(result.rows[0])
    })
    .catch(err=>next(err))
})


//sign-up page
app.post("/api/signUp", (req,res,next)=>{
  const {username, email, password} = req.body

  argon2
    .hash(password)
    .then(hashedP=>{
      const sql =`
      insert into "users" ("username", "email", "password")
      values ($1, $2, $3)
      `
      const params= [username, email, hashedP]

      db.query(sql,params)
        .then(result=>{
          res.status(201).json(result.rows[0])
        })
        .catch(err=>next(err))
    })
    .catch(err=>next(err))
})

//login page
app.post("/api/login", (req,res,next)=>{
  const {email, password} = req.body

  const sql = `
  select "userId", "password", "username"
  from "users"
  where "email" = $1
  `
  const params = [email]

  db.query(sql,params)
    .then(result=>{
      const [user] = result.rows
      if(!user){
        throw new ClientError(401, "invalid login")
      }
      const {userId, password: hashedPassword, username} = user
      argon2
        .verify(hashedPassword, password)
        .then(isMatch=>{
          if(!isMatch){
            throw new ClientError(401, "invalid login")
          }
          const payload = {userId, username}
          const token =jwt.sign(payload, process.env.TOKEN_SECRET)
          res.json({token, user:payload})
        })
        .catch(err=>next(err))
    })
    .catch(err=>next(err))
})


app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
