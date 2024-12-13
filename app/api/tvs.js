export default async function handler(req, res) {
    const { genreId } = req.query; // جلب genreId من الطلب
  
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_API_KEY}&with_genres=${genreId}`,
        {
          method: 'GET',
          headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${process.env.NEXT_API_TOKEN}`, // استخدام التوكن من متغير البيئة
          },
          cache: 'no-cache',
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch data from TMDB API");
      }
  
      const data = await response.json();
      res.status(200).json(data); // إرسال البيانات إلى العميل
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch TV data" });
    }
  }
  