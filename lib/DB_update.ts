import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "./firebase";

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
    console.log("in DB update", id);
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
