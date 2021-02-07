const mongoose = require('mongoose');

//Connects to mongodb server and searches for db at the end of the path (fruitsDB) or creates if non-existent
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});


// Schema is created to create a collection model
const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Enter a fruit name, bruh"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

// // Individual documents are added to each collection using the collection schema
const Fruit = mongoose.model("Fruit", fruitSchema);

// // Instances of the new collections are created using the schema
// const fruit = new Fruit ({
//     // name: "Apple",
//     rating: 5,
//     review: "Kripy boi"
// });

// Instances are saved to the collection
// fruit.save();


/**
 * CREATING and inserting many documents into a collection
 * 
 */
// const kiwi = new Fruit({
//     name: "Kiwi",
//     rating: 10,
//     review: "The best fruit!"
// });

// const orange = new Fruit ({
//     name: "Orange",
//     rating: 7,
//     review: "This fruit rocks"
// });

// const banana = new Fruit({
//     name: "Banana",
//     rating: 4,
//     review: "Bananas kinda suck"
// });

// const pineapple = new Fruit({
//     name: "Pineapple",
//     rating: 9,
//     review: "Pineapples are tangy"
// });

// pineapple.save();

// Fruit.insertMany([kiwi, orange, banana], function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully saved all fruits to FruitsDB");
//     }
// });

/**
 * UPDATING
 * 
 */
// Target - _id: | What to update - name: 'Peach' | Callback
// Fruit.updateOne({_id: '600e74a5da964b1a31fdca55'}, {name: 'Peach'}, function(err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Successfully updated the document (name)!");
//     }
// } );

/**
 * DELETING document (by _id:)
 * 
 */
// Fruit.deleteOne({ _id: '600e74a5da964b1a31fdca55'}, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully deleted that shit."); 
//     }
// });

/**
 * READING documents
 * 
 */
// Fruit.find(function(err, fruits) {
//     if (err) {
//         console.log(err);
//     } else {

//         // Use mongoose.close() method to close the database connection to avoid CTRL + C0
//         mongoose.connection.close();

//         // Loop through fruit array (returned from database) and log each fruits name
//         fruits.forEach(function(fruit) {
//             console.log(fruit.name);
//         });
//     }
// })

/**
 * Challenge Exercise #336
 */
const personSchema = new mongoose.Schema ({
    name: String ,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person ({
//     name: "Amy",
//     age: 12,
//     favoriteFruit: pineapple
// });

// person.save();



/**
 * Challenge Exercide - DeleteMany()
 */

// console.log("Done adding.")

// Person.deleteMany({age: {$gt: 20}, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully deleted many things.");
//     }
// }});

// for (var i = 0; i <= numPeople; i++) {
//     Person.deleteOne({name: "Karsen" + i, function(err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Successfully deleted " + Person.name);
//         }
//     }});
// }

// Challenge Exercise 340
const strawberry = new Fruit({
    name: "Strawberry",
    rating: 9,
    review: "Red and delicious"
});

strawberry.save();

Person.updateMany({_name: "John"}, {favoriteFruit: strawberry}, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully updated John");
    }
});


// Use mongoose.close() method to close the database connection to avoid CTRL + C0