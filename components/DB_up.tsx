import { useState } from "react";
import firebaseConfig from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { constSelector } from "recoil";

interface Todo {
  id: string;
  class: string;
  latitude: number;
  longitude: number;
  user: number;
}

const DBaddComponent = () => {
  const [newTodo, setNewTodo] = useState<Todo>({
    id: "",
    class: "",
    latitude: 0,
    longitude: 0,
    user: 0,
  });

  const handleAddTodo = async () => {
    try {
      const docRef = await addDoc(collection(firebaseConfig, "trace_DB"), {
        Class: newTodo.class,
        Latitude: newTodo.latitude,
        Longitude: newTodo.longitude,
        User: newTodo.user,
      });

      setNewTodo({
        id: docRef.id,
        class: "",
        latitude: 0,
        longitude: 0,
        user: 0,
      });
    } catch (error) {
      console.error("Error adding todo: ", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Add Todo</h1>
      <label>
        Class:
        <input
          type="text"
          name="class"
          value={newTodo.class}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Latitude:
        <input
          type="number"
          name="latitude"
          value={newTodo.latitude}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Longitude:
        <input
          type="number"
          name="longitude"
          value={newTodo.longitude}
          onChange={handleInputChange}
        />
      </label>
      <label>
        User:
        <input
          type="number"
          name="user"
          value={newTodo.user}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default DBaddComponent;
