<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test</title>
    <link rel="stylesheet" href="css/main.min.css">
    <script  src="js/scripts.min.js"></script>
</head>
<body>
<?php
$fd = fopen("rating.txt", 'r') or die("не удалось открыть файл");
$str = fgets($fd);
$arr = json_decode($str, true);
fclose($fd);
?>
<h2>Рейтинг</h2>
<div class="rat_wrapper">

    <div class="stars" id="rating"></div>
    <div id="count"><?= $arr['count']; ?></div>
    <div id="rat"><?= $arr['all']; ?></div>
</div>

<h2>Прогресс бар</h2>
<div class="progress">

    <div class="progress-bar">
        <span id="fill" class="progress-bar-fill" style="width: 1%">
            <span id="num">1%</span>
        </span>
    </div>
    <select name="sel" id="sel" title="">
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="32">32</option>
        <option value="64">64</option>
    </select>
    <button onclick="jsClick();">go</button>
</div>
<?php include_once __DIR__.'/search.php';?>

<h2>Поиск видео</h2>
<div class="search">

    <form method="GET">
        <div>
            <input type="search" id="q" name="q" placeholder="Поиск видео">
        </div>
        <input type="submit" value="Найти">
    </form>
    <?=$htmlBody?>
</div>

</body>
</html>