export default async function handler(req, res) {
    const query = req.query.q;
    const apiKey = process.env.TMDB_API_KEY;

    if (!query) {
        return res.status(400).json({ error: "Missing query parameter" });
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
}
