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
              choices: ["Pikachu", "Magnamite", "Electrode", "Voltorb"],
              answer: "A",
            },
            {
              title: "Voltorb",
              choices: ["Electrode", "Pikachu", "Voltorb", "Magnamite"],
              answer: "C",
            },
            {
              title: "Magnamite",
              choices: ["Magnamite", "Pikachu", "Raichu", "Electrode"],
              answer: "A",
            },
            {
              title: "Electrode",
              choices: ["Pikachu", "Voltorb", "Raichu", "Electrode"],
              answer: "D",
            },
            {
              title: "Raichu",
              choices: ["Pikachu", "Raichu", "Voltorb", "Magnamite"],
              answer: "B",
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
              choices: ["Oddish", "Bellsprout", "Bulbasaur", "Exeggcute"],
              answer: "B",
            },
            {
              title: "Baulbasaur",
              choices: ["Ivysaur", "Metapod", "Venasaur", "Bulbasaur"],
              answer: "D",
            },
            {
              title: "Ivysaur",
              choices: ["Ivysaur", "Metapod", "Venasaur", "Bulbasaur"],
              answer: "A",
            },
            {
              title: "Exeggcute",
              choices: ["Oddish", "Bellsprout", "Bulbasaur", "Exeggcute"],
              answer: "D",
            },
            {
              title: "Gloom",
              choices: ["Gloom", "Weepingbell", "Oddish", "Venasaur"],
              answer: "A",
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
              choices: ["Koffing", "Muk", "Wheezing", "Hypno"],
              answer: "A",
            },
            {
              title: "Arbok",
              choices: ["Koffing", "Drowzee", "Arbok", "Muk"],
              answer: "C",
            },
            {
              title: "Muk",
              choices: ["Wheezing", "Muk", "Arbok", "Koffing"],
              answer: "B",
            },
            {
              title: "Hypno",
              choices: ["Koffing", "Muk", "Wheezing", "Hypno"],
              answer: "D",
            },
            {
              title: "Weezing",
              choices: ["Muk", "Weezing", "Hypno", "Kadabra"],
              answer: "Gloom",
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
              choices: ["Mr. Mime", "Abra", "Kadabara", "Haunter"],
              answer: "B",
            },
            {
              title: "Mr. Mime",
              choices: ["Gastly", "Abra", "Mr. Mime", "Alakazam"],
              answer: "C",
            },
            {
              title: "Kadabra",
              choices: ["Mr. Mime", "Abra", "Haunter", "Kadabra"],
              answer: "D",
            },
            {
              title: "Slowbro",
              choices: ["Slowbro", "Gastly", "Kadabra", "Slowpoke"],
              answer: "A",
            },
            {
              title: "Alakazam",
              choices: ["Slowbro", "Haunter", "Alakazam", "Kadabra"],
              answer: "C",
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
