import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.service';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Pin, Trash2, Grid, List } from 'lucide-react'; // Assuming you have icons for Grid and List
import { useUserContext } from '@/components/userProvider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';


function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredTask, setHoveredTask] = useState(null); 
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    body: '',
    todoList: [{ title: '', isComplete: false }],
    isPinned: false,
  });
  const [displayMode, setDisplayMode] = useState('grid'); // 'grid' or 'table'

  const { user } = useUserContext();

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      }
    }
    getTasks();
  }, []);

  async function togglePin(taskId) {
    try {
      const updatedTasks = tasks.map(task => {
        if (task._id === taskId) {
          return { ...task, isPinned: !task.isPinned };
        }
        return task;
      });
      setTasks(updatedTasks);
      await api.put(`/tasks/${taskId}`, { isPinned: !tasks.find(task => task._id === taskId).isPinned });
    } catch (err) {
      console.error("Failed to update pin status:", err);
      setTasks(tasks);
    }
  };

  async function deleteTask(taskId) {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  async function handleCreateTask(e) {
    e.preventDefault();
    try {
      const response = await api.post('/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({
        title: '',
        description: '',
        body: '',
        todoList: [{ title: '', isComplete: false }],
        isPinned: false,
      });
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  const pinnedTasks = tasks.filter(task => task.isPinned);
  const nonPinnedTasks = tasks.filter(task => !task.isPinned);

  const areAllTodosComplete = (task) => {
    return task.todoList.every(todo => todo.isComplete);
  };

  const toggleDisplayMode = () => {
    setDisplayMode(currentMode => currentMode === 'grid' ? 'table' : 'grid');
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className='flex justify-between items-center'>
        <h1 className="text-3xl font-bold mb-4">Tasks</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex items-center">
          <button onClick={toggleDisplayMode} className="p-2 rounded-md mr-4">
            {displayMode === 'grid' ? <List size={24} /> : <Grid size={24} />}
          </button>
          <Dialog>
            <DialogTrigger><Button className="p-2 rounded-md">Create New Task</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>Fill out the form below to create a new task.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateTask} className="space-y-4 text-black">
                <div>
                  <label className="block text-sm font-medium text-white">Title</label>
                  <input 
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="p-2 border border-gray-300 rounded-md w-full"
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">Body</label>
                  <textarea
                    value={newTask.body}
                    onChange={(e) => setNewTask({ ...newTask, body: e.target.value })}
                    className="p-2 border border-gray-300 rounded-md w-full"
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">Todo List</label>
                  {newTask.todoList.map((todo, index) => (
                    <div key={index} className="mb-2 flex items-center">
                      <input
                        type="text"
                        value={todo.title}
                        onChange={(e) => {
                          const newTodoList = [...newTask.todoList];
                          newTodoList[index].title = e.target.value;
                          setNewTask({ ...newTask, todoList: newTodoList });
                        }}
                        className="p-2 border border-gray-300 rounded-md w-full"
                        required
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          const newTodoList = newTask.todoList.filter((_, idx) => idx !== index);
                          setNewTask({ ...newTask, todoList: newTodoList });
                        }}
                        className="ml-2"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => setNewTask({ ...newTask, todoList: [...newTask.todoList, { title: '', isComplete: false }] })}
                    className=""
                  >
                    Add Todo
                  </Button>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newTask.isPinned}
                    onChange={(e) => setNewTask({ ...newTask, isPinned: e.target.checked })}
                    className="mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700">Pin this task</label>
                </div>
                <Button type="submit" className="p-2 bg-slate-500 rounded-md">Create Task</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {displayMode === 'grid' && pinnedTasks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Important</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedTasks.map(task => (
              <Link key={task._id} to={`/task/${task._id}`}>
                <Card className={`border border-gray-300 shadow-md h-60 cursor-pointer relative ${areAllTodosComplete(task) ? 'bg-green-800' : ''}`}
                  onMouseEnter={() => setHoveredTask(task._id)}
                  onMouseLeave={() => setHoveredTask(null)}
                >
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{task.title}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          togglePin(task._id);
                        }}
                      >
                        <Pin className="w-4 h-4 mr-4" />
                      </button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">{task.description}</p>
                    <p className="mb-4">{task.body}</p>
                  </CardContent>
                  <CardFooter>
                    {/* Additional footer content if needed */}
                  </CardFooter>
                  {hoveredTask === task._id && (
                    <button
                      className="absolute bottom-4 right-4 text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task._id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  {areAllTodosComplete(task) && (
                    <CheckCircle className="absolute top-2 right-2 w-6 h-6 text-green-500 animate-fade-in" />
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {displayMode === 'grid' && nonPinnedTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Others</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nonPinnedTasks.map(task => (
              <Link key={task._id} to={`/task/${task._id}`}>
                <Card
                  className={`border border-gray-300 shadow-md h-60 cursor-pointer relative ${areAllTodosComplete(task) ? 'bg-green-800' : ''}`}
                  onMouseEnter={() => setHoveredTask(task._id)}
                  onMouseLeave={() => setHoveredTask(null)}
                >
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{task.title}</span>
                      {hoveredTask === task._id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); 
                            togglePin(task._id);
                          }}
                        >
                          <Pin className="w-4 h-4 mr-4" />
                        </button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">{task.description}</p>
                    <p className="mb-4">{task.body}</p>
                  </CardContent>
                  <CardFooter>
                    {/* Additional footer content if needed */}
                  </CardFooter>
                  {hoveredTask === task._id && (
                    <button
                      className="absolute bottom-4 right-4 text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task._id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                   {areAllTodosComplete(task) && (
                    <CheckCircle className="absolute top-2 right-2 w-6 h-6 text-green-500 animate-fade-in" />
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {displayMode === 'table' && (
        <div className='space-y-12'>
          <h2 className="text-xl font-bold mb-2">All Tasks (Table View)</h2>
          <table className="table-auto w-full ">
            <thead >
              <tr className='bg-white/10'>
                <th >Title</th>
                <th>Description</th>
                <th>Body</th>
                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody className='text-center'>
              {tasks.map(task => (
                <tr key={task._id} className=''>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.body}</td>
                  {/* Add more table cells for additional task details */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tasks.length === 0 && <p>No tasks available.</p>}
    </div>
  );
}

export default TasksPage;
