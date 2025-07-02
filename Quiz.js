// クイズデータ（1問のみ）
const quizData = {
    question: "日本の首都はどこ？",
    choices: ["大阪", "京都", "東京", "名古屋"],
    correct: 2 // 東京
};

let selectedIndex = null;
let answered = false;

// 要素取得
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit-button");
const resultElement = document.getElementById("result");

// クイズ読み込み
function loadQuiz() {
    questionElement.textContent = quizData.question;
    resultElement.textContent = "";
    submitButton.disabled = true;
    answered = false;

    choicesElement.innerHTML = "";
    quizData.choices.forEach((text, index) => {
        const div = document.createElement("div");
        div.classList.add("choice");
        div.textContent = text;
        div.addEventListener("click", () => selectChoice(index));
        choicesElement.appendChild(div);
    });
}

// 選択肢を選んだときの処理
function selectChoice(index) {
    if (answered) return;

    selectedIndex = index;
    const allChoices = document.querySelectorAll(".choice");
    allChoices.forEach((el, i) => {
        el.classList.toggle("selected", i === index);
    });

    submitButton.disabled = false;
}

// 回答ボタンを押したとき
submitButton.addEventListener("click", () => {
    if (answered || selectedIndex === null) return;

    answered = true;
    const allChoices = document.querySelectorAll(".choice");

    allChoices.forEach((el, i) => {
        el.style.pointerEvents = "none"; // 選択無効
        if (i === quizData.correct) {
            el.style.backgroundColor = "#a5d6a7"; // 正解は緑
        } else if (i === selectedIndex) {
            el.style.backgroundColor = "#ef9a9a"; // 不正解は赤
        }
    });

    const isCorrect = selectedIndex === quizData.correct;
    resultElement.textContent = isCorrect ? "正解です！🎉" : "不正解です…😢";
    submitButton.disabled = true;
});

// 実行
loadQuiz();
