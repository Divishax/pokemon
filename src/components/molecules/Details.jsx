function Details({ title, items }) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-blue-500 border-b border-gray-300 pb-2">
        {title}
      </h3>
      <ul className="list-disc list-inside mt-2 text-gray-700">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Details;
