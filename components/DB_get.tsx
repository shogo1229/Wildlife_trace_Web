import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import firebaseConfig from "../lib/firebase";

interface Todo {
  id: string;
  class: string;
  latitude: number;
  longitude: number;
  user: number;
}

const DBgetComponent = () => {
  const [data, setData] = useState<Todo[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firebaseConfig, "trace_DB"),
      (snapshot) => {
        const arrList: Todo[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          arrList.push({
            id: doc.id,
            class: data.class,
            latitude: data.latitude,
            longitude: data.longitude,
            user: data.user,
          });
        });
        setData(arrList);
      }
    );

    return () => {
      unsubscribe(); // Unsubscribe the listener
    };
  }, []); // Pass an empty dependency array to run the effect only once during component mounting
  console.log("GetDB", data);
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>
            Latitude: {todo.latitude}, Longitude: {todo.longitude}, Class:{" "}
            {todo.class}, User: {todo.user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DBgetComponent;
