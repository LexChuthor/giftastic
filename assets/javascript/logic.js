var topics = ["luigi", "ness: earthbound", "jigglypuff", "marth: fire emblem", "kirby", "donkey kong", "captain falcon", "mario", "yoshi", "lucario", "ganondorf", "sonic", "ike", "solid snake", "link", "pikachu", "diddy kong", "ice climber", "wario", "king dedede", "pit", "pokemon trainer", "lucas: earthbound", "mr. game and watch", "meta knight", "samus", "fox", "falco", "wolf", "princess peach", "zelda", "bowser", "olimar"];

function renderButtons() {
    $("#topic-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("gif");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#topic-view").append(a);
    }
}

function populateGifs() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=EQkna9PvPHWdGicyJNhgjhNJrsGkJR0L&q=" + topic + "&limit=10&offset=0&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        renderGifs(response);
    });
}

function renderGifs(response) {
    var data = response.data;
    $("#gif-Display").empty();
    for (var i = 0; i < data.length; i++) {
        $("#gif-Display").append(`
            <div class="gif-Div">
            <p>Rating: ${data[i].rating}</p>
            <img src="${data[i].images.fixed_height_still.url}"
            class="gif-image" data-state="still" data-animate="${data[i].images.fixed_height.url}" data-still="${data[i].images.fixed_height_still.url}">
            </div>
            `)
    }
}
$(document).on("click", ".gif-image", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

$("#add-gif").on("click", function(event){
    event.preventDefault();
    var newTopic = $("#topic-input").val().trim();
    if(topics.indexOf(newTopic)===-1){
        topics.push(newTopic);
    }
    renderButtons();
});

$(document).on("click", ".gif", populateGifs);
renderButtons();
