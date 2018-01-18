const express = require("express")
const app = express();
const port = process.env.PORT || 3000;

let month = {
    0:"January",
    1:"February",
    2:"March",
    3:"April",
    4:"May",
    5:"June",
    6:"July",
    7:"August",
    8:"September",
    9:"October",
    10:"November",
    11:"December"
}

app.use(express.static(__dirname+"/public"))

app.get("/", function(request,response){
   response.sendFile(__dirname+"/index.html")
})

app.get("/:data", function (request, response) {
    let obj = {unix:null,natural:null}
    let data = request.params.data
    if(checkValidity(data)){
        if(checkData(data)){ 
            let dateString = new Date(parseInt(data) * 1000);
            obj["natural"] = month[dateString.getMonth()] +" "+ dateString.getDate() + " , " + dateString.getFullYear(); 
            obj["unix"] = data;
        }else{
            obj["natural"] = data
            obj["unix"] = convertToUnix(data)
        }
  } 
    response.send(JSON.stringify(obj))
  });
  
  function checkData(data){
    let dataType = parseInt(data[0])
    if(isNaN(dataType)){
      return false
    }
    return true
  }
  
  function convertToUnix(date){
    let unixTime = Math.round(new Date(date).getTime()/1000)
    return unixTime
  }
  
  function checkValidity(date){
    let newDate = new Date(date)
    if(newDate == "Invalid Date" && !checkData(date)){
         return false
    }
    return true;
  }
  
let listener = app.listen(port,() => {
    console.log(`listening at port ${port}`)
})