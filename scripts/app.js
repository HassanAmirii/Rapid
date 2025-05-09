document.getElementById("start").addEventListener("click", function () {
  let app = document.getElementById("app");
  let classSelected;
  let subjectSelected;
  let timeSelected;

  function pickClass() {
    app.innerHTML = `

    <h1>Please select your current grade below</h1>

    <div id="parent-Class">
    
      <button class="class-child" data-class="grade 1">grade 1</button>
      <button class="class-child" data-class="grade 2">grade 2</button>
      <button class="class-child" data-class="grade 3">grade 3</button>
      <button class="class-child" data-class="grade 4">grade 4</button>
    </div>

`;
  }
  pickClass();
  app.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      if (e.target.dataset.class) {
        classSelected = e.target.dataset.class;
        pickSubject();
      } else if (e.target.dataset.subject) {
        subjectSelected = e.target.dataset.subject;
        time();
      } else if (e.target.dataset.time) {
        timeSelected = e.target.dataset.time;
        summary();
      }
    }
  });

  function pickSubject() {
    app.innerHTML = `
    <p>you just picked <strong>${classSelected}</strong> awesome, kindly pick a subject to continue</p>
 <div id="parent-subject">
  <button class="subject-child" data-subject="Maths">Maths</button>
  <button class="subject-child" data-subject="English">English</button>
  <button class="subject-child" data-subject="science">science</button>
  <button class="subject-child" data-subject="civic">civic</button>
</div> `;
  }

  function time() {
    app.innerHTML = `
    <p>you just picked <strong>${subjectSelected}</strong> awesome, kindly pick a time type to continue</p>
 <div id="parent-time">
  <button class="time-child" data-time="20minutes - quiz">20minutes - quiz </button>
  <button class="time-child" data-time="40minutes - exam">40minutes - exam </button>
</div> `;
  }

  function summary() {
    app.innerHTML = ` <h1>almost done, just a quick confirmation</h1>
<p><strong> summary:</strong></p>
<p>class picked: <strong>${classSelected}</strong> </p>
<p>subject picked: <strong>${subjectSelected}</strong> </p>
<p>time based picked: <strong>${timeSelected}</strong> </p>

<p>make sure to be in a quiet place to avoid distractions</p>
<p>have a jotter and a pencil close by for quick jotting or calculations </p>
<p>good luck champ</p>

<button id="beginSession"> start ${timeSelected} session</button>


`;
    document
      .getElementById("beginSession")
      .addEventListener("click", function () {
        fetch("data/questions.json")
          .then(function (response) {
            if (!response.ok) {
              throw new Error(`http error: ${response.status}`);
            }
            return response.json();
          })
          .then(function (data) {
            const questions = data[classSelected][subjectSelected];

            let currentQuestion = 0;
            let score = 0;
            let questionList = questions[currentQuestion];

            function renderQuestion() {
              app.innerHTML = `
                <h1>Question: ${currentQuestion + 1}</h1>
                <p>${questionList.question}</p>
                <div>
                  ${questionList.options
                    .map(function (item) {
                      return `
                        <button class="options" data-optchoice="${item}">
                          ${item}
                        </button>
                      `;
                    })
                    .join("")}
                </div>
              `;
            }

            renderQuestion();
            app.addEventListener("click", function handleAnswer(e) {
              if (e.target.tagName == "BUTTON" && e.target.dataset.optchoice) {
                const choosedAnswer = e.target.dataset.optchoice;
                const rightAnswer = questionList.answer;
                if (choosedAnswer == rightAnswer) {
                  score++;
                }
                currentQuestion++;
                if (currentQuestion < questions.length) {
                  questionList = questions[currentQuestion];
                  renderQuestion();
                } else {
                  app.removeEventListener("click", handleAnswer);
                  showResult();
                }
              }
              function showResult() {
                app.innerHTML = ` <h1> done, your results:</h1>
                <p>${score}/ ${questions.length}</p>
                
                
                <button id="restartSession" onclick="location.reload()"> restart session </button>
                <button id="PickAgain"> Reselect subject </button>

                `;
                document
                  .getElementById("PickAgain")
                  .addEventListener("click", function () {
                    pickClass();
                  });
              }
            });
          })

          .catch(function (error) {
            console.error(error);
          });
      });
  }
});
