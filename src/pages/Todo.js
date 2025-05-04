import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { addTodo, updateTodo, deleteTodo } from "../services/firestore";
import TodoItem from "../components/TodoItem";

export default function Todo() {
  const { user } = useAuth();
  const { loading, todos, refresh } = useData();

  const [newTitle, setNew] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  if (!user) return <Navigate to="/" replace />;
  if (loading)
    return (
      <div className="text-center text-neutral-500 py-12">Loading todos…</div>
    );

  // add new task
  const add = async () => {
    if (!newTitle.trim()) return;
    await addTodo({ userEmail: user.email, title: newTitle.trim() });
    setNew("");
    refresh(true);
  };

  // switch completed or not
  const toggle = async (id) => {
    const t = todos.find((i) => i.id === id);
    await updateTodo(id, { completed: !t.completed });
    refresh(true);
  };

  // delete task
  const remove = async (id) => {
    await deleteTodo(id);
    refresh(true);
  };

  // edit task
  const startEditing = (item) => {
    setEditingId(item.id);
    setEditingTitle(item.title);
  };

  // after edit, then save
  const saveEdit = async (id) => {
    if (!editingTitle.trim()) return;
    await updateTodo(id, { title: editingTitle.trim() });
    setEditingId(null);
    setEditingTitle("");
    refresh(true);
  };

  // cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  // incomplete tasks first, completed tasks last
  const sorted = [...todos].sort((a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1
  );

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="flex gap-4">
        <input
          className="flex-1 border border-neutral-300 rounded-lg px-4 py-2"
          placeholder="New task…"
          value={newTitle}
          onChange={(e) => setNew(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <button onClick={add} className="btn-primary">
          Add
        </button>
      </div>

      {sorted.length === 0 ? (
        <p className="text-neutral-500">Nothing here yet.</p>
      ) : (
        <ul className="space-y-4">
          {sorted.map((item) => (
            <li
              key={item.id}
              className="
                flex flex-col gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
                bg-white p-4 rounded-lg shadow
              "
            >
              <div className="flex-1">
                <TodoItem
                  item={item}
                  isEditing={editingId === item.id}
                  editingTitle={editingTitle}
                  onToggle={toggle}
                  onStartEdit={startEditing}
                  onEditChange={setEditingTitle}
                  onSaveEdit={saveEdit}
                  onCancelEdit={cancelEdit}
                  onDelete={remove}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
