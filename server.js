// Load the Cloudant library. 
var Cloudant = require('cloudant');
//var nano = require('nano'); 
var nano = require('nano')('YOUR-CLOUDANT-ACCOUNT');
var db = nano.use('alice');         // Change alice with your DB name



var me = '';            // Username Cloudant
var password = '';          // Password Cloudant
 
// Initialize the library with my account. 
var cloudant = Cloudant({account:me, password:password});
 
cloudant.db.list(function(err, allDbs) {
  console.log('All my databases: %s', allDbs.join(', '))
});

nano.db.get('alice', function(err, body) {      // Change alice with your DB name
  if (!err) {
    console.log(body);
  }
});


var feed = db.follow({since: "now"});
feed.on('change', function (change) {
  console.log("change: ", change);
});
feed.follow();
process.nextTick(function () {
  db.insert({"bar": "baz"}, "bar");
});
