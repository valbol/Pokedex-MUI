import React, { useEffect, useState } from 'react';

import {
  CircularProgress,
  Typography,
  Button,
  makeStyles,
  Card,
  CardMedia,
  Box,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { toFirstCharUppercase } from './constents';
import axios from 'axios';

const useStyles = makeStyles({
  pokedexContainer: {
    paddingTop: '20px',
    paddingLeft: '50px',
    paddingRight: '50px',
  },
  CardMedia: {
    margin: 'auto',
    // backgroundcolor: 'blue',
    // width: '130px',
    // height: '130px',
  },
  Button: {
    paddingBottom: '50px',
    // margin: 'center',
  },
});

const Pokemon = props => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  console.log(pokemonId);
  const [pokemon, setPokemon] = useState(undefined);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(response => {
        const { data } = response;
        setPokemon(data);
      })
      .catch(error => {
        setPokemon(false);
        console.log(error);
      });
  }, [pokemonId]);

  const generatePokemonJSX = () => {
    console.log(pokemon);
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
        <Card>
          <Box bgcolor='#87ceeb'>
            <CardMedia className={classes.CardMedia}>
              <Typography variant='h1'>
                {`${id}.`} {toFirstCharUppercase(name)}
                <img alt='' src={front_default} />
              </Typography>
              <img
                alt=''
                style={{ width: '300px', height: '300px' }}
                src={fullImageUrl}
              />
              <Typography variant='h3'>Pokemon Info:</Typography>
              <Typography>
                {'Species: '}
                <Link href={species.url}> {species.name}</Link>
              </Typography>
              <Typography>Height: {height} </Typography>
              <Typography>Weight: {weight} </Typography>
              <Typography variant='h6'>Types:</Typography>
              {types.map(typeInfo => {
                const { type } = typeInfo;
                const { name } = type;
                return <Typography key={name}>{`${name}`}</Typography>;
              })}
            </CardMedia>
          </Box>
        </Card>
      </>
    );
  };
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {/* !! same as ==> !== && */}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography>Pokemon not found</Typography>}
      {pokemon !== undefined && (
        <Button variant='contained' onClick={() => history.push('/')}>
          Bacek to pokedex
        </Button>
      )}
    </>
  );
};
export default Pokemon;
