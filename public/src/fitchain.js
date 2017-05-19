function login() {
    console.log('makeAccount');
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    console.log('email:' + email);

    var xhr = new XMLHttpRequest();

    var uri = 'login';

    var messagearea = document.getElementById('messagearea');
    messagearea.innerHTML = '';

    xhr.open('POST', encodeURI(uri));
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function (response) {
        if (xhr.status === 200) {

            console.log('response');
            console.log(xhr.responseText);

            var reply = JSON.parse(xhr.responseText);

            console.log(reply);

            if (reply.outcome === 'success') {
                window.location = './profile'
            } else {
                messagearea.innerHTML = 'Something went wrong - try again';
            }


        } else if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send(encodeURI('email=' + email + '&password=' + password));
}

function checkStatus() {

    get('./isLoggedIn', function (reply) {

        var login = document.getElementById('login');
        var logout = document.getElementById('logout');

        if (reply.outcome === 'success') {

            if (login) {
                login.style.display = 'none';
            }
            if (login) {
                logout.style.display = 'inherit';
            }
        } else {
            if (logout) {
                logout.style.display = 'none';
            }
            if (login) {
                login.style.display = 'inherit';
            }
        }
    });
}

// Enter is pressed
function newEvent(e, target) {
    if (e.which === 13 || e.keyCode === 13) {

        if (target === "login") {
            login();
        }
    }
}

function makeAccount() {
    console.log('makeAccount');
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var messagearea = document.getElementById('messagearea');
    messagearea.innerHTML = '';

    console.log('email:' + email);

    var xhr = new XMLHttpRequest();

    var uri = 'signup';

    xhr.open('POST', encodeURI(uri));
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function (response) {

        var reply = JSON.parse(xhr.responseText);
        if (xhr.status === 200) {
            if (reply.outcome === 'success') {
                window.location = './login'
            } else {
                email = '';
                password = '';
                messagearea.innerHTML = 'Something went wrong - try again';
            }
        } else if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send(encodeURI('email=' + email + '&password=' + password));
}

function get(path, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(JSON.parse(xmlhttp.responseText));
        }
    }
    xmlhttp.open("GET", path, true);
    xmlhttp.send();
}


function addChallenges(e) {

    deselectTabs();

    var challenges = document.getElementById('challenges');
    challenges.style.opacity = '1.0';

    var marketstage = document.getElementById('marketstage');
    marketstage.style.display = 'flex';

    var navigation = document.getElementById('navigation');
    navigation.innerHTML = 'MARKET';

    var rightnav = document.getElementById('rightnav');
    rightnav.innerHTML = '';

    var leftnav = document.getElementById('leftnav');
    leftnav.innerHTML = '<';
}

function deselectTabs() {
    var elements = ['summary', 'challenges', 'history'];

    elements.forEach(function (element) {
        var element = document.getElementById(element);
        element.style.opacity = '0.4';
    })

    elements.forEach(function (element) {
        var element = document.getElementById(element + "stage");
        element.style.display = 'none';
    })
}

function selectTab(e) {

    var marketstage = document.getElementById('marketstage');
    marketstage.style.display = 'none';

    var stages = document.getElementById('stages');

    deselectTabs();
    e.srcElement.style.opacity = '1.0';

    var selected = document.getElementById(e.srcElement.id + "stage");

    if (selected !== null) {
        selected.style.display = 'flex';
    }

    var rightnav = document.getElementById('rightnav');



    if (e.srcElement.id === 'challenges') {
        rightnav.innerHTML = 'Add';
    } else {
        rightnav.innerHTML = '';
        leftnav.innerHTML = '';
    }

    var navigation = document.getElementById('navigation');
    navigation.innerHTML = e.srcElement.id.toUpperCase();
}




checkStatus();
