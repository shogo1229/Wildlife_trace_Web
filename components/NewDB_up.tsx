import React, { useState } from "react";
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

interface NewDBaddComponentProps {
  todo: Todo;
}

const NewDBaddComponent: React.FC<NewDBaddComponentProps> = ({ todo }) => {
  const [newTodo, setNewTodo] = useState<Todo>(todo);

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
};

export default NewDBaddComponent;
