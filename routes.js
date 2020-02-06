var mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
var cors = require('cors');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "movierecord"
});


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());
//img assets api
app.use('/assets', express.static(__dirname + '/assets'));


// app.get('/getmovie', function (req, res) {
//     connection.getConnection(function (err, connection) {
//     connection.query("SELECT id_movie,movie_name, movie_year, movie_rating, movie_picture FROM movie", function (err, results, fields) {
//             if (err) throw err;
//             console.log(fields);
//       res.send(results)
//     });
//   });
// });


app.get('/getmovie', function (req, res) {
  con.connect(function(err){
    if (err) throw err;
    console.log("connected!!!");
    sql ="SELECT id_movie,movie_name, movie_year, movie_rating, movie_picture FROM movie";
    con.query(sql, function (err,result){
      if (err) throw err;  //check error
      console.log("update success", result); //log ข้อมูลมาดู
      res.json(result);
    });
  });
})


app.post('/postData',  (req, res) => {
  var movies={
    "movie_name":req.body.movie_name,
    "movie_year":req.body.movie_year,
    "movie_rating":req.body.movie_rating,
    "movie_picture":req.body.movie_picture
  }
  con.query('insert into movie SET ?', movies, function (err,result){
    if (err) throw err;  //check error
    res.json(result);
  });
})

app.put('/putData/:id',(req, res) => {
  let sql = "UPDATE movie SET movie_name='"+req.body.movie_name+"', movie_year='"+req.body.movie_year+"',movie_rating='"+req.body.movie_rating+"',movie_picture='"+req.body.movie_picture+"' WHERE id_movie="+req.params.id;
  let query = con.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.delete('/deldata/:id', (req, res) => {
  let sql = "DELETE FROM movie WHERE id_movie="+req.params.id+"";
  let query = con.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
})



// Starting our server.
app.listen(4000, () => {
 console.log('Go to http://localhost:4000/ so you can see the data.');
});


