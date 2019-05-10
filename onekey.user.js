// ==UserScript==
// @name         5 Star One Key
// @version      0.38
// @description  Give five star with single click or one button
// @updateURL    https://github.com/tolves/5StarOneKey/raw/master/onekey.user.js
// @downloadURL  https://github.com/tolves/5StarOneKey/raw/master/onekey.user.js
// @author       jqqqqqqqqqq && HiMiller && tolves
// @match        https://opr.ingress.com/recon
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        unsafeWindow
// ==/UserScript==

var auto_select = true;
var big_stars = false;

var buttons = [
    {button:"2分低文化", total:2, name:5, history:1, unique:3, location:5, safety:5},
    {button:"2分低独特", total:2, name:5, history:3, unique:1, location:5, safety:5},
    {button:"3分", total:3, name:5, history:3, unique:3, location:5, safety:5},
    {button:"4分", total:4, name:5, history:4, unique:4, location:5, safety:5},
];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////DO NOT EDIT THIS LINE BELOW!
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const w = typeof unsafeWindow == "undefined" ? window : unsafeWindow;

var first = true;
function enable_auto_select(){
    $(".button-star").each(function(){  // use mouse hover to select stars
        if(first) {
            console.warn("first ignored");
            var answerCtrl = angular.element(document.getElementById('AnswersController')).scope().answerCtrl;
            $(this).click(function() {answerCtrl.confirmLowQuality();setTimeout(function(){ window.location.assign("/recon");}, 1000);});
            first = false;
        }
        else {
            $(this).hover(function(){$(this).click();});
        }
    });
}

var button_list = {
    'total': [],
    'name': [],
    'history': [],
    'unique': [],
    'location': [],
    'safety': []
};

function update_button_list(){
    $(".button-star").each(function(){  // use mouse hover to select stars
        switch($(this).attr("ng-model")) {
            case "answerCtrl.formData.quality":
                button_list['total'].push($(this));
                if (big_stars) {
                    $(this).css({'margin-bottom': '10px'});
                    $(this).children('span').css({'font-size': '42px'});
                    $(this).css({'margin-left': '5px'});
                    $(this).css({'margin-right': '5px'});
                }
                break;

            case "answerCtrl.formData.description":
                button_list['name'].push($(this));
                if (big_stars) {
                    $(this).css({'margin-bottom': '10px'});
                    $(this).children('span').css({'font-size': '34px'});
                    $(this).css({'margin-left': '5px'});
                    $(this).css({'margin-right': '5px'});
                }
                break;

            case "answerCtrl.formData.cultural":
                button_list['history'].push($(this));
                if (big_stars) {
                    $(this).css({'margin-bottom': '10px'});
                    $(this).children('span').css({'font-size': '34px'});
                    $(this).css({'margin-left': '5px'});
                    $(this).css({'margin-right': '5px'});
                }
                break;

            case "answerCtrl.formData.uniqueness":
                button_list['unique'].push($(this));
                if (big_stars) {
                    $(this).children('span').css({'font-size': '34px'});
                    $(this).css({'margin-left': '5px'});
                    $(this).css({'margin-right': '5px'});
                }
                break;

            case "answerCtrl.formData.location":
                button_list['location'].push($(this));
                if (big_stars) {
                    $(this).children('span').css({'font-size': '34px'});
                    $(this).css({'margin-left': '5px'});
                    $(this).css({'margin-right': '5px'});
                }
                break;

            case "answerCtrl.formData.safety":
                button_list['safety'].push($(this));
                if (big_stars) {
                    $(this).children('span').css({'font-size': '34px'});
                    $(this).css({'margin-left': '5px'});
                    $(this).css({'margin-right': '5px'});
                }
                break;
        }

    });
}


function rate_portal(total, name, history, unique, location, safety) {
    button_list['total'][total - 1].click();
    button_list['name'][name - 1].click();
    button_list['history'][history - 1].click();
    button_list['unique'][unique - 1].click();
    button_list['location'][location - 1].click();
    button_list['safety'][safety - 1].click();
}

function addAtt(){
    var body = document.getElementsByTagName('body')[0];
    body.setAttribute("onkeydown","noNumbers(event)");
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.innerHTML='function noNumbers(e){if(e.which){keynum=e.which;}keychar=String.fromCharCode(keynum);console.log(keychar);if(keychar==2){document.getElementsByClassName("button submit-button")[0].click()}else if(keychar==3){document.getElementsByClassName("button submit-button")[1].click()}else if(keychar==4){document.getElementsByClassName("button submit-button")[2].click()}else if(keychar==" "){document.getElementsByClassName("button submit-button")[3].click()}}';
    body.appendChild(s);
}


function add_button() {
    var button_region = document.getElementById("descriptionDiv");
    buttons.forEach(function(button_data) {
        var button = document.createElement("button");
        var textnode = document.createTextNode(button_data["button"]);
        button.className = "button submit-button";
        button.appendChild(textnode);
        button_region.appendChild(button);
        button.onclick = function(){rate_portal(button_data["total"], button_data["name"], button_data["history"], button_data["unique"], button_data["location"], button_data["safety"]);};
        //button.onclick = document.querySelector("#submitDiv > button").click();
    });
    w.$scope = element => w.angular.element(element).scope();
    var submitAndNext = document.createElement("button");
    submitAndNext.className = "button submit-button";
    submitAndNext.innerHTML = `<span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;<span class="glyphicon glyphicon-forward"></span>`;
    submitAndNext.title = "Submit and go to next review";
    submitAndNext.addEventListener("click", function() {angular.element(document.getElementById('AnswersController')).scope().answerCtrl.submitForm();setTimeout(function(){ window.location.assign("/recon");}, 1000);});
    button_region.insertBefore(submitAndNext, null);
}

function move_portal_rate() {
    // move portal rating to the right side
    const scorePanel = w.document.querySelector("div[class~='pull-right']");
    let nodesToMove = Array.from(w.document.querySelector("div[class='btn-group']").parentElement.children);
    nodesToMove = nodesToMove.splice(2, 6);
    nodesToMove.push(w.document.createElement("br"));
    for (let j = nodesToMove.length - 1; j >= 0; --j) {
        scorePanel.insertBefore(nodesToMove[j], scorePanel.firstChild);
    }
    $("#AnswersController > form > div:nth-child(1) > div.col-xs-12.col-sm-4.pull-right.text-center.hidden-xs > span:nth-child(1)").css({'font-size': '20px'});
    $("#AnswersController > form > div:nth-child(1) > div.col-xs-12.col-sm-4.pull-right.text-center.hidden-xs > span.glyphicon.glyphicon-info-sign.darkgray").css({'font-size': '20px'});

    // moving submit button to right side of classification-div
    const submitDiv = w.document.querySelectorAll("#submitDiv, #submitDiv + .text-center");
    const classificationRow = w.document.querySelector(".classification-row");
    const newSubmitDiv = w.document.createElement("div");
    newSubmitDiv.className = "col-xs-12 col-sm-6";
    submitDiv[0].style.marginTop = 16;
    newSubmitDiv.appendChild(submitDiv[0]);
    newSubmitDiv.appendChild(submitDiv[1]);
    classificationRow.insertAdjacentElement("afterend", newSubmitDiv);
    var submit = $(".button.big-submit-button")[0];
    submit.classList.remove("big-submit-button");
    submit.classList.add("submit-button");
    submit.style.paddingLeft = "10px";
    submit.style.paddingRight = "10px";
    submit.style.margin = "10px";
}
(function() {
    if(auto_select) {
        enable_auto_select();
    }
    add_button();
    addAtt();
    update_button_list();
    move_portal_rate();
    var answerCtrl = angular.element(document.getElementById('AnswersController')).scope().answerCtrl;
    answerCtrl.markDuplicate8888 = answerCtrl.markDuplicate;
    answerCtrl.markDuplicate = function() {
        answerCtrl.markDuplicate8888.apply( answerCtrl.markDuplicate8888, arguments);
        answerCtrl.confirmDuplicate();
        setTimeout(function(){ window.location.assign("/recon");}, 1000);
	};
})();
