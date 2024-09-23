
import {memo} from "react"
import { TextInput } from "react-native";

const MemoizedTextInput = ({ 
    defaultValue, 
    onChangeText = () => {}, 
    inputRef, 
    placeholder = 'Search',
    placeholderColor, 
    style,
    onBlur,
    onFocus,
   }) => {
  
    // console.log('text input re-rendered:', ' at MemoizedTextInput file')
  
    return (
      <TextInput 
      placeholder={placeholder} 
      onChangeText={(text) => {onChangeText(text)}}
      defaultValue={defaultValue}
      // value={initalText}
      ref={inputRef} 
      placeholderTextColor={placeholderColor} 
      style={style}
      onBlur={onBlur}
      onFocus={onFocus}
      
      />
    )
  
   };
  
  export default memo(MemoizedTextInput)