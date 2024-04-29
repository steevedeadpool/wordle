const input = document.getElementsByClassName('input')
const input2 = document.getElementsByClassName('input2')
const input3 = document.getElementsByClassName('input3')
const input4 = document.getElementsByClassName('input4')
const input5 = document.getElementsByClassName('input5')
const input6 = document.getElementsByClassName('input6')
const btn = document.getElementById('guess');
const h1word = document.getElementById('word'); 
let current_line = 0
const target_word = fetch("https://wordle.belousov.one/api/v2/daily/?lang=ru")
const inputs_array = [Array.from(input), Array.from(input2), Array.from(input3), Array.from(input4), Array.from(input5), Array.from(input6)]
for (let i = 1; i < 6; i++) {
    inputs_array[i].forEach(element => {element.setAttribute('disabled', true);});
}
inputs_array[0].forEach(element => {element.setAttribute("maxlength", '1');});

btn.addEventListener('click', () => {
    if (current_line != 6) {
        if (get_word(current_line) !== null) {
            disable_line(current_line)
            h1word.innerHTML = get_word(current_line)
            current_line += 1
            enable_line(current_line)
        }
    }
    else {
        alert('конец')
    }
})


function disable_line(line) {
    console.log(line)
    inputs_array[line].forEach(element => {
        element.setAttribute('disabled', true)
    });
}
function enable_line(line) {
    console.log(current_line)
    inputs_array[line].forEach(element => {
        element.removeAttribute('disabled')
    });
}





function get_word(line) {
    let word = ''
    inputs_array[line].forEach(element => {
        if (element.value !== null) {
            word += element.value.toUpperCase()
        }
    })
    if (word.length < 5) {
        return null
    }
    else {
        return word
    }
}



function end() {
    
}