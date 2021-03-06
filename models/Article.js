var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    savearticle:{
        type:Boolean,
        required:true,
        default:false
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;