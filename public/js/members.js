
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


  let badgesArr = [
    "imgs/badges/boulder-badge.png",
    "imgs/badges/cascade-badge.png",
    "imgs/badges/thunder-badge.png",
    "imgs/badges/rainbow-badge.png",
    "imgs/badges/soul-badge.png",
    "imgs/badges/marsh-badge.png",
    "imgs/badges/volcano-badge.png",
    "imgs/badges/earth-badge.png"
  ];

  for (let i = 0; i < data.level -1; i++) {
    const element = badgesArr[i];
    console.log(element);

    const newDiv = $("<div>");
    newDiv.attr("class", "col-3");
    let newImg = $("<img>");
    newImg.attr("class", "gym-badge");
    newImg.attr("src", element);
    newDiv.append(newImg);
    if(i <= 3) {
      $(".badge-row1").append(newDiv)
    } else {
      $(".badge-row2").append(newDiv)
    }

  }
  // let level = data.level;
  // console.log(level);
  // if(level > 1) {
  //  for (let i = 2; i < level + 2; i++) {
  //   const element = badgesArr[i];
  //   console.log(element)
    // // const newDiv = $("<div>");
    // // newDiv.attr("class", "col-3");
    // // let newImg = $("<img>");
    // // newImg.attr("class", "gym-badge");
    // // newImg.attr("src", element);
    // // newDiv.append(newImg);
    // if(i <= 4) {
    //   $(".badge-row1").append(newDiv)
    // } else {
    //   $(".badge-row2").append(newDiv)
    // }
  // } 
  // }
  
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

