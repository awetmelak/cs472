$(document).ready(function() {
    const searchBtn = $("#search-button");
    const inputBox = $("#input-box");
    const resultList = $("#result");

    const printData = (data) => {
        resultList.empty();
        $.each(data, function(i, item) {
            let liElement = $('<li>').html(`<span class="wordtype">${item.wordtype}</span>::${item.definition}`);
            resultList.append(liElement);
        });
    };

    searchBtn.click(function() {
        let word = inputBox.val();
        console.log(word);
        $.getJSON(`http://localhost:3000/search/${word}`, function(data) {
            printData(data);
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
    });
});
