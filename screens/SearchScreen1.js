import React, {useRef} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Pressable, Dimensions} from 'react-native';
import { useResponsiveFontSize, useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius, useResponsiveVerticalSpace, useResponsiveWidth } from '../hooks/useResponsiveness';
import { interface_search_black } from '../assets/dummy/icons_pictures';
import useThemeColors from '../hooks/useThemeColors';
import { SharedElement } from 'react-native-shared-element';

const cancelButtonWidth = useResponsiveWidth(75)
const horizontalPadding = useResponsiveHorizontalSpace(30)

export default function SearchScreen1({}) {

    const themeColors = useThemeColors()

  const {width, height} = Dimensions.get("window")

  const searchBarWidth = width - cancelButtonWidth - (horizontalPadding / 2)

  const inputRef = useRef(null);

  // Function to focus the TextInput programmatically
  const focusTextInput = () => {
    console.log("focus")
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };


  const clearTextInput = () => {
    console.log("clicked")
    if (inputRef.current) {
        console.log("clicked1")
        inputRef.current.blur();
    }
  };

  const searchStyle = {backgroundColor: themeColors.background4}

  const searchBarStyle = {
    width: searchBarWidth
  }

  const cancelViewStyle = {
   
    // backgroundColor: "yellow"
  }

  const cancelButtonStyle = {
    width: cancelButtonWidth,
    height: "100%", 
    alignItems: "center", 
    justifyContent: "center", 
    // paddingLeft: useResponsiveHorizontalSpace(5),
    marginLeft: useResponsiveHorizontalSpace(0),
    backgroundColor: "beige",
    paddingBottom: useResponsiveVerticalSpace(8),
    paddingLeft: useResponsiveVerticalSpace(5)
  }

 return (


  <Pressable style={[styles.container, {height: height}]}>

    <View style={styles.child}>
        <Pressable onPress={focusTextInput} 
        style={[styles.searchBar, searchBarStyle]}>
            <View style={[styles.imageTextInputView, searchStyle]}>
                <Image pointerEvents='none' source={interface_search_black} style={styles.image}/>
                <TextInput placeholderTextColor={themeColors.text3} ref={inputRef} placeholder='Search' style={styles.textInput}/>
            </View>
        </Pressable>


        <Pressable style={cancelButtonStyle}>
            <View style={cancelViewStyle}>
                <Text style={styles.cancelText}>Cancel</Text>
            </View>
        </Pressable>
    </View>
  </Pressable>
 );
}



const styles = StyleSheet.create({
 container: {
  width: '100%',
//   height: useResponsiveHeight(40),
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
    justifyContent: "center",
    height: useResponsiveHeight(45),
    // backgroundColor: "green",
    // width: "100%",
    borderRadius: useResponsiveRadius(10),
    backgroundColor: "pink"
  },

  searchBar: {
    height: useResponsiveHeight(45), 
    // paddingRight: useResponsiveHorizontalSpace(5),
    // width: "100%",
    marginLeft: useResponsiveHorizontalSpace(10),
    justifyContent: "flex-start",
    backgroundColor: "green"
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



  image: {
    width: useResponsiveWidth(16),
    height: useResponsiveHeight(16),
    marginRight: useResponsiveHorizontalSpace(7),
    marginLeft: useResponsiveHorizontalSpace(7),
    opacity: 0.6
  },

  textInput: {
    fontSize: useResponsiveFontSize(16),
    fontWeight: "400",
    // width: "100%",
    // backgroundColor: "green",
    height: "100%",
    maxWidth: "94%",
    // alignSelf: 'stretch',
  },

  cancelText: {
    fontSize: useResponsiveFontSize(18),
    textAlign: "flex-start",
    // marginLeft: 10,
    // marginBottom: useResponsiveVerticalSpace(8)
  }
});