import React, { useEffect, useState } from "react";
import "./CategoryArticle.css";
import { useParams } from "react-router-dom";
import { collection, query, getDocs, where } from "firebase/firestore";

function CategoryArticle() {
  const { categoryName } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, "articles");

    const q = query(articlesRef, where("category", "==", categoryName));

    getDocs(q, articlesRef).then((res) => {
      const articles = res.docs.map((item) => {
        return {
          ...item.data(),
          id: item.id,
        };
      });
      setArticles(articles);
    });
  }, [categoryName]);

  return (
    <div>
      {articles.map((item) => (
        <p>{item.title}</p>
      ))}
    </div>
  );
}

export default CategoryArticle;
