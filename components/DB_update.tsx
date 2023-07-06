import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../lib/firebase";

interface Todo {
  id: string;
  ID: number;
  point: number;
}

export async function updatePoint(
  id: string,
  additionalPoint: number
): Promise<void> {
  try {
    const todoRef = doc(db, "Users", id);
    const snapshot = await getDoc(todoRef);
    if (!snapshot.exists()) {
      throw new Error("Users not found");
    }

    const currentPoint = snapshot.data().point || 0;
    const newPoint = currentPoint + additionalPoint;

    await updateDoc(todoRef, {
      point: newPoint,
    });
    console.log("Point updated successfully");
  } catch (error) {
    console.error("Error updating point:", error);
  }
}

// Usage example:
updatePoint("your-todo-id", 10); // Replace 'your-todo-id' with the actual ID of the Todo you want to update
