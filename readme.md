# Minesweeper

- Live link - https://caninereason.github.io/portfolio-2/

![alt text](assets/images/mdwg.png)
- For this javascript project I chose to recreate the classic windows game 'Minesweeper', using html, css and javascript. This is a quick puzzle game which many people have played, which requires the player to hunt for mines on a grid, while giving them limited information on where the bombs are located. Once the player clicks on the grid the squares are revealed, and they are shown how many potential bombs lie in the neighbouring squares. The player must use this information to deduce where the bombs are placed, and flag them accordingly. If all the bombs have been flagged then the player wins the game, however should the player click on a bomb, all the bombs explode and the game is over.

## Features
- __Main menu__
  - The game is quite minimal in design, with only a single pop-up modal with which the player can interact and choose difficulty levels. On the initial load of the page this modal explains the rules for the game.
![alt text](assets/images/home.png)
- __Interaction__
  - These rules can be shown or hidden by clicking on the guide button, or while in game they can be accessed by clicking on the face at the top of the game board, which pauses the game timer and stops the user from interacting with the board. The modal can be closed with the x button in the top left corner, however if the player has received a game over or a win, this x will change to a message informing the player to pick a level. This was a design choice to limit the user from being stuck in a finished game and not knowing where to click to reactivate the modal.
 ![alt text](assets/images/lvl.png)
 - __Level Select__
   - The player also has three difficulty options, easy a 10 x 10 board with 10 bombs, medium a 12 x 12 board with 25 bombs, and hard a 15 x 15 board with 50 bombs. Once the player clicks a difficulty level, the modal closes, the timer starts and the game begins. The game may be paused again by clicking the face at the top of the game board. The player can left click on the board to reveal the squares, or right click on the board to place a flag on a square.
![alt text](assets/images/lvls.png)
- __Flags__
   - the number on the top left of the board represents how many flags the player has left, while also representing how many bombs are left to find. Should the player run out of flags and they have not found all the bombs, they must figure out where they have placed a false flag in order to win the game.

- __Timer__
   - The timer will count every second that has passed in the game, unless the game has been paused. Should the timer reach 999 the bombs will explode and the game ends.
   
- __Footer__
   - The footer section contains links to relevant social media networks, opening the default website in a new window.
![alt text](assets/images/foot.png)
## Testing
   - The game has been tested on multiple browsers and devices, and appears to work flawlessly on desktop devices. The game plays quite well on  mobile phones , only requiring the user to long press on the board to place a flag.

## Deployment

- The site was deployed to GitHub pages. The steps to deploy are as follows: 
  - In the GitHub repository, navigate to the Settings tab 
  - From the source section drop-down menu, select the Master Branch
  - Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment. 


## Validation

- HTML
  - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fcaninereason.github.io%2Fportfolio-2)
- CSS
  - No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fcaninereason.github.io%2Fportfolio-2%2Fassets%2Fcss%2Fstyle.css&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)

- JS
  - todo

![alt text](assets/images/lhr.png)
## Credits  
  
  - For the timer I modified this codepen by Srikar G. https://codepen.io/srikarg/pen/kKVJVa
  - For the random bomb placement I used this shufflearray function from codegrepper https://www.codegrepper.com/code-examples/javascript/math+random+sort




# To do
 - tidy up code?
 - more comments
 - bug: phone width screwy?
 - finish readme
 - improve lighthouse?
 - Use CSS media queries across the application to ensure the layout changes appropriately and maintains the page's structural integrity across device screen sizes. 