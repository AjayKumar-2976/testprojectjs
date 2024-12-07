let cards = document.getElementsByClassName("cards")

let  hasflippedcard = false;
let firstCard,secondCard;
let matchedCards = 0;
let lockboard =false

//FOR TIMER
let timer = document.getElementById("timer")
let restart = document.getElementById("restartButton")
// let score = document.getElementById("score")

let timeending =new Audio("./timer-digital-countdown-bop-audio-1-00-04.mp3")
   

let i = 60; // Start from 60
const interval = setInterval(() => {
  timer.textContent = "00" + ":"+ +i+"s"
  i--; // Decrement the value
  setTimeout(() =>{
    if(i<3 && i>0){
      timeending.play()
    }
  },0)
 
  if (i < 0) { // Stop when it reaches below 0
    clearInterval(interval);
    alert("Time is UP")
    resetGame()
   
   
  }
},1000); // Execute every 1000ms (1 second)




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

        firstCard.removeEventListener('click',flipcard)
        secondCard.removeEventListener('click',flipcard)
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
        resetGame()

      },1000)
    }
}
  

  function resetGame() {
    matchedCards = 0;
    hasflippedcard = false;
    firstCard = null;
    secondCard = null;
    
    //  reset button
    document.getElementById("resetButton")

    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('flip');
        cards[i].addEventListener('click', handleCardClick); // Re-enable card clicks
        
      }
     
    changeCardOrder(); // Shuffle cards
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
  
  function handleRestartButton() {
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

    // Restart timer
    const newInterval = setInterval(() => {
      timer.textContent = `00:${i}s`;
      i--;

        if (i < 3 && i > 0) {
            timeending.play();
        }

        if (i < 0) {
            clearInterval(newInterval);
            alert("Time is UP");
            resetGame();
        }
    }, 1000);

    alert("Game restarted! Good luck!");
}

// Add event listener to the restart button
restart.addEventListener("click", handleRestartButton);


















