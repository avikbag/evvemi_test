var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
var port = process.env.PORT || 5000;

app.listen(port, function(){
  console.log('Our app is running on http://localhost:' + port);
});

// NodeJS Connection to Postgres

var Pool = require('pg').Pool;
var pool = new Pool({
  user: process.env.RDSUSER,
  password: process.env.RDSPASS,
  host: process.env.RDSURL,
  database: 'leverjs',
  //max: 10, // max number of clients in pool
  //idleTimeoutMillis: 1000, // close & remove clients which have been idle > 1 second
});

pool.on('error', function(e, client) {
  // if a client is idle in the pool
  // and receives an error - for example when your PostgreSQL server restarts
  // the pool will catch the error & let you handle it here
	console.log('There was some sort of error')
});

var ct = `CREATE Table Potato( 
            name varchar(128),
            id integer primary key
          )`;

// you can run queries directly against the pool
app.get('/api/query', function(req, res){
  console.log(req);
  res.write('Data');
  res.end();
  //pool.query(ct, function(err, result) {
    //console.log(result); // output: foo
  //});
});

//// the query object implements the promise API
//pool.query('SELECT $1::text as name', ['foo'])
  //.then(res => console.log(res.rows[0].name)); // output: foo

//// the pool also supports checking out a client for
//// multiple operations, such as a transaction

//pool.connect(function(err, client, release) {
  //// TODO - you'll want to handle the error in real code

  //client.query('SELECT $1::text as name', ['foo'], function(err, result) {
    //// you MUST return your client back to the pool when you're done!
    //release();
    //console.log(result.rows[0].name); // output: foo
  //});
//});
