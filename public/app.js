

$(document).ready(function () {
    $.get("/articles", function (data) {
        for (var i = 0; i < 3; i++) {
            var div = $("<div>").addClass("card");
            div.attr("data-id", data[i]._id);
            var cardheaderdiv = $("<div>").addClass("card-header");
            var cardbody = $("<div>").addClass("card-body");
            var headline = $("<h3>");
            var linktag = $(`<a href="https://www.nytimes.com/${data[i].link}"> </a>`);
            var btnatag = $(`<a class="btn btn-success save">Save Article</a>`);
            // var btnsavearticle=$("<button>");
            // btnsavearticle.addText("Save Article");        
            headline.append(linktag);
            headline.append(btnatag);
            cardheaderdiv.append(headline);
            div.append(cardheaderdiv);
            div.append(cardbody);
            $(".container-fluid").append(div);
        }

    })

   

})


// $(document).on("click",".scrape-new",function()
// {
//     $.ajax({
//         method:"GET",
//         url:"/articles"
//     })
// })

$(".clear").on("click", function () {
    console.log("clear btn clicked");
    $.get("api/clear",function(data)
    {
       
        $(".container-fluid").empty();
        var div = $("<div>").addClass("alert alert-warning");
        var headline = $("<h4>Uh Oh. Looks like we don't have any new articles.</h4>");
        div.append(headline);
        $(".container-fluid").append(div);
    })
   
})
