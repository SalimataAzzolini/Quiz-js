/**
 * script.js - Script de la page
 */

/*************************/
/*       Questions       */
/*************************/

const questions = [
  {
    // Texte de la question
    question:
      "Dans la saga culte Star Wars, comment s'appelle le père de Luke Skywalker ?",
    // Réponses possibles
    answers: [
      "Darth Vader",
      "Anakin Skywalker",
      "Les deux réponse",
      "Aucune réponse",
    ],
    // Index de la réponse correcte
    correctAnswerIndex: 2,
  },
  {
    question:
      'En quelle année le groupe "The Beatles" a t\'il sorti le célèbre album "Sgt. Pepper\'s Lonely Hearts Club Band" ?',
    answers: ["1967", "1974", "1962", "1980"],
    correctAnswerIndex: 0,
  },
  {
    question:
      'Dans la série de jeux video "Zelda", quel est le nom du personnage principal qu\'incarne le joueur ?',
    answers: ["Zelda", "Ganon", "Tom", "Link"],
    correctAnswerIndex: 3,
  },
  {
    question:
      "Quel est le nom de la mission spatiale lunaire, menée par la NASA, dont l'équipage a du annuler son allunissage suite à une explosion pendant le voyage ?",
    answers: ["Apollo 9", "Mercury 1", "Apollo 13", "Gemini 2"],
    correctAnswerIndex: 2,
  },
];

/********* NE PAS MODIFIER AU DESSUS DE CETTE LIGNE *********/

/*************************/
/* Contenu du DOM chargé */
/*************************/
document.addEventListener("DOMContentLoaded", () => {
  // A FAIRE: Compléte le code pour faire fonctionner le quizz, pour plus d'informations consulte le sujet

  /**
   *  Stockage premier objet du tableau questions avec ses propriétes
   *  Et prémière section qui contiendra la première question et ses réponses
   */
  let question = document.querySelector("#question");
  let currentQuestion = questions[0].question;
  let currentAnswers = questions[0].answers;
  let currentAnswerIndex = questions[0].correctAnswerIndex;

  // la prémière question

  question.textContent = currentQuestion;

  /**
   * Boucle sur le tableau des possibles réponses et pour chaque élément réponse dans le tableau,
   * création li pour le stocker.
   */
  currentAnswers.forEach((answer) => {
    let li = document.createElement("li");
    li.className = "answer";
    li.textContent = answer;

    console.log(answer);
    document.querySelector("#answers").appendChild(li);
  });

  // Création un span caché pour mettre l'index de la réponse
  // et injecté dans le container de question

  let span = document.createElement("span");
  span.className = "scoreIndex";
  span.hidden = true;
  span.innerText = currentAnswerIndex;
  document.querySelector(".question-container").appendChild(span);

  //  * Ajout classe active au question-container pour visualisation

  document.querySelector(".question-container").classList.add("active");

  /**
   * Boucle sur le tableau questions en commençant à la position 1;
   *  Création li et ul
   * Insertion tous ces sections avant la section .resultatcontainer.
   */
  for (let index = 1; index < questions.length; index++) {
    const element = questions[index];

    // console.log(element);

    let qContainer = document.createElement("section");
    qContainer.className = "question-container";

    let p = document.createElement("p");
    p.id = "question";
    p.textContent = element.question;

    let ul = document.createElement("ul");
    ul.id = "answers";

    //Mise en places des réponses
    let answers = element.answers;

    // console.log(answers);
    answers.forEach((answer) => {
      let li = document.createElement("li");
      li.className = "answer";
      li.textContent = answer;
      ul.appendChild(li);
    });

    let span = document.createElement("span");
    span.className = "scoreIndex";
    span.hidden = true;
    span.innerText = element.correctAnswerIndex;

    // qContainer.appendChild(p);
    qContainer.appendChild(ul);
    qContainer.insertBefore(p, ul);
    qContainer.appendChild(span);

    // console.log(qContainer);
    document
      .querySelector(".main-container")
      .insertBefore(qContainer, document.querySelector(".result-container"));
  }

  /**
   * Boucle sur les 4 sections crées
   */

  let questionContainerIndex = 0;
  let score = document.getElementById("score");

  //  * Récupération de toutes les sections question-container

  let questionContainers = document.querySelectorAll(".question-container");

  //  * Fonction pour cacher les sections question-container après la prémière

  let hideQuestionContainer = () => {
    doAction();
    for (let index = 1; index < questionContainers.length; index++) {
      const QuestionContainer = questionContainers[index];
      // console.log(QuestionContainer);
      QuestionContainer.style.display = "none";
    }
  };

  // Recupération dans un tableau tous les li, réponses disponibles;
  // ajout add eventlistener sur chaque li (reponse possible)

  let answers = document.querySelectorAll("section.question-container .answer");

  function doAction() {
    answers.forEach((answer) => {
      //  Ecoute click sur chaque bonne réponse

      answer.addEventListener("click", (e) => {
        //  Fait référence  à l'évènement en cour
        doAction2(e.target);

        //  *Incrémente questionContainer pour affiche question suivante

        let nextQuestionContainer = questionContainerIndex + 1;
        showQuestionContainer(nextQuestionContainer);
      });
    });
  }

  // Fonction pour augmenter le score à chaque bonne réponse
  function doAction2(element) {
    // Recupération parent de l'élement
    let parentUl = element.parentNode;
    console.log(parentUl);
    let parentSection = parentUl.parentNode;
    // console.log(parentSection);

    const index = Array.from(parentUl.children).indexOf(element);
    console.log(element);

    //  Recupère le contenu du span
    let choix = parentSection.children[2].textContent;
    console.log(choix);

    if (index == choix) {
      score.textContent++;
    }
  }

  hideQuestionContainer();

  let showQuestionContainer = (index) => {
    // si index est égal à la longueur du tableau contenant les sections.
    // Affiche message

    if (index === questionContainers.length) {
      document.querySelector("#question").textContent =
        " Merci pour avoir répondu. C'est tout pour aujourd'hui ";
      document.querySelector("#answers").textContent = "  ";
    }

    // Affecte la valeur de questionContainerIndex à lastQuestionContainerIndex
    let lastQuestionContainerIndex = questionContainerIndex;
    // Récupère le reste de index divisé par la longueur de nos sections.
    index %= questionContainers.length;

    questionContainerIndex = index; // reste division

    // Cacher l'ancien QuestionContainer
    questionContainers[lastQuestionContainerIndex].style.display = "none ";
    questionContainers[lastQuestionContainerIndex].classList.remove("active");

    // Affichage du QuestionContainer correspondant à l'indice reçu en paramètre
    questionContainers[questionContainerIndex].style.display = "block";
    questionContainers[questionContainerIndex].classList.add("active");
  };
});
