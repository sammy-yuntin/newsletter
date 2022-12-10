const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

const mailchimp = require("@mailchimp/mailchimp_marketing");



app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.use(express.static("public"));

app.post("/", function(req,res){ 

  var firstName = req.body.fn; 
  var lastName = req.body.ln;
  var Email = req.body.mail;
  var data = {
     member: [
       {email_address: Email,
      status: "subscribed"}
     ]
  };

  var jsonData = JSON.stringify(data)
  /* console.log(firstName, lastName, Email) */
  var options = {
    url : "https://us21.api.mailchimp.com/3.0/3b811869dd",
    method: "POST",
    Headers: {
      "Authorization":"samTesting 2a836a21601279bf7127e685f8ddd3b2-us21",

    },
    body: jsonData
  }

  request(options, function(error, response, body){

    if (error){
      res.sendFile(__dirname+"/failure.html")
    }else{
      if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html")
      }else{
        res.sendFile(__dirname+"/failure.html")
      }
      
    }
  })
})

app.post("/failure", (req,res) => {
  res.redirect("/")
})

app.listen(3100, function(){
    console.log("this server is available on port 3100")
})








//mailchimp api key: 2a836a21601279bf7127e685f8ddd3b2-us21
//unique list id: 3b811869dd
//https://us21.api.mailchimp.com/3.0/2a836a21601279bf7127e685f8ddd3b2-us21