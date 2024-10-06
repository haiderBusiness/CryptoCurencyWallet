import React, {useEffect, useRef, useState, memo} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Pressable, Dimensions} from 'react-native';
import { useResponsiveFontSize, useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius, useResponsiveVerticalSpace, useResponsiveWidth, useResponsiveBothHeightWidth } from '../../hooks/useResponsiveness';
import { interface_circle_xmark_black, interface_search_black } from '../../assets/dummy/icons_pictures';
import useThemeColors from '../../hooks/useThemeColors';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MemoizedTextInput from '../MemoizedTextInput';
import Animated from 'react-native-reanimated';


const cancelButtonWidth = useResponsiveWidth(75)
const horizontalPadding = useResponsiveHorizontalSpace(30)

const {width, height} = Dimensions.get("window")
export default function Search({onCancel, focusSearchInput = true}) {

  const [searchText, setSearchText] = useState("")

  const themeColors = useThemeColors()

  const {width, height} = Dimensions.get("window")

  const insets = useSafeAreaInsets();
  const topSafeArea = insets.top

  const searchBarWidth = width - cancelButtonWidth - (horizontalPadding / 2)

  const inputRef = useRef(null);

  // Function to focus the TextInput programmatically
  const focusTextInput = () => {

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };


  const clearTextInput = () => {
    if (inputRef.current) {
      inputRef.current.clear();
    }
  };

  const blurTextInput = () => {
    if (inputRef.current) {
        inputRef.current.blur();
    }
  };

  const searchStyle = {backgroundColor: themeColors.background4}

  const containerStyle = {paddingTop: topSafeArea, backgroundColor: themeColors.background}


  useEffect(() => {
    if (inputRef.current && focusSearchInput) {
      inputRef.current.focus();
    }
  },[])




  const onCancelPress = () => {
    onCancel()
    blurTextInput()
  }


 return (

  <Pressable style={[styles.container,  containerStyle]}>

    <View style={styles.child}>
        <Pressable onPress={focusTextInput} 
        style={[styles.searchBar]}>
            <View style={[styles.imageTextInputView, searchStyle]}>
                <Image pointerEvents='none' source={interface_search_black} style={styles.searchIcon}/>
                <MemoizedTextInput 
                onChangeText={setSearchText} 
                componentRef={inputRef}
                placeholderColor={themeColors.text3} 
                style={styles.textInput}
                />

                <EarseButton 
                onPress={clearTextInput} 
                // setSearchValue={setSearchValue} 
                searchValue={searchText}/>
            </View>
        </Pressable>

       <CancelButton onPress={onCancelPress}/>
    </View>
  </Pressable>
 );
}







const EarseButton = ({onPress, searchValue}) => {

    return(
        <Pressable onPress={onPress} style={{height: "100%", justifyContent: "center"}}>
            {({pressed}) => {


                const hasText = searchValue.length > 0
                
                const opacity = hasText && pressed ? 1 : hasText ? 0.4 : 0 
                return(
                    <Image style={[styles.earseIcon, {opacity: opacity}]} source={interface_circle_xmark_black}/>
                )

            }}
            
        </Pressable>
    )
  }





const CancelButton = ({onPress}) => {

    const themeColors = useThemeColors()

    return(
        <Pressable onPress={onPress} style={styles.cancelButtonStyle}>
            {({pressed}) => {
                
                const opacity = pressed ? 0.2 : 1
                return(
                    <View >
                      <Text 
                      style={{...styles.cancelText, opacity: opacity, color: themeColors.text}}
                      >
                        Cancel
                      </Text>
                    </View>
                )

            }}
            
        </Pressable>
    )
  }



const styles = StyleSheet.create({
 container: {
  width: width,
  height: "100%",
//   height: useResponsiveBothHeightWidth(40),
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: "transparent",
//   paddingHorizontal: useResponsiveHorizontalSpace(30),
  backgroundColor: "red"
  
  },

  child: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: useResponsiveHeight(45),
    // backgroundColor: "green",
    // width: "100%",
    borderRadius: useResponsiveRadius(10),
    paddingHorizontal: useResponsiveHorizontalSpace(18)
    // backgroundColor: "pink"
  },

  searchBar: {
    height: useResponsiveHeight(45), 
    // paddingRight: useResponsiveHorizontalSpace(5),
    // width: "100%",
    // width: "100%",
    flex: 1,
    // marginLeft: useResponsiveHorizontalSpace(10),
    justifyContent: "flex-start",
    // backgroundColor: "green"
  },

  imageTextInputView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: useResponsiveHeight(35),
    width: "100%",
    // backgroundColor: "green",
    // width: "100%",
    borderRadius: useResponsiveRadius(10)
  },



  searchIcon: {
    width: useResponsiveBothHeightWidth(16),
    height: useResponsiveBothHeightWidth(16),
    marginRight: useResponsiveHorizontalSpace(7),
    marginLeft: useResponsiveHorizontalSpace(7),
    opacity: 0.5
  },

  earseIcon: {
    width: useResponsiveBothHeightWidth(16),
    height: useResponsiveBothHeightWidth(16),
    marginRight: useResponsiveHorizontalSpace(7),
    marginLeft: useResponsiveHorizontalSpace(7),
    opacity: 0.4
  },

  

  textInput: {
    fontSize: useResponsiveFontSize(16),
    fontWeight: "400",
    // width: "100%",
    // backgroundColor: "green",
    height: "100%",
    flex: 1,
    marginRight: 10,
    // maxWidth: "94%",
    // alignSelf: 'stretch',
  },


  cancelButtonStyle : {
    width: useResponsiveWidth(70),
    height: "100%", 
    alignItems: "center", 
    justifyContent: "center", 
    // paddingLeft: useResponsiveHorizontalSpace(5)
    paddingLeft: useResponsiveHorizontalSpace(10),
    // paddingRight: useResponsiveHorizontalSpace(5),
    // backgroundColor: "beige",
    paddingBottom: useResponsiveVerticalSpace(10),
    // paddingLeft: useResponsiveVerticalSpace(5)
  },

  cancelText: {
    fontSize: useResponsiveFontSize(18),
    // textAlign: "flex-start",
    // marginLeft: 10,
    // marginBottom: useResponsiveVerticalSpace(8)
  }
});