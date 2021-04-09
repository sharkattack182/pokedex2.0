$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    console.log(data)
    $(".user-name").text(data.username);
    $(".first-name").text(data.first);
    $(".last-name").text(data.last);
    $(".email").text(data.email);
    $(".xp").text(data.points);

  });




  $.get("/api/pokemons").then(data => {
    console.log(data);

    if(data.length === 0) {
      $(".user-pokedex").css("display", "none")
    }
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      console.log(element)
      const newImg = $("<img>");
      newImg.attr({
        src: element.sprites.front_default,
        class: "poke-img"
      });

      var newAttr = $("<a>");
      newAttr.attr("href", "/pokemon?id=" + element.id);
      newAttr.addClass("attr")
      var newEntry = $("<div>");
      newEntry.addClass("col-4 pokedex-entry");
      newEntry.append(newImg);
      var newP = $("<p>");
      newP.text(element.name);
      newAttr.append(newP);
      newEntry.append(newAttr)
      $(".users-pokemon").append(newEntry);
    }
  });


});
