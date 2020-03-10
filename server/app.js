// Require different packages
var express = require('express');
var app     = express();
var port    =   process.env.PORT || 8080;
var client=require('twilio')(/*credentials*/);
var url = require("url");
var google = require('googleapis');
var ml = google.ml('v1');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const btoa = require("btoa");
const wml_credentials = new Map();

// create router
var router = express.Router();

//Big Query code
const BigQuery = require('@google-cloud/bigquery');
const bigquery = BigQuery({
  projectId: /*projectid*/
});



//Creating different routes for our APIs--------------------------------------------------------------------------- STARTS HERE>

// count severe current_records page route 
router.get('/count_current_records', function(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  console.log("Inside Count route");
  const sqlQuery = 'SELECT sector_id, level FROM `table_name_in_bigquery.waterlogging` WHERE time= (SELECT MAX(time) FROM `table_name_in_bigquery.waterlogging`)';
  const options = {
    query: sqlQuery,
    useLegacySql: false
  };

  //Start Query
  bigquery
   .query(options)
   .then((results) => {
    res.end(JSON.stringify(results[0]));
    })
   .catch((err) => {
    console.error('ERROR:', err);
    });
    
});


// GET most RECENT RECORDS  
router.get('/current_recent', function(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
  console.log("Inside Current recent");
  /*
      var answer=[];

  
  for(var i=1;i<=2;i++){
    const sqlQuery = 'SELECT sector_id, level FROM `table_name_in_bigquery.waterlogging` WHERE time= (SELECT MAX(time)  FROM `table_name_in_bigquery.waterlogging` where sector_id='+i+') and sector_id='+i;
  const options = {
  query: sqlQuery,
    useLegacySql: false
  };
    //Start Query
    bigquery
   .query(options)
   .then((results) => {
   	
   	var s = results[0][0]['sector_id'];
   	var l = results[0][0]['level'];
   	
//inside query
var sleep = require('sleep');
const sqlQuery1 = 'UPDATE `table_name_in_bigquery.waterlogging_temp` set level='+l+' WHERE sector_id='+s;
console.log(sqlQuery1);
  const options1 = {
  query: sqlQuery1,
    useLegacySql: false
  };
		bigquery
   .query(options1)
   .then(() => {

    })
   .catch((err) => {
    console.error('ERROR:', err);
    });
    
   	//sleep.msleep(2000);
    
    //inside query end
    })
   .catch((err) => {
    console.error('ERROR:', err);
    });

}//End of for loop

const sqlQuery2 = 'select * from `table_name_in_bigquery.waterlogging_temp` where true';

  const options = {
  query: sqlQuery2,
    useLegacySql: false
  };
		bigquery
   .query(options)
   .then((answer) => {

	console.log(answer);
     res.end(JSON.stringify(answer));
    })
   .catch((err) => {
    console.error('ERROR:', err);
    });
*/
    const sqlQuery = 'SELECT sector_id,level FROM `table_name_in_bigquery.waterlogging` WHERE time IN (SELECT max(time) FROM `table_name_in_bigquery.waterlogging` GROUP BY sector_id)';
    const options = {
    query: sqlQuery,
    useLegacySql: false
  };
  
    //Start Query
    bigquery
   .query(options)
   .then((results) => {
    res.end(JSON.stringify(results));
    })
   .catch((err) => {
    console.error('ERROR:', err);
    });

    
});



// GET LatLng 
router.get('/get_latlng', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  console.log("Inside get_latlng");
    const sqlQuery = 'SELECT * FROM `table_name_in_bigquery.latlng` ORDER BY sector_id';
    const options = {
    query: sqlQuery,
    useLegacySql: false
  };
  
    //Start Query
    bigquery
   .query(options)
   .then((results) => {
    res.end(JSON.stringify(results));
    })
   .catch((err) => {
    console.error('ERROR:', err);
    });
    
});
////////////////////////////////////////////----------------------------------------------------------


//API to fetch all messages
router.get('/all_messages', function(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  console.log("Inside Count route");
  const sqlQuery = ' SELECT * FROM `table_name_in_bigquery.messages`';
  const options = {
    query: sqlQuery,
    useLegacySql: false
  };

  //Start Query
  bigquery
   .query(options)
   .then((results) => {
    res.end(JSON.stringify(results));
    })
   .catch((err) => {
    console.error('ERROR:', err);
    });
    
});




//API to fetch all messages for particular user
router.get('/all_messages_user', function(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  console.log("Inside Count route");
  const sqlQuery = ' SELECT * FROM `table_name_in_bigquery.messages` where userid=1';
  const options = {
    query: sqlQuery,
    useLegacySql: false
  };

  //Start Query
  bigquery
   .query(options)
   .then((results) => {
    res.end(JSON.stringify(results));
    })
   .catch((err) => {
    console.error('ERROR:', err);
    });
    
});

//API to update status for particular user
router.get('/update_message_user', function(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  console.log("Inside Count route");
  const sqlQuery = ' UPDATE `table_name_in_bigquery.messages` set status=2 where userid=1 and status=1';
  const options = {
    query: sqlQuery,
    useLegacySql: false
  };

  //Start Query
  bigquery
   .query(options)
   .then((results) => {
    res.end(JSON.stringify({'status':'success'}));
    })
   .catch((err) => {
    console.error('ERROR:', err);
    });
    
});


//API to insert new tuple
router.get('/insert_message', function(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed


var param = url.parse(req.url,true).query;
  var userid=param.userid;
  var message=param.message;
  var status=1;


  console.log("Inside insert message");
  const sqlQuery ='INSERT INTO `table_name_in_bigquery.messages` (userid,message,status) VALUES('+userid+','+"'"+message+"'"+','+status+')';
  const options = {
    query: sqlQuery,
    useLegacySql: false
  };

  //Start Query
  bigquery
   .query(options)
   .then((results) => {
    res.end(JSON.stringify({'status':'success'}));
    })
   .catch((err) => {
    console.error('ERROR:', err);
    });
    
});




///////////////////////////////////////////------------------------------------------------------------

// Adding new report 
router.get('/sendreport', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed


  var param = url.parse(req.url,true).query;
  var location=param.location;
  var date=param.date;
  var level=param.level;

  const sqlQuery = 'INSERT INTO `table_name_in_bigquery.report` (location,date,level) VALUES('+"'"+location+"'"+','+"'"+date+"'"+','+level+')';
  const options = {
  query: sqlQuery,
  useLegacySql: false
  };
  
  //Start Query
  bigquery
  .query(options)
  .then(() => {
  res.end(JSON.stringify({'status':'You have successfully reported a waterlogging'}));
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
    
});


//Adding reports to the database
// Adding new sector 
router.get('/add_sector', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed


  var param = url.parse(req.url,true).query;
  var id=param.id;
  var lat=param.lat;
  var lng=param.lng;
  var name=param.name;
  var phone=param.phone;

  
  //console.log('INSERT INTO `table_name_in_bigquery.latlng` (sector_id,lat,lng,phone) VALUES('+id+','+lat+','+lng+','+phoney+')');
  const sqlQuery = 'INSERT INTO `table_name_in_bigquery.latlng` (sector_id,lat,lng,name,phone) VALUES('+id+','+lat+','+lng+','+"'"+name+"'"+','+"'"+phone+"'"+')';
  const options = {
  query: sqlQuery,
  useLegacySql: false
  };
  
  //Start Query
  bigquery
  .query(options)
  .then((results) => {
  res.end(JSON.stringify({'status':'success'}));
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
    
});

//Getting reports
router.get('/getreports', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  const sqlQuery = 'SELECT * FROM `table_name_in_bigquery.report`';
  const options = {
  query: sqlQuery,
  useLegacySql: false
};
  //Start Query
   bigquery
  .query(options)
  .then((results) => {
  res.end(JSON.stringify(results));
  
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
    
});






// GETTING status of Notification 
router.get('/getstatus', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  const sqlQuery = 'SELECT * FROM `table_name_in_bigquery.notification`';
  const options = {
  query: sqlQuery,
  useLegacySql: false
};
  //Start Query
   bigquery
  .query(options)
  .then((results) => {
  res.end(JSON.stringify(results));
  
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
    
});


// SENDING status of Notification
router.get('/sendstatus', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var param = url.parse(req.url,true).query;
    var status=param.status;
	var new_status;
if(status==='true'){
   new_status=1;
}
else if(status==='false'){
   new_status=0; 
}

  const sqlQuery = 'UPDATE `table_name_in_bigquery.notification` SET status='+new_status+' WHERE id=1';
    const options = {
  query: sqlQuery,
    useLegacySql: false
  };
  
  //Start Query
  bigquery
  .query(options)
  .then(() => {
res.end(JSON.stringify({'status':'success'}));
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
    
});



// Requested Notification 
router.get('/requested_notification', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var param = url.parse(req.url,true).query;
    var receiver=param.receiver;
    var msg=param.msg;
    



    client.messages.create({
    to: '+91'+receiver,
    from:/*sender number*/,
    body: msg
    },function(err,data){
      console.log("Sent Message");
    });   

res.end(JSON.stringify({'status':'success'}));
});



//Info for Prediction Module





// Getting Prediction
router.get('/get_prediction', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed


    var params = url.parse(req.url,true).query;
    var val1=params.data;
    




  console.log('Inside Prediction');    
//IBM WATSON CODE STARTS 


// NOTE: you must manually construct wml_credentials hash map below using information retrieved
// from your IBM Cloud Watson Machine Learning Service instanceIBM Cloud Watson Machine Learning Service instance 
wml_credentials.set("url",url);
wml_credentials.set("username",username );
wml_credentials.set("password", password);

function apiGet(url, username, password, loadCallback, errorCallback){
	const oReq = new XMLHttpRequest();
	const tokenHeader = "Basic " + btoa(username + ":" + password);
	const tokenUrl = url + "/v3/identity/token";

	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("GET", tokenUrl);
	oReq.setRequestHeader("Authorization", tokenHeader);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send();
}

function apiPost(scoring_url, token, payload, loadCallback, errorCallback){
	const oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("POST", scoring_url);
	oReq.setRequestHeader("Accept", "application/json");
	oReq.setRequestHeader("Authorization", token);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send(payload);
}

apiGet(wml_credentials.get("url"),
	wml_credentials.get("username"),
	wml_credentials.get("password"),
	function (res1) {
        let parsedGetResponse;
        try {
            parsedGetResponse = JSON.parse(this.responseText);
        } catch(ex) {
            // TODO: handle parsing exception
        }
        if (parsedGetResponse && parsedGetResponse.token) {
            const token = parsedGetResponse.token
            const wmlToken = "Bearer " + token;


            //var val1='[1001.312632,1.02,31.48,8.1,81.2]';
            //var val2='[998.853125,9.14,26.30520833,134.1,98.4375]';
            //var val2=val1.toString();

           // var val2=['F','70','Single','Professional'];
            // NOTE: manually define and pass the array(s) of values to be scored in the next line
			const payload = '{"fields": ["Rain", "Rate", "Tides"], "values": ['+val1+']}';
			const scoring_url = "";
    
            apiPost(scoring_url, wmlToken, payload, function (resp) {
                let parsedPostResponse;
                try {
                    parsedPostResponse = JSON.parse(this.responseText);
                } catch (ex) {
                    // TODO: handle parsing exception
                }
                //console.log("Scoring response");
                //console.log(parsedPostResponse["values"][0][10]);
                console.log(parsedPostResponse["values"][0][5]);


				res.send(JSON.stringify({"prediction":parsedPostResponse["values"][0][5]}));
				console.log('Success');
                //console.log(parsedPostResponse["values"][0][9]);
                //console.log(parsedPostResponse["values"][0][6]);
                //console.log(parsedPostResponse["values"][0][8]);
            }, function (error) {
                console.log(error);
            });
        } else {
            console.log("Failed to retrieve Bearer token");
        }
	}, function (err) {
		console.log(err);
	});
                              
// IBM WATSON CODE ENDS 

	
});


//Creating different routes for our APIs---------------------------------------------------- ENDS HERE>


//FUNCTION FOR UPDATION
function sending_message(sec_id,status){
const sqlQuery2 = "SELECT phone,name FROM `table_name_in_bigquery.latlng` WHERE sector_id="+sec_id;
            const options2 = {
            query: sqlQuery2,
            useLegacySql: false
          };
            //Start Query
             bigquery
            .query(options2)
            .then((phones) => {
             console.log("phone");
             console.log(phones[0][0]['phone']);
            console.log(phones[0][0]['name']);
             console.log("level is "+status+sec_id);
          //Using Twlio
          
          client.messages.create({
          to: '+91'+phones[0][0]['phone'],
          from:'sender_number',
          body: 'Hello Mr '+phones[0][0]['name']+'. Level is '+status
          },function(err,data){
            console.log("Sent Message");
          });
          
          })
          .catch((err) => {
           console.error('ERROR:', err);
           });

}


function updating(should_update){
if(should_update===1){
//Obtained current areas
  const sqlQuery = 'SELECT sector_id, level FROM `table_name_in_bigquery.waterlogging` WHERE time= (SELECT MAX(time) FROM `table_name_in_bigquery.waterlogging`)';
  const options = {
  query: sqlQuery,
  useLegacySql: false
};
  //Start Query
  bigquery
  .query(options)
  .then((results) => {

          
          for(var sec=0;sec<results[0].length;sec++){
          var sec_id=results[0][sec]['sector_id'];
          var status=results[0][sec]['level'];
          
          sending_message(sec_id,status);
          //setTimeout(sending_message(sec_id,status),5000);
          
          } //For loop ends here

  
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
  }
  else{
    console.log("No Update this time");
  }
   
  }


//Algorithm for updating  -----------------------------------------STARTS HERE>

setInterval(function(req,res){

//AUTOMATIC NOTIFICATION CODE STARTS HERE



//Get status whether to send notification or not
const sqlQuery_new = 'SELECT * FROM `table_name_in_bigquery.notification`';
  const options_new = {
  query: sqlQuery_new,
  useLegacySql: false
};
  //Start Query
  bigquery
  .query(options_new)
  .then((results) => {
  updating(results[0][0]['status']);
  console.log("STATUS THIS TIME"+results[0][0]['status']);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
    
 
//AUTOMATIC NOTIFICATION CODE ENDS HERE
},60000);

//Algorithm for updating severity -----------------------------------------ENDS HERE>


// apply the routes to our application
app.use('/', router);


// START THE SERVER
// ==============================================
app.listen(port);
console.log('Server Started on port: ' + port);