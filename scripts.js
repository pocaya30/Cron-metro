const timeEl = document.getElementById("timer");
const markList = document.getElementById("marks-list");
let intervalId = 0;
let timer = 0;
let marks = [];

const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const hundreds = time % 100;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${hundreds.toString().padStart(2, "0")}`;
}

const addMarkToList = (markIndex, markTime) => {
    markList.innerHTML += `<p>Marca ${markIndex}: ${formatTime(markTime)}</p>`;
}

const updateMarksList = () => {
    markList.innerHTML = ""; // Limpa a lista de marcações

    // Adiciona todas as marcações à lista novamente
    marks.forEach((markTime, index) => {
        addMarkToList(index + 1, markTime);
    });
}

const markTime = () => {
    const button = document.getElementById("power");
    const action = button.getAttribute("action");

    // Verifica se o cronômetro já foi iniciado
    if (action !== "pause") {
        alert("Você precisa iniciar o cronômetro antes de marcar o tempo.");
        return;
    }

    // Adiciona a marcação atual à lista
    marks.push(timer);

    // Se já foram feitas 5 marcações, reinicia a contagem de índice para 1
    if (marks.length >= 5) {
        marks.shift(); // Remove a primeira marcação para manter apenas 5
        updateMarksList(); // Atualiza a lista de marcações
    } else {
        addMarkToList(marks.length, timer);
    }
}

const ToggleTime = () => {
    const button = document.getElementById("power")
    const action = button.getAttribute("action")

    clearInterval(intervalId)

    if (action == "start" || action == "continue") {
        intervalId = setInterval(() => {
            timer += 1;
            setTime(timer)
        }, 10);

        button.setAttribute("action", "pause");
        button.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else if (action == "pause") {
        button.setAttribute("action", "continue");
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

const resetTimer = () => {
    clearInterval(intervalId);
    timer = 0;
    marks = [];
    setTime(timer);
    updateMarksList(); // Atualiza a lista de marcações
    const button = document.getElementById("power");
    button.setAttribute("action", "start");
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
}

const setTime = (time) => {
    timeEl.innerText = formatTime(time);
}

document.getElementById("power").addEventListener("click", ToggleTime);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("mark").addEventListener("click", markTime);
