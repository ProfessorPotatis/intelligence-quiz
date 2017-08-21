/*jshint multistr: true */

/**
* Test is declared in the global scope, which means we can call it where ever we
* like, and even pass it into another Module.
* Declares a function.
* Function calls itself immediately.
*/
window.Test = (function(){
    'use strict';

    /**
    * Global variables.
    */
    var myContent = document.getElementById('content');
    var pages = ['tipsQ1', 'tipsQ2', 'tipsQ3', 'fizzBuzzGame'];


    /**
    * Test object.
    */
    var test = {

        /**
        * Reset function lets the user reset the test they are currently working on.
        * The points are either set to zero or to the amount that the user has been able to get.
        * To avoid the points being too high in the end, the points (when resetting test 2 and 3) can never be higher than 9 or 12.
        */
        "reset": function() {
            if (theCurrentTest === 1) {
                points = 0;
                nr = 0;
                return runTest1and2(tipsQ1, 'tipsQ1');
            }
            else if (theCurrentTest === 2) {
                points = 9;
                nr = 3;
                return runTest1and2(fizzBuzzGame, 'fizzBuzzGame');
            }
            else if (theCurrentTest === 3) {
                points = 12;
                return runTest3(memoryTest, 'memoryTest');
            }
            else {
                return console.log("You can't reset a test you haven't started.");
            }
        }
    };


    /**
    * Page object.
    * html is an empty string.
    * init function to initiate page HTML.
    * print function to print out the HTML in said element.
    */
    var page = {
        html: "",
        init: function(html) {
            this.html = html;
        },
        print: function(element, event) {
            if (element === undefined) {
                element = event.target;
            }
            element.innerHTML = this.html;
        }
    };


    /**
    * Flag object.
    * html is an empty string.
    * init function to initiate flag HTML.
    * draw function to draw out the HTML in said element.
    */
    var flag = {
        html: "",
        init: function(html) {
            this.html = html;
        },
        draw: function(element, event) {
            if (element === undefined) {
                element = event.target;
            }
            element.style.background = 'white';
            element.innerHTML = this.html;
        }
    };


    /**
    * Create page objects and initiate them with their HTML.
    * Welcome page.
    * Ends with printing out welcome page in the element contained in global variable myContent.
    */
    var welcome = Object.create(page);
    welcome.init('<h3>Välkommen till intelligenstestet!</h3>\
    <p>Du kommer nu att få utföra tre deltest som på olika sätt mäter din intelligens.</p>\
    <p>Du får poäng för varje rätt svar och noll poäng när du svarar fel.<br>\
    I slutet läggs dina poäng ihop och vi räknar ut din intelligens.</p>\
    <p>Klicka på start när du känner dig redo!</p>\
    <p id="startTest" class="startTest">Start</p>');
    welcome.print(myContent);

    /**
    * Instructions for first test.
    * Ends with start test button.
    */
    var tipsQ0 = Object.create(page);
    tipsQ0.init('<h3>Deltest 1: Tipsfrågor</h3>\
    <p>Du kommer nu att få besvara tre frågor.<br>\
    Till varje fråga får du tre olika svarsalternativ, 1 X 2. Din uppgift är att välja rätt svarsalternativ.</p>\
    <p>Lyckas du svara rätt på en fråga får du 3 poäng. Svarar du fel får du 0 poäng.<br>\
    Du kan totalt få 9 poäng i deltestet.</p>\
    <p id="startTest1" class="startTest1">Starta deltest 1</p>');

    /**
    * First question and answers for first test.
    * Ends with next button.
    */
    var tipsQ1 = Object.create(page);
    tipsQ1.init('<h3>Fråga 1</h3>\
    <p>Vad är en svärmors kudde?</p>\
    <form id="answer_form">\
    <input class="answer" type="button" value="1. Ett örngott"><br>\
    <input class="answer" type="button" value="X. En kaktus"><br>\
    <input class="answer" type="button" value="2. Ett bakverk"><br>\
    </form>\
    <p class="next">Nästa fråga</p>');

    /**
    * Second question and answers for first test.
    * Ends with next button.
    */
    var tipsQ2 = Object.create(page);
    tipsQ2.init('<h3>Fråga 2</h3>\
    <p>Hur kan man se skillnad på ett rått och ett kokt ägg utan att skala det?</p>\
    <form id="answer_form">\
    <input class="answer" type="button" value="1. Ett kokt ägg snurrar, ett rått gör inte det"><br>\
    <input class="answer" type="button" value="X. Ett rått ägg är vitare i skalet än ett kokt"><br>\
    <input class="answer" type="button" value="2. Ett kokt ägg flyter, ett rått sjunker"><br>\
    </form>\
    <p class="next">Nästa fråga</p>');

    /**
    * Third question and answers for first test.
    * Ends with next button.
    */
    var tipsQ3 = Object.create(page);
    tipsQ3.init('<h3>Fråga 3</h3>\
    <p>Vad är Instagram?</p>\
    <form id="answer_form">\
    <input class="answer" type="button" value="1. Den snabbaste vågen i världen"><br>\
    <input class="answer" type="button" value="X. En stad i Norrland"><br>\
    <input class="answer" type="button" value="2. En mobilapplikation för fotodelning"><br>\
    </form>\
    <p class="next">Avsluta deltest 1</p>');

    /**
    * Instructions for second test.
    * Ends with start test button.
    */
    var fizzBuzz = Object.create(page);
    fizzBuzz.init('<h3>Deltest 2: FizzBuzz</h3>\
    <p>FizzBuzz är ett ordspel där vi testar dina divisions kunskaper.</p>\
    <p>Det går till så att du får en rad med ordnade siffror där du ska avgöra vilken siffra som saknas.</p>\
    <p>Om siffran som saknas är delbar med 3 är svaret: "Fizz".<br>\
    Om siffran som saknas är delbar med 5 är svaret: "Buzz".<br>\
    Om siffran som saknas är delbar med både 3 och 5 är svaret: "FizzBuzz".<br>\
    Om siffran som saknas däremot <b>inte</b> är delbar med vare sig 3 eller 5 är svaret: siffran.</p>\
    <p>Lyckas du svara rätt får du 3 poäng. Svarar du fel får du 0 poäng.<br>\
    Du kan totalt få 3 poäng i deltestet.</p>\
    <p id="startTest2" class="startTest2">Starta deltest 2</p>');

    /**
    * First and only question in the FizzBuzz game.
    * Ends with next button.
    */
    var fizzBuzzGame = Object.create(page);
    fizzBuzzGame.init('<h3>FizzBuzz</h3>\
    <p>FizzBuzz, 31, 32, Fizz, 34, Buzz, ?</p>\
    <form id="answer_form">\
    <input class="answer" type="button" value="36"><br>\
    <input class="answer" type="button" value="Fizz"><br>\
    <input class="answer" type="button" value="Buzz"><br>\
    <input class="answer" type="button" value="FizzBuzz"><br>\
    </form>\
    <p class="next">Avsluta deltest 2</p>');

    /**
    * Instructions for third test.
    * Ends with start test button.
    */
    var memory = Object.create(page);
    memory.init('<h3>Deltest 3: Minne</h3>\
    <p>Vi ska nu testa hur bra bildminne du har.<br>\
    På nästa sida kommer 9 flaggor att visas under 5 sekunder.<br>\
    När 5 sekunder har gått döljs flaggorna och du får en numrerad lista med namnen på de 9 flaggorna.</p>\
    <p>Din uppgift är att i rätt ordning klicka på rätt ruta där motsvarande flagga ligger.<br>\
    Gissar du rätt får du ett poäng.<br>\
    Gissar du fel avbryts testet och du kan inte gissa mer.<br>\
    Du kan totalt få 9 poäng i deltestet.</p>\
    <p id="startTest3" class="startTest3">Starta deltest 3</p>');

    /**
    * First and only page in the flag-memory test (third test).
    * The html contains a table with nine slots for the flags.
    * Ends with next button.
    */
    var memoryTest = Object.create(page);
    memoryTest.init('<h3>Flaggor</h3>\
    <table id="flags">\
    <tr>\
        <td></td><td></td><td></td>\
    </tr>\
    <tr>\
        <td></td><td></td><td></td>\
    </tr>\
    <tr>\
        <td></td><td></td><td></td>\
    </tr>\
    </table>\
    <h4>Tryck på flaggorna i följande ordning:</h4>\
    <p id="flagOrder"></p>\
    <p class="next">Avsluta deltest 3</p>');

    /**
    * Last page where the user gets the results.
    */
    var results1 = Object.create(page);
    results1.init('<h3>Resultat</h3>\
    <p id="resultPoints"></p>\
    <h4>Wechslers IQ-skala</h4>\
    <p>&lt; 70 – Mycket låg IQ.<br>\
    70-79 – Låg IQ.<br>\
    80-89 – Under normal IQ.<br>\
    90-109 – Normal IQ.<br>\
    110-119 – Över normal IQ.<br>\
    120-129 – Hög IQ.<br>\
    130+ — Mycket hög IQ.</p>');


    /**
    * Create flag objects and initiate them with their html.
    */
    var sverige = Object.create(flag);
    sverige.init('<div class="flagswe"><div class="lodrat"></div><div class="vagrat"></div></div>');

    var schweiz = Object.create(flag);
    schweiz.init('<div class="flagsch"><div class="vagrat"></div><div class="lodrat"></div></div>');

    var nigeria = Object.create(flag);
    nigeria.init('<div class="flagnig"><div class="lodrat"></div></div>');

    var mauritius = Object.create(flag);
    mauritius.init('<div class="flagmau"><div class="vagrat1"></div><div class="vagrat2"></div><div class="vagrat3"></div></div>');

    var danmark = Object.create(flag);
    danmark.init('<div class="flagden"><div class="lodrat"></div><div class="vagrat"></div></div>');


    /**
    * Global variables.
    * startTestBtn is the button on the welcome page.
    * Points is a counter keeping track of the users results.
    * theCurrentTest keeps track of which test the user is currently at.
    * nr keeps track of what page we are at.
    */
    var startTestBtn = document.getElementById('startTest');
    var points = 0;
    var theCurrentTest = 0;
    var nr = 0;


    /**
    * When the user clicks the button on the welcome page:
    * The current test is number one, to make it possible for the user to reset the specific test.
    * Instructions for first test prints out.
    * startTest1-button is saved in a variable and made clickable.
    * When the user clicks the startTest1-button the function runTest1and2 is called.
    */
    startTestBtn.addEventListener("click", function() {
        theCurrentTest += 1;
        tipsQ0.print(myContent);
        var startTest1 = document.getElementById('startTest1');
        startTest1.addEventListener("click", function() {
            runTest1and2(tipsQ1, 'tipsQ1');
        });
    });


    /**
    * Function runTest1and2 runs the first and second test.
    * First the sent page is printed out and the next-button is set to disabled.
    * The three/four potential answers to the question is fetched.
    * The right answers are saved in an array.
    * The function then calls local function checkAnswer.
    *
    * To find out which page we are on we use the sent str and compare it to global array pages.
    * When an answer gets clicked we add the class 'selected' to the clicked answer.
    * When an answer is clicked the others are disabled, so that the user can't change its answer.
    * If the clicked answer is the same as the right answer in array rightGuesses, we add the class 'correct' (green color) and the user gets 3 points.
    * If the clicked answer is wrong, we add the class 'incorrect' (red color) to the clicked answer and show the right answer.
    *
    * Finally the next-button is clickable, which when clicked counts up nr and compares it to the right statement and takes us to the next page of the test to run the same function again.
    *
    * When the function has run four times the last next-button takes us to runTest3.
    */
    var runTest1and2 = function(thePage, str) {
        thePage.print(myContent);
        var nextBtn = document.getElementsByClassName('next');
        nextBtn[0].classList.add('disabled');

        var answers = document.getElementsByClassName('answer');
        var rightGuesses = [answers[1], answers[0], answers[2], answers[1]];

        function checkAnswer(str) {
            if (str == pages[nr]) {
                for (var i = 0; i < answers.length; i++) {
                    answers[i].addEventListener("click", function() {
                        this.classList.add('selected');

                        if (this.classList.contains('selected')) {
                            for (var i = 0; i < answers.length; i++) {
                                answers[i].disabled = true;
                            }
                        }

                        if (this.value === rightGuesses[nr].value) {
                            this.classList.add('correct');
                            points += 3;
                        }
                        else {
                            this.classList.add('incorrect');
                            rightGuesses[nr].classList.add('correct');
                        }

                        nextBtn[0].classList.remove('disabled');
                        nextBtn[0].addEventListener("click", function() {
                            nr += 1;
                            if (nr === 1) {
                                runTest1and2(tipsQ2, 'tipsQ2');
                            }
                            else if (nr === 2) {
                                runTest1and2(tipsQ3, 'tipsQ3');
                            }
                            else if (nr === 3) {
                                theCurrentTest += 1;
                                fizzBuzz.print(myContent);
                                var startTest2 = document.getElementById('startTest2');
                                startTest2.addEventListener("click", function() {
                                    runTest1and2(fizzBuzzGame, 'fizzBuzzGame');
                                });
                            }
                            else if (nr === 4) {
                                theCurrentTest += 1;
                                memory.print(myContent);
                                var startTest3 = document.getElementById('startTest3');
                                startTest3.addEventListener("click", function() {
                                    runTest3(memoryTest);
                                });
                            }
                        });
                    });
                }
            }
        }
        checkAnswer(str);
    };


    /**
    * Function runTest3 runs the third test.
    * First the sent page is printed out and the next-button is set to disabled.
    * Local variables are defined.
    * Two of the local variables, guess and rightGuesses, are empty arrays which gets it content from local functions.
    *
    * RightGuesses gets its content from function randomizeFlags.
    * guess gets its content from when the user takes a guess.
    */
    var runTest3 = function(thePage) {
        thePage.print(myContent);
        var nextBtn = document.getElementsByClassName('next');
        nextBtn[0].classList.add('disabled');

        var nrOfFlags = 9;
        var hiddenBlocks = new Array(9);
        var guess = [];
        var tableFlagTd = document.getElementsByTagName('td');
        var flags = ['schweiz', 'sverige', 'nigeria', 'danmark', 'mauritius'];
        var rightGuesses = [];
        var counter = 0;
        var flagOrder = document.getElementById('flagOrder');

        /**
        * Function randomizeFlags is called by the function 'click()'.
        * It randomise a number between 0-4.
        * To avoid the same flag turning up more than twice we call function 'checkForDuplicates'.
        *
        * The random number then gets assigned to the specific element sent by the function click(), and is saved in rightGuesses array.
        *
        * The flag order is then saved in the div 'flagOrder' and awaits its turn to be shown on the page.
        */
        function randomizeFlags(currPos){
    		var randNr = Math.floor(Math.random() * 5);

    		while (checkForDuplicates(randNr)){
    			randNr = Math.floor(Math.random() * 5);
    		}
    		hiddenBlocks[currPos] = randNr;
            rightGuesses.push(randNr);
            flagOrder.innerHTML += (currPos +1) + '. ' + flags[randNr] + '<br>';
    	}

        /**
        * Function checkForDuplicates is called by the function 'randomizeFlags()'.
        * Here the randNr is checked so that it only turns up twice or once in the hiddenBlocks array.
        * This is done to avoid the same flag turning up more than twice.
        *
        * If the randNr turns up more than twice a new randNr is randomised by function 'randomizeFlags()'.
        */
        function checkForDuplicates(nr){
            var isDuplicate = false;
            var count = 0;

            for (var i = 0; i < nrOfFlags; i++){
                if (hiddenBlocks[i] === nr){
                    count++;
                }
            }
            if (count === 2){
                isDuplicate = true;
            }
            return isDuplicate;
        }

        /**
        * Function showAllFlags is called by function 'click()'.
        * Here the flags appear in the right order to the user, so that the user later on can guess where each and every flag is located.
        * Which flag is supposed to go where is decided by click and randomizeFlags functions.
        *
        * showAllFlags draw out the flags in the correct order using the current position in the table and a switch-case.
        *
        * The flags are shown for 5 seconds with the help of setTimeout.
        * After 5 seconds function hideAllFlags runs.
        */
        function showAllFlags(currPos, tablePos) {
            showFlag(currPos, tablePos);
            window.setTimeout(hideAllFlags, 5000);
        }

        /**
        * Function hideAllFlags is called by the function 'showAllFlags'.
        * The function clears all tablecells and makes the div 'flagOrder' visible, so that the user can begin clicking on the flags in the asked correct order.
        */
        function hideAllFlags() {
            for (var i = 0; i < tableFlagTd.length; i++) {
                tableFlagTd[i].innerHTML = '';
            }
            flagOrder.style.visibility = 'visible';
        }

        /**
        * Function showFlag is called by the function 'click()' and 'showAllFlags()'.
        * When a tablecell is clicked the function draws out the flag located in the tablecell.
        * showFlag draws out the flag using the current position in the table and a switch-case.
        *
        * For each clicked tablecell a counter adds one.
        *
        * To check if the guess is made in the correct order (according to flagOrder-div) function checkMatch() is called.
        */
        function showFlag(currElement, tableCell) {
            var theFlag = flags[hiddenBlocks[currElement]];

            switch (theFlag) {
                case 'sverige':
                    sverige.draw(tableCell);
                    break;
                case 'schweiz':
                    schweiz.draw(tableCell);
                    break;
                case 'nigeria':
                    nigeria.draw(tableCell);
                    break;
                case 'mauritius':
                    mauritius.draw(tableCell);
                    break;
                case 'danmark':
                    danmark.draw(tableCell);
                    break;
            }
        }

        /**
        * Function checkMatch is called by function 'click()'.
        * The function saves the guessed flag in the array 'guess'.
        * If the counter is less than or equal to 8 and the guessed flag was guessed in the right order, the user gets one point.
        * When the counter is 9 the user has guessed all flags in the right order and the next-button becomes clickable.
        *
        * If the user guesses wrong the function 'toggleClickable()' is called, to make the other tablecells unclickable.
        * The next-button becomes clickable and the test is over.
        *
        * Clicking on the next-button takes the user to the results.
        */
        function checkMatch(currElement){
            guess.push(hiddenBlocks[currElement]);

            if (counter <= 8 && guess[counter] === rightGuesses[counter]) {
                points += 1;
                counter += 1;
                if (counter === 9) {
                    toggleClickable();
                    nextBtn[0].classList.remove('disabled');
                    nextBtn[0].addEventListener("click", function() {
                        results(results1, 'results1');
                    });
                }
            }
            else {
                toggleClickable();
                nextBtn[0].classList.remove('disabled');
                nextBtn[0].addEventListener("click", function() {
                    results(results1, 'results1');
                });
            }
        }

        /**
        * Function toggleClickable is called by function 'checkMatch()'.
        * The functions makes all tablecells unclickable for further guesses.
        */
    	function toggleClickable(){
    		var box = document.getElementsByTagName('td');
    		for (var i = 0; i < nrOfFlags; i++){
    			if (box[i].style.pointerEvents === 'none'){
    				box[i].style.pointerEvents = '';
    			}
    			else {
    				box[i].style.pointerEvents = 'none';
    			}
    		}
    	}

        /**
        * Function click is called first in the function runTest3.
        * The function loops through the number of flags to give each and every element in the table an id-nr from 0-8, to make it clear which tablecell is clicked.
        * It also makes all elements in the table clickable, and calls the function showFlag to draw out a flag.
        *
        * The function calls the function randomizeFlags to shuffle the flags around the tablecells.
        * The function calls the function showAllFlags to get the test started.
        */
        function click(element) {
            for (var i = 0; i < nrOfFlags; i++) {
                element[i].setAttribute('id', i);
                element[i].addEventListener("click", function(event) {
                    showFlag(this.id, event.target);
                    checkMatch(this.id);
                });
                randomizeFlags(i);
                showAllFlags(i, tableFlagTd[i]);
            }
        }
        click(tableFlagTd);
    };


    /**
    * Function results is the last and final page of the intelligence test.
    * First the results html prints out.
    *
    * Then the iQ is calculated by taking the users total points and multiplying it with the number 9.
    * The div in which the results are going to be printed out is defined.
    *
    * The results are then printed out it the resultPoints-div.
    */
    var results = function(thePage) {
        thePage.print(myContent);
        var iQ = Math.floor(points * 9);
        var resultPoints = document.getElementById('resultPoints');
        resultPoints.innerHTML = 'Du fick totalt ' + points + ' poäng.<br>\
        Det ger dig en IQ på: ' + iQ + '.';
    };

    return test;

})();
