const tiles = Array.from(document.getElementsByClassName('tile'))
let current_tile
let tile_number = 0
let current_line = 0
const test = document.getElementById('test');
document.addEventListener('keydown', function(event) {
    let letter = event.key.toLowerCase()
    setCurrentTile()
     if (/^[а-я]$/i.test(letter)) { 
        if (current_tile.innerHTML == '') {
            current_tile.innerHTML = letter;
        } 
        else {
            tile_number += 1
            setCurrentTile()
            current_tile.innerHTML = letter;
        }
    } else if(letter == 'enter' && current_tile.innerHTML.trim() != "") {
    } else if(letter == 'backspace') {
        delete_letter()
        console.log(tile_number)
    }
})


function setCurrentTile() {
    current_tile = tiles[tile_number]
}

function delete_letter() {
    if (tile_number != 0) {
        current_tile.innerHTML = ''
        tile_number -= 1
    } else {
        current_tile.innerHTML = ''
    }
}

