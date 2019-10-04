const excel_db = require('./db/sqlite3/excel-sqlite-service');

const excelFilename = "./db/excel/news-setting.v1.xlsx"; //ten file excel cau hinh
const dbFilename = "./db/database/news-v3.db";     //ten database muon tao

excel_db.Excel2Sqlite.createDatabase(excelFilename, dbFilename);