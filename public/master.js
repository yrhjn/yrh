document.addEventListener("DOMContentLoaded", function() {
    var dataTable = document.getElementById("data-table");
  
    for (var i = 0; i < 20; i++) {
      var newRow = dataTable.insertRow(-1); // -1は最後に行を追加することを指定
  
      for (var j = 0; j < 9; j++) {
        var cell = newRow.insertCell(j);
        cell.textContent = ""; // 適切なデータに変更
      }
    }
  });


  
// 保存処理
// 保存処理
async function saveInputForm() {
    const hirenumber = document.getElementById('hire-number').value;
    const hireCompany = document.getElementById('hire-company').value;

    console.log('hire-number:', hirenumber);
  
  
    // 保存処理を行う（サーバーにデータを送信する）
    const response = await fetch('/saveData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hirenumber: hirenumber,
        hireCompany: hireCompany,
      }),
    });
  
    if (response.ok) {
      console.log('データが保存されました。');
      // データの再読み込み
      loadAndDisplayData();
    } else {
      console.error('データの保存中にエラーが発生しました。');
    }
  }
  
  // 保存ボタンを押した時に呼び出される関数
function saveAndLoadData(rowId) {
    saveInputForm(rowId);
  }
  // 例として、loadAndDisplayData 関数を定義
  async function loadAndDisplayData() {
    // データを読み込んで表示する処理を実装
  }
  

  