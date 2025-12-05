
import React, { useEffect, useState } from "react";
import "./wardrobe.css";


function Wardrobe() {
  

  const [images, setImages] = useState([]);
  const [modalItem, setModalItem] = useState(null); 
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wardrobeImages") || "[]");
    setImages(saved);
    const fav = JSON.parse(localStorage.getItem("wardrobeFavorites") || "[]");
    setFavorites(fav);
  }, []);

 
  useEffect(() => {
    localStorage.setItem("wardrobeImages", JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    localStorage.setItem("wardrobeFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      return new Promise((res) => {
        const fr = new FileReader();
        fr.onload = () => {
          res({ id: Date.now().toString() + Math.random().toString(36).slice(2,8), dataUrl: fr.result, name: file.name });
        };
        fr.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(newItems => {
      setImages(prev => [...newItems, ...prev]); // new first
    });
    e.target.value = ""; // reset input
  };

  const openModal = (item) => setModalItem(item);
  const closeModal = () => setModalItem(null);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      return [...prev, id];
    });
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(i => i.id !== id));
    setFavorites(prev => prev.filter(x => x !== id));
    if (modalItem?.id === id) setModalItem(null);
  };

  return (
    <div className="page-container">
      <div style={{ textAlign: "center", marginTop: 6 }}>
        <h2 className="pink-text">My Wardrobe 👗</h2>
        <p className="center">Upload your clothes photos — they will be used for outfit suggestions.</p>

        <label className="upload-btn cta-btn" style={{ display: "inline-block", marginTop: 18 }}>
          + Add Clothes
          <input type="file" multiple accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
        </label>
      </div>

      <div className="wardrobe-grid" style={{ marginTop: 30 }}>
        {images.length === 0 && (
          <div className="card center" style={{ padding: 40 }}>
            <p>No clothes yet — add some cute photos 💖</p>
          </div>
        )}

        {images.map(item => (
          <div key={item.id} className="wardrobe-card card">
            <div className="card-image-wrap" onClick={() => openModal(item)} role="button">
              <img src={item.dataUrl} alt={item.name} />
            </div>

            <div className="card-actions">
              <button
                className="heart-btn"
                onClick={() => toggleFavorite(item.id)}
                aria-label="favorite"
                title={favorites.includes(item.id) ? "Remove favorite" : "Add to favorites"}
              >
                {favorites.includes(item.id) ? "💖" : "🤍"}
              </button>

              <button className="small-remove" onClick={() => removeImage(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalItem && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e)=> e.stopPropagation()}>
            <div style={{ flex: 1 }}>
              <img src={modalItem.dataUrl} alt={modalItem.name} style={{ maxWidth: "100%", borderRadius: 12 }} />
            </div>

            <div style={{ width: 220, display: "flex", flexDirection: "column", gap: 14 }}>
              <h3 style={{ margin: 0 }} className="pink-text">{modalItem.name}</h3>
              <p style={{ marginTop: 6, color: "#666" }}>Preview your item. Add to favorites or remove it.</p>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="cta-btn"
                  onClick={() => toggleFavorite(modalItem.id)}
                >
                  {favorites.includes(modalItem.id) ? "Remove Favorite 💔" : "Add to Favorites 💖"}
                </button>

                <button
                  onClick={() => { removeImage(modalItem.id); }}
                  style={{ background: "#fff", border: "1px solid #eee", padding: "10px 12px", borderRadius: 12, cursor: "pointer" }}
                >
                  Delete
                </button>
              </div>

              <button onClick={closeModal} style={{ marginTop: 6, padding: "8px 10px", borderRadius: 10, cursor: "pointer" }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wardrobe;
