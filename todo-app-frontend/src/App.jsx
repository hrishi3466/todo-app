import { useState, useEffect } from 'react';
import { CheckSquare, Clock, Trash2, Plus } from 'lucide-react';
import todoApi from './api/todoApi.jsx';
import toast from 'react-hot-toast';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [toggleInProgress, setToggleInProgress] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, [filter]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getAllTodos(filter !== 'all' ? filter : '');
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      await todoApi.createTodo({ title: newTodo, completed: false });
      setNewTodo('');
      toast.success('Task added');
      fetchTodos();
    } catch (err) {
      console.error('Error adding todo:', err);
      toast.error('Failed to add task');
    }
  };

  const toggleTodo = async (id) => {
    try {
      setToggleInProgress(id);
      await todoApi.toggleTodoCompletion(id);
      toast.success('Task updated');
      fetchTodos();
    } catch (err) {
      console.error('Error toggling todo:', err);
      toast.error('Failed to update task');
    } finally {
      setToggleInProgress(null);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoApi.deleteTodo(id);
      toast.success('Task deleted');
      fetchTodos();
    } catch (err) {
      console.error('Error deleting todo:', err);
      toast.error('Failed to delete task');
    }
  };

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-vh-100 d-flex justify-content-center bg-light py-5">
      <div className="container">
        <div className="card shadow-lg p-4">
          <h1 className="text-center mb-4 text-primary">Task Manager</h1>

          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            />
            <button onClick={addTodo} className="btn btn-primary">
              <Plus size={24} />
            </button>
          </div>

          <div className="mb-4 d-flex justify-content-center">
            <div className="btn-group">
              {['all', 'active', 'completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`btn ${filter === f ? 'btn-primary' : 'btn-outline-primary'}`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center my-4">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {todos.length === 0 ? (
                <div className="col-12 text-center text-muted">
                  No tasks found. Add a new task to get started!
                </div>
              ) : (
                todos.map(todo => (
                  <div key={todo.id} className="col">
                    <div className={`card ${todo.completed ? 'border-success' : 'border-warning'} shadow-sm`}>
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <button
                            disabled={toggleInProgress === todo.id}
                            onClick={() => toggleTodo(todo.id)}
                            className={`me-3 border-0 bg-transparent ${
                              todo.completed ? 'text-success' : 'text-warning'
                            }`}
                          >
                            {todo.completed ? <CheckSquare size={24} /> : <Clock size={24} />}
                          </button>
                          <div>
                            <p
                              className={`card-text ${
                                todo.completed ? 'text-decoration-line-through text-muted' : ''
                              }`}
                            >
                              {todo.title}
                            </p>
                            <p className="small text-muted">
                              {todo.completed ? 'Completed' : 'Active'}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="btn btn-sm text-danger border-0 bg-transparent"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          <div className="mt-4 d-flex justify-content-between">
            <span className="text-muted">{activeCount} tasks active</span>
            <span className="text-muted">{completedCount} tasks completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
