import { createContext, useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";

const DatabaseContext = createContext();

const DATABASE_ENDPOINT = "http://localhost:4000/tasks";
const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  useEffect(() => {
    helpHttp()
      .get(DATABASE_ENDPOINT)
      .then((res) => {
        setDb(res);
        console.log(res);
      });
  }, []);

  const createData = (body) => {
    fetch(DATABASE_ENDPOINT, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
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
    fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
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
