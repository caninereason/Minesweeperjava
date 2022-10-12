document.addEventListener('DOMContentLoaded', () => {
    let grid = document.querySelector('.grid')
    let scale =document.getElementById("form").elements["num"].valueAsNumber
    let flagsLeft = document.querySelector('#flags-left')
    let result =document.querySelector('#result')
    let bombs =5  +(scale*5)
    let width = (10 +scale)
    let flags = 0
    let sqs = []
    let isGameOver = false
    let gameArray = width*width
    grid.style.width = width*"40"+"px"
    grid.style.height = width*"40"+"px"
    flagsLeft.innerHTML = bombs - flags
    //create Board
    function createBoard() {
     //   console.log()
        //get shuffled game array
        const bombsArray = Array(bombs).fill('bomb')
        const emptyArray = Array(width*width - bombs).fill('valid')
        gameArray = emptyArray.concat(bombsArray)
        shuffleArray(gameArray)
        const shuffledArray = gameArray.sort(() => Math.random() -0.5)
          //console.log(gameArray.length -2)
        for (let i = 0; i < width*width; i++) {
            const sq = document.createElement('div')
            sq.setAttribute('id', i)
            sq.classList.add(shuffledArray[i])
            grid.appendChild(sq)
            sqs.push(sq)
           // console.log(sqs.length)

            //normal click
            sq.addEventListener('click', function(e) {
                click(sq)
            })
            // ctrl click
            sq.oncontextmenu = function(e) {
                e.preventDefault()
                addFlag(sq)
            }
        }


        // add numbers
        for (let i = 0; i < sqs.length; i++) {
            let total = 0
            const lEdge = (i % width === 0)
            const rEdge = (i % width === width - 1)

            if (sqs[i].classList.contains('valid')) {
                if (i > 0 && !lEdge && sqs[i -1].classList.contains('bomb')) total++
                if (i > 9+scale && !rEdge && sqs[i +1 -width].classList.contains('bomb')) total++
                if (i >= 10+scale && sqs[i -width].classList.contains('bomb')) total++
                if (i >= 11+scale && !lEdge && sqs[i -1 -width].classList.contains('bomb')) total++
                if (i <=  gameArray.length -2 && !rEdge && sqs[i +1].classList.contains('bomb')) total++
                if (i <  gameArray.length -width && !lEdge && sqs[i -1 +width].classList.contains('bomb')) total++
                if (i <=  gameArray.length -width -2 && !rEdge && sqs[i +1 +width].classList.contains('bomb')) total++
                if (i <=  gameArray.length -width -1 && sqs[i +width].classList.contains('bomb')) total++
                sqs[i].setAttribute('data', total)

            }
        }

    }
    createBoard()

    function addFlag(sq) {
        if (isGameOver) return
        
        if (!sq.classList.contains('checked') ) {
            if 
            (!sq.classList.contains('flag')) {
                if(flags==bombs)return
                sq.classList.add('flag')
                sq.innerHTML = '🚩'
                flags++
                flagsLeft.innerHTML = bombs - flags
                
                win()
            } else {
                sq.classList.remove('flag')
                sq.innerHTML = ''
                flags--
                flagsLeft.innerHTML = bombs - flags
            }
        }
        else{
            if( sq.classList.contains('flag')){
                sq.classList.remove('flag')
                sq.innerHTML = ''
                flags--
                flagsLeft.innerHTML = bombs - flags
            }
        }

    }

    //click actions
    function click(sq) {
        let currentId = sq.id
        if (isGameOver) return
        if (sq.classList.contains('checked') ) return
        if(sq.classList.contains('flag'))return
        if( sq.classList.contains('flag')&&sq.classList.contains('checked') ){
            sq.classList.remove('flag')
            sq.innerHTML = ''
            flags--
            flagsLeft.innerHTML = bombs - flags
            
        }
        if (sq.classList.contains('bomb')) {
            gameOver(sq)
        }
        else {
            let total = sq.getAttribute('data')
            if (total !=0) {
                sq.classList.add('checked')
                if (total == 1) sq.classList.add('one')
                if (total == 2) sq.classList.add('two')
                if (total == 3) sq.classList.add('three')
                if (total == 4) sq.classList.add('four')
                sq.innerHTML = total
                return
            }
            checksq(sq, currentId)
            
        }
        sq.classList.add('checked')

    }


    // check squares for empty

    function checksq(sq, currentId) {
        const Ledge = (currentId % width === 0)
        const Redge = (currentId % width === width -1)

        setTimeout(() => {
           
            if (currentId > 0 && !Ledge) {
                const newId = sqs[parseInt(currentId) -1].id
                const newSq = document.getElementById(newId)
                click(newSq)
            }
            if (currentId > 9 +scale && !Redge) {

                const newId = sqs[parseInt(currentId) +1 - width].id
                const newSq = document.getElementById(newId)
                click(newSq)
            }
            if (currentId > 10 +scale) {
                const newId = sqs[parseInt(currentId -width)].id
                const newSq = document.getElementById(newId)
                click(newSq)
            }
            if (currentId > 11 +scale && !Ledge) {
                const newId = sqs[parseInt(currentId) -1 -width].id
                const newSq = document.getElementById(newId)
                click(newSq)
            }
            if (currentId < gameArray.length -2 && !Redge) {

                const newId = sqs[parseInt(currentId) +1].id
                const newSq = document.getElementById(newId)
                click(newSq)
            }
            if (currentId < gameArray.length  -width && !Ledge) {
                const newId = sqs[parseInt(currentId) -1 +width].id
                const newSq = document.getElementById(newId)
                click(newSq)
            }
            if (currentId < gameArray.length  -width -2 && !Redge) {
                const newId = sqs[parseInt(currentId) +1 +width].id
                const newSq = document.getElementById(newId)
                click(newSq)
            }
            if (currentId < gameArray.length  -width) {
                const newId = sqs[parseInt(currentId) +width].id
                const newSq = document.getElementById(newId)
                click(newSq)
            }
        }, 10)
    }

    // game end
    function gameOver(sq) {
        console.log('KABOOM ! Game Over')
        isGameOver = true

        //show bombs
        sqs.forEach(sq => {
            if (sq.classList.contains('bomb')) {
                sq.innerHTML = '💣'
            }
        })
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
        let match = 0
        for (let i = 0; i < sqs.length; i++) {
            if (sqs[i].classList.contains('flag') && sqs[i].classList.contains('bomb')) {
                match++
            }
            if (match === bombs) {
                console.log('You Win!')
            }
        }
    }
    




















})