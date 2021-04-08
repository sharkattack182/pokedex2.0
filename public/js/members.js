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

});
