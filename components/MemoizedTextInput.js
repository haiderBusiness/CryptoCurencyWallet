
import {memo} from "react"
import { TextInput } from "react-native";

const MemoizedTextInput = ({ 
    initalText, 
    onChangeText = () => {}, 
    inputRef, 
    placeholder = 'Search',
    placeholderColor, 
    style,
    onBlur,
   }) => {
  
    console.log('text input re-rendered:', ' at MemoizedTextInput file')
  
    return (
      <TextInput 
      placeholder={placeholder} 
      onChangeText={(text) => {onChangeText(text)}}
      defaultValue={initalText}
      // value={initalText}
      ref={inputRef} 
      placeholderTextColor={placeholderColor} 
      style={style}
      onBlur={onBlur}
      
      />
    )
  
   };
  
  export default memo(MemoizedTextInput)