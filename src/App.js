import { Button, TextField, IconButton } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import React, { useState } from "react";
import GraphemeSplitter from "grapheme-splitter";

function Translate(textToTranslate, isEncoding) {
  const emojis = ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "🥰", "😗", "😙", "🥲", "😚", "🙂", "🤗", "🤩", "🤔", "🫡", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "🥱", "😴", "😜", "😡"];
  const delimiter = "👉"
  const lettersLower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ",", ".", "/", "'", " "];
  const lettersUpper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", '<', ">", "?", '"'];

  const key = {}
  let translatedText = []

  if (isEncoding) {
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

  } else {
    const splitter = new GraphemeSplitter()
    textToTranslate = splitter.splitGraphemes(textToTranslate)
    
    for (let i = 0; i < emojis.length; i++) {
      key[emojis[i]] = lettersLower[i]
    }

    for (let i = 0; i < textToTranslate.length; i++) {
      if (textToTranslate[i] === delimiter) {
        i++;
        translatedText.push(lettersUpper[lettersLower.indexOf(key[textToTranslate[i]])])
      } else {
        translatedText.push(key[textToTranslate[i]])
      }
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
  const [isEncoding, setIsEncoding] = useState(true);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOutputChange = (e) => {
    setOutputValue(e.target.value);
  };

  const handleIsEncodingChange = () => {
    setIsEncoding(!isEncoding);
    const tempInputValue = inputValue
    setInputValue(outputValue)
    setOutputValue(tempInputValue)
  }

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {isEncoding ? 
      <div>
        <TextField multiline rows={10} style={{ width: 500 }} variant="outlined" id="input" label="Text" onChange={handleInputChange} value={inputValue}/>
        <TextField multiline rows={10} style={{ width: 500 }} variant="outlined" id="output" label="Emoji" onChange={handleOutputChange} value={outputValue} inputProps={{ readOnly: true }}/>
      </div>
      :
      <div>
        <TextField multiline rows={10} style={{ width: 500 }} variant="outlined" id="input" label="Emoji" onChange={handleInputChange} value={inputValue}/>
        <TextField multiline rows={10} style={{ width: 500 }} variant="outlined" id="output" label="Text" onChange={handleOutputChange} value={outputValue} inputProps={{ readOnly: true }}/>
      </div>
      }
        <IconButton onClick={() => copyToClipboard(outputValue)}>
          <FileCopyIcon />
        </IconButton>
        <IconButton onClick={() => handleIsEncodingChange()}>
          <SwapHorizIcon />
        </IconButton>
      </div>

    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: "20px" }}>
      <div>
        <Button variant="contained" onClick={() => setOutputValue(Translate(inputValue, isEncoding))}>Submit</Button>
      </div>
    </div>
    </>
  );
}

export default App;
