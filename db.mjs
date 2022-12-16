import Database from "better-sqlite3";
import { TABLE_KEY_NAME, TABLE_NAME, TABLE_VALUE_NAME } from "./constants.mjs";
const db = new Database(`${TABLE_NAME}.db`);

export function createTable() {
  db.exec(`CREATE TABLE ${TABLE_NAME} (
		${TABLE_KEY_NAME} INTEGER PRIMARY KEY,
		${TABLE_VALUE_NAME} TEXT NOT NULL
	)`);
}

export function getMostRecent() {
  const getFromTable = db.prepare(
    `SELECT ${TABLE_KEY_NAME}, ${TABLE_VALUE_NAME} FROM ${TABLE_NAME} ORDER BY ${TABLE_KEY_NAME} DESC LIMIT 1`
  );
  const mostRecent = getFromTable.get();
  return mostRecent.record_value ? mostRecent.record_value : null;
}

export function insert(value) {
  const insert = db.prepare(
    `INSERT INTO ${TABLE_NAME} (${TABLE_VALUE_NAME}) VALUES (@${TABLE_VALUE_NAME})`
  );
  insert.run({ [TABLE_VALUE_NAME]: value });
}
