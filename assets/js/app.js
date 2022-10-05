document.addEventListener('DOMContentLoaded',() =>{
    const grid = document.querySelector('.grid')
    let width =10
    let bombAmount=20
    let sqs = []
    let isGameOver = false
    //create Board
    function createBoard(){
        //get shuffled game array
        const bombsArray = Array(bombAmount).fill('bomb')
        const emptyArray = Array(width*width - bombAmount).fill('valid')
        const gameArray = emptyArray.concat(bombsArray)
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5)
       
    for(let i =0;i<width*width;i++){
        const sq =document.createElement('div')
        sq.setAttribute('id', i)
        sq.classList.add(shuffledArray[i])
        grid.appendChild(sq)
        sqs.push(sq)


        //normal click
        sq.addEventListener('click',function(e){
            click(sq)
        })
}


// add numbers
for (let i=0;i<sqs.length;i++){
    let total = 0
    const lEdge = (i % width === 0)
    const rEdge =( i % width === width -1)
    
    if(sqs[i].classList.contains('valid')){
        if(i>0 && !lEdge && sqs[i-1].classList.contains('bomb')) total ++
        if(i>9 && !rEdge && sqs[i+1 -width].classList.contains('bomb')) total ++
        if(i>10 && sqs[i-width].classList.contains('bomb')) total ++
        if (i>11 && !lEdge && sqs[i -1 -width].classList.contains('bomb')) total ++
        if ( i< 98 &&!rEdge && sqs[i+1].classList.contains('bomb')) total ++
        if ( i<90 && !rEdge  && sqs[i -1 +width].classList.contains('bomb')) total ++
        if ( i<88 && !rEdge  && sqs[i +1 +width].classList.contains('bomb')) total ++
        if ( i<89 && !rEdge  && sqs[i +width].classList.contains('bomb')) total ++
        sqs[i].setAttribute('data',total)
        console.log(sqs)
    }
}

}
createBoard()


    //click actions
    function click(sq){
        let currentId = sq.id
        if(isGameOver) return
        if(sq.classList.contains('checked') || sq.classList.contains('flag')) return
        if(sq.classList.contains('bomb')){
            console.log('Game Over')}
            else{
                let total = sq.getAttribute('data')
                if(total !=0) {
                    sq.classList.add('checked')
                    sq.innerHTML = total
                    return
                }
                checksq(sq, currentId)
            }
                sq.classList.add('checked')
        }
    

// check squares for empty

function checksq(sq, currentId){
const Ledge = (currentId % width ===0)
const Redge = (currentId % width === width -1)

    setTimeout(() =>{
        if ( currentId > 0 && !Ledge ) {
            const newId = sqs[parseInt(currentId) -1].id
            const newSq = document.getElementById(newId)
            click(newSq)
        }
        if(currentId > 9 && !Redge){
            
            const newId = sqs[parseInt(currentId) +1 -width].id
            const newSq = document.getElementById(newId)
            click(newSq)
        }
        if(currentId > 10){
            const newId = sqs[parseInt(currentId - width)].id
            const newSq = document.getElementById(newId)
            click(newSq)
        }
        if ( currentId > 11 && !Ledge ) {
            const newId = sqs[parseInt(currentId) -1 -width].id
            const newSq = document.getElementById(newId)
            click(newSq)
        }
        if(currentId < 98 && !Redge){
            
            const newId = sqs[parseInt(currentId) +1 ].id
            const newSq = document.getElementById(newId)
            click(newSq)
        }
        if ( currentId < 90 && !Ledge ) {
            const newId = sqs[parseInt(currentId) -1 + width].id
            const newSq = document.getElementById(newId)
            click(newSq)
        }
        if ( currentId < 88 && !Redge ) {
            const newId = sqs[parseInt(currentId) +1 +width].id
            const newSq = document.getElementById(newId)
            click(newSq)
        }    
        if ( currentId < 89 ) {
            const newId = sqs[parseInt(currentId) +width].id
            const newSq = document.getElementById(newId)
            click(newSq)
        }    
    }, 10)

    
}






















})