import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "./firebase";

interface Todo {
  id: string;
  ID: number;
  point: number;
  Boar_point: number;
  Deer_point: number;
}

export async function updatePoint_class(
  id: string,
  additionalPoint: number,
  selectedClass: string
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

    let newDeerPoint = snapshot.data().Deer_point || 0;
    let newBoarPoint = snapshot.data().Boar_point || 0;

    if (selectedClass === "Deer") {
      const currentDeerPoint = snapshot.data().Deer_point || 0;
      newDeerPoint = currentDeerPoint + additionalPoint;
      console.log("in Deer", newDeerPoint);
    }

    if (selectedClass === "Boar") {
      const currentBoarPoint = snapshot.data().Boar_point || 0;
      newBoarPoint = currentBoarPoint + additionalPoint;
      console.log("in Boar", newBoarPoint);
    }

    await updateDoc(todoRef, {
      point: newPoint,
      Deer_point: newDeerPoint,
      Boar_point: newBoarPoint,
    });
    console.log("Point updated successfully");
  } catch (error) {
    console.error("Error updating point:", error);
  }
}
