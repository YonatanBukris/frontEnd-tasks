import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api.service';
import { CheckCircle } from 'lucide-react'; // Import Lucide CheckCircle icon

function TaskDetailsPage() {
  const { taskId } = useParams(); // Get taskId from URL parameters
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await api.get(`/tasks/${taskId}`); // Fetch task details by taskId
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

  const allTodosComplete = task && task.todoList.every(todo => todo.isComplete);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
      <div className={`border border-gray-300 shadow-md p-4 ${allTodosComplete ? 'bg-green-800' : ''} relative`}>
        <p className="mb-2"><strong>Description:</strong> {task.description}</p>
        <p className="mb-2"><strong>Body:</strong> {task.body}</p>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Todo List:</h2>
          <ul className="list-disc list-inside">
            {task.todoList.map((todo, index) => (
              <li key={index} className={`mb-2 ${todo.isComplete ? 'line-through text-gray-400' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.isComplete}
                  onChange={() => handleToggleTodo(index)}
                  className="mr-2"
                />
                {todo.title}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm mt-4">Created at: {new Date(task.createdAt).toLocaleDateString()}</p>
        {allTodosComplete && (
          <CheckCircle className="text-green-500 w-20 h-20 absolute top-12 right-20 animate-fade-in" />
        )}
      </div>
    </div>
  );
}

export default TaskDetailsPage;
