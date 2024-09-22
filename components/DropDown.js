import React, { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, Image, Pressable, FlatList} from 'react-native';
import useThemeColors from "../hooks/useThemeColors"

import {useResponsiveBothHeightWidth, useResponsiveFontSize, useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius} from "../hooks/useResponsiveness"
import SearchField from "./SearchField"
import MemoizedTextInput from "./MemoizedTextInput"
import { interface_circle_xmark_black, interface_search_black } from '../assets/dummy/icons_pictures';
import { ScrollView } from 'react-native-gesture-handler';
import { getPaymentMethods, searchPaymentMethods } from '../backend/controllers/tradeController';

import CustomPressable from "./RNComponents/CustomPressable"

export default function DropDown({}) {


    const themeColors = useThemeColors()

    const textStyle = {textColor: themeColors.text}

    const [searchText, setSearchText] = useState("PayPal")



    const inputRef = useRef(null)

    const searchStyle = {backgroundColor: themeColors.background4}

    const clearTextInput = () => {
        if (inputRef.current) {
          inputRef.current.clear();
          inputRef.current.focus();
          setSearchText("")
        }
      };


    const placeholder = "Search for a payment method"
    const initalSearchValue = 'PayPal'

    const [paymentMethods, setPaymentMethods] = useState(searchPaymentMethods(searchText))

    useEffect(() => {
      if(searchText && searchText.length > 0) {
        setPaymentMethods(searchPaymentMethods(searchText))
      } else {
        console.log("empty")
      }
    }, [searchText])

 return (
  <View style={styles.container}>
    <View style={[styles.imageTextInputView, searchStyle]}>
        <Image pointerEvents='none' source={interface_search_black} style={styles.searchIcon}/>
        <MemoizedTextInput 
        placeholder={placeholder}
        onChangeText={setSearchText} 
        inputRef={inputRef}
        placeholderColor={themeColors.text3} 
        initalText={initalSearchValue}
        style={styles.textInput}
        onBlur={() => {setPaymentMethods([])}}
        />

        <EarseButton 
        onPress={clearTextInput} 
        //setSearchValue={setSearchValue}  
        searchValue={searchText}/>
    </View>

   {paymentMethods && paymentMethods.length > 0 &&  <View style={[styles.searchResults, searchStyle ]}>
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

        <ScrollView >

        {paymentMethods.map((item, index) => {
          return(
            <CustomPressable style={[styles.searchResult, {backgroundColor: themeColors.background4}]} onPress={() => {}} key={index}>
              <Text style={[styles.searchResultText, textStyle]}>
              {item}
              </Text>
            </CustomPressable>
  
          )
          
          })}

        </ScrollView>
    </View>}
  </View>
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


const styles = StyleSheet.create({
 container: {
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  width: "100%",
  zIndex: 10,
  position: "relative",
  },
  activeTitle: {
    fontSize: useResponsiveFontSize(16),
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

  searchResults: {
    height: useResponsiveHeight(160),
    paddingTop: 10,
    paddingHorizontal: useResponsiveHorizontalSpace(10),
    width: "100%",
    position: "absolute",
    top: 30,
    zIndex: 1,
  },

  searchResult: {
    marginTop: 5,
    height: 30,
    justifyContent: "center",
    alignItems: "flex-start"
  },

  searchResultText: {
    fontSize: useResponsiveFontSize(16)
  }

});