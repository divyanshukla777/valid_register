
var db=require('./dbconnect'); 

var sub = function(post,sql) {
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        return result;
    });
  };

  module.exports={
      sub:sub,
  }