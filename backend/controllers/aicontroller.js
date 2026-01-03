exports.generateOutfit = (req, res) => {
  const data = req.body;

  res.json({
    outfit: "Soft pink elegant outfit",
    rating: 4.8
  });
};
