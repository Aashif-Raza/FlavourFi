import { useState, useEffect } from 'react';

const RecipeRating = ({ recipeId, recipeTitle }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    // Load existing reviews
    const storedReviews = JSON.parse(localStorage.getItem(`reviews_${recipeId}`)) || [];
    setAllReviews(storedReviews);
    
    // Load user's previous rating and review
    const userData = storedReviews.find(review => review.userId === 'currentUser');
    if (userData) {
      setUserRating(userData.rating);
      setUserReview(userData.review);
      setRating(userData.rating);
      setReview(userData.review);
    }
  }, [recipeId]);

  const handleRating = (newRating) => {
    setRating(newRating);
    setUserRating(newRating);
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      alert('Please select a rating before submitting!');
      return;
    }

    const newReview = {
      id: Date.now(),
      userId: 'currentUser',
      userName: 'You',
      rating: rating,
      review: review,
      date: new Date().toLocaleDateString(),
      recipeId: recipeId,
      recipeTitle: recipeTitle
    };

    // Update reviews in localStorage
    const existingReviews = JSON.parse(localStorage.getItem(`reviews_${recipeId}`)) || [];
    const updatedReviews = existingReviews.filter(r => r.userId !== 'currentUser');
    updatedReviews.push(newReview);
    localStorage.setItem(`reviews_${recipeId}`, JSON.stringify(updatedReviews));

    setAllReviews(updatedReviews);
    setUserRating(rating);
    setUserReview(review);
    setShowReviewForm(false);
  };

  const averageRating = allReviews.length > 0 
    ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
    : 0;

  const renderStars = (rating, interactive = false) => {
    return [...Array(5)].map((_, index) => (
      <button
        key={index}
        onClick={() => interactive && handleRating(index + 1)}
        className={`text-2xl ${interactive ? 'cursor-pointer' : 'cursor-default'} ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        } ${interactive ? 'hover:text-yellow-300' : ''}`}
        disabled={!interactive}
      >
        ★
      </button>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">⭐ Recipe Ratings & Reviews</h3>
      
      {/* Average Rating Display */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl font-bold text-gray-800">{averageRating}</span>
          <div className="flex">
            {renderStars(Math.round(parseFloat(averageRating)))}
          </div>
          <span className="text-sm text-gray-600">({allReviews.length} reviews)</span>
        </div>
      </div>

      {/* User Rating Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Your Rating</h4>
        <div className="flex items-center gap-2 mb-3">
          {renderStars(userRating, true)}
          <span className="text-sm text-gray-600 ml-2">
            {userRating > 0 ? `${userRating}/5 stars` : 'Click to rate'}
          </span>
        </div>
        
        {userRating > 0 && (
          <div className="mb-3">
            <p className="text-sm text-gray-700 mb-2">Your review:</p>
            <p className="text-sm bg-white p-2 rounded border">{userReview || 'No review written yet.'}</p>
          </div>
        )}

        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
        >
          {userRating > 0 ? 'Edit Review' : 'Write a Review'}
        </button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium mb-3">Write Your Review</h4>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating:</label>
            <div className="flex items-center gap-1">
              {renderStars(rating, true)}
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Review:</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your thoughts about this recipe..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSubmitReview}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Submit Review
            </button>
            <button
              onClick={() => setShowReviewForm(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* All Reviews */}
      {allReviews.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">All Reviews</h4>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {allReviews.map((review) => (
              <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{review.userName}</span>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <div className="flex mb-2">
                  {renderStars(review.rating)}
                </div>
                {review.review && (
                  <p className="text-sm text-gray-700">{review.review}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeRating; 