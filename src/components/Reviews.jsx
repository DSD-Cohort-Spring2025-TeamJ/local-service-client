import React, { useState, useEffect, useRef } from 'react';
import reviews from "/src/components/ReviewData.js"

const ScrollingReviews = ({ scrollSpeed = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsContainerRef = useRef(null);

  useEffect(() => {

    const fetchData = async () => {
        setReviews(reviewsData);
    }

    fetchData();
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, scrollSpeed);

    return () => clearInterval(intervalId);
  }, [reviews.length, scrollSpeed]);

  useEffect(() => {
    if (reviewsContainerRef.current) {
      reviewsContainerRef.current.scrollTo({
        top: (reviewsContainerRef.current.clientHeight * currentIndex),
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  return (
    <div className="flex justify-center items-center w-[270px] h-[150px] bg-green-600 border-green-800 border-4 rounded-lg">
    <div className="flex justify-center itemes-center overflow-hidden h-[100px] w-[250px] mr-1"  ref={reviewsContainerRef}>
      <div className="reviews-wrapper" style={{ transition: 'transform 0.5s ease-in-out' }}>
        {reviews.map((review, index) => (
          <div key={index} className="review h-[100px] bg-green-600 text-white">
            <p>{review.text}</p>
            <p className="author">- {review.author}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ScrollingReviews;



// export default function Reviews() {
// return (
//     <div className=" mr-10 bg-[#005701] w-[400px] h-[350px] rounded-lg shadow-xl shadow-green-500/50 pt-2 border-black-2">
//         <img src="./reviews.png" className="w-100"/>
//     </div>
// )
// }

