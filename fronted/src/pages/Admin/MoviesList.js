import moment from "moment";
import { Button, Table, message } from "antd";
import { useEffect, useState } from "react";
import MovieForm from "./MovieForm";
import { DeleteMovie, GetAllMovies } from "../../apicalls/movies";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [showMovieFormModal, setShowMovieFormModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");

  const getData = async (req, res) =>{
    try {
        const { data } = await GetAllMovies()
        if(data.success){
            setMovies(data.movies)
        }else {
            message.error("error while fetching")
        }
    } catch (error) {
        message.error("error while fetching")
    }
}
  useEffect(() =>{
    
    getData()
  }, [])
 
  const handleDelete = async(movieId) => {
    try {
      const response = await DeleteMovie({
        movieId: movieId
      })
      if(response.data.success){
        message.success("Movie Deleted Successfully")
        getData()
      }else {
        message.error("Something went wrong!")
      }
    } catch (error) {
      message.error("Something went wrong!")
    }
  }

  const columns = [
    {
      title: "Movie Poster",
      dataIndex: "poster",
      render: (text, record) => {
        return (
          <img
            src={record.poster}
            alt="poster"
            height="60"
            width="80"
            className="br-1"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "title",
    },

    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, record) => {
        return moment(record.releaseDate).format("DD-MM-YYYY");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                handleDelete(record._id);
              }}
            ></i>
            <i
              className="ri-pencil-line"
              onClick={() => {
                setSelectedMovie(record);
                setFormType("edit");
                setShowMovieFormModal(true);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-1">
        <Button
          variant="outlined"
          onClick={() => {
            setShowMovieFormModal(true);
            setFormType("add");
          }}
        >Add Movie</Button>
      </div>

      <Table columns={columns} dataSource={movies} />

      {showMovieFormModal && (
        <MovieForm
          showMovieFormModal={showMovieFormModal}
          setShowMovieFormModal={setShowMovieFormModal}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
         getData={getData}
        />
      )}
    </div>
  );
}

export default MoviesList;
