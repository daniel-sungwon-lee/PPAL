require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require("pg")

const db = new pg.Pool({
  connectionString: "postgres://dev:lfz@localhost/ppal"
})

const app = express();

app.use(staticMiddleware);

app.use(express.json())

app.post("api/favorites", (req,res)=>{
  const {exerciseId, name, type, reps, sets, userId} = req.body

  const sql = `
  insert into "Favorites" ("exerciseId","name","type","reps","sets","userId")

  `
})

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
