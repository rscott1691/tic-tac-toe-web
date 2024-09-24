<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic-Tac-Toe</title>
    <style>
        .grid {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            grid-gap: 10px;
        }
        .cell {
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f0f0f0;
            font-size: 36px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>Tic-Tac-Toe</h1>
    <div class="grid" id="board">
        <!-- Game board cells -->
        <div class="cell" data-row="0" data-col="0"></div>
        <div class="cell" data-row="0" data-col="1"></div>
        <div class="cell" data-row="0" data-col="2"></div>
        <div class="cell" data-row="1" data-col="0"></div>
        <div class="cell" data-row="1" data-col="1"></div>
        <div class="cell" data-row="1" data-col="2"></div>
        <div class="cell" data-row="2" data-col="0"></div>
        <div class="cell" data-row="2" data-col="1"></div>
        <div class="cell" data-row="2" data-col="2"></div>
    </div>

    <p id="message"></p>

    <script>
        const board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        let currentPlayer = "X";

        function printBoard() {
            document.querySelectorAll('.cell').forEach(cell => {
                const row = cell.getAttribute('data-row');
                const col = cell.getAttribute('data-col');
                cell.innerHTML = board[row][col];
            });
        }

        function checkWin() {
            // Check rows
            for (let i = 0; i < 3; i++) {
                if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
                    return board[i][0];
                }
            }
            // Check columns
            for (let i = 0; i < 3; i++) {
                if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "") {
                    return board[0][i];
                }
            }
            // Check diagonals
            if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
                return board[0][0];
            }
            if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
                return board[0][2];
            }
            return null;
        }

        function checkDraw() {
            return board.flat().every(cell => cell !== "");
        }

        function makeMove(row, col) {
            if (board[row][col] === "") {
                board[row][col] = currentPlayer;
                printBoard();

                const winner = checkWin();
                if (winner) {
                    document.getElementById("message").innerText = `Congratulations, player ${winner} wins!`;
                    return;
                }

                if (checkDraw()) {
                    document.getElementById("message").innerText = "The game is a draw.";
                    return;
                }

                currentPlayer = currentPlayer === "X" ? "O" : "X";
            } else {
                document.getElementById("message").innerText = "That space is already taken!";
            }
        }

        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', function () {
                const row = this.getAttribute('data-row');
                const col = this.getAttribute('data-col');
                makeMove(row, col);
            });
        });

        printBoard();
    </script>
</body>
</html>
