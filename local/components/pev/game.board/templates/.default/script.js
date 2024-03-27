document.addEventListener('DOMContentLoaded', function() {
    const dice = document.querySelector('.dice');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.querySelector('.reset-button'); // Выбираем кнопку сброса

    let diceResult = null;
    let diceRolled = false;
    let currentState = null; // Объявляем переменную currentState в глобальной области видимости

    const randomDice = () => {
        const random = Math.floor(Math.random() * 6) + 1;
        diceResult = random;
        rollDice(random);
        diceRolled = true;
    }

    const rollDice = random => {
        dice.style.animation = 'rolling 4s';
        setTimeout(() => {
            dice.style.transform = `rotateX(${getRotateX(random)}) rotateY(${getRotateY(random)})`;
            dice.style.animation = 'none';
        }, 4050);
    }

    const getRotateX = random => {
        switch (random) {
            case 1: return '0deg';
            case 6: return '180deg';
            case 2: return '-90deg';
            case 5: return '90deg';
            default: return '0deg';
        }
    }

    const getRotateY = random => {
        switch (random) {
            case 1: return '0deg';
            case 3: return '90deg';
            case 4: return '-90deg';
            default: return '0deg';
        }
    }

    const diceClickHandler = () => {
        if (!diceRolled) {
            randomDice();
        }
    }

    dice.addEventListener('click', diceClickHandler);

    const cellClickHandler = (event) => {
        if (!diceRolled) {
            return;
        }
        const cell = event.target;
        const cellNumber = parseInt(cell.id.replace('cell', ''), 10);
        if (!cell.textContent.trim()) {
            cell.textContent = diceResult;
            diceRolled = false;
        }

        saveState(); // Вызываем метод сохранения состояния игрового поля после изменения
    }

    cells.forEach(cell => {
        cell.addEventListener('click', cellClickHandler);
    });

    // Функция для сохранения состояния игрового поля через AJAX запрос
    const saveState = () => {
        currentState = []; // Обнуляем массив currentState
        cells.forEach(cell => {
            currentState.push(cell.textContent.trim() || null); // Добавляем содержимое каждой ячейки в массив
        });
console.log(currentState);
        // Отправляем AJAX запрос на сохранение состояния
        BX.ajax.runComponentAction('pev:game.board', 'saveState', {
            mode: 'class',
            data: { state: currentState }
        })
            .then(response => {
                console.log('Состояние успешно сохранено:', response);
            })
            .catch(error => {
                console.error('Ошибка при сохранении состояния:', error);
            });
    }

    resetButton.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.textContent = ''; // Очищаем содержимое каждой ячейки
        });
        currentState = []; // Обнуляем currentState

        // Очищаем файл на сервере
        clearGameStateFile();
    });

// Функция для очистки файла на сервере
    const clearGameStateFile = () => {
        // Отправляем AJAX запрос на очистку файла
        BX.ajax.runComponentAction('pev:game.board', 'clearGameStateFile', {
            mode: 'class'
        })
            .then(response => {
                console.log('Файл игрового состояния успешно очищен:', response);
            })
            .catch(error => {
                console.error('Ошибка при очистке файла игрового состояния:', error);
            });
    }

});
