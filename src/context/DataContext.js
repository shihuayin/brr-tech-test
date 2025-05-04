import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import { fetchStaff, fetchTickets, fetchTodos } from "../services/firestore";

const DataContext = createContext(null);
export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [todos, setTodos] = useState([]);

  // load all data
  const loadAll = useCallback(
    async (silent = false) => {
      if (!user) {
        setStaff([]);
        setTickets([]);
        setTodos([]);
        setLoading(false);
        return;
      }

      if (!silent) setLoading(true);

      //1. staff data
      const staffList = await fetchStaff();
      setStaff(staffList);

      //2. tickets data
      const rawTickets = await fetchTickets(user);
      const withDate = rawTickets.map((t) => ({
        ...t,
        createdDate:
          t.created instanceof Date ? t.created : new Date(t.created),
      }));

      // if user is admin, display more information: name
      const hydrated = user.isAdmin
        ? withDate.map((t) => {
            const p = staffList.find((s) => s.email === t.user);
            return { ...t, userName: p?.name || t.user };
          })
        : withDate;
      setTickets(hydrated);

      //3.  todo data
      const userTodos = await fetchTodos(user);
      setTodos(userTodos);

      if (!silent) setLoading(false);
    },
    [user]
  );

  // automatically trigger data loading after login
  useEffect(() => {
    loadAll(false);
  }, [loadAll]);

  return (
    <DataContext.Provider
      value={{
        loading,
        staff,
        tickets,
        todos,
        refresh: loadAll,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
