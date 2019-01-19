$(document).ready(function () {

    $.get("/saved", function (data) {
        $(".container-fluid").empty();

        if (data) {
            for (var i = 0; i < 3; i++) {
                var div = $("<div>").addClass("card");
                div.attr("data-id", data[i]._id);
                var cardheaderdiv = $("<div>").addClass("card-header");
                var cardbody = $("<div>").addClass("card-body");
                var headline = $(`<h3> ${data[i].headline}</h3>`);
                var linktag = $(`<a href="https://www.nytimes.com/${data[i].link}"> </a>`);
                var btnatag = $(`<a class="btn btn-danger delete">Delete saved</a>`);
                var btnnotes = $(`<a class="btn btn-info notes">Article Notes</a>`);
                var cardbodyp = $(`<p>${data[i].summary}</p>`)
                headline.append(linktag);
                headline.append(btnatag);
               headline.append(btnnotes);
                cardheaderdiv.append(headline);
                div.append(cardheaderdiv);
                cardbody.append(cardbodyp);
                div.append(cardbody);
                $(".container-fluid").append(div);
            }


        }
    });

});
$(".save").on("click", function () {
    loadarticles();
})

