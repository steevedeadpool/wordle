const tiles = Array.from(document.getElementsByClassName('tile'))
let current_tile
let tile_number = 0
let row_number = 0
let current_row = 0
let is_last = false
const word = document.getElementById('word');
const test = document.getElementById('test');
document.addEventListener('keydown', main)


function main(event) {
    let letter = event.key.toLowerCase()
    setCurrentTile()
     if (/^[а-я]$/i.test(letter)) { 
        if (current_tile.innerHTML == '') {
            current_tile.innerHTML = letter
        } 
        else {
            if (tile_number == 29) {
            } else {
                if (current_tile.getAttribute('data-last') != 'true') {
                    tile_number += 1
                    setCurrentTile()
                    current_tile.innerHTML = letter;
                } else {
                    console.log("стрка закончена")
                }
                
            }
        }
    } else if(letter == 'enter') {
        win()
        if (current_tile.getAttribute('data-last') == 'true') { 
            compleate_row()
            row_number +=1  
            tile_number += 1
            console.log(row_number)
            word.innerHTML = get_word()
        } else {
            console.log('Не последняя строка')
        }
    } else if(letter == 'backspace') {
        delete_letter()
        console.log(tile_number)
    }
}


function setCurrentTile() {
    if (tiles[tile_number] != undefined) {
        current_tile = tiles[tile_number]
    }
}

function delete_letter() {
    if (tile_number != 0 && tiles[tile_number-1].getAttribute('data-last') != 'true') {
        current_tile.innerHTML = ''
        tile_number -= 1
    } else {
        current_tile.innerHTML = ''
    }
}


function to_next_row() {

}
function get_word() {
    let word = ''
    word += tiles[tile_number-5].innerHTML
    word += tiles[tile_number-4].innerHTML
    word += tiles[tile_number-3].innerHTML
    word += tiles[tile_number-2].innerHTML
    word += tiles[tile_number-1].innerHTML
    return word
}


function compleate_row() {
    tiles[tile_number].style.color = 'red'
    tiles[tile_number-1].style.color = 'red'
    tiles[tile_number-2].style.color = 'red'
    tiles[tile_number-3].style.color = 'red'
    tiles[tile_number-4].style.color = 'red'
}

function win() {
    if (row_number == 5) {
        alert('конец игры')
        document.removeEventListener('keydown', main)
    } else {
        return
    }
}