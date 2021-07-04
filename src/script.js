const btn = document.querySelectorAll(".btn");
const input = document.querySelector("#input-add");
const listsBox = document.querySelector('.section__list');
const lists = document.querySelectorAll('.list');
const alertBox = document.querySelector('.toAdd__inputBox');

let names = [];
let lucks = [];
let luck = '';

const mgsAlert = (text) => {
    const span = document.createElement('span');
    span.classList = ('alert');
    span.innerText = text;
    alertBox.appendChild(span);
    setTimeout(() => {
        alertBox.removeChild(span)
    }, 1000)
}

const getName = (arr) => {
    if (arr.includes(input.value)) {
        mgsAlert('Nome já listado')
    } else if (input.value !== '') {
        arr.push(input.value);
        input.value = '';
    }
}

const makerList = (arr, list) => {
    list.innerHTML = '';
    arr.forEach(value => {
        const item = document.createElement('li');
        item.innerText = value;
        list.appendChild(item);
    })
}

const effectList = (btn, btn2, effect) => {
    if (effect === 1) {
        listsBox.classList.add('hidden');
    } else if (effect === 2) {
        listsBox.classList.remove('hidden');
    }

    btn.classList.add('hidden');
    btn2.classList.remove('hidden')
}

const getRandom = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getLuck = () => {
    const luckName = names[getRandom(names.length - 1, 0)];
    if (lucks.includes(luckName)) {
        getLuck();
    } else {
        luck = luckName;
        lucks.push(luck)
    }
}

const animationDisplay = () => {
    btn[3].disabled = true;
    const display = document.querySelector('.display__text');
    let count = 0;
    const repeat = setInterval(() => {
        if (count < names.length) {
            display.innerText = names[count];
            count++;
        } else {
            count = 0;
        }
    }, 100);

    setTimeout(() => {
        clearInterval(repeat);
        display.innerText = luck;
        btn[3].disabled = false
    }, 2000)
}

btn[0].addEventListener('click', (e) => {
    getName(names)
    makerList(names, lists[0]);
    e.preventDefault();
});

btn[1].addEventListener('click', () => effectList(btn[1], btn[2], 2))// btn[1];

btn[2].addEventListener('click', () => effectList(btn[2], btn[1], 1)); //hidden

btn[3].addEventListener('click', () => {
    if (names.length > 0) {
        getLuck();
        setTimeout(() => {
            makerList(lucks, lists[1]);
        }, 2000)
        animationDisplay();
    } else {
        mgsAlert('Sem participantes');
    }
});

btn[4].addEventListener('click', () => {
    const display = document.querySelector('.display__text');
    lucks = [];
    display.innerHTML = '';
    makerList(lucks, lists[1]);
});