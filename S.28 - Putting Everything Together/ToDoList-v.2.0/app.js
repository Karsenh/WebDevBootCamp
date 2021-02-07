//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Karsenlh:Karsen1212@cluster0.2rxhx.mongodb.net/todolistDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a schema to then create a model which will then be used for documents
const itemSchema = {
  name: String
};

// Create mongoose model from schema
const Item = mongoose.model("Item", itemSchema);

// Create test documents using model
const item1 = new Item({
  name: "Welcome to your ToDo List!"
});
const item2 = new Item({
  name: "Second item"
});
const item3 = new Item({
  name: "Third item"
});

// Array of default ToDo items (test documents)
const defaultItems = [item1, item2, item3];

// Create a list schema for customListName
const listSchema = {
  // custom list name
  name: String,
  // Array of item documents associated with this custom list (eg; work list)
  items: [itemSchema]
};

// Create mongoose model from mongoose schema (above)
const List = mongoose.model("List", listSchema);


/***
 * GET - HOME (ROOT) Route
 * 
 */
app.get("/", function (req, res) {
  // Get (Find) all Items using .find with callback function that returns an ARRAY of Items (to get length of all)
  Item.find({}, function (err, foundItems) {
    if (err) {
      console.log(err);

      //  If there are no errors...
    } else {
      // If there are no found items...
      if (foundItems.length == 0) {
        // Insert default array of ToDo items
        Item.insertMany(defaultItems, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully inserted many items...")
          }
        });

        // Redirect to home to refresh
        res.redirect("/");

        // Else, if there are found items (upon redirect or otherwise)
      } else {
        // Render the list page using EJS, passing in foundItems callback list to newListItems on the list view
        res.render("list", {
          listTitle: "Today",
          newListItems: foundItems

        });
      }
    }
  });
});

/***
 * GET - customListName
 * 
 * Using express.js route parameters we can get custom lists
 */
app.get("/:customListName", function (req, res) {
  // Using lodash to consistently capitalize customListName String arr
  const customListName = _.capitalize(req.params.customListName);
  // Check if a list already exists in a collection with callback function that returns an OBJECT
  List.findOne({
    name: customListName
  }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        console.log("No match found!");
        // Create new custom list document from the List model (from listSchema)
        const list = new List({
          name: customListName,
          items: defaultItems
        });

        // Save this into the list collection
        list.save();

        res.redirect("/" + customListName);
      } else {
        console.log("Existing match!");

        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items
        })
      }
    }
  });
});


/***
 * POST - HOME (ROOT) Route
 * 
 */
app.post("/", function (req, res) {
  // Store value of the text-input named newItem from the list view
  const itemName = req.body.newItem;
  // Store the value of the button ( <%= listTitle %>) named list
  const listName = req.body.list;

  //  Create new item document using stored item name variable as name
  const item = new Item({
    name: itemName
  });

  // If listName = Today, we're on the root route
  if (listName === "Today") {
    // Save new item into Db collection
    item.save();

    // Refresh home route
    res.redirect("/");
    // Else, we're on a custom list
  } else {
    List.findOne({
      name: listName
    }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

/***
 * POST - DELETE
 * 
 */
app.post("/delete", function (req, res) {
  const itemId = req.body.checkbox;
  // Create a variable for the listName (hidden input value)
  const listName = req.body.listName;

  // Check if we're deleting from the root (default) list OR from a custom list
  if (listName === "Today") {
    // We're deleting on the default list
    Item.findByIdAndRemove(itemId, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully deleted item " + itemId);
        res.redirect("/");
      }
    })
  } else {
    // We're deleting on the custom list
    List.findOneAndUpdate({
      name: listName
    }, {
      $pull: {
        items: {
          _id: itemId
        }
      }
    }, function (err, foundList) {
      if (!err) {
        res.redirect("/" + listName);
      }
    });
  }




});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server Successfully Started!");
});