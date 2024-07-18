import { KeyboardEvent } from "react";
import logo from "../../images/logo.jpeg";
import songsService from "../../apis/services/songs.service";

import { useNavigate } from "react-router-dom";

import PubSub from "pubsub-js";
type Props = {
  setSearch: (value: string) => void;
};

export default function Header({ setSearch }: Props) {
  const navigate = useNavigate();

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.trim() && e.key === "enter") {
      try {
        const response = await songsService.searchSongByTitle(
          e.currentTarget.value
        );
        PubSub.publish("search", response.data);
      } catch (error) {
        console.log("no search is available");
      }
    }
  };

  return (
    <div>
      {" "}
      <header className="py-3 mb-3 border-bottom">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={logo}
              alt="music logo"
              className="bi me-2"
              width="40"
              height="32"
            />

            <div className="me-3" role="search">
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearch(e.currentTarget.value)}
                style={{ width: "550%" }}
              />
            </div>
          </div>

          <button
            type="button"
            className="btn btn-outline-primary me-2"
            onClick={() => navigate("/login")}
          >
            Logout
          </button>
        </div>
      </header>
    </div>
  );
}
