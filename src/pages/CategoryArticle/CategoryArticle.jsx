import React, { useEffect, useState } from "react";
import "./CategoryArticle.css";
import { useParams } from "react-router-dom";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../config/firebaseCongfig";
import ArticleCard from "../../components/ArticleCard/ArticleCard";

const CategoryArticle = () => {
  const [articles, setArticles] = useState([]);

  const { categoryName } = useParams();

  useEffect(() => {
    const articlesRef = collection(db, "articles");

    const q = query(articlesRef, where("category", "==", categoryName));

    getDocs(q, articlesRef).then((res) => {
      const articles = res.docs.map((item) => {
        return {
          ...item.data(),
          id: item?.id,
        };
      });

      setArticles(articles);
    });
  }, [categoryName]);

  return (
    <div className="category-articles">
      <div className="article-container">
        {articles.map((item) => (
          <ArticleCard key={item.id} article={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryArticle;
