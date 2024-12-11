import express from "express";
import { db } from "./firebase.js";  
import cors from "cors";  
import { collection, getDocs, addDoc} from "firebase/firestore"; 

const app = express();

app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000'  // Replace with the actual frontend URL in production
}));

// Body parser middleware to handle JSON
app.use(express.json());

const usersCollection = collection(db, "users"); 
app.get("/api/users", async (req, res) => {
  try {
    const usersSnapshot = await getDocs(usersCollection); 
    const users = usersSnapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    });
    console.log('users', users)
    return res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/user", async (req, res) => {
  try {
    const reqBody = req.body;
    console.log('Received data: reqBody', reqBody);
    const docRef = await addDoc(usersCollection, reqBody);  // Add a new document with auto-generated ID
    const usersSnapshot = await getDocs(usersCollection); 
    const users = usersSnapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    });
    console.log('users', users)
    return res.json({ users });
  } catch (error) {
    console.error("Error Posting users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
  

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
