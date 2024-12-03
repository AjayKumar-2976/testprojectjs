let cards = document.getElementsByClassName("cards")

let  hasflippedcard = false;
let firstCard,secondCard;
let matchedCards = 0;
let lockboard =false

function flipcard(card) {
    // Toggles the 'flip' class on the clicked card
   if(lockboard){
    return;
   }
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

    function checkformatch(){
        if(firstCard.dataset.name === secondCard.dataset.name){
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
      const gameOver = new Audio('./mixkit-musical-game-over-959.wav');
      gameOver.play();
      alert("Congratulations! You've matched all the cards.");
     
    }
}
  

  function resetGame() {
    matchedCards = 0;
    hasflippedcard = false;
    firstCard = null;
    secondCard = null;
    //  reset button
    document.getElementById("resetButton");

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
  
