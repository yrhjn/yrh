// HTML文書が完全に読み込まれたときに実行されるイベントリスナー
document.addEventListener("DOMContentLoaded", function() {
  // テーブル要素を取得
  var dataTable = document.getElementById("data-table");

  // 20行のループ
  for (var i = 0; i < 20; i++) {
      // 新しい行をテーブルに挿入（-1は最後に行を追加することを指定）
      var newRow = dataTable.insertRow(-1);

      // 9列のループ
      for (var j = 0; j < 13; j++) {
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
  const newDate = document.getElementById('new-date').value;
  const dropOffDate = document.getElementById('drop-off-date').value;
  const hireCompany = document.getElementById('hire-company').value;
  const carNumber = document.getElementById('car-number').value;
  const driver = document.getElementById('driver').value;
  const customer = document.getElementById('customer').value;
  const departure = document.getElementById('departure').value;
  const destination = document.getElementById('destination').value;
  const dispatch = document.getElementById('dispatch').value;
  const customernumber = document.getElementById('customernumber').value;
  const hirenumber = document.getElementById('hire-number').value;
  const date1 = document.getElementById('date1').value;
  const date2 = document.getElementById('date2').value;

  // 保存処理を行う（サーバーにデータを送信する）
  const response = await fetch('/saveData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: newDate,
      dropOffDate: dropOffDate,
      hireCompany: hireCompany,
      carNumber: carNumber,
      driver: driver,
      customer: customer,
      departure: departure,
      destination: destination,
      dispatch: dispatch,
      customernumber: customernumber,
      hirenumber: hirenumber,
      date1: date1,
      date2: date2
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



// 検索
async function continueToNextStep() {
  // 入力された日付
  const workDate = document.getElementById('work-date').value;

  // データの読み込み
  const response = await fetch('/loadData');
  if (!response.ok) {
    throw new Error('データの読み込みに失敗しました。');
  }

  const data = await response.json();

  // 入力された日付と一致するデータを抽出
  const matchingData = data.filter(entry => entry.date === workDate);

  // テーブルに表示
  displayDataInTable(matchingData);
}

function displayDataInTable(data) {
  // テーブルの要素
  var dataTable = document.getElementById("data-table");

  // テーブルクリア
  while (dataTable.rows.length > 1) {
    dataTable.deleteRow(1);
  }

  // データ表示
  for (let i = 0; i < 20; i++) {
    var newRow = dataTable.insertRow(-1);

    if (i < data.length) {
      const entry = data[i];
      // 列の順番を変更してデータを表示
      const columnsOrder = ['date', 'dropOffDate', 'dispatch', 'carNumber', 'driver', 'hirenumber', 'hireCompany', 'customernumber', 'customer', 'departure', 'destination', 'date1','date2', /* その他のカラム */];


      
      columnsOrder.forEach(column => {
        var cell = newRow.insertCell();
        
        // dispatch 列の場合は特別な表示
        if (column === 'dispatch') {
          cell.textContent = entry[column] === 1 ? '自車' : '傭車';
        } else {
          cell.textContent = entry[column];
        }
      });
    } else {
      // データが足りない場合は空白セルを追加
      for (let j = 0; j < 13; j++) {
        var cell = newRow.insertCell();
        cell.textContent = "";
      }
    }
  }
}



// 保存ボタンを押した時に呼び出される関数
function saveAndLoadData(rowId) {
  saveInputForm(rowId);
  
}


// loadAndDisplayData 関数を定義
async function loadAndDisplayData() {
  // データを読み込んで表示する処理を実装
}




// 傭車先の番号が変更されたときに呼び出される関数
async function onHireNumberChange() {
  const hireNumberInput = document.getElementById('hire-number');
  const hireCompanyInput = document.getElementById('hire-company');

  const hireNumber = hireNumberInput.value;

  // サーバーに対してMongoDBからデータを要求
  const response = await fetch('/loadData');
  if (!response.ok) {
    throw new Error('データの読み込みに失敗しました。');
  }

  const data = await response.json();

  // 入力されたhireNumberに一致するデータを検索
  const matchingData = data.find(entry => entry.hirenumber === hireNumber);

  if (matchingData) {
    // 会社名を反映
    hireCompanyInput.value = matchingData.hireCompany;
  } else {
    // データが見つからなかった場合の処理
    hireCompanyInput.value = "";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // 傭車先の番号の入力欄に変更イベントを追加
  const hireNumberInput = document.getElementById('hire-number');
  hireNumberInput.addEventListener('input', onHireNumberChange);
});




// 得意先番号が変更されたときに呼び出される関数
async function onCustomerNumberChange() {
  const customerNumberInput = document.getElementById('customernumber');
  const customerInput = document.getElementById('customer');

  const customerNumber = customerNumberInput.value;

  // サーバーに対してMongoDBからデータを要求
  const response = await fetch('/loadData');
  if (!response.ok) {
    throw new Error('データの読み込みに失敗しました。');
  }

  const data = await response.json();

  // 入力されたcustomerNumberに一致するデータを検索
  const matchingData = data.find(entry => entry.customernumber === customerNumber);

  if (matchingData) {
    // 得意先を反映
    customerInput.value = matchingData.customer;
  } else {
    // データが見つからなかった場合の処理
    customerInput.value = "";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // 得意先番号の入力欄に変更イベントを追加
  const customerNumberInput = document.getElementById('customernumber');
  customerNumberInput.addEventListener('input', onCustomerNumberChange);
});


function onTableRowClick(event) {
  // クリックされた行を取得
  const row = event.target.parentElement;

  // 行のデータを取得
  const data = row.querySelectorAll("td").map(td => td.textContent);

  // データを input-form要素の各入力欄に書き出します。
  for (let i = 0; i < data.length; i++) {
    const input = document.getElementById(`input-${data[i]}`);
    if (input) {  // 念のため、input要素が存在するか確認
      input.value = data[i];
    }
  }
}



// テーブル要素を取得
var dataTable = document.getElementById("data-table");

// テーブルにクリックイベントを追加
dataTable.addEventListener("click", function(event) {
    // クリックされたセルの親行を取得
    var clickedRow = event.target.closest("tr");

    // ヘッダー行は無視する
    if (clickedRow.rowIndex !== 0) {
        // 選択された行の各セルのデータを取得
        var rowData = [];
        for (var i = 0; i < clickedRow.cells.length; i++) {
            rowData.push(clickedRow.cells[i].textContent);
        }

        // データをinput-formに反映させる
        reflectDataInInputForm(rowData);
    }
});

// データをinput-formに反映させる関数
function reflectDataInInputForm(data) {
  // カラムの順番
  const columnsOrder = ['new-date', 'drop-off-date', 'dispatch', 'car-number', 'driver', 'hire-number', 'hire-company', 'customernumber', 'customer', 'departure', 'destination', 'date1', 'date2'];

  // 反映先の要素にデータをセット
  columnsOrder.forEach((column, index) => {
    const inputElement = document.getElementById(column);

    // データセット対象の列が存在し、データが存在する場合のみセット
    if (inputElement && data[index] !== undefined && data[index] !== null && data[index] !== '') {
      // dispatch 列の場合は特別な処理
      if (column === 'dispatch') {
        // データが "自車" なら1、"傭車" なら2、それ以外なら空文字をセット
        inputElement.value = (data[index] === '自車') ? '1' : (data[index] === '傭車') ? '2' : '';
        
        // dispatch 列の<a>タグも更新
        const dispatchLabel = inputElement.nextElementSibling;
        dispatchLabel.textContent = (data[index] === '自車') ? '自車' : (data[index] === '傭車') ? '傭車' : '';
      } else {
        // 数値の場合はそのままセット、文字列の場合は数値に変換
        inputElement.value = !isNaN(data[index]) ? +data[index] : data[index];
      }
    } else {
      // データが存在しない場合は何も表示しない
      if (inputElement) {
        inputElement.value = '';
      }
    }
  });
}



// 自車傭車切り替え
  document.addEventListener("DOMContentLoaded", function() {
    // dispatchのinput要素を取得
    const dispatchInput = document.getElementById('dispatch');

    // 変更を検知するinputイベントリスナーを追加
    dispatchInput.addEventListener('input', function() {
      // dispatchの値を取得
      const dispatchValue = dispatchInput.value;

      // dispatchのinput要素の隣にある<a>タグを取得
      const dispatchLabel = dispatchInput.nextElementSibling;

      // dispatchの値に基づいて<a>タグの内容を更新
      dispatchLabel.textContent = (dispatchValue === '1') ? '自車' : (dispatchValue === '2') ? '傭車' : '';
    });
  });


  

//ここまで保存

//////////////////削除

function getSelectedData() {
  // 選択されている行を取得
  const selectedRow = document.getElementById("data-table").querySelector("tr.selected");

  // 選択されている行が存在しない場合、nullを返す
  if (!selectedRow) {
    return null;
  }

  // 選択されている行の各セルのデータを取得
  const data = [];
  for (let i = 0; i < selectedRow.cells.length; i++) {
    data.push(selectedRow.cells[i].textContent);
  }

  return data;
}

// 新しく追加
async function deleteData() {
  const hireNumber = document.getElementById('hire-number').value;

  // 削除処理を行う（サーバーにデータを送信する）
  const response = await fetch('/deleteData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hirenumber: hireNumber,
    }),
  });

  if (response.ok) {
    console.log('データが削除されました。');
    // データの再読み込み
    loadAndDisplayData();
  } else {
    console.error('データの削除中にエラーが発生しました。');
  }
}

// テーブルにクリックイベントを追加
dataTable.addEventListener("click", function(event) {
  // クリックされたセルの親行を取得
  var clickedRow = event.target.closest("tr");

  // ヘッダー行は無視する
  if (clickedRow.rowIndex !== 0) {
      // 選択された行の各セルのデータを取得
      var rowData = [];
      for (var i = 0; i < clickedRow.cells.length; i++) {
          rowData.push(clickedRow.cells[i].textContent);
      }

      // データを input-form に反映させる
      reflectDataInInputForm(rowData);
  }
});
