'use strict';
class MyRating {
    /**
     *
     * @param element
     * @param rating
     * @param taboo
     */
    constructor(element, rating, taboo) {
        this.rating = rating;
        this.element = document.getElementById(element);
        this.outHtml();
        this.taboo = taboo;
        this.setRating(this.rating);
        if (this.taboo) {
            this.element.classList.add('on');
        } else {
            this.element.classList.add('off');
        }
        this.createEvent(this.element);

    }

    getRating() {
        return this.rating;
    }

    /**
     * Первоначальная установка рейтинга
     * @param new_rating
     * @returns {*}
     */
    setRating(new_rating = this.rating) {
        if (new_rating < 1) {
            new_rating = 1
        }
        if (new_rating > 5) {
            new_rating = 5
        }
        let i = 5;
        this.el = document.getElementsByClassName('star');
        for (let elem of this.el) {
            if (i == new_rating) {
                elem.checked = true;
            }
            i--;
        }
        return this.rating = new_rating;
    }

    /**
     * Изменение рейтинга
     * @param new_rating
     * @returns {*}
     */
    newRating(new_rating) {
        if (this.taboo) {
            let i = 5;
            this.el = document.getElementsByClassName('star');
            for (let elem of this.el) {
                if (i == new_rating) {
                    elem.checked = true;
                }
                i--;
            }
            this.element.classList.remove('on');
            this.element.classList.add('off');
            this.createEvent(this.element);
            this.taboo = false;
            return this.rating = new_rating;
        } else {
            return false;
        }


    }

    /**
     * Создание html
     * @returns {boolean}
     */
    outHtml() {
        let HTML = '';
        let i = 5;
        while (i > 0) {
            HTML = HTML + '<input class="star" type="radio" id="star-' + i + '" name="rating" value="' + i + '"><label for="star-' + i + '" title="Оценка «' + i + '»"></label>'
            i--;
        }
        this.element.innerHTML = HTML;
        this.setRating();
        return true;
    }

    /**
     *
     * @param elem
     * @returns {boolean}
     */
    createEvent(elem) {
        if (elem.classList.contains('on')) {
            elem.onmouseover = function () {
                let i = 4;
                while (i > -1) {
                    elem.querySelectorAll('.star')[i].checked = false;
                    i--;
                }
            };
            this.element.onmouseout = function () {
                rating.setRating();
            };
            let a = document.querySelectorAll('.star');
            [].forEach.call(a, function (el) {
                el.onclick = function (e) {
                    rating.setRating(1);
                    return false;
                }
            });
            return false;
        } else {
            elem.onmouseover = function () {
                return false;
            };
        }

        return true;

    }

    /**
     * Отправка ajax
     * @param value
     * @param count
     */
    send(value, count) {
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

                // console.log(obj);
                // Здесь мы можем обращаться к свойству объекта и получать	его значение
                console.log(obj.all);
                rating.setRating(Number.parseInt(obj.all));
                document.getElementById('count').innerHTML = obj.count;
                document.getElementById('rat').innerHTML = obj.all;
            }
        });

        request.send(params);
    }

    /**
     * Установить cookies
     */
    set_cookie() {
        // +10 день от текущей даты
        let date = new Date(Date.now() + 864000e3);
        date = date.toUTCString();
        document.cookie = "rating=yes; expires=" + date;
        return true;
    }
    /**
     * Считать cookies
     */
    get_cookie() {
        var results = document.cookie.match('(^|;) ?rating=([^;]*)(;|$)');

        if (results)
            return (unescape(results[2]));
        else
            return null;
    }
}
