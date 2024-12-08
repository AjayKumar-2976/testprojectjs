let cards = document.querySelectorAll(".cards");

let  hasflippedcard = false;
let firstCard,secondCard;
let matchedCards = 0;
let lockboard =false

//FOR TIMER
let timer = document.getElementById("timer")
let restart = document.getElementById("restartButton")
// let score = document.getElementById("score")

let timeending =new Audio("./timer-digital-countdown-bop-audio-1-00-04.mp3")
   

let interval; // Declare at a higher scope to reuse

function startTimer() {
    clearInterval(interval); // Clear any existing timer
    i = 60; // Reset time
    interval = setInterval(() => {
        timer.textContent = `00:${i}s`;
        if (i < 3 && i > 0) {
            timeending.play();
        }
        if (i === 0) {
            clearInterval(interval);
            alert("Time is UP");
            resetGame();
        }
        i--;
    }, 1000);
}
startTimer()



function flipcard(card) {
    // Toggles the 'flip' class on the clicked card
   if(lockboard){
    return;
   }
   //stop clicking same card twice
   if(card === firstCard) return;

    card.classList.toggle("flip");
    const music = new Audio('./flipsound.mp3')
    music.play();

    if(!hasflippedcard){
        //FIRST CLICK
        hasflippedcard = true
        firstCard = card;
        // console.log(hasflippedcard, firstCard);
        
    }else{
        // SECOND CLICK
        hasflippedcard = false
        secondCard = card;
        // console.log(hasflippedcard, secondCard);
        
        console.log(firstCard.dataset.name);
        console.log(secondCard.dataset.name);
        checkformatch()
        
    }
}


    let score=0;

    function checkformatch(){
     
        if(firstCard.dataset.name === secondCard.dataset.name){

        setTimeout(() =>{
          score++;
          document.getElementById("score").textContent = "Score"+ ":" +score*5
        },1200)
         
            //its match
            ifCardsMatch();
        }
        // console.log('executed successfully');
        else{
           unflipCards();
}
 }

function ifCardsMatch(){
    setTimeout(() =>{
        const correctmatch = new Audio('./game-bonus-144751.mp3')
        correctmatch.play();

        firstCard.removeEventListener('click',handleCardClick)
        secondCard.removeEventListener('click',handleCardClick)
        matchedCards++;
        checkgameover()
    },1000)
}


function unflipCards(){
     //no match flip them
     lockboard=true
     setTimeout(()=>{
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
     lockboard=false
    },1000) // Delay to show the flip before turning back
    }


  function handleCardClick() {
    flipcard(this); // 'this' refers to the card being clicked
}



function changeCardOrder() {
    // Shuffle the cards
    for (let i = 0; i < cards.length; i++) {
      const randomOrder = Math.floor(Math.random() * cards.length); // Get a random order number
      cards[i].style.order = randomOrder;  // Set the random order to each card
    }
  }


  function checkgameover(){
    if(matchedCards === cards.length/2){     
      setTimeout(()=>{
        const gameOver = new Audio('./mixkit-musical-game-over-959.wav');
        gameOver.play();
        alert("Congratulations! You've matched all the cards.");

        clearInterval(interval); // Stop the timer
        timer.textContent = "01:00s"; // Reset timer display
        document.getElementById("score").textContent = "Score: 0"; // Reset score display
        
        // Restart the game
        resetGame(); // Reset cards and shuffle them
        startTimer(); // Start a fresh timer

      
      },1000)
    }
   
}

  
function resetGame() {
  // Reset game state variables
  matchedCards = 0;
  hasflippedcard = false;
  firstCard = null;
  secondCard = null;

  // Reset score
  score = 0; // Reset the score variable
  document.getElementById("score").textContent = "Score: 0"; // Update score display

  // Unflip all cards and re-enable click events
  for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove('flip');
      cards[i].addEventListener('click', handleCardClick); // Re-enable clicks
  }

  // Shuffle the cards
  changeCardOrder();

  // Reset the timer
 
}



for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click",handleCardClick)
    //   console.log(`Card ${i + 1} clicked`);
  }
  changeCardOrder()
  

  document.getElementById("resetButton").addEventListener("click", resetGame);

  function startgame(){
    setTimeout(() =>{
        location.assign("./index.html")
    },2800)
    const countdown =new Audio("./game-start-countdown-SBA-300420112-preview.mp3")
    countdown.play()
    
  }
  
////////////////////
  
  function RestartButton() {
    // Reset all necessary game states and UI elements
   
    // Reset timer
    clearInterval(interval); // Stop the timer interval
    i = 60; // Reset timer to initial value
    timer.textContent = "01:00s"; // Update the displayed timer

    // Reset score display
    document.getElementById("score").textContent = "Score: 0";

    // Flip back all cards and re-enable clicks
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('flip');
        cards[i].addEventListener('click', handleCardClick);
    }

    // Shuffle the cards
    changeCardOrder();

    startTimer()
    alert("Game restarted! Good luck!");
  }

// Add event listener to the restart button
restart.addEventListener("click", RestartButton);


















