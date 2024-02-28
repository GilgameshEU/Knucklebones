<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");

/**
 * @global CMain $APPLICATION
 */
$APPLICATION->IncludeComponent(
    "pev:game.board",
    ".default",
    array(),
    false
);

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");
