import { useState, useEffect ,MouseEvent} from "react";
import songsService from "../../apis/services/songs.service";
import { Song } from "../../types/songs.types";
import plusCircle from "../../images/plus-circle.png";
import PubSub from "pubsub-js";

interface SongsProps {
  SearchProps: string;
}

export default function Songs({ SearchProps }: SongsProps) {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const getSongData = async () => {
      try {
        const response = await songsService.getSongs();
        console.log("this", response.data);
        setSongs(response.data);
      } catch (error) {
        console.error("error");
      }
    };
    getSongData();
  }, []);

  useEffect(() => {
    const handleSubscription = (_msg: string, searchData: Song[]) => {
      setSongs(searchData);
    };
    const subscribedData = PubSub.subscribe("search", handleSubscription);

    return () => {
      PubSub.unsubscribe(subscribedData);
    };
  }, []);

  const addSongsToPlaylist = async (e: MouseEvent<HTMLImageElement>) => {
    const value = e.currentTarget.alt
    try {
        const response = await songsService.addPlaylist(value);
        PubSub.publish("songs", response.data.id);
    } catch (error) {
        console.error(error);
    }
}


  return (
    <div className="container mt-5">
      <div>
        <h3>SONGS TO PLAY</h3>
        <table className="table table-bordered border-primary table-hover">
          <thead>
            <tr>
              <th scope="col">index</th>
              <th scope="col">title</th>
              <th scope="col">ReleaseDate</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {songs
              .filter((item) =>
                item.title.toLowerCase().includes(SearchProps.toLowerCase())
              )
              .map((song, index) => (
                <tr key={song.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{song.title}</td>
                  <td>{song.releaseDate}</td>
                  <td>
                    <img
                    onClick={addSongsToPlaylist}
                      src={plusCircle}
                      alt={song.id}
                      style={{ width: "25px", height: "25px" }}

                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
