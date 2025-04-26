
const JsonLDSchema = () => {
const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Magix Movies",
    "url": "https://magix-movies.vercel.app/",
    "applicationCategory": "EntertainmentApplication",
    "operatingSystem": "All",
    "creator": {
      "@type": "Person",
      "name": "Nasreddine Abdellouche",
      "url": "https://nasreddine-abdellouche.vercel.app/"
    },
    "description": "Magix Movies, crafted by Nasreddine Abdellouche, is your go-to platform for premium movie and series insights. Explore in-depth reviews, ratings, and personalized recommendations tailored to your preferences.",
    "keywords": [
      "Magix Movies",
      "Movies",
      "Series",
      "Entertainment",
      "Film Reviews",
      "TV Show Reviews",
      "Nasreddine Abdellouche",
      "Nas@Dev",
      "Top Movies 2024",
      "Top Series 2024",
      "Movie Recommendations",
      "TV Shows Recommendations",
      "Trending Movies",
      "Trending Series"
    ],
    "inLanguage": "en-US",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "image": "https://magix-movies.vercel.app/opengraph-image.jpg",
    "sameAs": [
      "https://nasreddine-abdellouche.vercel.app/",
      "https://github.com/nasrokamora",
      "https://linkedin.com/in/nasdev",
      "https://linktr.ee/nasreddine_ab"
    ],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://magix-movies.vercel.app/"
    }
}

    return (
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export default JsonLDSchema;
