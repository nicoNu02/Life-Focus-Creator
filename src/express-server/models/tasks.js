import mysql from "mysql2/promise";
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tasksDb",
});

export class TasksModel {
  static async getAll() {
    const [tasks] = await connection.query(
      "select bin_to_uuid(id) as id, name, priority, section from task"
    );
    return tasks;
  }
  static create = async ({ input }) => {
    const { name, priority, section } = input;
    const [uuidResult] = await connection.query("select UUID() uuid;");
    const [{ uuid }] = uuidResult;
    const [tasks] = await connection.query(
      `insert into task (id,name,priority,section) values (UUID_TO_BIN("${uuid}"),?,?,?)`,
      [name, priority, section]
    );
    return tasks;
  };
  static update = async ({ id, input }) => {
    const { name, priority, section } = input;
    const [updatedTask] = await connection.query(
      "UPDATE task SET name = ?, priority=?, section=? WHERE BIN_TO_UUID(id)=? ",
      [name, priority, section, id]
    );
  };
  static delete = async ({ id }) => {
    const deletedTask = connection.query(
      "delete from task where BIN_TO_UUID(id)=?",
      [id]
    );
    return deletedTask;
  };
}
