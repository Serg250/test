/**
 * На странице, с которой необходимо отправить запрос ставится функция отправки.
 * В данном примере она вешается на обработчик клика для элемента с id my_test
 * jQuery используется, т.к. практически в любой теме WordPress - jQuery уже подключена
 *
 */

jQuery(function ($) {
    $('#my_test').click(function () {
        $.ajax({
            url: '<?php echo admin_url("admin-ajax.php") ?>',
            type: 'POST',
            data: {
                action: 'my_test',
                data1: 1,
                data2: 3
            }, // передаем объект с данными
            beforeSend: function (x) {
                //Действия до отправки
            },
            success: function (data) {
                //Действия при успехе
                alert(data);
            },
            error: function (data) {
                //Действия при неудачной отправке
                alert('Ошибка');
            },
        });
        // если элемент – ссылка, то не забываем:
        // return false;
    });
});