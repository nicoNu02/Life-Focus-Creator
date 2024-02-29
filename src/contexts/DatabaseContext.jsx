import { createContext, useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";

const DatabaseContext = createContext();

const DATABASE_ENDPOINT = "http://localhost:3000/tasks";
const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  useEffect(() => {
    helpHttp()
      .get(DATABASE_ENDPOINT)
      .then((res) => {
        setDb(res);
      });
  }, []);

  const createData = (body) => {
    helpHttp()
      .post(DATABASE_ENDPOINT, {
        body: body,
        "content-type": "application/json",
      })
      .then((res) => {
        if (!res.err) {
          console.log(res);
          setDb([...db, res]);
        } else {
          console.log(res);
        }
      });
  };

  const deleteData = (id) => {
    let options = {
      headers: { "content-type": "application/json" },
    };
    let endpoint = `${DATABASE_ENDPOINT}/${id}`;
    helpHttp()
      .del(endpoint, options)
      .then(() => {
        let newData = db.filter((el) => el.id !== id);
        setDb(newData);
      });
  };

  const editData = (data) => {
    let endpoint = `${DATABASE_ENDPOINT}/${data.id}`;
    console.log(endpoint);
    helpHttp()
      .put(endpoint, {
        body: data,
        "content-type": "application/json",
      })
      .then(() => {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
      });
  };

  const data = {
    createData,
    deleteData,
    editData,
    db,
    setDb,
    DATABASE_ENDPOINT,
  };
  return (
    <DatabaseContext.Provider value={data}>{children}</DatabaseContext.Provider>
  );
};

export { DatabaseProvider };
export default DatabaseContext;
