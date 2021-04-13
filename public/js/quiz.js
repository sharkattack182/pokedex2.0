$(document).ready(() => {
  $.get("/api/user_data").then((data) => {
    console.log(data);
    console.log(data.id)

    $(".name").text(data.username);
    let shuffledQuestions, currentQuestionIndex;
    let score;
    


    $(".take-test").on("click", function() {

      var quizNum = data.level - 1;
      var quizData = badges[quizNum];
      var quiz = quizData.quiz;
      console.log(quiz);
      shuffledQuestions = quiz.sort(() => Math.random() - .5);
      currentQuestionIndex = 0;
      score = 0
      

      $(".welcome-container").css("display", "none");
      $(".quiz-container").css("display", "inline");

    console.log("Started");
    setNextQuestion()

    function setNextQuestion() {
        
       if(shuffledQuestions.length < currentQuestionIndex + .2) {
        endGame()
    } 

        showQuestion(shuffledQuestions[currentQuestionIndex])
    }

    function showQuestion(question) {
        $(".img").text(question.title);
        question.choices.forEach(answer => {
            const button = $("<div>");
            button.text(answer.text);
            button.attr("class", "quiz-question");
            if(answer.correct) {
                button.attr("data-correct", answer.correct)
            }
            button.on("click", selectAnswer);
            $(".choices").append(button);
        });

    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        let correct = selectedButton.dataset.correct;
        console.log(correct)
        if(correct === "true") {
            score ++;
            currentQuestionIndex ++
            console.log(score);
            $(".choices").empty();
            setNextQuestion()
        } else {
            score +=0;
            currentQuestionIndex ++
            console.log(score);
            $(".choices").empty();
            setNextQuestion()
        }

    }

    function endGame() {
        console.log("END OF GAME SCORE: " + score);
        $(".quiz-container").css("display", "none");

        console.log(data.points);
        console.log(data.level);
        var addPoints = score * 100 + data.points;
        var newLevel = data.level + 1;
        

        $.ajax({
            url: "/api/user_data",
            method: "PUT",
            data: {
                id: data.id,
                level: newLevel,
                point: addPoints
            },
            error: function(req, err) {
                console.log(err)
                
            }
        }).then(result => {
            
            console.log("user info updated");
            console.log(result);
            // window.location.replace("/members");
            
            
        });
    }
    });




    var badges = [
        {
            name: "Boulder Badge",
            quiz: [
                {
                    title: "Digglet",
                    choices: [
                        {text: "Geodude", correct: false},
                        {text: "Digglet", correct: true},
                        {text: "Hypno", correct: false},
                        {text: "Onix", correct: false}
                    ]
                  },
                  {
                    title: "Sandshrew",
                    choices: [
                        {text: "Cubone", correct: false},
                        {text: "Digglet", correct: false},
                        {text: "Sandshrew", correct: true},
                        {text: "Geodude", correct: false}
                    ]
                  },
                  {
                    title: "Geodude",
                    choices: [
                        {text: "Digglet", correct: false},
                        {text: "Slowbro", correct: false},
                        {text: "Sandshrew", correct: false},
                        {text: "Geodude", correct: true}
                    ]
                  },
                  {
                    title: "Onix",
                    choices: [
                        {text: "Digglet", correct: false},
                        {text: "Onix", correct: true},
                        {text: "Sandshrew", correct: false},
                        {text: "Geodude", correct: false}
                    ]
                  },
                  {
                    title: "Cubone",
                    choices: [
                        {text: "Cubone", correct: true},
                        {text: "Digglet", correct: false},
                        {text: "Sandshrew", correct: false},
                        {text: "Geodude", correct: false}
                    ]
                  },
            ],
            image_file: "example.jpg",
            points: 300,
            message: "Congratulations on earning your Boulder Badge! You have also earned 300 xP to help in your quest to become a pokemon master!",
            gym: "Pewter City",
            gym_leader: "Brock",
            passcode: "PewterCity001",
            passed: false
        },
        
    
        {
          name: "Cascade Badge",
          quiz: [
            {
                title: "Goldeen",
                choices: [
                    {text: "Starmie", correct: false},
                    {text: "Goldeen", correct: true},
                    {text: "Shellder", correct: false},
                    {text: "Horsea", correct: false}
                ]
              },
              {
                title: "Horsea",
                choices: [
                    {text: "Staryu", correct: false},
                    {text: "Shellder", correct: false},
                    {text: "Horsea", correct: true},
                    {text: "Goldeen", correct: false}
                ]
              },
              {
                title: "Shellder",
                choices: [
                    {text: "Horsea", correct: false},
                    {text: "Goldeen", correct: false},
                    {text: "Staryu", correct: false},
                    {text: "Shellder", correct: true}
                ]
              },
              {
                title: "Staryu",
                choices: [
                    {text: "Goldeen", correct: false},
                    {text: "Staryu", correct: true},
                    {text: "Shellder", correct: false},
                    {text: "Horsea", correct: false}
                ]
              },
              {
                title: "Starmie",
                choices: [
                    {text: "Starmie", correct: true},
                    {text: "Shellder", correct: false},
                    {text: "Goldeen", correct: false},
                    {text: "Staryu", correct: false}
                ]
              },
          ],
          image_file: "example.jpg",
          points: 300,
          message:
            "Congratulations on earning your Cascade Badge! You have also earned 300 xP to help in your quest to become a pokemon master!",
          gym: "Cerulean City",
          gym_leader: "Misty",
          passcode: "CeruleanCity002",
          passed: false,
        },
    
        {
          name: "Thunder Badge",
          quiz: [
            {
                title: "Pikachu",
                choices: [
                    {text: "Voltorb", correct: false},
                    {text: "Pikachu", correct: true},
                    {text: "Electrode", correct: false},
                    {text: "Magnamite", correct: false}
                ]
              },
              {
                title: "Voltorb",
                choices: [
                    {text: "Pikachu", correct: false},
                    {text: "Electrode", correct: false},
                    {text: "Voltorb", correct: true},
                    {text: "Magnamite", correct: false}
                ]
              },
              {
                title: "Magnamite",
                choices: [
                    {text: "Electrode", correct: false},
                    {text: "Voltorb", correct: false},
                    {text: "Pikachu", correct: false},
                    {text: "Magnamite", correct: true}
                ]
              },
              {
                title: "Electrode",
                choices: [
                    {text: "Voltorb", correct: false},
                    {text: "Electrode", correct: true},
                    {text: "Magnamite", correct: false},
                    {text: "Raichu", correct: false}
                ]
              },
              {
                title: "Raichu",
                choices: [
                    {text: "Raichu", correct: true},
                    {text: "Pikachu", correct: false},
                    {text: "Magnamite", correct: false},
                    {text: "Electrode", correct: false}
                ]
              },
          ],
          image_file: "example.jpg",
          points: 300,
          message:
            "Congratulations on earning your Thunder Badge! You have also earned 300 xP to help in your quest to become a pokemon master!",
          gym: "Vermillion City",
          gym_leader: "Lt. Surge",
          passcode: "VermillionCity003",
          passed: false,
        },
    
        {
          name: "Rainbow Badge",
          quiz: [
            {
                title: "Bellsprout",
                choices: [
                    {text: "Baulbasaur", correct: false},
                    {text: "Bellsprout", correct: true},
                    {text: "Exeggcute", correct: false},
                    {text: "Ivysaur", correct: false}
                ]
              },
              {
                title: "Baulbasaur",
                choices: [
                    {text: "Bellsprout", correct: false},
                    {text: "Exeggcute", correct: false},
                    {text: "Baulbasaur", correct: true},
                    {text: "Ivysaur", correct: false}
                ]
              },
              {
                title: "Ivysaur",
                choices: [
                    {text: "Exeggcute", correct: false},
                    {text: "Baulbasaur", correct: false},
                    {text: "Bellsprout", correct: false},
                    {text: "Ivysaur", correct: true}
                ]
              },
              {
                title: "Exeggcute",
                choices: [
                    {text: "Baulbasaur", correct: false},
                    {text: "Exeggcute", correct: true},
                    {text: "Ivysaur", correct: false},
                    {text: "Gloom", correct: false}
                ]
              },
              {
                title: "Gloom",
                choices: [
                    {text: "Gloom", correct: true},
                    {text: "Bellsprout", correct: false},
                    {text: "Ivysaur", correct: false},
                    {text: "Exeggcute", correct: false}
                ]
              },
          ],
          image_file: "example.jpg",
          points: 500,
          message:
            "Congratulations on earning your Rainbow Badge! You have also earned 500 xP to help in your quest to become a pokemon master!",
          gym: "Celadon City",
          gym_leader: "Erika",
          passcode: "CeladonCity004",
          passed: false,
        },
    
        {
          name: "Soul Badge",
          quiz: [
            {
                title: "Koffing",
                choices: [
                    {text: "Arbok", correct: false},
                    {text: "Koffing", correct: true},
                    {text: "Hypno", correct: false},
                    {text: "Mukr", correct: false}
                ]
              },
              {
                title: "Arbok",
                choices: [
                    {text: "Koffing", correct: false},
                    {text: "Hypno", correct: false},
                    {text: "Arbok", correct: true},
                    {text: "Muk", correct: false}
                ]
              },
              {
                title: "Muk",
                choices: [
                    {text: "Hypno", correct: false},
                    {text: "Arbok", correct: false},
                    {text: "Koffing", correct: false},
                    {text: "Muk", correct: true}
                ]
              },
              {
                title: "Hypno",
                choices: [
                    {text: "Arbok", correct: false},
                    {text: "Hypno", correct: true},
                    {text: "Muk", correct: false},
                    {text: "Weezing", correct: false}
                ]
              },
              {
                title: "Weezing",
                choices: [
                    {text: "Weezing", correct: true},
                    {text: "Koffing", correct: false},
                    {text: "Muk", correct: false},
                    {text: "Hypno", correct: false}
                ]
              },
          ],
          image_file: "example.jpg",
          points: 500,
          message:
            "Congratulations on earning your Soul Badge! You have also earned 500 xP to help in your quest to become a pokemon master!",
          gym: "Fuchsia City",
          gym_leader: "Koga",
          passcode: "FuchsiaCity005",
          passed: false,
        },
    
        {
          name: "Marsh Badge",
          quiz: [
            {
                title: "Abra",
                choices: [
                    {text: "Slowbro", correct: false},
                    {text: "Abra", correct: true},
                    {text: "Kadabra", correct: false},
                    {text: "Mr. Mime", correct: false}
                ]
              },
              {
                title: "Slowbro",
                choices: [
                    {text: "Abra", correct: false},
                    {text: "Kadabra", correct: false},
                    {text: "Slowbro", correct: true},
                    {text: "Mr. Mime", correct: false}
                ]
              },
              {
                title: "Mr. Mime",
                choices: [
                    {text: "Alakazam", correct: false},
                    {text: "Slowbro", correct: false},
                    {text: "Abra", correct: false},
                    {text: "Mr. Mime", correct: true}
                ]
              },
              {
                title: "Kadabra",
                choices: [
                    {text: "Slowbro", correct: false},
                    {text: "Kadabra", correct: true},
                    {text: "Mr. Mime", correct: false},
                    {text: "Alakazam", correct: false}
                ]
              },
              {
                title: "Alakazam",
                choices: [
                    {text: "Alakazam", correct: true},
                    {text: "Abra", correct: false},
                    {text: "Mr. Mime", correct: false},
                    {text: "Kadabra", correct: false}
                ]
              },
          ],
          image_file: "example.jpg",
          points: 750,
          message:
            "Congratulations on earning your Marsh Badge! You have also earned 750 xP to help in your quest to become a pokemon master!",
          gym: "Saffron City",
          gym_leader: "Sabrina",
          passcode: "SaffronCity006",
          passed: false,
        },
    
        {
          name: "Volcano Badge",
          quiz: [
            {
              title: "Growlithe",
              choices: ["Ponyata", "Growlithe", "Rapidash", "Arcanine"],
              answer: "B",
            },
            {
              title: "Vulpix",
              choices: ["Vulpix", "Growlithe", "Ponyata", "Ninetales"],
              answer: "A",
            },
            {
              title: "Rapidash",
              choices: ["Arcanine", "Vulpix", "Rapidash", "Growlithe"],
              answer: "C",
            },
            {
              title: "Ponyata",
              choices: ["Ponyata", "Ninetales", "Kadabra", "Vulpix"],
              answer: "A",
            },
            {
              title: "Arcanine",
              choices: ["Growlithe", "Vulpix", "Arcanine", "Ninetales"],
              answer: "C",
            },
          ],
    
          image_file: "example.jpg",
          points: 750,
          message:
            "Congratulations on earning your Volcano Badge! You have also earned 750 xP to help in your quest to become a pokemon master!",
          gym: "Cinnbar Island",
          gym_leader: "Blaine",
          passcode: "CinnabarIsland007",
          passed: false,
        },
    
        {
          name: "Earth Badge",
          quiz: [
            // Quiz8 Earth Badge
            {
              title: "Rhyhorn",
              choices: ["Rydon", "Nidoqueen", "Nidoking", "Rhyhorn"],
              answer: "D",
            },
            {
              title: "Dugtrio",
              choices: ["Dugtrio", "Rhyhorn", "Nidoking", "Rydon"],
              answer: "A",
            },
            {
              title: "Nidoqueen",
              choices: ["Rydon", "Nidoqueen", "Dugtrio", "Nidoking"],
              answer: "Bn",
            },
            {
              title: "Nidoking",
              choices: ["Nidoking", "Dugtrio", "Nidoqueen", "Rydon"],
              answer: "A",
            },
            {
              title: "Rydon",
              choices: ["Rhyhorn", "Dugtrio", "Rydon", "Nidoqueen"],
              answer: "C",
            },
          ],
    
          image_file: "example.jpg",
          points: 1000,
          message:
            "Congratulations on earning your Earth Badge! You have also earned 1000 xP to help in your quest to become a pokemon master!",
          gym: "Viridian City",
          gym_leader: "Giovanni",
          passcode: "ViridianCity008",
          passed: false,
        },
      ];

  });

  
});
