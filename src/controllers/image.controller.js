const getImages = (req, res) => {
  const images = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg",
    "/images/img6.jpg",
    "/images/img7.jpg",
    "/images/img8.jpg",
    "/images/img9.jpeg",
    "/images/img10.jpg",
  ];

  res.status(200).json(images);
};

module.exports = {
  getImages,
};