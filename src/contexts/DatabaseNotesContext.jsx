import { useState } from "react";
import { createContext } from "react";

const DatabaseNoteContext = createContext();

const notesDb = [
  {
    id: "0",
    text: "Lorem ipsum dolor amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis a provident, consectetur ipsum fuga voluptate id repellendus perferendis laudantium ipsam rerum unde explicabo maxime illo eius aliquid! Cupiditate, accusamus similique.",
    name: "28/02/2024",
    category: "",
  },
  {
    id: "1",
    text: "Lorem ipsum dolor amet",
    name: "28/02/2024",
    category: "",
  },
  {
    id: "2",
    text: "Lorem ipsum dolor amet",
    name: "28/02/2024",
    category: "",
  },
  {
    id: "3",
    text: "Lorem ipsum dolor amet",
    name: "28/02/2024",
    category: "",
  },
  {
    id: "4",
    text: "Lorem ipsum dolor amet",
    name: "28/02/2024",
    category: "",
  },
];

const DatabaseNoteContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const data = { notes, setNotes };
  return (
    <DatabaseNoteContext.Provider value={data}>
      {children}
    </DatabaseNoteContext.Provider>
  );
};

export { DatabaseNoteContextProvider };
export default DatabaseNoteContext;
