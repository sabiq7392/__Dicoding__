
const CACHE_KEY = "calculation_history";
// Variabel ini digunakan sebagai key untuk mengakses dan menyimpan data pada localStorage.

function checkStorage() {
    return typeof(Storage) !== "undefined";
}

function putHistory(data) { //  fungsi untuk menyimpan data riwayat kalkulasi pada localStorage
    if (checkStorage()) {
        let historyData = null;

        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        }
        else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY)); /* JSON.parse berfungsi untuk merubah nilai objek yang tadinya berubah 
            menjadi string akan diubah kembali menjadi objek. 
            
            ini bersangkutan dengan JSON.stringify di akhir kode
            */
        }

        historyData.unshift(data); /* fungsi unshift() digunakan untuk menambahkan nilai baru pada array yang ditempatkan pada awal index. 
        Fungsi ini juga mengembalikan nilai panjang array setelah ditambahkan dengan nilai baru.
        */

        if (historyData.length > 5) {
            historyData.pop(); /*  Fungsi pop() merupakan fungsi untuk menghapus nilai index terakhir pada array, 
            sehingga ukuran array historyData tidak akan pernah lebih dari 5. 
            Hal ini kita terapkan agar riwayat kalkulasi yang muncul adalah lima hasil kalkulasi terakhir oleh pengguna.
            */
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData)); /* JSON.stringify berfungsi untuk mengubah objek menjadi string,
        ini dilakukan karena local storage hanya bisa menyimpan data primitf seperti string
        */
    }
}

function showHistory() { // fungsi untuk mendapatkan data dari localStorage.
    if (checkStorage) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    }
    else {
        return [];
    }
}

function renderHistory() { // fungsi untuk merender data riwayat kalkulasi pada tabel HTML
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");

    // selalu hapus kontent HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";

    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row);
    }
}
renderHistory(); // agar data history muncul ketika website pertama kali dijalankan.