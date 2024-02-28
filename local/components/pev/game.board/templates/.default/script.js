document.addEventListener('DOMContentLoaded', function() {
    const dice = document.querySelector('.dice');
    const cells = document.querySelectorAll('.cell');

    let diceResult = null; // Variable to store the result of the dice roll
    let diceRolled = false; // Flag to track if dice has been rolled

    const randomDice = () => {
        const random = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
        diceResult = random; // Store the result of the dice roll
        rollDice(random);
        diceRolled = true; // Set the flag to true after rolling the dice
    }

    const rollDice = random => {
        dice.style.animation = 'rolling 4s';

        setTimeout(() => {
            // Set the transform based on the dice result
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

    // Function to handle dice click event
    const diceClickHandler = () => {
        if (!diceRolled) { // Check if dice has not been rolled yet
            randomDice();
        }
    }

    // Add click event listener to the dice
    dice.addEventListener('click', diceClickHandler);

    // Function to handle cell click event
    const cellClickHandler = (event) => {
        if (!diceRolled) { // Check if dice has been rolled
            return; // If dice has not been rolled, do not allow cell insertion
        }
        const cell = event.target;
        const cellNumber = parseInt(cell.id.replace('cell', ''), 10);
        if (!cell.textContent.trim()) { // Check if the cell is empty
            cell.textContent = diceResult; // Set the content of the cell to the dice result
            diceRolled = false; // Reset the flag after inserting value into a cell
        }
    }

    // Add click event listener to each cell
    cells.forEach(cell => {
        cell.addEventListener('click', cellClickHandler);
    });
});
