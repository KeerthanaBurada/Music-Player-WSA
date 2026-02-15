import axios from "axios";

/* ============================
   GET ALL SONGS
============================ */

const getSongs = async (req, res) => {
  try {
    const clientId = "c8a00373";

    const response = await axios.get("https://api.jamendo.com/v3.0/tracks/", {
      params: {
        client_id: clientId,
        format: "json",
        limit: 15,
      },
    });

    const songs = response.data.results || [];

    const formattedSongs = songs.map((song) => ({
      id: song.id,
      name: song.name,
      artist_name: song.artist_name,
      duration: song.duration,
      releasedate: song.releasedate,
      image: song.album_image || song.image || "",
      audio: song.audio || song.audio_download || "", // 🔥 Important
    }));

    return res.status(200).json(formattedSongs);
  } catch (error) {
    console.error("getSongs error:", error.message);
    return res.status(500).json({
      message: "Failed to fetch songs",
    });
  }
};

/* ============================
   GET PLAYLIST BY TAG
============================ */

const getPlaylistByTag = async (req, res) => {
  try {
    const tag = (req.params.tag || req.query.tag || "").toString().trim();

    if (!tag) {
      return res.status(400).json({
        message: "Missing tag parameter",
      });
    }

    const clientId = "c8a00373";

    const response = await axios.get("https://api.jamendo.com/v3.0/tracks/", {
      params: {
        client_id: clientId,
        format: "json",
        tags: tag,
        limit: 15,
      },
    });

    const songs = response.data.results || [];

    const formattedSongs = songs.map((song) => ({
      id: song.id,
      name: song.name,
      artist_name: song.artist_name,
      duration: song.duration,
      releasedate: song.releasedate,
      image: song.album_image || song.image || "",
      audio: song.audio || song.audio_download || "", // 🔥 Important
    }));

    return res.status(200).json(formattedSongs);
  } catch (error) {
    console.error("getPlaylistByTag error:", error.message);
    return res.status(500).json({
      message: "Failed to fetch playlist",
    });
  }
};

/* ============================
   TOGGLE FAVOURITE
============================ */

const toggleFavourite = async (req, res) => {
  try {
    const user = req.user;
    const song = req.body.song;

    const exists = user.favourites.find((fav) => fav.id === song.id);

    if (exists) {
      user.favourites = user.favourites.filter((fav) => fav.id !== song.id);
    } else {
      user.favourites.push(song);
    }

    await user.save();

    return res.status(200).json(user.favourites);
  } catch (error) {
    console.error("toggleFavourite error:", error.message);
    return res.status(400).json({
      message: "Favourites not updated",
    });
  }
};

/* ============================
   EXPORTS
============================ */

export { getSongs, getPlaylistByTag, toggleFavourite };
