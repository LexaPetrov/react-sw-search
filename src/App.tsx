import {useState} from "react";
import {TextField, Container, Button, Grid} from "@mui/material";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import axios from "axios";
import {toast} from "react-toastify";
import {PEOPLE_URL} from "constants";
import {CharacterCard, Loader, FilmCard} from "components";
import type {ResponseData, Character} from "types";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filmUrls, setFilmUrls] = useState<string[]>([]);

  //form
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<{search: string}>({
    defaultValues: {
      search: "",
    },
  });

  //mutations
  const getCharacterMutation = useMutation(
    (search: string) =>
      axios.get<ResponseData<Character>>(PEOPLE_URL, {params: {search}}),
    {
      onSuccess: (res) => {
        setCharacters(res.data.results);
      },
      onError: () => {
        toast.error(
            `An error occured while getting character data`,
        );
      },
    },
  );

  return (
    <Container maxWidth="sm" disableGutters>
      <Grid
        container
        maxWidth={"sm"}
        rowSpacing={1}
        columnSpacing={{xs: 1, sm: 1, md: 1}}
      >
        <Grid item xs={12} sm={10}>
          <TextField
            focused
            fullWidth
            placeholder="Name"
            color="success"
            variant="outlined"
            {...register("search", {
              required: "This field is required",
            })}
            error={!!errors?.search}
            helperText={
              errors?.search?.message ?? "Please enter Star Wars character name"
            }
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            sx={{
              "&:disabled": {
                backgroundColor: "gray",
              },
            }}
            color="success"
            size="large"
            variant="contained"
            disabled={getCharacterMutation.isLoading}
            onClick={handleSubmit(({search}) => {
              setCharacters([]);
              setFilmUrls([]);
              getCharacterMutation.mutate(search);
            })}
          >
            Search
          </Button>
        </Grid>
        {getCharacterMutation.isLoading && <Loader />}
        {!filmUrls.length &&
          characters?.map((character) => (
            <Grid
              item
              key={character.url}
              onClick={() => setFilmUrls(character.films)}
            >
              <CharacterCard character={character} />
            </Grid>
          ))}
        {filmUrls?.map((url) => (
          <Grid item key={url}>
            <FilmCard url={url} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
