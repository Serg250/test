<?php
$out['count'] = $_POST['count'] + 1;
print_r(json_decode($_POST[0],true));
$fd = fopen("rating.txt", 'r') or die("не удалось открыть файл");
//Считать данные из файла
$str1 = fgets($fd);
fclose($fd);
$arr = json_decode($str1, true);
$out['rat'] = (int)$arr['rat'] + (int)$_POST['rat'];
$out['count'] = (int)$out['count'];
//Вычислить среднее значение
$out['all'] = round($out['rat'] / $out['count']);
$data_json = json_encode($out, JSON_UNESCAPED_UNICODE);
$fd = fopen("rating.txt", 'w') or die("не удалось открыть файл");
//Записать в файл
fwrite($fd, $data_json);
fclose($fd);
//Вернуть данные
echo $data_json;
?>
