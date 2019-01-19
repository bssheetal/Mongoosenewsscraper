var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 8080;
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/nytimesscraper", { useNewUrlParser: true });

app.get("/scrape", function (req, res) {
    res.send("scrape complete");
    scrape();
});


app.get("/articles", function (req, res) {
    var query={'savearticle':false}
    db.Article.find(query).then(function (dbArticle) {
        res.json(dbArticle);
    })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("/saved", function (req, res) {
    var query = { 'savearticle': true }
    db.Article.find(query).then(function (dbArticle) {
        res.json(dbArticle);
    })
        .catch(function (err) {
            res.json(err);
        })
});

app.post("/articles/:id", function (req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { savearticle: true }).then(function (dbArticle) {
        res.json(dbArticle);
    }).catch(function (err) {
        res.json(err);
    });
});

app.get('/clear', (req, res) => {
    db.Article.deleteMany({}, function(err, data) {
        if (err) {
            console.log(err)
        }
        res.json(data)
    })
})
function scrape() {
    axios.get("https://www.nytimes.com/").then(function (response) {
        var $ = cheerio.load(response.data);

        var result = {};
        $("article div").each(function (i, element) {

            result.link = $(this).
                children("a")
                .attr("href");
            result.headline = $(this)
                .find("span")
                .text();

            result.summary = $(this).children("a").find("ul").find("li").text();
            db.Article.create(result).then(function (dbArticle) {
                console.log(dbArticle);
            })
                .catch(function (err) {
                    console.log(err);
                });

        });

    });
}

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
