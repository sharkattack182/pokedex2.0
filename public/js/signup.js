$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const firstInput = $("input#first-input");
  const lastInput = $("input#last-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      first: firstInput.val().trim(),
      last: lastInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),

    };

    if (!userData.email || !userData.password || !userData.first || !userData.last) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    // userData.first, userData.last, 
    signUpUser(userData.first, userData.last, userData.email, userData.password, userData.points);
    firstInput.val("");
    lastInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser( first, last, email, password) {
    $.post("/api/signup", {
      first: first,
      last: last,
      email: email,
      password: password,
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    console.log(err)
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
