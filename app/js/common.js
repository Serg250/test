'use strict';

window.onload = function () {
    let elem = document.getElementById('rating');
    let rat = Number.parseInt(document.getElementById('rat').textContent);
    let temp_rat = rat;

    init(rat, false, elem, rat);
    setRatingInit();

    let block = document.getElementById('rating');
    block.onmouseover = function (e) {
        temp_rat = delCheck(temp_rat);

    };
    block.onmouseout = function (e) {
        let rat = Number.parseInt(document.getElementById('rat').textContent);
        setRating(rat);
    };
    let ser = serial();
    ElClick();

};

/**
 * Считывание аттрибута checked
 * @returns {*}
 */
function serial() {
    let a = document.querySelectorAll('.star');
    for (let el of a) {
        if (el.hasAttribute('checked')) {

            return el.value;
        }
    }
    return false;
}

/**
 * Инициализация
 * @param rating
 * @param zapret
 * @param elem
 */
function init(rating, zapret = false, elem) {

    outHtml(elem);
    setClass();

}

/**
 * События при клике
 * @constructor
 */
function ElClick() {
    let a = document.querySelectorAll('.star'),
        id = document.getElementById('rating');
    [].forEach.call(a, function (el) {
        el.onclick = function (e) {
            if (id.classList.contains('on')) {
                let count = Number.parseInt(document.getElementById('count').textContent);
                send(el.value, count);
            }
            return false;
        }
    });
}

/**
 * Создание html звезд
 * @param elem
 * @returns {boolean}
 */
function outHtml(elem) {
    let HTML = '';
    let i = 5;
    while (i > 0) {
        HTML = HTML + '<input class="star" type="radio" id="star-' + i + '" name="rating" value="' + i + '"><label for="star-' + i + '" title="Оценка «' + i + '»"></label>'
        i--;
    }
    elem.innerHTML = HTML;
    return true;
}

/**
 * Считывание cookies
 * @returns {*}
 */
function get_cookie() {
    let results = document.cookie.match('(^|;) ?rating=([^;]*)(;|$)');

    if (results)
        return (unescape(results[2]));
    else
        return false;
}

/**
 * Установка cookies
 * @returns {boolean}
 */
function set_cookie() {
    // +10 день от текущей даты
    let date = new Date(Date.now() + 864000e3);
    date = date.toUTCString();
    document.cookie = "rating=yes; expires=" + date;
    return true;
}

/**
 * Изменение класса
 */
function setClass() {
    if (!get_cookie()) {
        document.getElementById('rating').classList.add('on');
        document.getElementById('rating').classList.remove('off');
    } else {
        document.getElementById('rating').classList.add('off');
        document.getElementById('rating').classList.remove('on');
    }
}
/**
 * Начальная установка рейтинга
 * @param new_rating
 * @returns {*}
 */
function setRatingInit() {
    let ratInit = Number.parseInt(document.getElementById('rat').textContent);
    let i = 5;
    let el = document.getElementsByClassName('star');
    for (let elem of el) {
        if (i == ratInit) {
            elem.checked = true;
        }
        i--;
    }
    return true;
}

/**
 * Установка рейтинга
 * @param new_rating
 * @returns {*}
 */
function setRating(new_rating) {
    if (!get_cookie()) {
        if (new_rating < 1) {
            new_rating = 1
        }
        if (new_rating > 5) {
            new_rating = 5
        }
        let i = 5;
        let el = document.getElementsByClassName('star');
        for (let elem of el) {
            if (i == new_rating) {
                elem.checked = true;
            }
            i--;
        }
    }
    setClass();
    return new_rating;
}

/**
 * Удаление check при наведении
 * @param temp
 * @returns {*}
 */
function delCheck(temp) {

    if (!get_cookie()) {
        let a = document.querySelectorAll('.star');

        [].forEach.call(a, function (el) {
            el.checked = false;
        });
    }

    return temp;
}

/**
 * ОТправка данных по ajax
 * @param value
 * @param count
 */
function send(value, count) {

    const request = new XMLHttpRequest();
    const url = "data_rating.php";
    const params = "rat=" + value + "&count=" + count;

    //	Здесь нужно указать в каком формате мы будем принимать данные вот и все	отличие
    request.responseType = "json";
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.addEventListener("readystatechange", () => {

        if (request.readyState === 4 && request.status === 200) {
            let obj = request.response;


            // Здесь мы можем обращаться к свойству объекта и получать	его значение
            document.getElementById('count').innerHTML = obj.count;
            document.getElementById('rat').innerHTML = obj.all;
            setRating(Number.parseInt(obj.all));
            let elem = document.getElementById('rating');
            let rat = Number.parseInt(document.getElementById('rat').textContent);
            set_cookie();
        }
    });

    request.send(params);
}

//Progress Bar

function jsClick() {
    let select = document.getElementById("sel");
// Берем значение 64 - за 100% и вычисляем процент
    let data = Number.parseInt(select.value) / 64 * 100;
    document.getElementById("fill").style.width = data + "%";
    document.getElementById("num").innerHTML = data + "%";
    document.getElementById("num").style.right = '10px';
}