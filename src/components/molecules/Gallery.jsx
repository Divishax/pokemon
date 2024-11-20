function Gallery({ sprites }) {
  return (
    <div className="bg-white p-6 mt-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h3 className="text-xl font-bold text-blue-500 mb-4">Gallery</h3>
      <div className="flex flex-wrap justify-center gap-6">
        {sprites.map((sprite, index) => (
          <img
            key={index}
            src={sprite.url}
            alt={sprite.alt}
            className="w-32 h-32 object-contain rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
