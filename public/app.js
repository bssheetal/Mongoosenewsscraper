

$(document).ready(function () {

    loadarticles();

})



$(".clear").on("click", function () {

    $(".container-fluid").empty();
    var div = $("<div>").addClass("alert alert-warning text-center");
    var headline = $("<h4>Uh Oh. Looks like we don't have any new articles.</h4>");
    div.append(headline);
    var carddiv = $("<div>").addClass("card");
    var cardheaderdiv = $("<div>").addClass("card-header text-center");
    var cardbody = $("<div>").addClass("card-body text-center");
    var cardheadline = $(`<h3> What would you like to do?</h3>`);
    var cardbodyheadline = $(`<h4><a class="scrape-new">Try Scraping new articles</a></h4>`);
    cardheaderdiv.append(cardheadline);
    carddiv.append(cardheaderdiv);
    cardbody.append(cardbodyheadline);
    $(".container-fluid").append(div);
    $(".container-fluid").append(carddiv);
    $(".container-fluid").append(cardbody);


})


$(".scrape-new").on("click", function () {
    $.get("/scrape", function (data) {
        $(".container-fluid").empty();
        loadarticles();
    });

});

$("#saved").on("click", function (req, res) {
    console.log("saved article clicked");
    $(this).addClass("active");
    

})

$(document).on("click",".save", function () {
    console.log("save button clicked");
    let id=$(this).attr("data-id");
    console.log(id);
    
    $.post(`/articles/${id}`,{savearticle:true},function(data)
    {

    }).then(function(data)
    {
        console.log(data);
        window.location = "/saved.html"
    })
})

function loadarticles() {
    $.get("/articles", function (data) {
        for (var i = 0; i < 3; i++) {
            var div = $("<div>").addClass("card");
            div.attr("data-id", data[i]._id);
            var cardheaderdiv = $("<div>").addClass("card-header");
            var cardbody = $("<div>").addClass("card-body");
            var headline = $(`<h3> ${data[i].headline}</h3>`);
            var linktag = $(`<a href="https://www.nytimes.com/${data[i].link}"> </a>`);
            var btnatag = $(`<a class="btn btn-success save" data-id=${data[i]._id}>Save Article</a>`);
            var cardbodyp = $(`<p>${data[i].summary}</p>`)
            headline.append(linktag);
            headline.append(btnatag);
            cardheaderdiv.append(headline);
            div.append(cardheaderdiv);
            cardbody.append(cardbodyp);
            div.append(cardbody);
            $(".container-fluid").append(div);
        }

    });
}