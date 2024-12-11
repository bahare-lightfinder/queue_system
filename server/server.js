import express from "express";
import { db } from "./firebase.js";
import cors from "cors";
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

const app = express();

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the actual frontend URL in production
  })
);

// Body parser middleware to handle JSON
app.use(express.json());

const usersCollection = collection(db, "users");
app.get("/api/users", async (req, res) => {
  try {
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return res.json({ users });
  } catch (error) {
   return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/post/user", async (req, res) => {
  try {
    const reqBody = req.body;
    const docRef = await addDoc(usersCollection, reqBody); // Add a new document with auto-generated ID
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/delete/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const userDocRef = doc(db, 'users', userId);

    
    await deleteDoc(userDocRef); // Delete the document in firebase firestore database
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
