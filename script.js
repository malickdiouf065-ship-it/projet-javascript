const exercices = [
  {
    id: 1,
    titre: "Addition de deux nombres",
    niveau: "facile",
    question: "Additionner a et b.",
    solution: "function addition(a, b) {\n  return a + b;\n}",
    test: () => addition(3, 2) === 5 &&
                addition(-3, -6) === -9
  },
  {
    id: 2,
    titre: "Convertir des minutes",
    niveau: "facile",
    question: "Convertir les minutes en secondes.",
    solution: "function convert(minutes) {\n  return minutes * 60;\n}",
    test: () => convert(5) === 300 &&
                convert(3) === 180
  },
  {
    id: 3,
    titre: "Nombre suivant",
    niveau: "facile",
    question: "Retourner le nombre augmenté de 1.",
    solution: "function nextNumber(n) {\n  return n + 1;\n}",
    test: () => nextNumber(9) === 10 &&
                nextNumber(-3) === -2
  },
  {
    id: 4,
    titre: "Nombre pair",
    niveau: "moyen",
    question: "Vérifier si un nombre est pair.",
    solution: "function estPair(n) {\n  return n % 2 === 0;\n}",
    test: () => estPair(4) === true &&
                estPair(7) === false
  },
  {
    id: 5,
    titre: "Plus grand nombre",
    niveau: "moyen",
    question: "Retourner le plus grand de deux nombres.",
    solution: "function maximum(a, b) {\n  return Math.max(a, b);\n}",
    test: () => maximum(8, 3) === 8 &&
                maximum(-2, 5) === 5
  },
  {
    id: 6,
    titre: "Somme d'un tableau",
    niveau: "moyen",
    question: "Calculer la somme des nombres d'un tableau.",
    solution: "function somme(tab) {\n  return tab.reduce((total, n) => total + n, 0);\n}",
    test: () => somme([1, 2, 3]) === 6 &&
                somme([]) === 0
  },
  {
    id: 7,
    titre: "Palindrome",
    niveau: "difficile",
    question: "Vérifier si un mot se lit dans les deux sens.",
    solution: "function palindrome(mot) {\n  const inverse = mot.split('').reverse().join('');\n  return mot === inverse;\n}",
    test: () => palindrome("radar") === true &&
                palindrome("bonjour") === false
  },
  {
    id: 8,
    titre: "Supprimer les doublons",
    niveau: "difficile",
    question: "Garder une seule occurrence de chaque valeur.",
    solution: "function sansDoublons(tab) {\n  return [...new Set(tab)];\n}",
    test: () => JSON.stringify(sansDoublons([1, 2, 2, 3])) ===
                JSON.stringify([1, 2, 3])
  },
  {
    id: 9,
    titre: "Compter les voyelles",
    niveau: "difficile",
    question: "Compter les voyelles d'un mot.",
    solution: "function compterVoyelles(mot) {\n  return (mot.match(/[aeiouy]/gi) || []).length;\n}",
    test: () => compterVoyelles("bonjour") === 3 &&
                compterVoyelles("xyz") === 0
  }
];

// Fonctions utilisées par les exercices
function addition(a, b) { return a + b; }
function convert(minutes) { return minutes * 60; }
function nextNumber(n) { return n + 1; }
function estPair(n) { return n % 2 === 0; }
function maximum(a, b) { return Math.max(a, b); }
function somme(tab) {
  return tab.reduce((total, n) => total + n, 0);
}
function palindrome(mot) {
  return mot === mot.split("").reverse().join("");
}
function sansDoublons(tab) {
  return [...new Set(tab)];
}
function compterVoyelles(mot) {
  return (mot.match(/[aeiouy]/gi) || []).length;
}

const exercicesReussis = new Set();
const conteneur = document.getElementById("exercises");

function afficherExercices(niveau = "tous") {
  conteneur.innerHTML = "";

  exercices
    .filter(ex => niveau === "tous" || ex.niveau === niveau)
    .forEach(ex => {
      const carte = document.createElement("article");
      carte.className = "exercise";

      const titre = document.createElement("h3");
      titre.textContent = ex.titre;

      const badge = document.createElement("p");
      badge.className = "level";
      badge.textContent = "Niveau : " + ex.niveau;

      const question = document.createElement("p");
      question.textContent = ex.question;

      const bouton = document.createElement("button");
      bouton.textContent = "Voir la solution";

      const resultat = document.createElement("p");
      resultat.className = "result";

      bouton.addEventListener("click", () => {
        const solution = document.createElement("pre");
        solution.textContent = ex.solution;
        solution.style.whiteSpace = "pre-wrap";
        solution.style.overflowWrap = "anywhere";

        const ancien = carte.querySelector("pre");
        if (ancien) ancien.remove();

        carte.appendChild(solution);

        try {
          if (ex.test()) {
            exercicesReussis.add(ex.id);
            resultat.textContent = "Tests réussis !";
            resultat.style.color = "green";
          } else {
            resultat.textContent = "Un test a échoué.";
            resultat.style.color = "red";
          }
        } catch (erreur) {
          resultat.textContent = "Erreur : " + erreur.message;
          resultat.style.color = "red";
        }

        actualiserProgression();
      });

      carte.append(titre, badge, question, bouton, resultat);
      conteneur.appendChild(carte);
    });
}

function actualiserProgression() {
  const total = exercicesReussis.size;
  document.getElementById("score").textContent =
    total + " exercice(s) réussi(s) sur " + exercices.length;

  document.getElementById("progress-fill").style.width =
    (total / exercices.length * 100) + "%";
}

document.querySelectorAll("[data-level]").forEach(bouton => {
  bouton.addEventListener("click", () => {
    afficherExercices(bouton.dataset.level);
  });
});

document.getElementById("reset").addEventListener("click", () => {
  exercicesReussis.clear();
  actualiserProgression();
  afficherExercices();
});

afficherExercices();