import { isCharInWord } from "./scripts/wordp.mjs"
import "./scripts/bootstrap.min.js"


const tiles = Array.from(document.getElementsByClassName('tile'))
const myModal = new bootstrap.Modal(document.getElementById('myModal'))
let current_tile
let tdaywordarr = []
let tile_number = 0
let row_number = 0
let today_word;
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
            if (get_word() == today_word) {
                shwmdl("Вы победили")
                document.removeEventListener('keydown', main)
            }
        } else {
            console.log('Не последняя строка')
        }
    } else if(letter == 'backspace') {
        delete_letter()
        console.log(tile_number)
    }
}

function changetilecolors(isdark) {
    document.getElementById('mdw1').classList.add('dark');
    if (isdark == true) {
        tiles.forEach(element => {
            element.classList.add("dark")
        });

    } else {
        document.getElementById('mdw1').classList.remove('dark');
        tiles.forEach(element => {
            element.classList.remove("dark")
        });
    }
}

document.getElementById('theme-btn').onclick = () => {
    if (localStorage.getItem("theme") == "light") {
        localStorage.setItem("theme", "dark")
        changetilecolors(true)
        document.body.classList.add("changeTheme")
    } else {
        localStorage.setItem("theme", "light")
        changetilecolors(false)
        document.body.classList.remove("changeTheme")
    }
}
    
document.getElementById('theme-btn').onkeydown = function(event) {
    if(event.keyCode == 13) {
        event.preventDefault();
        return false;
    }
}




 async function shwmdl(txt) {
    await myModal.show(myModal)
    document.getElementById('exampleModalLabel').innerHTML = txt
    document.getElementById('wrd').innerHTML = `Словом было "${today_word}"`
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


async function getTodayWord() {
    let response = await fetch("https://wordle.belousov.one/api/v2/daily/?lang=ru")
    let json = await response.json()
    today_word = json.data.word
    tdaywordarr = today_word.split('').reverse()
    console.log(today_word)
    console.log(tdaywordarr)
}


function get_word() {
    let word = ''
    for (let i = tile_number-5; i < tile_number; i++){  
        let curTile = tiles[i].innerHTML;
        word += curTile
    }
    return word
}


function compleate_row() {
    let b = 0;
    for (let i = tile_number; i > tile_number-5; i--) {
        if(isCharInWord(tiles[i].innerHTML, today_word) == true) {
            if (tiles[i].innerHTML == tdaywordarr[b]) {
                tiles[i].style.backgroundColor = 'green';
                tiles[i].style.color = 'white';
            }else {
                console.log(tdaywordarr[b])
                tiles[i].style.backgroundColor = 'orange';
                tiles[i].style.color = 'white';
            }
        } else {
            tiles[i].style.backgroundColor = 'red';
            tiles[i].style.color = 'white';
        }
        b += 1
    }
}

function win() {
    if (row_number == 5) {
        shwmdl("Вы проиграли")
        document.removeEventListener('keydown', main)
    } else {
        return
    }
}
    

getTodayWord()
changTheme()