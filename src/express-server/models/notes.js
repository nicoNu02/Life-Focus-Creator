import mysql from "mysql2/promise";
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "notesDb",
});

export class NotesModel {
  static async getAll() {
    const [notes] = await connection.query(
      "SELECT bin_to_uuid(id) as id, title, content, date, tag from note"
    );
    return notes;
  }
  static async addNote({ note }) {
    const { title, content, tag } = note;
    const date = new Date().toLocaleDateString();
    const [uuidResult] = await connection.query("select UUID() uuid;");
    const [{ uuid }] = uuidResult;
    const [newNote] = await connection.query(
      "insert into note (id, title, content, date, tag) values (uuid_to_bin(?),?,?,?,?)",
      [uuid, title, content, date, tag]
    );
    return newNote;
  }

  static async updateNote({ note }) {
    const { id, title, content, tag } = note;

    const [updatedNote] = await connection.query(
      "update note set title=?, content=?, tag=? where bin_to_uuid(id)=?",
      [title, content, tag, id]
    );
  }
}
