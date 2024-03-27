<?php
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

class GameBoardComponent extends CBitrixComponent implements \Bitrix\Main\Engine\Contract\Controllerable, \Bitrix\Main\Errorable

{
    private $errorCollection;
    private $currentState;

    public function __construct($component = null)
    {
        parent::__construct($component);
        $this->errorCollection = new \Bitrix\Main\ErrorCollection();
    }

    public function executeComponent()
    {
        $this->loadState(); // Загружаем состояние игрового поля
        $this->arResult['currentState'] = $this->currentState; // Передаем состояние игрового поля в шаблон
        $this->includeComponentTemplate();
    }

    public function configureActions()
    {
        return [
            'saveState' => ['prefilters' => []], // AJAX-метод для сохранения состояния игрового поля
        ];
    }

    public function getErrors()
    {
        return $this->errorCollection->toArray();
    }

    public function getErrorByCode($code)
    {
        return $this->errorCollection->getErrorByCode($code);
    }

    public function saveStateAction($state)
    {

        $filePath = $_SERVER['DOCUMENT_ROOT'] . '/local/game_state.json';

        // Конвертируем массив состояния игры в JSON
        $jsonData = json_encode($state);

        // Записываем JSON данные в файл
        if (file_put_contents($filePath, $jsonData) !== false) {
            // Если запись прошла успешно, возвращаем статус успеха
            return ['status' => 'success', 'errors' => []];
        } else {
            // Если запись не удалась, возвращаем ошибку
            return ['status' => 'error', 'errors' => [['message' => 'Failed to save game state.']]];
        }
    }

    public function loadState()
    {
        // Здесь реализуйте код для загрузки состояния игрового поля из хранилища
        // Например, загрузка из файла JSON или из базы данных

        // Пример загрузки из файла JSON:
        $filePath = $_SERVER['DOCUMENT_ROOT'] . '/local/game_state.json';
        $json = file_get_contents($filePath);
        $this->currentState = json_decode($json, true);
    }

    public function clearGameStateFileAction()
    {
        $filePath = $_SERVER['DOCUMENT_ROOT'] . '/local/game_state.json';

        // Очищаем содержимое файла
        if (file_put_contents($filePath, '') !== false) {
            // Если очистка прошла успешно, возвращаем статус успеха
            return ['status' => 'success'];
        } else {
            // Если очистка не удалась, возвращаем ошибку
            return ['status' => 'error', 'message' => 'Failed to clear game state file.'];
        }
    }


}
