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
        var qImg = $("<img>");
        qImg.attr("src", question.img);
        qImg.attr("class", "question-img")
        $(".img").append(qImg)
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
            $(".img").empty()
            setNextQuestion()
        } else {
            score +=0;
            currentQuestionIndex ++
            console.log(score);
            $(".choices").empty();
            $(".img").empty()
            setNextQuestion()
        }

    }

    function endGame() {
        console.log("END OF GAME SCORE: " + score);
        $(".quiz-container").css("display", "none");

        var badgeImg = badges[data.level - 1].image_file;
        var badgeName = badges[data.level - 1].name;
        console.log(data.points);
        console.log(data.level);
        var addPoints = score * 100 + data.points;
        var newLevel = data.level + 1;
        

        if(score > 3) {
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
            var text;

            console.log(newLevel);

            if(newLevel === 4) {
              text = 'You Earned A ' + badgeName + "! You can now catch higher level Pokemon! You will now be logged out. Log back in for your stats to update!"
            } else if (newLevel === 8) {
              text = 'You Earned A ' + badgeName + "! You can now catch Legendary Pokemon! You will now be logged out. Log back in for your stats to update!"
            } else {
              text = 'You Earned A ' + badgeName + "! You will now be logged out. Log back in for your stats to update!"
            };
            Swal.fire({
                title: 'Sweet!',
                text: text,
                imageUrl: badgeImg,
                imageWidth: "auto",
                imageHeight: 200,
                imageAlt: 'badge',
                confirmButtonText: `Ok`
              })

            // window.location.replace("/members")
            $(".swal2-confirm").on("click", function() {
                window.location.replace("/logout")
            })
            
        });
        } else {
          window.location.replace("/members")
        }
        
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
                    ],
                    img: "imgs/WTP/Digglet.png"
                  },
                  {
                    title: "Sandshrew",
                    choices: [
                        {text: "Cubone", correct: false},
                        {text: "Digglet", correct: false},
                        {text: "Sandshrew", correct: true},
                        {text: "Geodude", correct: false}
                    ],
                    img: "imgs/WTP/Sandshrew.png"
                  },
                  {
                    title: "Geodude",
                    choices: [
                        {text: "Digglet", correct: false},
                        {text: "Slowbro", correct: false},
                        {text: "Sandshrew", correct: false},
                        {text: "Geodude", correct: true}
                    ],
                    img: "imgs/WTP/Geodude.png"
                  },
                  {
                    title: "Onix",
                    choices: [
                        {text: "Digglet", correct: false},
                        {text: "Onix", correct: true},
                        {text: "Sandshrew", correct: false},
                        {text: "Geodude", correct: false}
                    ],
                    img: "imgs/WTP/Onix.png"
                  },
                  {
                    title: "Cubone",
                    choices: [
                        {text: "Cubone", correct: true},
                        {text: "Digglet", correct: false},
                        {text: "Sandshrew", correct: false},
                        {text: "Geodude", correct: false}
                    ],
                    img: "imgs/WTP/Cubone.png"
                  },
            ],
            image_file: "imgs/badges/boulder-badge.png",
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
                ],
                img: "imgs/WTP/Goldeen.png"
              },
              {
                title: "Horsea",
                choices: [
                    {text: "Staryu", correct: false},
                    {text: "Shellder", correct: false},
                    {text: "Horsea", correct: true},
                    {text: "Goldeen", correct: false}
                ],
                img: "imgs/WTP/Horsea.png"
              },
              {
                title: "Shellder",
                choices: [
                    {text: "Horsea", correct: false},
                    {text: "Goldeen", correct: false},
                    {text: "Staryu", correct: false},
                    {text: "Shellder", correct: true}
                ],
                img: "imgs/WTP/Shellder.png"
              },
              {
                title: "Staryu",
                choices: [
                    {text: "Goldeen", correct: false},
                    {text: "Staryu", correct: true},
                    {text: "Shellder", correct: false},
                    {text: "Horsea", correct: false}
                ],
                img: "imgs/WTP/Staryu.png"
              },
              {
                title: "Starmie",
                choices: [
                    {text: "Starmie", correct: true},
                    {text: "Shellder", correct: false},
                    {text: "Goldeen", correct: false},
                    {text: "Staryu", correct: false}
                ],
                img: "imgs/WTP/Starmie.png"
              },
          ],
          image_file: "imgs/badges/cascade-badge.png",
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
                ],
                img: "imgs/WTP/Pikachu.png"
              },
              {
                title: "Voltorb",
                choices: [
                    {text: "Pikachu", correct: false},
                    {text: "Electrode", correct: false},
                    {text: "Voltorb", correct: true},
                    {text: "Magnamite", correct: false}
                ],
                img: "imgs/WTP/Voltorb.png"
              },
              {
                title: "Magnamite",
                choices: [
                    {text: "Electrode", correct: false},
                    {text: "Voltorb", correct: false},
                    {text: "Pikachu", correct: false},
                    {text: "Magnamite", correct: true}
                ],
                img: "imgs/WTP/Magnamite.png"
              },
              {
                title: "Electrode",
                choices: [
                    {text: "Voltorb", correct: false},
                    {text: "Electrode", correct: true},
                    {text: "Magnamite", correct: false},
                    {text: "Raichu", correct: false}
                ],
                img: "imgs/WTP/Electrode.png"
              },
              {
                title: "Raichu",
                choices: [
                    {text: "Raichu", correct: true},
                    {text: "Pikachu", correct: false},
                    {text: "Magnamite", correct: false},
                    {text: "Electrode", correct: false}
                ],
                img: "imgs/WTP/Raichu.png"
              },
          ],
          image_file: "imgs/badges/thunder-badge.png",
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
                ],
                img: "imgs/WTP/Bellsprout.png"
              },
              {
                title: "Baulbasaur",
                choices: [
                    {text: "Bellsprout", correct: false},
                    {text: "Exeggcute", correct: false},
                    {text: "Baulbasaur", correct: true},
                    {text: "Ivysaur", correct: false}
                ],
                img: "imgs/WTP/Baulbasaur.png"
              },
              {
                title: "Ivysaur",
                choices: [
                    {text: "Exeggcute", correct: false},
                    {text: "Baulbasaur", correct: false},
                    {text: "Bellsprout", correct: false},
                    {text: "Ivysaur", correct: true}
                ],
                img: "imgs/WTP/Ivysaur.png"
              },
              {
                title: "Exeggcute",
                choices: [
                    {text: "Baulbasaur", correct: false},
                    {text: "Exeggcute", correct: true},
                    {text: "Ivysaur", correct: false},
                    {text: "Gloom", correct: false}
                ],
                img: "imgs/WTP/Exeggcute.png"
              },
              {
                title: "Gloom",
                choices: [
                    {text: "Gloom", correct: true},
                    {text: "Bellsprout", correct: false},
                    {text: "Ivysaur", correct: false},
                    {text: "Exeggcute", correct: false}
                ],
                img: "imgs/WTP/Gloom.png"
              },
          ],
          image_file: "imgs/badges/rainbow-badge.png",
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
                ],
                img: "imgs/WTP/Koffing.png"
              },
              {
                title: "Arbok",
                choices: [
                    {text: "Koffing", correct: false},
                    {text: "Hypno", correct: false},
                    {text: "Arbok", correct: true},
                    {text: "Muk", correct: false}
                ],
                img: "imgs/WTP/Arbok.png"
              },
              {
                title: "Muk",
                choices: [
                    {text: "Hypno", correct: false},
                    {text: "Arbok", correct: false},
                    {text: "Koffing", correct: false},
                    {text: "Muk", correct: true}
                ],
                img: "imgs/WTP/Muk.png"
              },
              {
                title: "Hypno",
                choices: [
                    {text: "Arbok", correct: false},
                    {text: "Hypno", correct: true},
                    {text: "Muk", correct: false},
                    {text: "Weezing", correct: false}
                ],
                img: "imgs/WTP/Hypno.png"
              },
              {
                title: "Weezing",
                choices: [
                    {text: "Weezing", correct: true},
                    {text: "Koffing", correct: false},
                    {text: "Muk", correct: false},
                    {text: "Hypno", correct: false}
                ],
                img: "imgs/WTP/Weezing.png"
              },
          ],
          image_file: "imgs/badges/soul-badge.png",
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
                ],
                img: "imgs/WTP/Abra.png"
              },
              {
                title: "Slowbro",
                choices: [
                    {text: "Abra", correct: false},
                    {text: "Kadabra", correct: false},
                    {text: "Slowbro", correct: true},
                    {text: "Mr. Mime", correct: false}
                ],
                img: "imgs/WTP/Slowbro.png"
              },
              {
                title: "Mr. Mime",
                choices: [
                    {text: "Alakazam", correct: false},
                    {text: "Slowbro", correct: false},
                    {text: "Abra", correct: false},
                    {text: "Mr. Mime", correct: true}
                ],
                img: "imgs/WTP/Mrmime.png"
              },
              {
                title: "Kadabra",
                choices: [
                    {text: "Slowbro", correct: false},
                    {text: "Kadabra", correct: true},
                    {text: "Mr. Mime", correct: false},
                    {text: "Alakazam", correct: false}
                ],
                img: "imgs/WTP/Kadabra.png"
              },
              {
                title: "Alakazam",
                choices: [
                    {text: "Alakazam", correct: true},
                    {text: "Abra", correct: false},
                    {text: "Mr. Mime", correct: false},
                    {text: "Kadabra", correct: false}
                ],
                img: "imgs/WTP/Alakazam.png"
              },
          ],
          image_file: "imgs/badges/marsh-badge.png",
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
                choices: [
                    {text: "Vulpix", correct: false},
                    {text: "Growlithe", correct: true},
                    {text: "Ponyata", correct: false},
                    {text: "Rapidash", correct: false}
                ],
                img: "imgs/WTP/Growlithe.png"
              },
              {
                title: "Vulpix",
                choices: [
                    {text: "Growlithe", correct: false},
                    {text: "Ponyata", correct: false},
                    {text: "Vulpix", correct: true},
                    {text: "Rapidash", correct: false}
                ],
                img: "imgs/WTP/Vulpix.png"
              },
              {
                title: "Rapidash",
                choices: [
                    {text: "Arcanine", correct: false},
                    {text: "Vulpix", correct: false},
                    {text: "Growlithe", correct: false},
                    {text: "Rapidash", correct: true}
                ],
                img: "imgs/WTP/Rapidash.png"
              },
              {
                title: "Ponyata",
                choices: [
                    {text: "Vulpix", correct: false},
                    {text: "Ponyata", correct: true},
                    {text: "Rapidash", correct: false},
                    {text: "Arcanine", correct: false}
                ],
                img: "imgs/WTP/Ponyata.png"
              },
              {
                title: "Arcanine",
                choices: [
                    {text: "Arcanine", correct: true},
                    {text: "Growlithe", correct: false},
                    {text: "Rapidash", correct: false},
                    {text: "Ponyata", correct: false}
                ],
                img: "imgs/WTP/Arcanine.png"
              },
          ],
    
          image_file: "imgs/badges/volcano-badge.png",
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
                choices: [
                    {text: "Dugtrio", correct: false},
                    {text: "Rhyhorn", correct: true},
                    {text: "Nidoking", correct: false},
                    {text: "Nidoqueen", correct: false}
                ],
                img: "imgs/WTP/Rhyhorn.png"
              },
              {
                title: "Dugtrio",
                choices: [
                    {text: "Rhyhorn", correct: false},
                    {text: "Nidoking", correct: false},
                    {text: "Dugtrio", correct: true},
                    {text: "Nidoqueen", correct: false}
                ],
                img: "imgs/WTP/Dugtrio.png"
              },
              {
                title: "Nidoqueen",
                choices: [
                    {text: "Rydon", correct: false},
                    {text: "Dugtrio", correct: false},
                    {text: "Rhyhorn", correct: false},
                    {text: "Nidoqueen", correct: true}
                ],
                img: "imgs/WTP/Nidoqueen.png"
              },
              {
                title: "Nidoking",
                choices: [
                    {text: "Dugtrio", correct: false},
                    {text: "Nidoking", correct: true},
                    {text: "Nidoqueen", correct: false},
                    {text: "Rydon", correct: false}
                ],
                img: "imgs/WTP/Nidoking.png"
              },
              {
                title: "Rydon",
                choices: [
                    {text: "Rydon", correct: true},
                    {text: "Rhyhorn", correct: false},
                    {text: "Nidoqueen", correct: false},
                    {text: "Nidoking", correct: false}
                ],
                img: "imgs/WTP/Rydon.png"
              },
          ],
    
          image_file: "imgs/badges/earth-badge.png",
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
