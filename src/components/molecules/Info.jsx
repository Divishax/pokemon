function Info({ name, height, weight, types }) {
  return (
    <div className="text-center mb-6">
      <h1 className="text-4xl font-bold capitalize text-gray-800 mb-4">
        {name}
      </h1>
      <p className="text-gray-700 text-lg">
        <strong>Height:</strong> {height / 10} m
      </p>
      <p className="text-gray-700 text-lg">
        <strong>Weight:</strong> {weight / 10} kg
      </p>
      <p className="text-gray-700 text-lg">
        <strong>Type:</strong> {types.join(", ")}
      </p>
    </div>
  );
}

export default Info;
