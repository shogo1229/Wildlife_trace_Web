import { useState } from "react";
import firebaseConfig from "../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { todoIdState } from "../state/todoState";

interface Todo {
  id: string;
  class: string;
  latitude: number;
  longitude: number;
  user: number;
}

const UpdateTodoComponent = () => {
  const todoId = useRecoilValue(todoIdState);
  const [updatedTodo, setUpdatedTodo] = useState<Todo>({
    id: todoId,
    class: "",
    latitude: 0,
    longitude: 0,
    user: 0,
  });

  const handleUpdateTodo = async () => {
    try {
      const todoDocRef = doc(firebaseConfig, "trace_DB", updatedTodo.id);

      await updateDoc(todoDocRef, {
        Class: updatedTodo.class,
        Latitude: updatedTodo.latitude,
        Longitude: updatedTodo.longitude,
        User: updatedTodo.user,
      });

      setUpdatedTodo({
        id: todoId,
        class: "",
        latitude: 0,
        longitude: 0,
        user: 0,
      });
    } catch (error) {
      console.error("Error updating todo: ", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Update Todo</h1>
      <label>
        Class:
        <input
          type="text"
          name="class"
          value={updatedTodo.class}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Latitude:
        <input
          type="number"
          name="latitude"
          value={updatedTodo.latitude}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Longitude:
        <input
          type="number"
          name="longitude"
          value={updatedTodo.longitude}
          onChange={handleInputChange}
        />
      </label>
      <label>
        User:
        <input
          type="number"
          name="user"
          value={updatedTodo.user}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleUpdateTodo}>Update Todo</button>
    </div>
  );
};

export default UpdateTodoComponent;
