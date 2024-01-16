const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDBに接続
mongoose.connect('mongodb://localhost:27017/kg8sj', );


// モデルの定義
const DataModel = mongoose.model('Data', {
  date: String,
  dropOffDate: String,
  hireCompany: String,
  carNumber: String,
  driver: String,
  customer: String,
  departure: String,
  destination: String,
  dispatch: Number,
  hirenumber: String,
  customernumber: String,
  date1: String,
  date2: String,
  date3: String,
  date4: String,
  date5: String,
  savecarNumber: String,
  savedriver: String,
  //他のフィルードに合わせて追加
});


// ミドルウェアの設定
app.use(express.static('public'));
app.use(bodyParser.json());


// POSTリクエストの処理
app.post('/saveData', async (req, res) => {
  try {
    const {
      date,
      dropOffDate,
      hireCompany,
      carNumber,
      driver,
      customer, //得意先名称
      customernumber, //
      departure,
      destination,
      dispatch,
      hirenumber,
      date1,
      date2,
      date3,
      date4,
      date5,
      savecarNumber,
      savedriver,
    } = req.body;
    

    const newData = new DataModel({
      date,
      dropOffDate,
      hireCompany,
      carNumber,
      driver,
      customer, //得意先名称
      departure,
      destination,
      dispatch,
      hirenumber,
      customernumber,
      date1,
      date2,
      date3,
      date4,
      date5,
      savecarNumber,
      savedriver,
    });

    await newData.save();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// GETリクエストの処理
app.get('/loadData', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// サーバーの起動
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


// POSTリクエストの処理（データ更新）
app.post('/updateData', async (req, res) => {
  try {
    const updatedData = req.body;

    // Find the existing data entry by _id
    const existingData = await DataModel.findById(updatedData._id);

    // Update the existing data entry with the new values
    Object.assign(existingData, updatedData);

    // Save the updated data
    await existingData.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


//削除

// POSTリクエストの処理（データ削除）
app.post('/deleteData', async (req, res) => {
  try {
    const { _id } = req.body;

    // MongoDBから該当するデータエントリを検索して削除
    const result = await DataModel.findOneAndDelete({ _id });

    console.log('削除されたデータ:', result); // ログを追加

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
