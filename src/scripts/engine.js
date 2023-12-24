const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    tesouro: document.querySelector(".tesouro"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 45,
  },
  actions: {
    timerId: null,
    countDownTimerId: null,
    backgroundMusic: null
  },
};



const startGame = document.querySelector(".startButton")

startGame.addEventListener("click", function () {

  playSoundtrack("musicaFundo");


  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
  state.actions.countDownTimerId = setInterval(countDown, 1000);


  document.querySelector(".startButton").style.display = "none";
  document.querySelector(".container-button").style.display = "none";
});

function playSoundtrack(audioName) {
  stopSoundtrack(); // Para garantir que a música anterior pare antes de tocar uma nova

  state.actions.backgroundMusic = new Audio(`./src/audios/${audioName}.mp3`);
  state.actions.backgroundMusic.volume = 0.4;
  state.actions.backgroundMusic.loop = true;
  state.actions.backgroundMusic.play();
}

function stopSoundtrack() {
  if (state.actions.backgroundMusic) {
    state.actions.backgroundMusic.pause();
    state.actions.backgroundMusic.currentTime = 0; // Reinicia a música
  }
}

function playGameOverMusic() {
  stopSoundtrack();
  let audio = new Audio("./src/audios/luffyLaugh.mp3");
  audio.volume = 0.3;
  audio.play();
}

function customizeGameOverAlert() {
  Swal.fire({
    title: 'Fim de Jogo!',
    text: `Seu resultado foi: ${state.values.result}`,
    imageUrl: 'https://i.pinimg.com/564x/23/e4/e7/23e4e7aa8e7a9e2dbc75fece9d77fc99.jpg',
    imageWidth: 200,
    imageHeight: 150,
    confirmButtonText: 'OK',
    onOpen: () => {
      // Adiciona uma classe personalizada para arredondar a imagem
      const imageContainer = Swal.getPopup().querySelector('.swal2-image');
      if (imageContainer) {
        imageContainer.classList.add('rounded-image');
      }
    },
  });
}
function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    playGameOverMusic();
    customizeGameOverAlert();
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("tesouro");
  });

  let randomNumber = Math.floor(Math.random() * 15);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("tesouro");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
}

initialize();
