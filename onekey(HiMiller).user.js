// ==UserScript==
// @name         5 Star One Key
// @version      0.23
// @description  Give five star with single click
// @updateURL    https://github.com/MillerZou/5StarOneKey/raw/master/onekey(HiMiller).user.js
// @downloadURL  https://github.com/MillerZou/5StarOneKey/raw/master/onekey(HiMiller).user.js
// @author       jqqqqqqqqqq && HiMiller
// @match        https://opr.ingress.com/recon
// @grant        none
// ==/UserScript==


var buttons = [
    {button:"五", total:5, name:5, history:5, unique:5, location:5, safety:5},
    {button:"三", total:4, name:5, history:3, unique:3, location:4, safety:5},
    {button:"一", total:1, name:0, history:0, unique:0, location:1, safety:0},
];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////DO NOT EDIT THIS LINE BELOW!
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


function rate_portal(total, name, history, unique, location, safety) {
    document.querySelector("#AnswersController > form > div:nth-child(1) > div:nth-child(1) > div.btn-group > button:nth-child(" + total + ")").click();
    if(total !== 1){
        document.querySelector("#AnswersController > form > div:nth-child(2) > div.col-xs-12.col-sm-4.pull-right.text-center > div:nth-child(5) > button:nth-child(" + name + ")").click();
        document.querySelector("#AnswersController > form > div:nth-child(2) > div.col-xs-12.col-sm-4.pull-right.text-center > div:nth-child(10) > button:nth-child(" + history + ")").click();
        document.querySelector("#AnswersController > form > div:nth-child(2) > div.col-xs-12.col-sm-4.pull-right.text-center > div:nth-child(15) > button:nth-child(" + unique + ")").click();
        document.querySelector("#AnswersController > form > div:nth-child(2) > div:nth-child(1) > div:nth-child(6) > button:nth-child(" + location + ")").click();
        document.querySelector("#AnswersController > form > div:nth-child(2) > div:nth-child(1) > div:nth-child(11) > button:nth-child(" + safety + ")").click();
    }
}

function add_button() {
    var descriptionDiv = document.getElementById("descriptionDiv");
    var submitButton = document.getElementById("submitDiv");
    buttons.forEach(function(button_data) {
        var button = document.createElement("button");
        var textnode = document.createTextNode(button_data["button"]);
        button.className = "button big-submit-button";
        var br = document.createElement('br');
        descriptionDiv.appendChild(br);
        button.appendChild(textnode);
        descriptionDiv.appendChild(button);
        //submitButton.appendChild(button);
        button.onclick = function(){
            rate_portal(button_data["total"], button_data["name"], button_data["history"], button_data["unique"], button_data["location"], button_data["safety"]);
            if (button_data["total"] !== 1){
                submit();
                setTimeout(toRecon,800);
            } else if (button_data["total"] === 1){
                submit();
                document.querySelector('.modal-body button:last-child').click();
                setTimeout(toRecon,800);
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

function addAtt(){
    var body = document.getElementsByTagName('body')[0];
    body.setAttribute("onkeydown","noNumbers(event)");
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.innerHTML='function noNumbers(e){if(e.which){keynum=e.which;}keychar=String.fromCharCode(keynum);console.log(keychar);if(keychar==1||keychar=="c"){document.getElementsByClassName("big-submit-button")[2].click()}else if(keychar==3||keychar=="b"){document.getElementsByClassName("big-submit-button")[1].click()}else if(keychar==5||keychar=="a"){document.getElementsByClassName("big-submit-button")[0].click()}}';
    body.appendChild(s);
}

function changeDup(){
    var descriptionDiv = document.getElementById("descriptionDiv");
    var dup = descriptionDiv.parentNode.nextSibling.nextSibling.lastChild.previousSibling;
    var starts = descriptionDiv.nextSibling.nextSibling;
    descriptionDiv.parentNode.appendChild(dup);
    descriptionDiv.parentNode.nextSibling.nextSibling.appendChild(starts);
    descriptionDiv.style.width="16%";
//    console.log(descriptionDiv);
}

(function() {
    changeDup();
    add_button();
    addAtt();
})();
