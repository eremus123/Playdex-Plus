const Games = require("../models/Games");
const Favourites = require("../models/Favourites");

const getAllGames = async (req, res) => {
  try {
    const allGames = await Games.find();
    res.json(allGames);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error getting all games" });
  }
};

const addFavourites = async (req, res) => {
  try {
    const newGame = {
      username: req.body.username,
      id: req.body.id,
      slug: req.body.slug,
      name: req.body.name,
      released: req.body.released,
      tba: req.body.tba,
      background_image: req.body.background_image,
      rating: req.body.rating,
      rating_top: req.body.rating_top,
      ratings: req.body.ratings,
      ratings_count: req.body.ratings_count,
      reviews_text_count: req.body.reviews_text_count,
      added: req.body.added,
      added_by_status_yet: req.body.added_by_status_yet,
      added_by_status_owned: req.body.added_by_status_owned,
      added_by_status_beaten: req.body.added_by_status_beaten,
      added_by_status_toplay: req.body.added_by_status_toplay,
      added_by_status_dropped: req.body.added_by_status_dropped,
      added_by_status_playing: req.body.added_by_status_playing,
      metacritic: req.body.metacritic,
      playtime: req.body.playtime,
      suggestions_count: req.body.suggestions_count,
      updated: req.body.update,
      reviews_count: req.body.reviews_count,
      saturated_color: req.body.saturated_color,
      dominant_color: req.body.dominant_color,
      platforms: req.body.platforms,
      parent_platforms: req.body.parent_platforms,
      genres: req.body.genres,
      stores: req.body.stores,
      tags: req.body.tags,
      esrb_rating_id: req.body.esrb_rating_id,
      esrb_rating_name: req.body.esrb_rating_name,
      esrb_rating_slug: req.body.esrb_rating_slug,
      short_screenshots: req.body.short_screenshots,
    };
    await Favourites.create(newGame);
    res.json({ status: "ok", msg: "game saved" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "game not saved" });
  }
};

const getGameByUserPlaylist = async (req, res) => {
  try {
    const game = await Favourites.find({
      username: req.body.username,
    })
      .select("id")
      .select("slug")
      .select("name")
      .select("released")
      .select("background_image")
      .select("platforms")
      .select("short_screenshots")
      .select("genres")
      .select("parent_platforms")
      .select("status");
    res.json(game);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting game" });
  }
};

const getFavourites = async (req, res) => {
  try {
    const favourites = await Favourites.find();
    res.json(favourites);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error getting favourites" });
  }
};

const updateGame = async (req, res) => {
  try {
    // Use the $set operator to update only the specified fields
    await Favourites.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // This option returns the updated document
    );
    res.json({ status: "ok", msg: "game updated" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error updating game" });
  }
};

const removeGame = async (req, res) => {
  try {
    await Favourites.findByIdAndDelete(req.params.id);
    res.json({ status: "ok", msg: "game deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error deleting game" });
  }
};

module.exports = {
  getAllGames,
  addFavourites,
  getGameByUserPlaylist,
  getFavourites,
  updateGame,
  removeGame,
};
