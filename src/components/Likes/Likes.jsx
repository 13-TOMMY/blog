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

const Likes = ({ articleId }) => {
  const [user] = useAuthState(auth);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const likesRef = collection(db, "likes");
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
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    const likesRef = collection(db, "likes");

    const q2 = query(likesRef, where("articleId", "==", articleId));

    getDocs(q2, likesRef)
      .then((res) => {
        setLikeCount(res.size);
      })
      .catch((err) => console.log(err));
  }, [isLiked]);

  const handleLikes = (e) => {
    if (user) {
      const likesRef = collection(db, "likes");
      addDoc(likesRef, {
        userId: user?.uid,
        articleId: articleId,
      })
        .then((res) => {
          setIsLiked(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUnlike = (e) => {
    if (user) {
      const likesRef = collection(db, "likes");

      const q = query(
        likesRef,
        where("articleId", "==", articleId),
        where("userId", "==", user?.uid)
      );

      getDocs(q, likesRef)
        .then((res) => {

          const likesId = res.docs[0].id;
          deleteDoc(doc(db, "likes", likesId))
            .then((res) => setIsLiked(false))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };
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
