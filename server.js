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
                // console.log($(this).children("ul").find("li").text());
            result.summary=$(this).children("a").find("ul").find("li").text();
            db.Article.create(result).then(function (dbArticle) {
                console.log(dbArticle);
            })
                .catch(function (err) {
                    console.log(err);
                });
        
        });

        // $("article h2").each(function (i, element) {
        //     result.headline = $(this).closest("span")
        //         .text();
        // });

        
    });

    // $("article ul").each(function(i,element)
    // {
    //     summary=$(this).children("li").text();
    // });

    res.send("scrape complete");
});


app.get("/articles", function (req, res) {
    db.Article.find({}).then(function (dbArticle) {
        res.json(dbArticle);
    })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("api/clear", function (req, res) {
    db.Article.remove();
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});