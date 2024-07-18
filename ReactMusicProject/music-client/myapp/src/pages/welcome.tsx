import Header from "../components/Headr/header";
import Songs from "../components/Songs/Songs";
import Playlist from "../components/Playlist/Playlist";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import'./welcome.css'

export type Song = {
  id: string;
  urlPath: string;
  title: string;
  releaseDate: string;
};

function Welcome() {
  const [search, setSearch] = useState('');
  return (
    <>
      {localStorage.getItem("token") ? (
        <div>
          <Header setSearch={setSearch} />

          <Songs SearchProps={search}  />

          <Playlist />
          </div>
      ) : (
      
        <Navigate to="/login" />
        
      )}
    </>
  );
}

export default Welcome;
