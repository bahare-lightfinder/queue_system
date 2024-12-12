import React from "react";
import { postRequest, getRequest, deleteRequest } from "./apiService";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

interface UserInterface {
  id: string;
  name: string;
  age: number;
}

const App = () => {
  const [users, setUsers] = React.useState<UserInterface[]>([]);
  const [name, setName] = React.useState<string>("");
  const [age, setAge] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const getUsers = async () => {
    const result = await getRequest("api/users");
    if (!("users" in result)) {
      setError("Could not get users");
    } else {
      setUsers(result.users);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isNaN(Number(age)) && typeof name === "string" && name.trim() !== "") {
      const response = await postRequest(
        "api/post/user",
        JSON.stringify({ name: name, age: Number(age) })
      );
      setUsers(response.users);
      setName("");
      setAge("");
    } else {
      alert("Please provide valid values in the fields.");
    }
  };

  const removeUser = async (id: string) => {
    const result = await deleteRequest(`api/delete/user/${id}`);
    setUsers(result.users);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: 500,
        flexDirection: "column",
        gap: 2,
        p: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
      >
        <TextField
          label="Enter your name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Enter your age"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {users.map((user) => (
          <ListItem
            key={user.id}
            divider
            disableGutters
            secondaryAction={
              <ListItemButton onClick={() => removeUser(user.id)}>
                DELETE
              </ListItemButton>
            }
          >
            <ListItemText
              primary={`Name: ${user.name}`}
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                  Age: {user.age}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default App;
