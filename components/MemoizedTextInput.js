
import {memo} from "react"
import { TextInput } from "react-native";

const MemoizedTextInput = ({

    onChangeText = () => {}, 
    componentRef,
    ...props
   }) => {
  
    console.log('text input re-rendered:', ' at MemoizedTextInput file')
  
    return (
      <TextInput 
      onChangeText={(text) => {onChangeText(text)}}
      // value={initalText}
      ref={componentRef}
      {...props}
      />
    )
  
   };
  
  export default memo(MemoizedTextInput)