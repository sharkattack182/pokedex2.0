// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      first: req.body.first,
      last: req.body.last,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        first: req.user.first,
        last: req.user.last,
        points: req.user.points,
        username: req.user.username,
        email: req.user.email,
        id: req.user.id,
        level: req.user.level,
      });
    }
  });

  // getting the information from the PokeAPI
  app.get("/api/all", (req, res) => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
      .then((response) => {
        res.json(response.data.results);
      });
  });

  // individual pokemon
  app.get("/api/pokemon/:pokemon", (req, res) => {
    const pokemon = req.params.pokemon;
    const queryURL =
      "https://pokeapi.co/api/v2/pokemon-species/" + pokemon + "/";
    axios.get(queryURL).then((response) => {
      res.json(response.data);
    });
  });

  // app.get("/api/pokemons", isAuthenticated, (req, res) => {
  app.get("/api/pokemons", (req, res) => {
    // db.Pokemon.findAll({ where: { UserId: req.user.id }})
    db.Pokemon.findAll({ where: { UserId: req.user.id } }).then((pokemons) => {
      const requests = pokemons.map((pokemon) => {
        return axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemonId}`
        );
      });

      Promise.all(requests).then((results) => {
        res.json(results.map((r) => r.data));
      });
    });
  });

  // app.post("/api/pokemons", isAuthenticated, (req, res) => {
  app.post("/api/pokemons", (req, res) => {
    const pokemonId = req.body.pokemonId;

    db.Pokemon.findAll({ where: { UserId: req.user.id } }).then((pokemons) => {
      if (pokemons.length >= 6) {
        res.json({ message: "Limit exceeded" });
      } else {
        axios
          .get("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
          .then((result) => {
            //console.log(result.data);
            return db.Pokemon.create({
              UserId: req.user.id,
              //UserId: req.user.id,
              pokemonId: pokemonId,
              name: result.data.name,
              imageUrl: result.data.sprites.front_default,
            });
          })
          .then((newPokemon) => {
            res.json(newPokemon);
          });
      }
    });
  });

  app.put("/api/user_data", function(req, res) {
    console.log(req.body)
    db.User.update(
      {
        points: req.body.point,
        level: req.body.level,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    ).then(function(result) {
      res.json(result);
    });
  });
};
