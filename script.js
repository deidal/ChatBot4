$(document).ready(function() {
    // initial message from ChatBot
    setTimeout(function() {
        chatBotMessage();
    }, 1000);

    $("#input").keyup(function(keyPressed) {
        if (keyPressed.which == 13) {
            $("#send").click();
        }
    });

    $("#send").click(function() {  
        
        newTextMessage(); 

        //delete message from input box once you send it
        $("textarea").val('');

        //"typing"/loading bubble
        setTimeout(function() {
            loadingBubble(); 
        }, 1000);

        setTimeout(function() {
            $(".circle-holder").remove();
            chatBotMessage();
        }, 2000);
    });
});

function newMsg(classAdded, text) {
    let newTextBoxBot = $("<div/>");
    let newTextContentBot = $("<p/>");
    let timeStamp = new Date().toLocaleTimeString();
    let timeSpace = $("<span/>");
    $(newTextBoxBot).addClass(classAdded).append(newTextContentBot);
    $(newTextContentBot).append(text);
    $("#screen").append(newTextBoxBot);
    $(timeSpace).addClass("time");
    $(newTextBoxBot).append(timeSpace);
    $(timeSpace).append(addTimeFormat(timeStamp));
};

//current time and format to just show hours and minutes
function addTimeFormat(timeStamp) {
    timeStamp = timeStamp.split(":");
    var hour = timeStamp[0]; 
    var min = timeStamp[1]; 
    var ampm = timeStamp[2].split(" ");
    ampm = ampm[1];
    var totalTime = hour + ":" + min+ " " + ampm;
    return totalTime;
};

//create new bot message on screen
function newBotMsg(text){
    newMsg("bot bubble", text);
    scrollToBottom("screen");
};

//grab a random message from the specified array
function getArrayMessage(arr) {
    return(arr[Math.floor(Math.random()*arr.length)]);
}

//a couple of options of messages depending on chatbot message loop count
let c = 0; 
function chatBotMessage() {
    if(c === 0){
        newBotMsg(getArrayMessage(greetings));
    } else if (c=== 1){
        newBotMsg(getArrayMessage(secondMessage));
    } else if(c === 5){
        newBotMsg("Let's play 'Would You Rather...'!");
    } else if (c> 5 && c <12) {
        newBotMsg(getArrayMessage(wouldYouRather));
    } else if (c===12){
        newBotMsg("That was fun! Thanks for playing!");
    } else {
        newBotMsg(getArrayMessage(chatBotMessages));
    }
    c++; 
};

//create new user message on screen
function newScreenMsg(text){
    newMsg("user bubble", text);
    scrollToBottom("screen");
};

// save entered text value to make a new text bubble on the screen
function newTextMessage() {
    let textValue = document.getElementById("input").value;
    if (!textValue) {
        return;
    }
    newScreenMsg(textValue);
};

//smooth auto scroll
function scrollToBottom(id) {
    var element = document.getElementById(id); 
    $('#'+id).animate({
        scrollTop: element.scrollHeight - element.clientHeight
    }, 300);
};

//loading bubble animation
function loadingBubble() {
    var circle = '<div class = "circle-holder"><div class = "circle"></div></div>';
    let loading = $('<div/>'); 
    let screenSpace = $('#screen');
    $(loading).addClass('bubble bot circle-holder load-7').append(circle);    
    $(screenSpace).append(loading);
    scrollToBottom('screen');
};

//messages array the chatbot will return 
const greetings = [
    'Hi there, it\'s ChatBot :-)', 'Hello! I\'m ChatBot', 'Hi, I\'m ChatBot!', 
    'Hey there, how are you? I\'m ChatBot', 'Hey, ChatBot here!'
];
const secondMessage = [
    'I want to ask you some questions!', 'I\'m going to ask some questions to get to know you better!', 
    'Let me ask you a couple of questions!', 'Let me pick your brain'
];
const chatBotMessages = [
    'Do you have any pets? I have two cats!', 'Where are you from?', 
    'Do you remember your most recent dream?', 'What is your favorite type of music?', 
    'What is your favorite dessert?', 'If you could visit any place in the world, where would you go?',
    'What are you up to these days?', 'Do you have a favorite smell? I love the smell of pine trees',  
    'What is your favorite book?','What is your favorite movie?','Have you watched any good shows lately? I need suggestions', 
    'Where is the last place you traveled to?', 'What is the weather like where you are?'
];
const wouldYouRather =[
    'Would you rather fight 10 duck-sized horses, or 1 horse-sized duck?','Would you rather go to the moon, or go to mars?', 
    'Would you rather live in a desert or in the North Pole?', 'Would you rather be able to fly or be invisible?',
    'Would you rather not go back to the office and work remotely full time, or go to the office, but work less hours for the same pay?',
    'Would you rather live in a cave or in a tree house?', 'Would you rather be a bird or be a lizard?',
    'Would you rather have to sing in front of strangers or dance in front of strangers?',
    'Would you rather run a quick mile or hike for three hours?',
    'Would you rather go to sleep early or have to stay up late at a party?'   
];