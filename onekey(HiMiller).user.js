// ==UserScript==
// @name         5 Star One Key
// @version      0.23
// @description  Give five star with single click
// @updateURL    https://github.com/jqqqqqqqqqq/5StarOneKey/raw/master/5%20Star%20One%20Key.user.js
// @downloadURL  https://github.com/jqqqqqqqqqq/5StarOneKey/raw/master/5%20Star%20One%20Key.user.js
// @author       jqqqqqqqqqq && HiMiller
// @match        https://opr.ingress.com/recon
// @grant        none
// ==/UserScript==


var buttons = [
    {button:"五星好评", total:5, name:5, history:5, unique:5, location:5, safety:5},
    {button:"三星勉强", total:5, name:5, history:3, unique:3, location:5, safety:5},
    {button:"一分滚粗", total:1, name:0, history:0, unique:0, location:1, safety:0},
];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////DO NOT EDIT THIS LINE BELOW!
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


function rate_portal(total, name, history, unique, location, safety) {
    document.querySelector("#AnswersController > form > div:nth-child(1) > div:nth-child(1) > div.btn-group > button:nth-child(" + total + ")").click();
    document.querySelector("#AnswersController > form > div:nth-child(1) > div.col-xs-12.col-sm-4.pull-right.text-center > div:nth-child(5) > button:nth-child(" + name + ")").click();
    document.querySelector("#AnswersController > form > div:nth-child(1) > div.col-xs-12.col-sm-4.pull-right.text-center > div:nth-child(10) > button:nth-child(" + history + ")").click();
    document.querySelector("#AnswersController > form > div:nth-child(1) > div.col-xs-12.col-sm-4.pull-right.text-center > div:nth-child(15) > button:nth-child(" + unique + ")").click();
    document.querySelector("#AnswersController > form > div:nth-child(2) > div:nth-child(1) > div:nth-child(6) > button:nth-child(" + location + ")").click();
    document.querySelector("#AnswersController > form > div:nth-child(2) > div:nth-child(1) > div:nth-child(11) > button:nth-child(" + safety + ")").click();
}

function add_button() {
    var button_region = document.getElementById("submitDiv");
    buttons.forEach(function(button_data) {
        var button = document.createElement("button");
        var textnode = document.createTextNode(button_data["button"]);
        button.className = "button big-submit-button";
        button.appendChild(textnode);
        button_region.appendChild(button);
        button.onclick = function(){
            if (button_data["total"] !== 1){
                rate_portal(button_data["total"], button_data["name"], button_data["history"], button_data["unique"], button_data["location"], button_data["safety"]);
                submit();
                toRecon();
            } else if (button_data["total"] === 1){
                document.getElementsByClassName('button')[1].click();
                toRecon();
            }
        };
    });
}

function toRecon(){
    window.location.assign("https://opr.ingress.com/recon");
}

function submit(){
    document.querySelector("#submitDiv > button").click();
}

(function() {
    add_button();
})();