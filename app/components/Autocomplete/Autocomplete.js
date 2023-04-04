import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import CircularProgress from '@mui/material/CircularProgress';
import { search } from '../../utils/api'

const defaultOpenings = [{
    "eco": "C42",
    "name": "Russian Game: Stafford Gambit",
    "pgn": "1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6"
}, {
  "eco": "A48",
  "name": "London System",
  "pgn": "1. d4 Nf6 2. Nf3 g6 3. Bf4"
}, {
  "eco": "B20",
  "name": "Sicilian Defense",
  "pgn": "1. e4 c5"
}, {
  "eco": "C00",
  "name": "French Defense",
  "pgn": "1. e4 e6 2. d4 d5"
}, {
  "eco": "D06",
  "name": "Queen's Gambit",
  "pgn": "1. d4 d5 2. c4"
}, {
  "eco": "A10",
  "name": "English Opening",
  "pgn": "1. c4"
}, {
  "eco": "C25",
  "name": "Vienna Game",
  "pgn": "1. e4 e5 2. Nc3"
}, {
  "eco": "C50",
  "name": "Italian Game",
  "pgn": "1. e4 e5 2. Nf3 Nc6 3. Bc4"
}, {
  "eco": "C60",
  "name": "Ruy Lopez",
  "pgn": "1. e4 e5 2. Nf3 Nc6 3. Bb5"
}, {
  "eco": "B10",
  "name": "Caro-Kann Defense",
  "pgn": "1. e4 c6 2. Nc3"
}]

export default function OpeningAutocomplete({ onSelect, opening }) {
  const [inputValue, setInputValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const [value, setValue] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const loading = open && isLoading

  const fetch = React.useMemo(
    () =>
      debounce(async ({ input }, callback) => {
        setIsLoading(true)
        const { openings } = await search(input)
        callback(openings)
      }, 300),
    [],
  );

  React.useEffect(() => {
    if (opening && !open) {
      setInputValue(opening.name)
      setValue(opening.name)
    }
  })

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(defaultOpenings);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      setIsLoading(false)
      if (active) {
        let newOptions = [];

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  return (
    <Autocomplete
      id="autocomplete"
      sx={{ width: '100%', background: '#fff' }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name
      }
      filterOptions={(x) => x}
      options={options}
      value={value}
      autoComplete
      filterSelectedOptions
      noOptionsText="no openings found..."
      onOpen={() => { setOpen(true) }}
      onClose={() => { setOpen(false) }}
      loading={loading}
      onChange={(event, newValue) => {
        setValue((newValue && newValue.name) || '')
        if (newValue && newValue.name) {
          onSelect(newValue)
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params} label="Search an opening" fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.pgn}>
            <Grid container alignItems="center">
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                <Typography variant="body2" color="text.secondary">
                  {option.name} [<i>{option.pgn}</i> ]
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}