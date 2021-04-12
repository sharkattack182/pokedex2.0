const urlParams = new URLSearchParams(location.search);
const pokemonId = urlParams.get("id");

$.ajax({
  url: "https://pokeapi.co/api/v2/pokemon/" + pokemonId + "/",
  method: "GET",
}).then((result) => {
  const newImg = $("<img>");
  newImg.attr(
    "src",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" +
      pokemonId +
      ".svg"
  );
  newImg.addClass("poke-img");
  $(".pokedex-screen").append(newImg);
  // $(".pokedex-screen").addClass(result.types[0].type.name);

  console.log(result)

  if (result.id < 10) {
    $(".pokemon-name").text(
      "00" + result.id + " " + result.forms[0].name
    );
  } else if (result.id > 10 && result.id < 100) {
    $(".pokemon-name").text("0" + result.id + " " + result.forms[0].name);
  } else {
    $(".pokemon-name").text(result.id + " " + result.forms[0].name);
  }

  const typesArr = result.types;
  for (let i = 0; i < typesArr.length; i++) {
    const element = typesArr[i];
    const newTypeDiv = $("<div>");
    newTypeDiv.text(element.type.name);
    newTypeDiv.addClass(element.type.name);
    newTypeDiv.addClass("type-div");
    $(".type-container").append(newTypeDiv);
  }


  $.ajax({
  url: "https://pokeapi.co/api/v2/pokemon-species/" + pokemonId + "/",
  method: "GET",
}).then((result) => {
  console.log(result);
  var body = $(".container-flex")
  // console.log(captureRate < 200);

  if(result.evolves_from_species === null && result.is_legendary === false && result.is_mythical === false) {
    console.log("Can Capture")
    var addBtn = $("<div>");
    addBtn.addClass("add-button");
    addBtn.text("Add Pokemon");
    addBtn.attr("id", "add-pokemon")
    body.append(addBtn)
  } 



  
$("#add-pokemon").on("click", function (event) {
    console.log("button clicked")
    $.ajax({
        url: "/api/pokemons",
        method: "POST",
        data: {
            pokemonId: pokemonId
        },
        error: function(req, err) {
            window.location.replace("/signup");
        }
    }).then(result => {
        
        console.log("Pokemon " + pokemonId + " added to your Pokedex.");
        console.log(result);
        window.location.replace("/members");
    });

});




  for (let i = 0; i < 6; i+=2) {
    const element = result.flavor_text_entries[i];
    let text = element.flavor_text;
  let bio = text.replaceAll("\f", "\n")
  var newPokeBio = $("<div>");
  newPokeBio.addClass("pokemon-bio")
  $(newPokeBio).text(bio);
  $(".pokemon-bio-container").append(newPokeBio)
  }
  
});



$.ajax({
  url: "https://pokeapi.co/api/v2/evolution-chain/" + pokemonId + "/",
  method: "GET",
}).then((result) => {
  console.log(result)

});


});

