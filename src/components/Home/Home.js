import styled from "styled-components";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  where,
  addDoc,
  deleteDoc,
  query,
  getDocs,
} from "firebase/firestore";
import newsData from "../Data/db.json";

// Define styled components
const Card = styled.div`
  width: 18rem;
  margin-bottom: 20px;
`;

const CardImage = styled.img`
  width: 100%;
`;

const CardTitle = styled.h5`
  margin-top: 10px;
`;

const CardDescription = styled.p`
  margin-top: 10px;
`;

const Button = styled.button`
  margin-top: 10px;
  background-color: transparent;
  border: 1px solid #ccc;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: black;
    color: white; /* If you want to change text color on hover */
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

function Home() {
  const [userLikes, setLikedNews] = useState([]);

  useEffect(() => {
    // Fetch liked news from Firestore
    const fetchLikedNews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userLikes"));
        const likedNewsList = querySnapshot.docs.map((doc) => doc.data().title);
        setLikedNews(likedNewsList);
        localStorage.setItem("userLikes", JSON.stringify(likedNewsList)); // Save liked news to localStorage
      } catch (error) {
        console.error("Error fetching liked news: ", error);
      }
    };
    fetchLikedNews();
  }, []);

  const handleLike = async (title) => {
    try {
      const isLiked = userLikes.includes(title);
      if (isLiked) {
        // If already liked, remove from Firestore
        const q = query(
          collection(db, "userLikes"),
          where("title", "==", title)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        const updatedLikedNews = userLikes.filter((news) => news !== title);
        setLikedNews(updatedLikedNews);
        localStorage.setItem("userLikes", JSON.stringify(updatedLikedNews)); // Update liked news in localStorage
      } else {
        // If not liked, add to Firestore
        await addDoc(collection(db, "userLikes"), {
          title: title,
          likedOn: new Date(),
        });
        const updatedLikedNews = [...userLikes, title];
        setLikedNews(updatedLikedNews);
        localStorage.setItem("userLikes", JSON.stringify(updatedLikedNews)); // Update liked news in localStorage
      }
    } catch (error) {
      console.error("Error toggling like: ", error);
      alert("Error toggling like. Please try again later");
    }
  };

  return (
    <Container>
      <div className="container my-5">
        <div className="row text-center">
          {newsData.map((val, index) => {
            return (
              <div className="col" key={index}>
                <Card>
                  <CardImage src={val.img} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <CardTitle>{val.title}</CardTitle>
                    <CardDescription>{val.description}</CardDescription>
                    <Button
                      liked={userLikes.includes(val.title)}
                      onClick={() => handleLike(val.title)}
                    >
                      {userLikes.includes(val.title) ? "Dislike" : "Like"}
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default Home;


