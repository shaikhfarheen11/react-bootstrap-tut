import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './ProductDetails.css';

const ProductDetails = ({ productsArr }) => {
  const { id } = useParams();
  const selectedProduct = productsArr[id];
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  useEffect(() => {
    const zoomImage = document.getElementById('product-image');
    if (zoomImage) {
      if (isZoomed) {
        zoomImage.style.transform = 'scale(1.2)';
      } else {
        zoomImage.style.transform = 'scale(1)';
      }
    }
  }, [isZoomed]);

  if (!selectedProduct) {
    return <div>No product data available</div>;
  }

  return (
    <div className="product-details-container">
      <div className="image-container">
        <div
          className={`zoomable-image ${isZoomed ? 'zoomed' : ''}`}
          onClick={toggleZoom}
        >
          <img
            id="product-image"
            src={selectedProduct.imageUrl}
            alt={selectedProduct.title}
          />
        </div>
      </div>
      <div className="text-container">
        <h2>{selectedProduct.title}</h2>
        <div className="price">Price: ${selectedProduct.price}</div>
        <div className="reviews">
          <h3>Reviews</h3>
          <p>Number of Reviews: {selectedProduct.reviews ? selectedProduct.reviews.length : 0}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;