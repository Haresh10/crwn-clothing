import { findAllByTitle } from "@testing-library/react";
import React from "react";
import "./collectionitem.scss";

const CollectionItem = ({ name, imageUrl, price }) => {
  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="title">{name}</span>
        <span className="price">${price}</span>
      </div>
    </div>
  );
};

export default CollectionItem;
