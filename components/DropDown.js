import React, { useState, useRef, useEffect, useCallback } from 'react';
import {View, Text, StyleSheet, Image, Pressable, FlatList, TouchableWithoutFeedback, Keyboard} from 'react-native';
import useThemeColors from "../hooks/useThemeColors"

import {useResponsiveBothHeightWidth, useResponsiveFontSize, useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius, useResponsiveVerticalSpace, useResponsiveWidth} from "../hooks/useResponsiveness"
import SearchField from "./SearchField"
import MemoizedTextInput from "./MemoizedTextInput"
import { interface_circle_xmark_black, interface_search_black } from '../assets/dummy/icons_pictures';
import { ScrollView } from 'react-native-gesture-handler';
import { getPaymentMethods, searchPaymentMethods } from '../backend/controllers/tradeController';

import CustomPressable from "./RNComponents/CustomPressable"
import useLanguage from '../hooks/useLanguage';
import hexToRGBA from '../hooks/hexToRGBA';

let number = 0
export default function DropDown({inputValue, onFinish}) {


    const themeColors = useThemeColors()

    const textStyle = {textColor: themeColors.text}
    const searchStyle = {backgroundColor: themeColors.background}
    const borderColor = hexToRGBA(themeColors.text, 0.1)

    const [searchText, setSearchText] = useState("")

    const [paymentMethods, setPaymentMethods] = useState([])
    const [isSearching, setIsSearching] = useState(false)


    const inputRef = useRef(null)



    const placeholder = useLanguage("Search for a payment method")
    const initialSearchValue = 'PayPal'


  


    const clearTextInput = () => {

      if (inputRef.current) {
        inputRef.current.clear();
        inputRef.current.focus();
        setSearchText("")
      }
    };



    const updateSearchText =  useCallback((text) => {

      // this function is called when an option is selected
      if (inputRef.current) {
        inputRef.current.setNativeProps({ text: text }); // set the input value to the option chosen (passed prop)
        setPaymentMethods([]) // clear options
        setIsSearching(false) // stop searching mode
        Keyboard.dismiss() // hide keyboard
        // setSearchText(text)

        onFinish(text) //update the passed prop
      }onSubmitEditing
    }, []);
    

    const onBlur = useCallback(() => {
      setPaymentMethods([])
      setIsSearching(false)
      // console.log("onBlur")
      // if (inputRef.current) {
      //   inputRef.current.clear();
      //   inputRef.current.focus();
      //   setSearchText("")
      // }
      // inputRef.current.focus();

    }, []);

    const onFocus = useCallback(() => {
      if(searchText.length > 0) {
        setPaymentMethods(searchPaymentMethods(searchText))
      } else {
        setPaymentMethods(searchPaymentMethods(""))
      }
      setIsSearching(true)
      
    }, [])


    const onSubmitEditing = useCallback((text) => {

      const exact = true
      searchPaymentMethods(text, exact)
    }, [])





    useEffect(() => {
      number += 1
      if(searchText && searchText.length > 0 && isSearching) {
        setPaymentMethods(searchPaymentMethods(searchText))
      } else {
        // console.log("DropDown useEffect: ", number, isSearching)
      }

    }, [searchText, isSearching])


    console.log("DropDown: ", number)
  


    // console.log("re render: ", number)

    // console.log("re render")

 return (

  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
  <View style={[styles.container, {backgroundColor: themeColors.background}]}>

    {/* Broder */}
    {/* <View pointerEvents="none" style={[styles.border, {padding: 0}]}> */}
      <View pointerEvents="none" 
      style={[
        styles.border, 
        {
          borderColor: borderColor,
          borderWidth: useResponsiveBothHeightWidth(2), 
        }
      ]}/>
    {/* </View> */}


    <View style={styles.content}>


        <View style={[styles.imageTextInputView, searchStyle]}>
            <Image pointerEvents='none' source={interface_search_black} style={styles.searchIcon}/>
              <MemoizedTextInput 
              placeholder={placeholder}
              placeholderColor={themeColors.text3} 
              onChangeText={setSearchText} 
              componentRef={inputRef}
              
              defaultValue={initialSearchValue}
              style={styles.textInput}
              onBlur={onBlur}
              onFocus={onFocus}
              />
            <EarseButton 
            onPress={clearTextInput} 
            //setSearchValue={setSearchValue}  
            searchValue={searchText}/>
        </View>


  

      {paymentMethods && paymentMethods.length > 0 &&  
      <View style={[styles.searchResults, searchStyle, {borderColor: borderColor} ]}>
            {/* <FlatList
            data={["test", "test"]}
            renderItem={(({item, index}) => {
                return(
                    <Text>
                        item
                    </Text>
                )
            })}
            keyExtractor={(item, index) => index.toString()}
            /> */}

            <ScrollView keyboardShouldPersistTaps='always'>

            {paymentMethods.map((item, index) => {

              const paddingVertical =  paymentMethods.length < 2 ? useResponsiveVerticalSpace(10) : 0
              return(
                <CustomPressable 
                style={
                  {...styles.searchResult, 
                      backgroundColor: themeColors.background,
                      paddingVertical: paddingVertical,
                      flex: 1
                  }
                } 
                onPress={() => {updateSearchText(item)}} 
                key={index}>
                  <Text style={[styles.searchResultText, textStyle]}>
                  {item}
                  </Text>
                </CustomPressable>
      
              )
              
              })}

            </ScrollView>
        </View>}
    </View>



  </View>

  </TouchableWithoutFeedback>
 );
}


const EarseButton = ({onPress, searchValue}) => {

  

    return(
        <Pressable onPress={onPress} style={styles.earseButton}>
            {({pressed}) => {
     
                const hasText = searchValue.length > 0
             
                // console.log('re render: ', ' at DropDown file')
                const opacity = hasText && pressed ? 1 : hasText ? 0.4 : 0 
                return(
                    <Image style={[styles.earseIcon, {opacity: opacity}]} source={interface_circle_xmark_black}/>
                )

            }}
            
        </Pressable>
    )
  }


  const DismissKeyboardHOC = (Comp) => {
    return ({ children, ...props }) => (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Comp {...props}>
          {children}
        </Comp>
      </TouchableWithoutFeedback>
    );
  };
  const DismissKeyboardView = DismissKeyboardHOC(View)


const styles = StyleSheet.create({
 container: {
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flex: 1,
  zIndex: 10,
  height: "100%",
  position: "relative",
  // paddingLeft: useResponsiveHorizontalSpace(12),
  // borderWidth: useResponsiveBothHeightWidth(2),
  borderRadius: useResponsiveRadius(10),
  
  // marginHorizontal: useResponsiveHorizontalSpace(1),
  },

  border: {

    position: "absolute", 
    width: "100%", 
    height: "100%",
    zIndex: 1,
    borderRadius: useResponsiveRadius(10),
  },

  content: {
    paddingVertical: useResponsiveBothHeightWidth(5),
  },

  activeTitle: {
    fontSize: useResponsiveFontSize(16),
  },

  imageTextInputView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: useResponsiveHeight(35),
    width: "100%",
    // backgroundColor: "green",
    // width: "100%",
    borderRadius: useResponsiveRadius(10),
  },

  textInput: {
    fontSize: useResponsiveFontSize(16),
    fontWeight: "400",
    // width: "100%",
    // backgroundColor: "green",
    height: "100%",
    flex: 1,
    marginRight: useResponsiveHorizontalSpace(10),
    // backgroundColor: "red"
    // maxWidth: "94%",
    // alignSelf: 'stretch',
  },




  searchIcon: {
    width: useResponsiveBothHeightWidth(16),
    height: useResponsiveBothHeightWidth(16),
    marginRight: useResponsiveHorizontalSpace(7),
    marginLeft: useResponsiveHorizontalSpace(18),
    opacity: 0.5
  },

  earseIcon: {
    width: useResponsiveBothHeightWidth(16),
    height: useResponsiveBothHeightWidth(16),
    marginRight: useResponsiveHorizontalSpace(7),
    marginLeft: useResponsiveHorizontalSpace(7),
    opacity: 0.4,
    
  },

  earseButton: {
    height: "100%", 
    justifyContent: "center",
    // backgroundColor: "red"
  },

  searchResults: {
    maxHeight: useResponsiveHeight(160),
    paddingTop: useResponsiveVerticalSpace(10),

    
    width: "100%",
    position: "absolute",
    top: useResponsiveVerticalSpace(30),
    zIndex: -1,
    borderBottomEndRadius: useResponsiveRadius(10),
    borderBottomStartRadius: useResponsiveRadius(10),
    borderBottomLeftRadius: useResponsiveRadius(10),
    borderBottomRightRadius: useResponsiveRadius(10),
    backgroundColor: "red",
    borderWidth: useResponsiveBothHeightWidth(2),
  },

  searchResult: {
    paddingHorizontal: useResponsiveHorizontalSpace(10),
    marginTop: useResponsiveVerticalSpace(5),
    minHeight: useResponsiveHeight(30),
    justifyContent: "center",
    alignItems: "flex-start",
  },

  searchResultText: {
    fontSize: useResponsiveFontSize(16),
 
  }

});