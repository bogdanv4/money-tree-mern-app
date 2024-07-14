import { createContext, useState, useContext } from "react";

const MonthContext = createContext();

export const useMonth = () => useContext(MonthContext);

export const MonthProvider = ({ children }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <MonthContext.Provider value={{ currentMonth, setCurrentMonth }}>
      {children}
    </MonthContext.Provider>
  );
};
