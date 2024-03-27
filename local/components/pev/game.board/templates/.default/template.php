<?php

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

?>

<link rel="stylesheet" href="<?= $this->GetFolder() ?>/styles.css">

<!DOCTYPE html>
<html lang="en">

<head>

    <!-- Montserrat Font -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <title></title>


</head>

<body>

<div class="container">

    <div class="board">
        <?php for ($i = 0; $i <= 8; $i++) { ?>
            <div class="cell" id="cell<?= $i ?>">
                <?php
                // Проверяем, есть ли значение для этой ячейки в текущем состоянии
                $cellContent = $arResult['currentState'][$i] ?? '';
                echo $cellContent;
                ?>
            </div>
        <?php } ?>
    </div>

    <div class="dice">
        <div class="face front"></div>
        <div class="face back"></div>
        <div class="face top"></div>
        <div class="face bottom"></div>
        <div class="face right"></div>
        <div class="face left"></div>
    </div>


</div>


<button class="reset-button">Сбросить</button>
</body>

</html>


