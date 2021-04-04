$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(data => {
      $(".member-name").text(data.email);
    });
  
    $.get("/api/pokemons").then(data => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const newImg = $("<img>");
        newImg.attr({
          src:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
            element.id +
            ".png",
          class: "card-img-top"
        });
  
        const cardBody = $("<div>");
        const newPoke = $("<h3>");
        const newButton = $("<a>").text("PokePage");
        // let deleteButton = $("<a>").text("Delete");
  
        newButton.attr("href", "/pokemons?id=" + element.id);
        // deleteButton.attr({
        //   class: "delete",
        //   id: i,
        //   class: "btn btn-danger"
        // })
        cardBody.attr({
          class: "card-body",
          class: i
        });
        cardBody.attr("class", i);
        newPoke.attr("class", "card-title");
        newPoke.text(element.name);
        newButton.attr("class", "btn btn-primary");
  
        $("#" + i).append(newImg);
        $("#" + i).append(cardBody);
        $("." + i).append(newPoke);
        $("." + i).append(newButton);
        // $("." + i).append(deleteButton);
      }
    });
});