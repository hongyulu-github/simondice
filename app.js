const buttonColors =["red","blue","green","yellow"]
let gamePattern = []
let userClickedPattern =[]
const wrongSound = new Audio("./sounds/wrong.mp3")

let level = 0
let gameStared = false



$(document).keypress(function(){
    if(!gameStared) {
        gameStared = true
        $("h1").text("Nivel " + level)
        nextSequence()
    }

   
})


function nextSequence(){
    level ++
    $("h1").text("Nivel " + level)


    let randomNumber = Math.floor(Math.random() * 4)
    let randomColor = buttonColors[randomNumber]
    gamePattern.push(randomColor) 
    $("#"+randomColor).fadeOut().fadeIn()
    playSound(randomColor)
    console.log("game:"+gamePattern)

}



$(".btn").click(function clickHandler(){
    const userChosenColour =$(this)[0].id;
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    console.log("user:"+userClickedPattern)
    animatePress(userChosenColour)
    

    
    checkAnswer(userClickedPattern.length-1)
     

})



function playSound(name){
    let audio = new Audio("./sounds/"+name+".mp3")
    audio.play()
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed")
    
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}




function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success")

        if (gamePattern.length === userClickedPattern.length){
        setTimeout(nextSequence(),1000)
        userClickedPattern = []


        }

    } else{
        console.log("incorrecto")

        gameOver()

    }

  
}


function gameOver(){
    $("h1").text("Presiona para intentarlo de nuevo!")
    wrongSound.play()
    $("body").addClass("game-over")
    setTimeout(function(){
        $("body").removeClass("game-over")
    },200)
    gameStared = false
    resetGame()


    $(document).keypress(function(){
        if(!gameStared) {
            
            gameStared = true
            $("h1").text("Level " + level)
            nextSequence()
        }
    
       
    })

}
function resetGame(){
    level = 0
    userClickedPattern =[]
    gamePattern = []
  
}

