import React, { useEffect, useState } from 'react';
import './ResumeSummaryCard.css';
import { getLightColorFromImage } from "../../utils/helper";

const ResumeSummaryCard = ({ imgUrl, title, lastUpdated, onSelect }) => {
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    console.log("ResumeSummaryCard - imgUrl:", imgUrl);
    console.log("ResumeSummaryCard - title:", title);
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then((color) => {
          setBgColor(color);
        })
        .catch((error) => {
          console.error("Error getting color from image:", error);
          setBgColor("#ffffff");
        });
    }
  }, [imgUrl]);

  return (
    <div className="card">
      <div className="card__shine" />
      <div className="card__glow" />
      <div className="card__content">
        <div className="card__image">
          {imgUrl ? (
            <img src={imgUrl} alt={title} />
          ) : (
            <div style={{ backgroundColor: bgColor }} />
          )}
        </div>
        <div className="card__footer">
          <div className="card__text">
            <p className="card__title">{title}</p>
            <p className="card__description">Last Updated: {lastUpdated}</p>
          </div>
          <div className="card__button" onClick={onSelect}>
            <svg height={16} width={16} viewBox="0 0 24 24">
              <path
                strokeWidth={2}
                stroke="currentColor"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;