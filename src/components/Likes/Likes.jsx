import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { auth, db } from "../../config/firebaseCongfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  doc,
  where,
} from "firebase/firestore";

function Likes({ articleId }) {
  const [user] = useAuthState(auth);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const likesRef = collection(db, "Likes");
    if (user) {
      const q = query(
        likesRef,
        where("articleId", "==", articleId),
        where("userId", "==", user?.uid)
      );
      getDocs(q, likesRef)
        .then((res) => {
          if (res.size > 0) {
            setIsLiked(true);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  useEffect(() => {
    const likesRef = collection(db, "likes");
  });
  const handleLikes = (e) => {};
  const handleUnlike = (e) => {};
  return (
    <div>
      {isLiked ? (
        <FaHeart onClick={handleUnlike} />
      ) : (
        <FaRegHeart onClick={handleLikes} />
      )}
      <span> {likeCount}</span>
    </div>
  );
}

export default Likes;
