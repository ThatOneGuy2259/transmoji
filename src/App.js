import { Button, TextField, IconButton } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import React, { useState } from "react";

function Translate(textToTranslate) {
  const emojis = ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "🥰", "😗", "😙", "🥲", "😚", "🙂", "🤗", "🤩", "🤔", "🫡", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "🥱", "😴", "😜", "😡"];
  const delimiter = "👉"
  const lettersLower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ",", ".", "/", "'", " "];
  const lettersUpper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", '<', ">", "?", '"'];

  const key = {}
  let translatedText = []

  for (let i = 0; i < emojis.length; i++) {
    key[lettersLower[i]] = emojis[i]
  }
  
  for (let i = 0; i < textToTranslate.length; i++) {
    if (lettersUpper.includes(textToTranslate[i])) {
      translatedText.push(delimiter, key[lettersLower[lettersUpper.indexOf(textToTranslate[i])]])
    } else {
      translatedText.push(key[textToTranslate[i]])
    }
  }

  return translatedText.join("")
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

function App() {

  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOutputChange = (e) => {
    setOutputValue(e.target.value);
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <TextField multiline rows={10} style={{ width: 500 }} variant="outlined" id="input" label="Input" onChange={handleInputChange} value={inputValue}/>
        <TextField multiline rows={10} style={{ width: 500 }} variant="outlined" id="output"label="Output" onChange={handleOutputChange} value={outputValue} inputProps={{ readOnly: true }}/>
        <IconButton onClick={() => copyToClipboard(outputValue)}>
          <FileCopyIcon />
        </IconButton>
      </div>
      </div>

    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: "20px" }}>
      <div>
        <Button variant="contained" onClick={() => setOutputValue(Translate(inputValue))}>Submit</Button>
      </div>
    </div>
    </>
  );
}

export default App;
