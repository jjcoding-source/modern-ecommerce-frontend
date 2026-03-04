import { createContext, useContext, useState } from "react";

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState({}); 

  const addReview = (productId, review) => {
    setReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), review],
    }));
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => useContext(ReviewsContext);