// HTML文書が完全に読み込まれたときに実行されるイベントリスナー
document.addEventListener("DOMContentLoaded", function() {
    // テーブル要素を取得
    var dataTable = document.getElementById("data-table");
  
    // 20行のループ
    for (var i = 0; i < 20; i++) {
        // 新しい行をテーブルに挿入（-1は最後に行を追加することを指定）
        var newRow = dataTable.insertRow(-1);
  
        // 9列のループ
        for (var j = 0; j < 9; j++) {
            // 新しいセルを行に挿入
            var cell = newRow.insertCell(j);
            // セルの内容を空に設定（適切なデータに変更することができます）
            cell.textContent = "";
        }
    }
});



  
// 保存処理
// 保存処理
async function saveInputForm() {
    const customernumber = document.getElementById('customernumber').value;//得意先コード
    const customer = document.getElementById('customer').value; //得意先名称

    console.log('customer:', customer);
  
  
    // 保存処理を行う（サーバーにデータを送信する）
    const response = await fetch('/saveData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customernumber: customernumber, //得意先コード
        customer: customer, //得意先名称
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
  