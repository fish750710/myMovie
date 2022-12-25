export default {
  apiURL: import.meta.env.VITE_TMDB_API_URL,
  apiKey: import.meta.env.VITE_TMDB_API_KEY,
  lang: import.meta.env.VITE_LANG,
  local: import.meta.env.VITE_LOCAL,
  imgURL: import.meta.env.VITE_TMDB_IMG_URL,
  originalURL: import.meta.env.VITE_TMDB_ORIGINAL_URL,
  youtubeURL: import.meta.env.VITE_YOUTUBE_URL,
  baseParams: `api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${
    import.meta.env.VITE_LANG
  }`,
  requestQptions: (method, data) => {
    return {
      method: method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    };
  },
};
