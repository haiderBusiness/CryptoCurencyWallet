
import {memo} from "react"
import { TextInput } from "react-native";

const MemoizedTextInput = ({ 
    initalText, 
    onChangeText = () => {}, 
    inputRef, 
    placeholderColor, 
    style,
   }) => {
  
    console.log("text input")
  
    return (
      <TextInput 
      placeholder='Search' 
      onChangeText={(text) => {onChangeText(text)}} 
      ref={inputRef} 
      placeholderTextColor={placeholderColor} 
      style={style}
      />
    )
  
   };
  
  export default memo(MemoizedTextInput)