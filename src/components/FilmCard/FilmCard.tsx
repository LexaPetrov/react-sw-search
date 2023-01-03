import React, {memo, useState} from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import type {Film} from "types";
import {useQuery} from "react-query";
import axios from "axios";
import {FILMS_URL} from "constants";
import {getParamIdFromUrl} from "helpers";
import {Loader} from "../Loader/Loader";

type FilmCardProps = {
  url: string;
};

export const FilmCard: React.FC<FilmCardProps> = memo(({url}) => {
  const [film, setFilm] = useState<Film>();

  const {isLoading} = useQuery(
    `film-${url}`,
    () => axios.get<Film>(FILMS_URL + getParamIdFromUrl(url)),
    {
      onSuccess: (res) => setFilm(res.data),
    },
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{width: "100", maxWidth: "100", boxSizing: "border-box"}}>
      <Card variant="outlined">
        <CardActionArea>
          <CardContent>
            <Typography variant="h5">{film?.title}</Typography>
            <Typography sx={{mb: 1.5}} color="text.secondary">
              Title
            </Typography>
            <Typography variant="h5">{film?.release_date}</Typography>
            <Typography sx={{mb: 1.5}} color="text.secondary">
              Release date
            </Typography>
            <Typography variant="h5">{film?.opening_crawl.slice(0, 129) + '...'}</Typography>
            <Typography sx={{mb: 1.5}} color="text.secondary">
              Opening crawl
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
});
