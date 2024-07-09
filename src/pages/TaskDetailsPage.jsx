import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, Trash2 } from 'lucide-react'; 
import api from '../services/api.service';
import { Button } from '@/components/ui/button';
import { toast, useToast } from "@/components/ui/use-toast"
import { Skeleton } from '@/components/ui/skeleton';

function TaskDetailsPage() {
  const { taskId } = useParams(); 
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [newTodo, setNewTodo] = useState(''); 
  const { toast } = useToast()

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await api.get(`/tasks/${taskId}`); 
        setTask(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      }
    }
    
    fetchTask();
  }, [taskId]);

  const handleToggleTodo = async (index) => {
    const updatedTodoList = [...task.todoList];
    updatedTodoList[index].isComplete = !updatedTodoList[index].isComplete;
    
    try {
      await api.put(`/tasks/${taskId}`, { ...task, todoList: updatedTodoList });
      setTask((prevTask) => ({
        ...prevTask,
        todoList: updatedTodoList,
      }));
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo) return;
    
    const updatedTodoList = [
      ...task.todoList,
      { title: newTodo, isComplete: false }
    ];
    
    try {
      await api.put(`/tasks/${taskId}`, { ...task, todoList: updatedTodoList });
      setTask((prevTask) => ({
        ...prevTask,
        todoList: updatedTodoList,
      }));
      setNewTodo(''); 
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const handleRemoveTodo = async (index) => {
    const updatedTodoList = task.todoList.filter((_, i) => i !== index);
    
    try {
      await api.put(`/tasks/${taskId}`, { ...task, todoList: updatedTodoList });
      setTask((prevTask) => ({
        ...prevTask,
        todoList: updatedTodoList,
      }));
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const handleEdit = () => {
    setEditedTask({ ...task }); 
    setEditMode(true); 
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedTask(null); 
  };

  const handleSave = async () => {
    try {
      await api.put(`/tasks/${taskId}`, editedTask); 
      setTask(editedTask); 
      setEditMode(false); 
      toast({
      
        title: "Task Edited",
        description: "Task edited successfully",
      });
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const allTodosComplete = task && task.todoList.every(todo => todo.isComplete);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!task) {
    return (
      <div className="container mx-auto p-4 mt-24">
        <div className="border border-gray-300 shadow-md p-4 mb-4 relative">
          <Skeleton className="h-52 mb-2 w-full rounded" />
      
        </div>
       
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {!editMode ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{task.title}</h1>
            <Button
              className="px-4 py-2 rounded shadow"
              onClick={handleEdit}
            >
              Edit
            </Button>
          </div>
          <div className={`border border-gray-300 shadow-md p-4 ${allTodosComplete ? 'bg-green-800' : ''} relative`}>
  <p className="mb-2 text-sm md:text-base lg:text-lg  "><strong>Description:</strong> {task.description}</p>
  <p className="mb-2 text-sm md:text-base lg:text-lg"><strong>Body:</strong> {task.body}</p>
  <div className="mt-4">
    <h2 className="text-lg font-semibold mb-2">Todo List:</h2>
    <ul className="list-disc list-inside">
      {task.todoList.map((todo, index) => (
        <li key={index} className={`mb-2 flex items-center text-sm md:text-base lg:text-lg`}>
          <input
            type="checkbox"
            checked={todo.isComplete}
            onChange={() => handleToggleTodo(index)}
            className="mr-2"
          />
          <span className={`${todo.isComplete ? 'line-through text-gray-400' : ''}`}>{todo.title}</span>
          <button
            className="ml-2 text-red-500"
            onClick={() => handleRemoveTodo(index)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </li>
      ))}
    </ul>
    <div className="mt-4 flex items-center gap-2">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
        className="border border-gray-300 rounded-md shadow-sm p-2 w-full text-black max-w-80"
      />
      <Button
        className="px-4 py-2 rounded shadow"
        onClick={handleAddTodo}
      >
        Add Todo
      </Button>
    </div>
  </div>
  <p className="text-sm mt-4">Created at: {new Date(task.createdAt).toLocaleDateString()}</p>
  {allTodosComplete && (
    <CheckCircle className="text-green-500 w-20 h-20 absolute top-28 right-20 animate-fade-in hidden md:block" />
  )}
</div>

        </>
      ) : (
        <div className="border border-gray-300 shadow-md p-4">
          <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm p-2 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description:</label>
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm p-2 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Body:</label>
            <textarea
              name="body"
              value={editedTask.body}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm p-2 text-black"
            />
          </div>
          <Button
            className="px-4 py-2 rounded shadow mr-2"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            className="px-4 py-2 rounded shadow"
            onClick={handleCancelEdit}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

export default TaskDetailsPage;
