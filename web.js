var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();
const pg = require('pg');

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
var port = process.env.PORT || 9000;

app.listen(port, function(){
  console.log('Our app is running on port: ' + port);
});

// NodeJS Connection to Postgres

//var Pool = require('pg').Pool;
//var pool = new Pool({
  //user: process.env.RDSUSER,
  //password: process.env.RDSPASS,
  //host: process.env.RDSURL,
  //database: 'leverjs',
  ////max: 10, // max number of clients in pool
  ////idleTimeoutMillis: 1000, // close & remove clients which have been idle > 1 second
//});

//pool.on('error', function(e, client) {
  //// if a client is idle in the pool
  //// and receives an error - for example when your PostgreSQL server restarts
  //// the pool will catch the error & let you handle it here
	//console.log('There was some sort of error')
//});

//var ct = `CREATE Table Potato( 
            //name varchar(128),
            //id integer primary key
          //)`;
var connectionString = {
  user: process.env.RDSUSER,
  password: process.env.RDSPASS,
  host: process.env.RDSURL,
  database: 'leverjs'
}

app.get('/api/query', function(res, req){
  var query_string = res.query.query;
  var results = [];
	pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query(query_string);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      req.write(JSON.stringify(results));
      req.end();
    });
  });
});
// you can run queries directly against the pool
//app.get('/api/query', function(res, req){
  ////console.log(res.params);
  //console.log(res.query.query);
  ////req.write(res.query.query);
  //const output = pool.query(res.query.query, function(err, result) {
    ////console.log(result.rows)
    //req.write(result.rows);
    //if(err){
      //console.log(err.error);
    //}
  //});
  //var results = [];
  //output.on('row', function(row){
    //results.push(row); 
  //});
  //output.on('end', function(){
    //req.end();
  //});
//});

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
