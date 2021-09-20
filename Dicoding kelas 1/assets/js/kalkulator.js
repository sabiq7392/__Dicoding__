console.log("sabiq");

/*
    objek ini sebagai tempat menyimpan data dan kondisi pada calculator, 
    di mana angka yang muncul pada layar kalkulator selalu diambil dari 
    data calculator.displayNumber. 
*/
const calculator = { 
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

//=============

/* 
    selanjutnya kita buat fungsi - fungsi umum yang dilakukan 
    kalkulator seperti meng-update angka pada layar dan menghapus data
    pada kalkulator.
*/
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}
  
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

//=============

/* 
    fungsi untuk memasukkan angka ke dalam nilai displayNumber 
    kalkulator.
*/
function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    }
    
    else {
        calculator.displayNumber += digit; 
    }
    
}

//==============

function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1; // angka akan di kalikan bilangan negatif dan membuat angka yang tercetak bernilai negatif
}

function handleOperator(operator) { // (operator) berfungsi untuk menyimpan operator + - yang nanti akan 
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator; // dicetak disini
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
 
        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan')
    }
}

function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) { // kode ini akan berjalan ketika firstNumber dan Operator tidak ada isi
        alert("Anda belum menetapkan operator");
        return;
    }
  
    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } 

    else if (calculator.operator === "-") {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    } 

    else if (calculator.operator === "/") {
        result = parseInt(calculator.firstNumber) / parseInt(calculator.displayNumber);
    }
    
    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}
//=============
// Logika atau alur kalkulator ada disini

const buttons = document.querySelectorAll(".button");
for (let button of buttons) { 
    button.addEventListener('click', function(event) { 
        // (event) argumen kosong yang nanti akan menampung value dari html yang kita klik
        
        const target = event.target; /* apa fungsi dan kenapa ini dibuat?  
        ketika kita klik, value dari html akan tersimpan di event, 
        namun event itu sebuah argumen, argumen tidak bisa langusung direturn dan dicetak layaknya variabel,
        argumen membutuhkan variabel untuk mewakili agar nanti isi dari argumen bisa dicetak
        */

        
        if (target.classList.contains('clear')) { // terjadi pengecekan isi dari const target, apakah yang elemen diklik di html memiliki class .clear
            clearCalculator();
            updateDisplay();
            return;
        }

        else if (target.classList.contains('negative')) { // ~~ apakah elemen yang diklik memiliki class .negative
            inverseNumber();
            updateDisplay();
            return;
        }

        else if (target.classList.contains('equals')) { // ~~ apakah elemen yang diklik memiliki class .equals
            performCalculation();
            updateDisplay();
            return;
        }
  
        else if (target.classList.contains('operator')) { // ~~ apakah elemen yang diklik memiliki class .operator
            handleOperator(target.innerText); 
            return;
        }
        
        inputDigit(target.innerText);
        updateDisplay();
    });
}

