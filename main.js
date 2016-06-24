(function clickerClicker() {
    // TODO break these into separate files
    // game element constructors
    var ClickerButton = {
        buttonValue: 1,

        // getters -- setters
        getButtonValue: function () {
            return this.buttonValue;
        },

        setButtonValue: function (value) {
            this.buttonValue += value;
        },

        create: function () {
            // var button = document.getElementById(elementName);
            var options = {
                type: "button",
                className: "clicker-button",
                parentID: "game-body",
                elementContent: "Click this!"
            }

            Util.createNewElement(options);
        },

        handleEvent: function() {
            console.log("inside clicker event");
            Player.addToScore(this.getButtonValue());
        }
    }

    var PauseButton = {
        create: function () {
            var options = {
                type: "button",
                className: "button pause-button",
                parentID: "game-head",
                elementContent: "Pause Game"
            }

            Util.createNewElement(options);
        },

        handleEvent: function () {
            // pause game if it's running and
            // restart is paused
            console.log("inside pause event");
            if (Game.getIsPaused()) {
                Game.start();
            } else {
                Game.pause();
            }
        }
    }

    var ScoreBoard = {
        scoreBoard: "",

        create: function () {
            var options = {
                type: "span",
                className: "score-board",
                parentID: "game-head",
                elementContent: "0"
            }

            Util.createNewElement(options);

            this.scoreBoard = document.getElementsByClassName("score-board")[0];
            console.log(this.scoreBoard);
        },

        displayScore: function (score) {
            this.scoreBoard.textContent = score;
        }
    }

    var Settings = {
        create: function () {
            var options = {
                type: "button",
                className: "button settings-button",
                parentID: "game-head",
                elementContent: "Settings"
            }

            Util.createNewElement(options);
        }
    }

    // the Game
    var Game = {
        // properties
        isPaused: true,

        // getters -- setters
        getIsPaused: function () {
            return this.isPaused;
        },

        setIsPaused: function (bool) {
            this.isPaused = bool;
        },

        // methods
        setup: function () {
            ClickerButton.create();
            ScoreBoard.create();
            PauseButton.create();
            Settings.create();
            this.setupEvents();
            console.log('Game is setup and ready to go');
        },

        start: function () {
            this.setIsPaused(false);
            window.requestAnimationFrame(Game.loop);
        },

        pause: function () {
            this.setIsPaused(true);
        },

        loop: function (timestamp) {
            Game.update();

            if (!Game.getIsPaused()) {
                window.requestAnimationFrame(Game.loop);
            }
        },

        update: function () {
            ScoreBoard.displayScore(Player.getScore());
        },

        // setting up event delegation
        setupEvents: function () {
            // event on header delegated to buttons
            document.getElementById('clickers-clicking-game').addEventListener('click', function (e) {
                if (e.target && e.target.matches('button.pause-button')) {
                    PauseButton.handleEvent();
                } else if (e.target && e.target.matches('.clicker-button')) {
                    ClickerButton.handleEvent();
                }
            });
        }
    }

    // the Player
    var Player = {
        score: 0,

        getScore: function () {
            return this.score;
        },

        setScore: function (score) {
            this.score = score;
        },

        addToScore: function (score) {
            var newScore = this.getScore() + score;
            this.setScore(newScore);
        },

        lowerScore: function (score) {
            var newScore = this.getScore() - score;

            // don't let the score go below zero
            if (newScore > 0) {
                this.setScore(newScore);
            } else {
                this.setScore(0);
            }
        }
    }

    // call game setup and start the game
    Game.setup();
    Game.start();
})();