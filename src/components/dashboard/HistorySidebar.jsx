function HistorySidebar({ history, onSelect }) {
  return (
    <aside className="card history-sidebar">
      <h3>Prompt History</h3>
      {history.length === 0 ? (
        <p className="meta-text">Your saved generations will appear here.</p>
      ) : (
        <ul className="history-list">
          {history.map((item) => (
            <li key={item.id}>
              <button onClick={() => onSelect(item)}>
                <p>{item.title}</p>
                <small>{new Date(item.createdAt).toLocaleString()}</small>
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default HistorySidebar;
