import React, { useMemo, useState } from "react";

const initialTasks = [
  { id: 1, title: "Review the project brief", done: true },
  { id: 2, title: "Sketch the first version", done: false },
  { id: 3, title: "Share progress with the team", done: false }
];

const filters = ["All", "Active", "Completed"];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState("All");

  const visibleTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (filter === "Active") return !task.done;
        if (filter === "Completed") return task.done;
        return true;
      }),
    [filter, tasks]
  );
  const remainingCount = tasks.filter((task) => !task.done).length;

  function addTask(event) {
    event.preventDefault();
    const title = draft.trim();
    if (!title) return;

    setTasks((current) => [
      ...current,
      { id: Date.now(), title, done: false }
    ]);
    setDraft("");
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function removeTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Focus Board home">
          <span className="brand-mark" aria-hidden="true">F</span>
          <span>focus<span className="brand-light">board</span></span>
        </a>
        <span className="topbar-note">A little more focus, every day.</span>
      </header>

      <section className="board" aria-labelledby="page-title">
        <div className="eyebrow"><span className="eyebrow-dot" /> YOUR WORKSPACE</div>
        <h1 id="page-title">Make space for<br /><span>what matters.</span></h1>
        <p className="intro">Small steps add up. What would you like to get done?</p>

        <form className="task-form" onSubmit={addTask}>
          <label className="sr-only" htmlFor="new-task">Add a task</label>
          <input
            id="new-task"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Write down your next task..."
          />
          <button type="submit">Add task <span aria-hidden="true">+</span></button>
        </form>

        <div className="list-heading">
          <h2>Today’s list <span className="task-count">{tasks.length}</span></h2>
          <div className="filters" aria-label="Filter tasks">
            {filters.map((option) => (
              <button
                key={option}
                className={filter === option ? "filter active" : "filter"}
                type="button"
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {visibleTasks.length > 0 ? (
          <ul className="task-list">
            {visibleTasks.map((task) => (
              <li className={task.done ? "task completed" : "task"} key={task.id}>
                <button
                  type="button"
                  className="check-button"
                  aria-label={task.done ? `Mark ${task.title} active` : `Complete ${task.title}`}
                  aria-pressed={task.done}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.done && <span aria-hidden="true">✓</span>}
                </button>
                <span className="task-title">{task.title}</span>
                <button
                  type="button"
                  className="delete-button"
                  aria-label={`Delete ${task.title}`}
                  onClick={() => removeTask(task.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">Nothing here yet. Add a task to get started.</p>
        )}

        <footer className="board-footer">
          <span>{remainingCount} {remainingCount === 1 ? "task" : "tasks"} left to focus on</span>
          <span className="footer-sparkle" aria-hidden="true">✦</span>
        </footer>
      </section>

      <p className="page-caption">ONE THING AT A TIME</p>
    </main>
  );
}
