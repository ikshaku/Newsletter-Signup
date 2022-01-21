//mailchimp api key
// 1e509d620f59689f8536b3a891b4b5fe-us20
//mailchim audience id or list id
//52d8474105

// import mailchimp from "@mailchimp/mailchimp_marketing";
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname +"/signup.html");
});

mailchimp.setConfig({
  apiKey: "1e509d620f59689f8536b3a891b4b5fe-us20",
  server: "us20",
});

// get information about my mailing list
// async function getInfoAboutLists() {
  // const response = await mailchimp.ping.get();
  // console.log(response);

//get all the lists
  // const response = await mailchimp.lists.getAllLists();
  // console.log(response);

//get a specific list
  // const response = await mailchimp.lists.getList("52d8474105");
//get info about members

//   const response = await mailchimp.lists.getListMembersInfo("52d8474105");
//
//   console.log(response);
//
// }
// //
// getInfoAboutLists();



// const addMembers = async () => {
//   const response = await mailchimp.lists.addListMember("52d8474105", {
//     email_address: "ikshu.goswami@gmail.com",
//     status: "subscribed",
//   });
//   console.log(response);
// };
//
// addMembers();

app.post("/", function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    //the members, status,merge_fields ---comes from mailChimp api
    'members':[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ],
  }
  // const jsonData = JSON.stringify(data)

console.log(firstName, lastName, email);

const jsonData = JSON.stringify(data); //string in format of json flatbed
const url = "https://us20.api.mailchimp.com/3.0/lists/52d8474105";

const options = {
  method:"POST",
  auth:"ikshaku1:1e509d620f59689f8536b3a891b4b5fe-us20"
}

const request = https.request(url, options, function(response){
  if (response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else {
    res.sendFile(__dirname + "/failure.html");
  }

response.on("data",function(data){
  console.log(JSON.parse(data));
  })
})

// request.write(jsonData);
request.end();
});

app.post("/failure", function (req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
console.log("Server is running in port 3000")
});
