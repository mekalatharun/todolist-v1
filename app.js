const express = require("express");
const bodyParser = require("body-parser");
const date=require(__dirname+"/date.js");
// console.log(date());
const app = express();
const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  const day=date.getDate(); //let day=date.getDay(); to get Day
  //   var currentDay=today.getDay();
  //   var day="";
  // switch(currentDay){
  //   case 0:
  //   day="Sunday";
  //   break;
  //   case 1:
  //   day="Monday";
  //   break;
  //   case 2:
  //   day="Tuseday";
  //   break;
  //   case 3:
  //   day="Wednesday";
  //   break;
  //   case 4:
  //   day="Thursday";
  //   break;
  //   case 5:
  //   day="Friday";
  //   break;
  //   case 6:
  //   day="Saturday";
  //   break;
  //   default:
  //   console.log("error");
  //   break;
  // }// the code in list.ejs is not getting commented so deleted,refer video if u want
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});
app.post("/", function(req, res) {
  const item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  })
});
app.get("/about", function(req, res) {
  res.render("about");
});
app.listen(3000, function() {
  console.log("server started at port 3000");
});
