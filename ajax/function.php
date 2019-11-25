<?php
//Для обработки ajax запроса добавляются хуки и функция- обработчик в файл function.php

add_action( 'wp_ajax_my_test', 'test_function' );
add_action( 'wp_ajax_nopriv_my_test', 'test_function' );
// первый хук для авторизованных, второй для не авторизованных пользователей

function test_function(){

    $summa = $_POST['Data1'] + $_POST['data2'];
    echo $summa; // Отправка результата

    die; // обработчик закончил выполнение
}