import express from "express";
import axios from "axios";
import cors from "cors";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Search books by title or query
app.get("/api/search", async (req, res) => {
  const q = req.query.q || req.query.title;

  if (!q) return res.status(400).json({ error: "Title is required" });

  try {
    const response = await axios.get(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(q)}`
    );
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Get book details by workId + author names
app.get("/api/books/:workId", async (req, res) => {
  const { workId } = req.params;
  if (!workId) return res.status(400).json({ error: "Work ID is required" });

  try {
    // Fetch the work details
    const workRes = await axios.get(`https://openlibrary.org/works/${workId}.json`);
    const workData = workRes.data;

    // Fetch all authors in parallel
    const authors = await Promise.all(
      (workData.authors || []).map(async (a) => {
        try {
          const authorRes = await axios.get(`https://openlibrary.org${a.author.key}.json`);
          return { key: a.author.key, name: authorRes.data.name };
        } catch (err) {
          console.warn(`Failed to fetch author ${a.author.key}:`, err.message);
          return { key: a.author.key, name: a.author.key.split("/").pop() }; // fallback
        }
      })
    );

    // Attach authors to the workData
    workData.authorNames = authors.map(a => a.name);

    res.json(workData);
  } catch (err) {
    console.error("Error fetching book details:", err.message);
    res.status(500).json({ error: "Failed to fetch book details" });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
