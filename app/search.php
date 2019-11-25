<?php

/**
 * Подключить библиотеку google/apiclient
 *    $ composer require google/apiclient:~2.0
 */
if (!file_exists(__DIR__ . '/vendor/autoload.php')) {
//    throw new \Exception('please run "composer require google/apiclient:~2.0" in "' . __DIR__ .'"');
//    throw new \Exception(' Запустите: "composer require google/apiclient:~2.0" в директории "' . __DIR__ .'"');

try {
    throw new Exception(' Запустить: "composer require google/apiclient:~2.0" в директории "' . __DIR__ .'"');
} catch(Exception $e) {
    echo '<div class="exception">';
    echo "Для работы поиска видео необходимо:<br>";
    echo $e->getMessage();
    echo "Или разархивировать vendor.zip в нужную папку<br>";
    echo '</div>';

    die();
}

}

require_once __DIR__ . '/vendor/autoload.php';


//Если есть запрос
if (isset($_GET['q'])) {
    /*
     * Установить"API key"  https://cloud.google.com/console
     *
     */
    $DEVELOPER_KEY = 'AIzaSyBivBMMrsDnhO1ItnvLx3hHd7dIWgKaCYQ';

    $client = new Google_Client();
    $client->setDeveloperKey($DEVELOPER_KEY);

    $youtube = new Google_Service_YouTube($client);

    $htmlBody = '';
    try {
//        Получить список размером 5
        $searchResponse = $youtube->search->listSearch('id,snippet', array(
            'q' => $_GET['q'],
            'maxResults' => 5,
        ));

        $videos = '';

        //Вывести список
        foreach ($searchResponse['items'] as $searchResult) {
            $videos .= sprintf('<li><a href="https://www.youtube.com/watch?v=%s">%s</a></li>',
                $searchResult['id']['videoId'],$searchResult['snippet']['title']);
        }

        $htmlBody .= <<<END
    <h3>Videos</h3>
    <ul>$videos</ul>
END;
    } catch (Google_Service_Exception $e) {
        $htmlBody .= sprintf('<p>A service error occurred: <code>%s</code></p>',
            htmlspecialchars($e->getMessage()));
    } catch (Google_Exception $e) {
        $htmlBody .= sprintf('<p>An client error occurred: <code>%s</code></p>',
            htmlspecialchars($e->getMessage()));
    }
}
?>