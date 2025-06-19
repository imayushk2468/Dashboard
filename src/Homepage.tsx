import React, { useState } from 'react';
import './style/dashboard.css';
import './style/footer.css';

const Footer: React.FC = () => (
  <footer>
    <p>&copy; 2025 by Openlake Devlabs. All rights reserved.</p>
    <nav>
      <strong>Related Links</strong>
      <ul>
        <li><a href="about.html">About Us</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="privacy.html">Privacy Policy</a></li>
      </ul>
    </nav>
  </footer>
);

const Homepage: React.FC = () => {
  // priority and  status types
  const order = ['todo', 'inprogress', 'done'] as const;
  type TaskStatus = typeof order[number];
  type TaskPriority = 'Low' | 'Medium' | 'High';

  type Task = {
    id: number;
    text: string;
    status: TaskStatus;
    priority: TaskPriority;
  };

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Design homepage', status: 'todo', priority: 'High' },
    { id: 2, text: 'Write project documentation', status: 'todo', priority: 'Low' },
    { id: 3, text: 'Develop login feature', status: 'inprogress', priority: 'Medium' },
    { id: 4, text: 'Set up project repository', status: 'done', priority: 'High' },
  ]);
  //new task modal state
  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState({
    text: '',
    description: '',
    priority: 'Medium' as TaskPriority,
    status: 'todo' as TaskStatus,
  });

  // Function to move tasks between columns
  const moveTask = (id: number, direction: 'left' | 'right') => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        const idx = order.indexOf(task.status);
        const newIdx = direction === 'left' ? idx - 1 : idx + 1;
        if (newIdx < 0 || newIdx >= order.length) return task;
        return { ...task, status: order[newIdx] };
      })
    );
  //To add New task 
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };
   const addTask = () => {
    const newId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const task: Task = {
      id: newId,
      ...newTask,
    };
    setTasks([...tasks, task]);
    setShowModal(false);
    setNewTask({ text: '', description: '', priority: 'Medium', status: 'todo' });
  };
  

  
  };

  return (
    <>
      <div className="navbar">
        <span className="brand">Taskify</span>
        <div className="navbar-right">
          <a href="#" className="nav-link active">
            <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="2" rx="1" fill="#2563eb" />
              <rect x="3" y="11" width="18" height="2" rx="1" fill="#2563eb" />
              <rect x="3" y="17" width="18" height="2" rx="1" fill="#2563eb" />
            </svg>
            Tasks
          </a>
          <a href="#" className="nav-link">
            <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="2" fill="#2563eb" />
              <rect x="7" y="8" width="10" height="2" rx="1" fill="#fff" />
              <rect x="7" y="12" width="6" height="2" rx="1" fill="#fff" />
            </svg>
            Notes
          </a>
          <a href="#" className="nav-link">
            <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="#2563eb" />
              <rect x="6" y="15" width="12" height="5" rx="2.5" fill="#2563eb" />
            </svg>
            Profile
          </a>
          <button className="logout-btn">
            <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M16 17l5-5m0 0l-5-5m5 5H9" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 4v16" stroke="#222" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard">
        <div className="dashboard-header">
          <h1>My Tasks</h1>
          <div className="taskboard-controls">
            <button className="filter-btn">
              <span className="icon-bg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="icon">
                  <path d="M3 6H21M6 12H18M10 18H14" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Filter
            </button>
            <button className="sort-btn">
              <span className="icon-bg">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" className="icon">
                  <path d="M7 14l5 5 5-5M7 10l5-5 5 5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Sort
            </button>
            <button className="new-task-btn" onClick={() => setShowModal(true)}>+ New Task</button>
          </div>
        </div>

        <div className="board">
          <div className="column1">
            <div className="column-header">
              <h2>To Do</h2>
              <button className="option-button">
                <svg className="option-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>
            </div>
            {tasks
              .filter((task) => task.status === 'todo')
              .map((task) => (
                <div key={task.id} className="task-todo task-card">
                  <div className="task-header">
                    <span className="priority">Priority: {task.priority}</span>
                    <div className="task-arrows">
                      <button onClick={() => moveTask(task.id, 'right')} className="arrow-btn">→</button>
                    </div>
                  </div>
                  <div>{task.text}</div>
                </div>
              ))}
          </div>

          <div className="column2">
            <div className="column-header">
              <h2>In Progress</h2>
              <button className="option-button">
                <svg className="option-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>
            </div>
            {tasks
              .filter((task) => task.status === 'inprogress')
              .map((task) => (
                <div key={task.id} className="task-progress task-card">
                  <div className="task-header">
                    <span className="priority">Priority: {task.priority}</span>
                    <div className="task-arrows">
                      <button onClick={() => moveTask(task.id, 'left')} className="arrow-btn">←</button>
                      <button onClick={() => moveTask(task.id, 'right')} className="arrow-btn">→</button>
                    </div>
                  </div>
                  <div>{task.text}</div>
                </div>
              ))}
          </div>

          <div className="column3">
            <div className="column-header">
              <h2>Done</h2>
              <button className="option-button">
                <svg className="option-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>
            </div>
            {tasks
              .filter((task) => task.status === 'done')
              .map((task) => (
                <div key={task.id} className="task-done task-card">
                  <div className="task-header">
                    <span className="priority">Priority: {task.priority}</span>
                    <div className="task-arrows">
                      <button onClick={() => moveTask(task.id, 'left')} className="arrow-btn">←</button>
                    </div>
                  </div>
                  <div>{task.text}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {showModal && (
  <div className="modal-overlay">
    <div className="modal">
      <div className="modal-header">
        <h3>New Task</h3>
        <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
      </div>
      <div className="modal-body">
        <label htmlFor="taskText"><span className='title'>Title</span></label>
        <input
          type="text"
          name="text"
          id="taskText"
          value={newTask.text}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
          placeholder="Enter task title"
        />

        <label htmlFor="taskDescription"><span className='desc' >Description </span></label>
        <textarea
          name="description"
          id="taskDescription"
          value={newTask.description}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
          placeholder="Enter task description"
        ></textarea>

        <div className="modal-row">
          <div>
            <label htmlFor="taskPriority">Priority</label>
            <select
              name="priority"
              id="taskPriority"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
              }
            >
              <option value="High">1 (High)</option>
              <option value="Medium">2 (Medium)</option>
              <option value="Low">3 (Low)</option>
            </select>
          </div>
          <div>
            <label htmlFor="taskStatus">Status</label>
            <select
              name="status"
              id="taskStatus"
              value={newTask.status}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
              }
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={() => setShowModal(false)}>Cancel</button>
        <button
          className="create-btn"
          onClick={() => {
            const newId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
            setTasks([
              ...tasks,
              {
                id: newId,
                text: newTask.text,
                priority: newTask.priority,
                status: newTask.status,
              },
            ]);
            setShowModal(false);
            setNewTask({
              text: '',
              description: '',
              priority: 'Medium',
              status: 'todo',
            });
          }}
        >
          Create Task
        </button>
      </div>
    </div>
  </div>
)}

      <Footer />
    </>
  );
};

export default Homepage;
