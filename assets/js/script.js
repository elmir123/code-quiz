//declairing varaibles
//Question Counter
var q_counter=0;
//Timer
var time=60;
//Score
var score=0;
//Setting global interval variable
var intervalTimer;
//Questions Container
var qCont = $("#questions");
//Start Container
var startCont = $("#start");
//Initial Higscores
var high_score = localStorage.getItem('high_scores');
// variable to use to store highscores
var sData = []; 
// handle initial display of scores
if (high_score !== null) {
    // parse the scores into variable 
    var sorted_scores = JSON.parse(high_score)
    //sort socres in desceding order
    sorted_scores.sort(function(a, b){
        return b.score - a.score
    })
    //itirate over current scores
    for (x of sorted_scores){
        $("#high-scores").append('<li class="list-group-item">'+x.person+': '+x.score+'</li>');
    }
    //add current socores to sdata
    sData = JSON.parse(high_score);
}
// intial timer value
$("#timer").text(time);
//set intial score value
$("#score").text(score);
// correct_answers_objects
var correctanswers={
"question-1":"class-.",
"question-2":"b-href", 
"question-3":"root", 
"question-4":"_blank",
"question-5":"data",
"question-6":"doctype", 
"question-7":"ul", 
"question-8":"uf",
"question-9":"jsrc",
"question-10":"jquery", 
};
// handle the start of quiz. On the click of start button - start the timer and hide the first div
$("#start_button").on("click",function(){
    //hide the start container
    startCont.hide();
    // display the questions container 
    qCont.show();
    //start with question 1
    $("#question-1").show();
    //set the current question value
    $("#current-q").text(q_counter+=1);
    //set the interval
    intervalTimer = setInterval(function(){
        // check the timer and stop at 0
        if (time>0){
        //decrease the timer by one
        $("#timer").text(time-=1);
        }else{
            // if timedout handle end with the message as parameter
            handle_end(" Run Out of Time ");
        }
    },1000)
});

//handle the answer_click
$(".ans-b").on("click", function(){
    // get clicked button data for answer
    var answer_data = this.dataset.ans;
    // get question
    var question_n=this.dataset.q;
    //compare the answsers with the correct answer array, and handle score
    if (correctanswers[question_n] === answer_data){
        //set the message of success
        $(".result-span").text("Correct");
        //increase score by 10
        $("#score").text(score+=10);
    }else{
        //set the message as wrong and decrease time by 5
        $(".result-span").text("Wrong");
        time-=5;
    }
    //display the set message fadeing it out using jquery
    $("#ans-footer").show().delay(500).fadeOut();
    // get the parent of clicked button
    var q_parent = this.closest("div");
    //get next sibling a.k.a next question
    var next_sibling = $(q_parent).next();
    //hide the current question
    $(q_parent).hide();
    //update the current qustion counter
    $("#current-q").text(q_counter+=1);
    // handle the end of qustions 
    //todo in the future versions: use the length of siblings instead of hard coded number
    if (q_counter < 11){
        //if questions left display next question
        $(next_sibling).show();
    }else{
        //handle all questions done
        handle_end(" Completed All Questions ");
    }
});
//handle the end of question of time
function handle_end(reason){
    // stop the timer
    clearInterval(intervalTimer);
    //hide questions
    qCont.hide();
    //display end screen and message
    $("#end").show();
    //display the reason parameter
    $("#end_head").text(reason);
    // display the final score
    $("#score_result").text(score);
}

$("#save_score").on("click", function(){
    // get the name/initials and check that input length is higher then 1
    var get_name=$("#username").val();
    //validate the input
    if (get_name.length > 1){
        //craate object from answers
        var saved_score = {
            person: get_name.trim(),
            score: score
        };
    //push data to the array sData
    sData.push(saved_score);
    // store and json stringify the sData 
    localStorage.setItem("high_scores", JSON.stringify(sData));
    //update the page
    document.location.href=document.location.href;
    }
});
//hnadle the restart quiz option allowing user to skip adding their initials
$("#restart_button").on("click", function(){
    document.location.href=document.location.href;
});
