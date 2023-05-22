$(document).ready(() => {
    $("#view_button").click(getPicture);
});

function getPicture() {
    $.ajax({
        url: "https://api.nasa.gov/planetary/apod",
        type: "GET",
        data: {
            api_key: "DEMO_KEY",
            date: $("#date").val()
        },
        dataType: "json",
        "success": showPicture,
        "error": noPicture
    });

    /* // Fetch Version

    fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=" + encodeURIComponent(document.getElementById("date").value))
        .then(response => response.json())
        .then(data => showPicture(data))
        .catch(error => noPicture(error)
        );
    */
};

function showPicture(data) {
    $("#pic").attr("src", data.url);
    $("#title").text(data.title);
};

function noPicture(error) {
    alert(error.responseText);
};