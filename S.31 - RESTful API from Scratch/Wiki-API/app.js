const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const {
    urlencoded
} = require('body-parser');

// Create an express app
const app = express();

// Set our apps view engine to use EJS (Embedded JavaScript) to render 'views' (pages)
app.set('view engine', 'ejs');

// ??
app.use(bodyParser.urlencoded({
    extended: true
}));

// Make our app use public directory for all of our static hosted content (images, etc)
app.use(express.static("public"));

// Establish MongoDB connection on default port 27017 + our database name ('wikiDB')
mongoose.connect("mongodb://localhost:27017/wikiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// TODO:
const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

/***
 * /articles ROUTE (All articles)
 * 
 * GET | POST | DELETE
 * 
 * (Express Route Handler Chaining)
 */
app.route("/articles")
    .get(function (req, res) {
        Article.find(function (err, foundArticles) {
            if (!err) {
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    })

    .post(function (req, res) {
        // Tap into the request body using body-parser to reference the 'name' attribute
        // Create a new Article based on the data passed into the POST request title: & content:
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function (err) {
            if (!err) {
                res.send("Successfully added new article!");
            } else {
                res.send(err);
            }
        });
    })

    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send("Successfully deleted all articles!")
            } else {
                res.send(err);
            };
        });
    });

/***
 * /articles/custom ROUTE (Specific articles)
 * 
 * GET | PUT | PATCH
 * 
 */
app.route("/articles/:articleTitle")

    .get(function(req, res) {
        // Grab the article title from the request parameters ':articleTitle'
        articleTitle = req.params.articalTitle
        Article.findOne({title: req.params.articleTitle}, function(err, foundArticle) {
            if(!err) {
                // If there's no error
                // If article was found
                if (foundArticle) {
                    res.send(foundArticle);
                } else {
                    res.send("No articles matching that title were found");
                }
            };
        });
    })

    // PUT request replaces the entire resource / document. Omitting a parameter and value will remove it from the document.
    .put(function(req, res) {
        Article.replaceOne(
            // Condition of update
            {title: req.params.articleTitle},
            // Actual update we want to make
            {title: req.body.title, content: req.body.content},
            function(err) {
                if(!err) {
                    res.send("Successfully updated articles!");
                } else {
                    res.send(err);
                }
            }
        );
    })
    
    // PATCH or update a specific field in a specific document
    .patch(function(req, res) {
        Article.update(
            // Conditions - articleTitle from the URL
            {title: req.params.articleTitle},
            // Update specific values from the specified document
            {$set: req.body},
            function(err) {
                if(!err) {
                    res.send("Successfully updated specific values in specified article.");
                } else {
                    res.send(err);
                }
            }
        );
    })

    .delete(function(req, res) {
        Article.deleteOne(
            {title: req.params.articleTitle},
            function(err) {
                if(!err) {
                    res.send("Successfully deleted " + req.params.articleTitle)
                } else {
                    res.send(err);
                }
            }
        );
    });

// Start up our web app
app.listen(process.env.PORT || 3000, function () {
    console.log("Successfully started our server!");
});