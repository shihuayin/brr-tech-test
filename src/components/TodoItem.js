export default function TodoItem({
  item,
  isEditing,
  editingTitle,
  onToggle,
  onStartEdit,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) {
  return (
    <li className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
      {isEditing ? (
        {
          /* edit mode  */
        }(
          <div className="flex-1 flex items-center gap-2">
            <input
              id={`edit-${item.id}`}
              type="text"
              value={editingTitle}
              onChange={(e) => onEditChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSaveEdit(item.id);
                if (e.key === "Escape") onCancelEdit();
              }}
              className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`Editing task ${item.title}`}
            />

            {/* save logic */}
            <button
              onClick={() => onSaveEdit(item.id)}
              className="btn-primary"
              aria-label="Save task"
            >
              Save
            </button>

            {/* cancel logic */}
            <button
              onClick={onCancelEdit}
              className="ml-2 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            >
              Cancel
            </button>
          </div>
        )
      ) : (
        /* none edit mode  */
        <>
          <div className="flex items-center gap-3 flex-1">
            <input
              id={`todo-${item.id}`}
              type="checkbox"
              checked={item.completed}
              onChange={() => onToggle(item.id)}
              className="h-5 w-5 text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              aria-checked={item.completed}
              aria-label={`Mark "${item.title}" as ${
                item.completed ? "incomplete" : "complete"
              }`}
            />
            <label
              htmlFor={`todo-${item.id}`}
              className={`flex-1 ${
                item.completed ? "line-through text-neutral-400" : ""
              }`}
            >
              {item.title}
            </label>
          </div>

          {/* edit and delete button */}

          <div className="flex gap-4">
            <button
              onClick={() => onStartEdit(item)}
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
