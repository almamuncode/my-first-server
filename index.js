import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});



app.get('/contact', (req, res) => {
    res.send('Contact Page');
});


const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
    { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com' }
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.post('/users', (req, res) => {
    const { name, email } = req.body ?? {};
    if (typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim()) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    const newUser = {
        id: users.length + 1,
        name: name.trim(),
        email: email.trim()
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

