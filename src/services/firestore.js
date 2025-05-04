import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { STATUS, STATUS_ORDER } from "../constants";

//convert firebase data to js objects
const mapDoc = (snap) => {
  //get data
  const data = snap.data();
  //convert Timestamp to native Date
  if (data.created?.toDate) data.created = data.created.toDate();
  //pack with id
  return { id: snap.id, ...data };
};

//  read data part
// 1. read all staff data
export async function fetchStaff() {
  const snap = await getDocs(collection(db, "staff"));
  return snap.docs.map(mapDoc);
}

//2. read all tickets data
export async function fetchTickets(user) {
  const ticketsRef = collection(db, "tickets");
  // if admin, get all ticktes and desc
  // if normal user, get user's own tickets
  const q = user.isAdmin
    ? query(ticketsRef, orderBy("created", "desc"))
    : query(
        ticketsRef,
        where("user", "==", user.email),
        orderBy("created", "desc")
      );

  const snap = await getDocs(q);
  const list = snap.docs.map(mapDoc);

  // "open" first, then "in Progress", then "resolved"
  list.sort(
    (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
  );
  return list;
}

//3. read todos by user email
export async function fetchTodos(user) {
  const todosRef = collection(db, "todos");
  const q = query(todosRef, where("userEmail", "==", user.email));
  const snap = await getDocs(q);
  return snap.docs.map(mapDoc);
}

// write data part

//1. add new ticket
export async function addTicket({
  user,
  issue,
  description,
  status = STATUS.OPEN,
}) {
  const ref = await addDoc(collection(db, "tickets"), {
    user,
    issue,
    description,
    status,
    created: serverTimestamp(),
  });
  return { id: ref.id, user, issue, description, status, created: new Date() };
}

//2. add new todo
export async function addTodo({ userEmail, title }) {
  const ref = await addDoc(collection(db, "todos"), {
    title,
    completed: false,
    userEmail,
  });
  return { id: ref.id, title, completed: false, userEmail };
}

//3. update todo
export async function updateTodo(id, updates) {
  await updateDoc(doc(db, "todos", String(id)), updates);
}

//4. delete todo
export async function deleteTodo(id) {
  await deleteDoc(doc(db, "todos", String(id)));
}
