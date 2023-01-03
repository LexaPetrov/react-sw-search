import React, {memo, useState} from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import type {Character, Planet} from "types";
import {useQuery} from "react-query";
import axios from "axios";
import {PLANETS_URL} from "constants";
import {getParamIdFromUrl} from "helpers";
import {Loader} from "../Loader/Loader";

type CharacterCardProps = {
  character: Character;
};

export const CharacterCard: React.FC<CharacterCardProps> = memo(({character}) => {
  const [homeWorld, setHomeWorld] = useState<Planet>();

  const {isLoading} = useQuery(
    `character-${character.url}-homeWorld`,
    () =>
      axios.get<Planet>(PLANETS_URL + getParamIdFromUrl(character.homeworld)),
    {
      onSuccess: (res) => setHomeWorld(res.data),
    },
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{width: "200px", maxWidth: "200px", boxSizing: 'border-box'}}>
      <Card variant="outlined">
        <CardActionArea>
          <CardContent>
            <Typography variant="h5">{character.name}</Typography>
            <Typography sx={{mb: 1.5}} color="text.secondary">
              Name
            </Typography>
            <Typography variant="h5">{homeWorld?.name}</Typography>
            <Typography sx={{mb: 1.5}} color="text.secondary">
              Homeworld
            </Typography>
            <Typography variant="h5">{homeWorld?.population}</Typography>
            <Typography sx={{mb: 1.5}} color="text.secondary">
              Homeworld Population
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
});
