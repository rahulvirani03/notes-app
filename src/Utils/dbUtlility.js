import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase";

export const addDocument = async (noteData) => {
  try {
    await addDoc(collection(db, "notes"), {
      ...noteData,
      time: Date.now(),
    });
    return { success: true, message: "Note created" };
  } catch (err) {
    return err;
  }
};

export const getAllLDocs = async () => {
  const q = query(collection(db, "notes"));
  const result = await getDocs(q);
  const allNotes = [];
  result.forEach((item) => {
    const note = {
      ...item.data(),
      id: item.id,
    };
    allNotes.push(note);
  });
  return allNotes;
};

// export const getSingleDoc = async (id) => {
//   const docRef = doc(db, "notes", id);
//   const result = await getDoc(docRef);
//   return result.data();
// };

export const updateNote = async (note) => {
  const updateDocRef = doc(db, "notes", note.id);
  try {
    await updateDoc(updateDocRef, {
      title: note.title,
      tagline: note.tagline,
      description: note.description,
      isPinned: note.isPinned,
      time: Date.now(),
    });
    return { success: true, message: "updated" };
  } catch (err) {
    return { success: false, message: err };
  }
};

export const deletNote = async (id) => {
  const updateDocRef = doc(db, "notes", id);
  try {
    await deleteDoc(updateDocRef);
    return { success: true, message: "deleted" };
  } catch (err) {
    return { success: false, message: err };
  }
};
