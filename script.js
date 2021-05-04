var anxiety1 = document.getElementById("aq1");
var anxiety2 = document.getElementById("aq2");
var anxiety3 = document.getElementById("aq3");
var depress1 = document.getElementById("dq1");
var depress2 = document.getElementById("dq2");
var depress3 = document.getElementById("dq3");
var exhaust1 = document.getElementById("eq1");
var exhaust2 = document.getElementById("eq2");
var exhaust3 = document.getElementById("eq3");
var isolate1 = document.getElementById("iq1");
var isolate2 = document.getElementById("iq2");
var isolate3 = document.getElementById("iq3");
var stress1 = document.getElementById("sq1");
var stress2 = document.getElementById("sq2");
var stress3 = document.getElementById("sq3");
var zoom1 = document.getElementById("zq1");
var zoom2 = document.getElementById("zq2");
var zoom3 = document.getElementById("zq3");

var curr = 0;
var completeCount = 0;
var tempSentence = "";
var issues = [anxiety1, anxiety2, anxiety3, depress1, depress2, depress3, exhaust1, exhaust2, exhaust3, isolate1, isolate2, isolate3, stress1, stress2, stress3, zoom1, zoom2, zoom3];
var names = ["Anxiety", "Depression", "Exhaustion", "Isolation", "Stress", "Zoom Fatigue", "none"];

var max = 0;
var issue1 = [6, 0];
var issue2 = [6, 0];
var issue3 = [6, 0];

var headText = document.getElementById("headText");
var surveyPage = document.getElementById("surveyPage");
var footer = document.getElementById("footer");
var submitSurvey = document.getElementById("submitSurvey");
var surveyIntro = document.getElementById("surveyIntro");
var resultHeader = document.getElementById("resultHeader");
var image = document.getElementById("image");
var results = document.getElementById("results");

var submitButton = document.getElementById("submitButton");

if(submitButton){
    submitButton.addEventListener("click", createPlan);
}

function createPlan(){
  //background color change
  colorChange();
  //clear and change text
  clearParagraphs();
  //get results and put them in results div
  computeResults();
  //print results to page
  displayResults();
}

function colorChange(){
  surveyPage.style.backgroundColor = '#FEDB99';
  footer.style.backgroundColor = '#FEDB99';
}

function clearParagraphs(){
  headText.innerHTML = "Personal Plan";
  surveyIntro.innerHTML = "The results below reflect how much you align with each of the issues stated: ";
  submitSurvey.innerHTML = "";
  surveyQuestions.innerHTML = "";
  resultHeader.innerHTML = "You Got: "
}

function computeResults(){
  //find most affected (top 3)
  for(var i = 0; i < issues.length; i+=3){
    count = 0;
    curr = 0;
    for(var j = 0; j < 3; j++){
      if(parseInt(issues[i+j].value) > 5){
        issues[i+j].value = 5;
      }else if(parseInt(issues[i+j].value) < 1){
        issues[i+j].value = 1;
      }else if(issues[i+j].value == ""){
        issues[i+j].value = 0;
      }
      curr += parseInt(issues[i+j].value);
    }
    completeCount += curr;
    curr = (curr / 15) * 100;
    if(curr > max){
      issue2 = JSON.parse(JSON.stringify(issue1));
      issue1 = [i/3, curr];
      max = curr;
    }else{
      if(curr > issue2[1]){
        issue3 = JSON.parse(JSON.stringify(issue2));;
        issue2 = [i/3, curr];
      }else if(curr > issue3[1]){
        issue3 = [i/3, curr];
      }
    }
  }
}

function displayResults(){
  //add image
  var img = document.createElement("img");
  img.src = names[issue1[0]] + ".jpg";
  if(completeCount == 90){
    img.src = "ohNo.jpg";
  }
  img.style.height = '40vw';
  img.style.width = '60vw';
  img.style.maxHeight = '500px';
  img.style.maxWidth = '800px';
  image.appendChild(img);
  //add results and percentages
  if(!(names[issue1[0]]=="none")){
    document.getElementById("issue1").innerHTML = names[issue1[0]] + ": " + issue1[1].toFixed() + "%";
  }else{
    document.getElementById("issue1").innerHTML = "Nothing to worry about!";
  }
  if(!(names[issue2[0]]=="none")){
    document.getElementById("issue2").innerHTML = names[issue2[0]] + ": " + issue2[1].toFixed() + "%";
  }
  if(!(names[issue3[0]]=="none")){
    document.getElementById("issue3").innerHTML = names[issue3[0]] + ": " + issue3[1].toFixed() + "%";
  }
  //main body text
  var sentences = ["","",""];
  var isAnIssue = false;
  var placeHolder = 0;
  var issue1plan = document.createElement("p");
  var issue2plan = document.createElement("p");
  var issue3plan = document.createElement("p");
  //issue 1 paragraph
  if(names[issue1[0]] == "Anxiety" || names[issue2[0]] == "Anxiety" || names[issue3[0]] == "Anxiety"){
    //create sentences for paragraph plan
    if(parseInt(anxiety1.value) >= 3){
      tempSentence += "A good way to distract yourself from worry and nervousness is attempting the 3-3-3 rule. When you feel these things try first naming 3 things you see, then 3 sounds you hear, and finally move 3 parts of your body. This may be just what you ned to put your mind at ease. ";
      isAnIssue = true;
    }
    if(parseInt(anxiety2.value) >= 3){
      tempSentence += "Deep breathing and meditation can be used to calm down anxiety fidgeting. When you start to tug, pull, or shake, do your best to step away from the situation, close your eyes, and breathe deeply. The more you focus on your breathing, the more calm you will become. ";
      isAnIssue = true;
    }
    if(parseInt(anxiety3.value) >= 3){
      tempSentence += "When projects and issues get in the way and start to cloud your mind, it can feel overwhelming, cause you distress and unrest, and overall affect your entire day. Identifying the issue could help immensly. Take out a piece of paper and write down what is bothering you, why it's bothering you, and ways to either fix or avoid it. If you can't find these ways on your own, ask someone you trust to help you. A fresh set of eyes and ears can't hurt! ";
      isAnIssue = true;
    }
    if(!isAnIssue){
      tempSentence += "Even if some aspects of anxiety aren't your main problems, you may still be bothered by it. A more general solution to anxiety is taking time to relax. Listening to music and meditation could do wonders for anxiety if you give them a chance. Try it out next time you're experiencing symptoms. ";
      isAnIssue = false;
    }
    //which issue is it
    if(names[issue1[0]] == "Anxiety"){placeHolder = 0;}
    else if(names[issue2[0]] == "Anxiety"){placeHolder = 1;}
    else{placeHolder = 2};
    //create and add sentence
    sentences[placeHolder] = tempSentence;
    tempSentence = "";
    isAnIssue = false;
  }
  if(names[issue1[0]] == "Depression" || names[issue2[0]] == "Depression" || names[issue3[0]] == "Depression"){
    //create sentences for paragraph plan
    if(parseInt(depress1.value) >= 3){
      tempSentence += "It's difficult to stop feeling one way or another, especially when those feelings are so destructive. Do your best to surround yourself with friends, family, and pastimes that bring you happiness. ";
      isAnIssue = true;
    }
    if(parseInt(depress2.value) >= 3){
      tempSentence += "When you're suffering from depression, it can be really hard to keep yourself on track. A good way to try and regulate behaviours is to create a strict schedule and work from it. Keep track of meal time, time for sleep, extra napping or snacking hours if you're having issues, and some time to participate in things that make you happy. ";
      isAnIssue = true;
    }
    if(parseInt(depress3.value) >= 3){
      tempSentence += "Losing interest in things that used to bring pleasure is extremely painful to deal with. The best thing you can do is try to find someone to talk to and go over what's causing you distress. Try to get back into those old pastimes with a friend and see if that helps bring back the joy. Keep working at it, it will get better over time. ";
      isAnIssue = true;
    }
    if(!isAnIssue){
      tempSentence += "A few more open coping mechanisms that you could use are participating in art and music therapy. It doesn't have to be with a professional, just try to take some time out of your day to create something or listen to music and relax on your lonesome or with a friend to relieve any negative emotions that may have been clouding your mind. ";
      isAnIssue = false;
    }
    //which issue is it
    if(names[issue1[0]] == "Depression"){placeHolder = 0;}
    else if(names[issue2[0]] == "Depression"){placeHolder = 1;}
    else{placeHolder = 2};
    //create and add sentence
    sentences[placeHolder] = tempSentence;
    tempSentence = "";
    isAnIssue = false;
  }
  if(names[issue1[0]] == "Exhaustion" || names[issue2[0]] == "Exhaustion" || names[issue3[0]] == "Exhaustion"){
    //create sentences for paragraph plan
    if(parseInt(exhaust1.value) >= 3){
      tempSentence += "In order to fix exhaustion in the physical sense, you have to get yourself on the right schedule. First, set a clear sleep schedule, factor in at least one nap time during the day, and have a slot of time for meditation to recharge. It may not happen right away but after a while, your body will readjust and you won't feel as tired anymore. ";
      isAnIssue = true;
    }
    if(parseInt(exhaust2.value) >= 3){
      tempSentence += "Exhaustion can be brought about by mental overload on top of physical strain. When heafty assignments and tasks come up, it's easy to lose track of time and disrupt your sleeping schedule. Try your best to space out your work and find time to unwind as to keep your body clock in check. ";
      isAnIssue = true;
    }
    if(parseInt(exhaust3.value) >= 3){
      tempSentence += "When you feel overburdened in life, it can become difficult to focus on the tasks at hand. In order to relieve this, you need to set aside time to relax before and after your task. Have a reward picked out for completing the task as to encourage yourself to work on it. ";
      isAnIssue = true;
    }
    if(!isAnIssue){
      tempSentence += "Being exhausted may not be affecting you heavily right now but it has the ability to build up quickly if not kept in check. Be sure to make time in your day to listen to music, meditate, or unwind and do your best to space out that workload!";
      isAnIssue = false;
    }
    //which issue is it
    if(names[issue1[0]] == "Exhaustion"){placeHolder = 0;}
    else if(names[issue2[0]] == "Exhaustion"){placeHolder = 1;}
    else{placeHolder = 2};
    //create and add sentence
    sentences[placeHolder] = tempSentence;
    tempSentence = "";
  }
  if(names[issue1[0]] == "Isolation" || names[issue2[0]] == "Isolation" || names[issue3[0]] == "Isolation"){
    //create sentences for paragraph plan
    if(parseInt(isolate1.value) >= 3){
      tempSentence += "Being without contact of others and not being able to leave your home often is very detrimental to mental health. Alleviating that sense of captivity is possible, although not a complete solution. Try opening a window or spending sometime outside with some fresh air, even if it means being away from people. ";
      isAnIssue = true;
    }
    if(parseInt(isolate2.value) >= 3){
      tempSentence += "Social media can easily make someone feel more alone than ever, despite being connected. Humans are social creatures and just texting or posting alone isn't enough to quench that urge. A good alternative is to video chat or talk to someone voice to voice rather than texting. If you're feeling more left out because of other's posting, it may be hard, but power down social media for a while and just focus on you. ";
      isAnIssue = true;
    }
    if(parseInt(isolate3.value) >= 3){
      tempSentence += "A big part of connecting with someone is to feel their warmth, both physically and emotionally. If you're feeling alone from not being in-person, try to call someone on the phone while wearing a heated blanket. It may seem weird but it can simulate that healing warmth that you've been missing. ";
      isAnIssue = true;
    }
    if(!isAnIssue){
      tempSentence += "Covid-19 and social media tends to bring about at least some feelings of isolation and even if it doesn't affect you at the moment, it could in the future. Remember to keep in contact with those around you and be around your friends and family as often as you are able to. Social health is mental health! ";
      isAnIssue = false;
    }
    //which issue is it
    if(names[issue1[0]] == "Isolation"){placeHolder = 0;}
    else if(names[issue2[0]] == "Isolation"){placeHolder = 1;}
    else{placeHolder = 2};
    //create and add sentence
    sentences[placeHolder] = tempSentence;
    tempSentence = "";
    isAnIssue = false;
  }
  if(names[issue1[0]] == "Stress" || names[issue2[0]] == "Stress" || names[issue3[0]] == "Stress"){
    //create sentences for paragraph plan
    if(parseInt(stress1.value) >= 3){
      tempSentence += "The best way to remove both physical and emotional stress and strain is to either meditate or practice yoga. It can put both the mind and body at ease, allowing you to better assess the causes of the initial tension and fix them. ";
      isAnIssue = true;
    }
    if(parseInt(stress2.value) >= 3){
      tempSentence += "Scheduling correctly goes hand in hand with large workloads and demanding circumstances. Spread out your work time evenly and make sure to factor in time for breaks, food, and rest. Try your best to stick to your schedule and if the workload is too unbearable, find someone willing to help you complete the tasks. ";
      isAnIssue = true;
    }
    if(parseInt(stress3.value) >= 3){
      tempSentence += "When there are too many tasks at once and you're feeling overwhelmed, make a list. Write out all of the parts of the task, even something as small as 'begin task' and start crossing them off as you complete them. Give yourself a reward after you complete certain tasks to keep motivation up!";
      isAnIssue = true;
    }
    if(!isAnIssue){
      tempSentence += "Stress is an issue that affects so many people from all different walks of life. If you feel yourself start to become stressed out, take a step back, identify the most pressing matters, and complete them before worrying about any others. Don't forget to set aside time for yourself as well! ";
      isAnIssue = false;
    }
    //which issue is it
    if(names[issue1[0]] == "Stress"){placeHolder = 0;}
    else if(names[issue2[0]] == "Stress"){placeHolder = 1;}
    else{placeHolder = 2};
    //create and add sentence
    sentences[placeHolder] = tempSentence;
    tempSentence = "";
    isAnIssue = false;
  }
  if(names[issue1[0]] == "Zoom Fatigue" || names[issue2[0]] == "Zoom Fatigue" || names[issue3[0]] == "Zoom Fatigue"){
    //create sentences for paragraph plan
    if(parseInt(zoom1.value) >= 3){
      tempSentence += "A lot of physical reprecussions come along with zoom fatigue which over time tend to become more constant, such as headaches, eye twitching, eye strain, and exhaustion. These can be alleviated by turning down the brightness of your devices, scheduling in breaks, and minimizing the amount of online meetings you have in a day. ";
      isAnIssue = true;
    }
    if(parseInt(zoom2.value) >= 3){
      tempSentence += "Multitasking may seem like the only option to get all of your work done in a timely manner, however it can harm you physically and emotionally. Try your best to schedule work time around your meetings rather than during them and limit the amount of outside tasks such as checking your phone while in meetings. ";
      isAnIssue = true;
    }
    if(parseInt(zoom3.value) >= 3){
      tempSentence += "If you're beginning to feel exhausted quickly when looking at screens, it means you've been overdoing your screen time. The best thing to do is power down and unwind. If powering down isn't possible at the moment, schedule time to take a break and close your eyes while you're on your device. ";
      isAnIssue = true;
    }
    if(!isAnIssue){
      tempSentence += "";
      isAnIssue = false;
    }
    //which issue is it
    if(names[issue1[0]] == "Zoom Fatigue"){placeHolder = 0;}
    else if(names[issue2[0]] == "Zoom Fatigue"){placeHolder = 1;}
    else{placeHolder = 2};
    //create and add sentence
    sentences[placeHolder] = tempSentence;
    tempSentence = "";
    isAnIssue = false;
  }
  if(names[issue1[0]] == "none"){
    sentences[0] = "Keep enjoying life to it's fullest! If you still wanted to view suggestions on how to relieve common mental health issues, please view the <a href='info.html'>information page</a>. Have a great day! "
  }
  if(names[issue2[0]] == "none"){
    sentences[1] = "";
  }
  if(names[issue3[0]] == "none"){
    sentences[2] == "";
  }
  if(completeCount == 90){
    sentences[0] = "You are not okay! It's time for you to grab a cup of tea, lay back, and Text HOME to 741741 to contact a Crisis Counselor. Please. You need it. ";
    sentences[1] = "";
    sentences[2] = "";
  }
  //form sentences
  issue1plan.innerHTML = sentences[0];
  issue1plan.style.textIndent = "5vw";
  issue2plan.innerHTML = sentences[1];
  issue2plan.style.textIndent = "5vw";
  issue3plan.innerHTML = sentences[2];
  issue3plan.style.textIndent = "5vw";
  //display plan
  results.appendChild(issue1plan);
  results.appendChild(issue2plan);
  results.appendChild(issue3plan);
  // document.getElementById("results").innerHTML = "print all the shit here";
}
