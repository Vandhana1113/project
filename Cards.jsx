function Cards({ label, value, bg, icon }) {
  return (
    <div className={`p-4 rounded-lg shadow ${bg} flex items-center justify-between`}>
      <div>
        <h3 className="text-lg font-semibold">{label}</h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
      <div>{icon}</div>
    </div>
  );
}

export default Cards;
