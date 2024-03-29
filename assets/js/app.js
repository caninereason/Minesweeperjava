//initial values
document.addEventListener('DOMContentLoaded', () => {
    let grid = document.querySelector('.grid');
    let closer = document.querySelector('.close');
    let scale = 0;
    let flagsLeft = document.querySelector('#flags-left');
    let bombs = 10;
    let width = 10;
    let flags = 0;
    let sqs = [];
    let isGameOver = false;
    let gameArray = width * width;
    grid.style.width = width * "40" + "px";
    grid.style.height = width * "40" + "px";
    flagsLeft.innerHTML = bombs - flags;
    let mod = true;
    let won;
    let pause = true;
    let tut = true;
    // Get the css elements
    let span = document.getElementsByClassName("close")[0];
    let btn = document.getElementById("myBtn");
    let Easy = document.getElementById("easy");
    let Medium = document.getElementById("medium");
    let Hard = document.getElementById("hard");
    let modal = document.getElementById("myModal");
    let note = document.getElementById("note");
    let sign = document.getElementById('text');
    let face = document.getElementById('face');
    let guide = document.getElementById('guide');
    sign.textContent = 'MINESWEEPER';
    //open the guide
    tutorial();
    //face button logic
    btn.onclick = function () {
        if (won || isGameOver) {
            tut = true;
            tutorial();
            return;
        }
        if (!pause) {
            tut = true;
            tutorial();
            modal.style.display = "block";
            mod = true;
            pause = true;
        }
        else {
            modal.style.display = "none";
            mod = false;
            pause = false;
        }
    };
    //show/hide guide text
    function tutorial() {
        if (tut) {
            note.innerHTML = "Clear all the mines! Reveal squares by clicking on them. If the square is empty, you will reveal how many neighbouring squares have mines, but if you click a mine, all the bombs will explode! You must find all the bombs by placing flags(represented on the top-left) using right-click(or hold a square on mobile), right-click again to remove a flag. When you have flagged all the bombs you win!";
        }
        else {
            note.innerHTML = "";
        }
    }
    guide.onclick = function () {
        tut = !tut;
        tutorial();
    };
    //level select values
    Easy.onclick = function () {
        scale = 0;
        bombs = 10;
        reset();
    };
    Medium.onclick = function () {
        scale = 2;
        bombs = 15;
        reset();
    };
    Hard.onclick = function () {
        scale = 5;
        bombs = 25;
        reset();
    };
    //reset the gameboard
    function reset() {
        closer.style.textAlign = "left";
        span.innerHTML = "×";
        tut = false;
        tutorial();
        note.textContent = "";
        timer = -1;
        pause = false;
        face.innerHTML = "🙂";
        sign.textContent = 'MINESWEEPER';
        isGameOver = false;
        mod = false;
        won = false;
        width = (10 + scale);
        bombs += (scale * 5);
        flagsLeft.innerHTML = bombs;
        grid.style.width = width * "40" + "px";
        grid.style.height = width * "40" + "px";
        grid.innerHTML = '';
        flags = 0;
        sqs = [];
        createBoard();
        modal.style.display = "none";
    }
    // close button logic
    span.onclick = function () {
        if (won || isGameOver) {
            span.innerHTML = "please choose a level";
            closer.style.textAlign = "center";
            return;
        }
        modal.style.display = "none";
        mod = false;
        pause = false;
    };
    //create Board
    function createBoard() {
        const bombsArray = Array(bombs).fill('bomb');
        const emptyArray = Array(width * width - bombs).fill('valid');
        gameArray = emptyArray.concat(bombsArray);
        shuffleArray(gameArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
        for (let i = 0; i < width * width; i++) {
            const sq = document.createElement('div');
            sq.setAttribute('id', i);
            sq.classList.add(shuffledArray[i]);
            grid.appendChild(sq);
            sqs.push(sq);
            sq.addEventListener('click', function () {
                click(sq);
            });
            sq.oncontextmenu = function (e) {
                e.preventDefault();
                addFlag(sq);
            };
        }
        // set number indicators on grid
        for (let i = 0; i < sqs.length; i++) {
            let total = 0;
            const lEdge = (i % width === 0);
            const rEdge = (i % width === width - 1);

            if (sqs[i].classList.contains('valid')) {
                if (i > 0 && !lEdge && sqs[i - 1].classList.contains('bomb')) total++;
                if (i > 9 + scale && !rEdge && sqs[i + 1 - width].classList.contains('bomb')) total++;
                if (i >= 10 + scale && sqs[i - width].classList.contains('bomb')) total++;
                if (i >= 11 + scale && !lEdge && sqs[i - 1 - width].classList.contains('bomb')) total++;
                if (i <= gameArray.length - 2 && !rEdge && sqs[i + 1].classList.contains('bomb')) total++;
                if (i < gameArray.length - width && !lEdge && sqs[i - 1 + width].classList.contains('bomb')) total++;
                if (i <= gameArray.length - width - 2 && !rEdge && sqs[i + 1 + width].classList.contains('bomb')) total++;
                if (i <= gameArray.length - width - 1 && sqs[i + width].classList.contains('bomb')) total++;
                sqs[i].setAttribute('data', total);
            }
        }
    }
    createBoard();
    //add flags on right click
    function addFlag(sq) {
        if (isGameOver) return;
        if (mod == true) return;
        if (won == true) return;
        if (!sq.classList.contains('checked')) {
            if
                (!sq.classList.contains('flag')) {
                if (flags == bombs) return;
                sq.classList.add('flag');
                sq.innerHTML = '🚩';
                flags++;
                flagsLeft.innerHTML = bombs - flags;
                win();
            } else {
                sq.classList.remove('flag');
                sq.innerHTML = '';
                flags--;
                flagsLeft.innerHTML = bombs - flags;
            }
        }
        else {
            if (sq.classList.contains('flag')) {
                sq.classList.remove('flag');
                sq.innerHTML = '';
                flags--;
                flagsLeft.innerHTML = bombs - flags;
            }
        }
    }
    //click actions
    function click(sq) {
        if (won) return;
        if (mod) return;
        let currentId = sq.id;
        if (isGameOver) return;
        if (sq.classList.contains('checked')) return;
        if (sq.classList.contains('flag')) return;
        if (sq.classList.contains('bomb')) {
            gameOver(sq);
        }
        else {
            let total = sq.getAttribute('data');
            if (total != 0) {
                sq.classList.add('checked');
                if (total == 1) sq.classList.add('one');
                if (total == 2) sq.classList.add('two');
                if (total == 3) sq.classList.add('three');
                if (total == 4) sq.classList.add('four');
                if (total == 5) sq.classList.add('five');
                sq.innerHTML = total;
                return;
            }
            checksq(sq, currentId);
        }
        sq.classList.add('checked');
    }
    // check squares and set to correct figure
    function checksq(sq, currentId) {
        const Ledge = (currentId % width === 0);
        const Redge = (currentId % width === width - 1);
        setTimeout(() => {
            if (currentId > 0 && !Ledge) {
                const newId = sqs[parseInt(currentId) - 1].id;
                const newSq = document.getElementById(newId);
                click(newSq);
            }
            if (currentId > 9 + scale && !Redge) {
                const newId = sqs[parseInt(currentId) + 1 - width].id;
                const newSq = document.getElementById(newId);
                click(newSq);
            }
            if (currentId >= 10 + scale) {
                const newId = sqs[parseInt(currentId - width)].id;
                const newSq = document.getElementById(newId);
                click(newSq);
            }
            if (currentId > 11 + scale && !Ledge) {
                const newId = sqs[parseInt(currentId) - 1 - width].id;
                const newSq = document.getElementById(newId);
                click(newSq);
            }
            if (currentId < gameArray.length - 2 && !Redge) {
                const newId = sqs[parseInt(currentId) + 1].id;
                const newSq = document.getElementById(newId);
                click(newSq);
            }
            if (currentId < gameArray.length - width && !Ledge) {
                const newId = sqs[parseInt(currentId) - 1 + width].id;
                const newSq = document.getElementById(newId);
                click(newSq);
            }
            if (currentId < gameArray.length - width - 2 && !Redge) {
                const newId = sqs[parseInt(currentId) + 1 + width].id;
                const newSq = document.getElementById(newId);
                click(newSq);
            }
            if (currentId < gameArray.length - width) {
                const newId = sqs[parseInt(currentId) + width].id;
                const newSq = document.getElementById(newId);
                click(newSq);
            }
        }, 20);
    }
    // game end
    function gameOver() {
        tut = false;
        tutorial();
        face.innerHTML = "😵";
        pause = true;
        sign.textContent = 'KABOOM ! GAME OVER';
        isGameOver = true;
        flags = 0;
        modal.style.display = "block";
        mod = true;
        sqs.forEach(sq => {
            if (sq.classList.contains('bomb')) {
                sq.innerHTML = '💣';
            }
        });
    }
    //array shuffle
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    //check win condition
    function win() {
        let match = 0;
        for (let i = 0; i < sqs.length; i++) {
            if (sqs[i].classList.contains('flag') && sqs[i].classList.contains('bomb')) {
                match++;
            }
            if (match === bombs) {
                tut = false;
                tutorial();
                face.innerHTML = "🤩";
                pause = true;
                sign.textContent = 'YOU WIN!';
                won = true;
                mod = true;
                modal.style.display = "block";
                flags = 0;
            }
        }
    }
    //timer logic
    var timer = 0;
    let time = document.querySelector('.timer');
    setInterval(function () {
        if (!pause) {
            timer++;
            time.innerHTML = timer;
            if (timer === 999) gameOver();
        }
    }, 1000);
});