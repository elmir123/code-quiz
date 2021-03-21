//declairing varaibles
var q_counter=0;
var time=60;
var time_el = 0;
var score=0;
var intervalTimer;
var qCont = $("#questions");
var startCont = $("#start");
var high_score = localStorage.getItem('high_scores');

var sData = []; 

if (high_score !== null) {
    var sorted_scores = JSON.parse(high_score)
    var sorted_scores.sort(function(a, b){
    for (x of sorted_scores){
        $("#high-scores").append('<li class="list-group-item">'+x.person+': '+x.score+'</li>');
    }
    sData = JSON.parse(high_score);
}

// intial timer value
$("#timer").text(time);
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
    startCont.hide();
    qCont.show();
    $("#question-1").show();
    $("#current-q").text(q_counter+=1)
    intervalTimer = setInterval(function(){
        if (time>0){
        $("#timer").text(time-=1)
        
        }else{
            handle_end(" Run Out of Time ");
        }
    },1000)
});

//handle the answer_click
$(".ans-b").on("click", function(){
    // get clicked button data for answer
    var answer_data = this.dataset.ans;
    var question_n=this.dataset.q;
    
    if (correctanswers[question_n] === answer_data){
        $(".result-span").text("Correct");
        $("#score").text(score+=10);
        
    }else{
        $(".result-span").text("Wrong");
        time-=5
    }
    $("#ans-footer").show().delay(500).fadeOut();
    // get the parent of clicked button
    var q_parent = this.closest("div");
    var next_sibling = $(q_parent).next()
    $(q_parent).hide();
    $("#current-q").text(q_counter+=1);
    if (q_counter < 11){
        $(next_sibling).show();
    }else{
        handle_end(" Completed All Questions ");
    }
});

function handle_end(reason){
    clearInterval(intervalTimer);
    qCont.hide();
    $("#end").show();
    $("#end_head").text(reason);
    $("#score_result").text(score);
}

$("#save_score").on("click", function(){
    var get_name=$("#username").val();
    if (get_name.length > 1){
    var saved_score = {
        person: get_name.trim(),
        score: score
      };

    sData.push(saved_score)

    // data = high_score + JSON.stringify(saved_score)
    localStorage.setItem("high_scores", JSON.stringify(sData));
    document.location.href=document.location.href
    }
});
