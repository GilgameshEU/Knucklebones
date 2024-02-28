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
        <?php for ($i = 1; $i <= 9; $i++) { ?>
            <div class="cell" id="cell<?= $i ?>"></div>
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



</body>

</html>


