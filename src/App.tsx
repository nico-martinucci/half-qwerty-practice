import { useEffect, useRef, useState } from "react";
import {
  FormControlLabel,
  Slider,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { generators } from "./generators";
import { rows } from "./types";
import { generate } from "random-words";

const SWITCH_LETTERS = new Set([
  "q",
  "w",
  "e",
  "r",
  "t",
  "a",
  "s",
  "d",
  "f",
  "g",
  "z",
  "x",
  "c",
  "v",
  "b",
]);

function App() {
  const [wordSets, setWordSets] = useState<rows[]>(["middle"]);
  const [word, setWord] = useState<string>(generators.generate(wordSets));
  const [inputValue, setInputValue] = useState("");
  const [showHints, setShowHints] = useState(false);
  const [wordMode, setWordMode] = useState<"random" | "words">("words");
  const [wordCount, setWordCount] = useState<number>(1);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (inputValue === word) {
      wordMode === "random" && setWord(generators.generate(wordSets));
      wordMode === "words" &&
        setWord((generate(wordCount) as string[]).join(" "));
      setInputValue("");
    }
  }, [inputValue]);

  useEffect(() => {
    wordMode === "random" && setWord(generators.generate(wordSets));
    wordMode === "words" &&
      setWord((generate(wordCount) as string[]).join(" "));
  }, [wordSets, wordMode, wordCount]);

  function handleOnClick(row: rows) {
    if (wordSets.includes(row)) {
      setWordSets((curr) => curr.filter((set) => set !== row));
    } else {
      setWordSets((curr) => [...curr, row]);
    }
    inputRef.current && inputRef.current.focus();
  }

  return (
    <Stack spacing={5} alignItems="center">
      <Stack spacing={1} alignItems="center">
        <ToggleButtonGroup value={wordMode}>
          <ToggleButton
            size="small"
            color="primary"
            value="words"
            onClick={() => {
              setWordMode("words");
              inputRef.current && inputRef.current.focus();
            }}
          >
            Words
          </ToggleButton>
          <ToggleButton
            size="small"
            color="primary"
            value="random"
            onClick={() => {
              setWordMode("random");
              inputRef.current && inputRef.current.focus();
            }}
          >
            Random
          </ToggleButton>
        </ToggleButtonGroup>
        {wordMode === "random" && (
          <ToggleButtonGroup value={wordSets}>
            <ToggleButton
              size="small"
              color="primary"
              value="top"
              onClick={() => handleOnClick("top")}
            >
              Top
            </ToggleButton>
            <ToggleButton
              size="small"
              color="primary"
              value="middle"
              onClick={() => handleOnClick("middle")}
            >
              Middle
            </ToggleButton>
            <ToggleButton
              size="small"
              color="primary"
              value="bottom"
              onClick={() => handleOnClick("bottom")}
            >
              Bottom
            </ToggleButton>
          </ToggleButtonGroup>
        )}
        {wordMode === "words" && (
          <Slider
            value={wordCount}
            onChange={(_, value) => {
              setWordCount(value as number);
            }}
            onChangeCommitted={() =>
              inputRef.current && inputRef.current.focus()
            }
            step={1}
            min={1}
            max={4}
            valueLabelDisplay="auto"
          />
        )}
        <FormControlLabel
          control={
            <Switch
              checked={showHints}
              onChange={(e) => {
                setShowHints(e.target.checked);
                inputRef.current && inputRef.current.focus();
              }}
            />
          }
          label="Hints"
        />
      </Stack>
      <Typography variant="h2">
        {word.split("").map((letter, idx) => (
          <span
            style={{
              color:
                SWITCH_LETTERS.has(letter) && showHints ? "red" : undefined,
            }}
            key={idx}
          >
            {letter}
          </span>
        ))}
      </Typography>
      <TextField
        fullWidth
        variant="standard"
        autoFocus
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        InputProps={{
          disableUnderline: true,
        }}
        inputProps={{
          style: { textAlign: "center", fontSize: 40 },
          ref: inputRef,
        }}
      />
    </Stack>
  );
}

export default App;
