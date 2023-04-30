import { useState, useEffect } from "react";
import  {api} from "../api/axios"
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api.get("/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  interface Task {
    id: string;
    title: string;
    description: string;
    priority: number;
    completed: boolean;
  }


  return (
    <div>
      <h2>Task List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.priority}</td>
              <td>{task.completed ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;