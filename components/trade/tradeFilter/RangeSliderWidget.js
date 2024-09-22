/* eslint-disable react-native/no-inline-styles */
import {Alert, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useRef, useState} from 'react';
import RangeSlider from '../../RangeSlider';
import { useResponsiveWidth } from '../../../hooks/useResponsiveness';
const RangeSliderWidget = () => {
  const MIN_DEFAULT = 10;
  const MAX_DEFAULT = 500;
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);

  const focusInput = (textInput) => {
    console.log("clicked")
    if(textInput && textInput.current) {
      textInput.current?.focus()
    }
  }


  const handleMinTextChange = (value)=>{
    /* 
      If text is above or below length of limits then exit function
    */
    //   console.log("newText: ", typeof newText )
    // // if (newText < 10 || newText.length > 6000000){
    // //   return;
    // // }
    // // Else update text
    // setMinValue(newText);

    if (value === '') {
      Alert.alert('Error', 'Please enter a number.');
      return;
    }

    const number = parseInt(value, 10);
    if (number < 10) {
      Alert.alert('Error', `Value must be at least ${10}`);
      return;
    }

    // Proceed with the valid number
    Alert.alert('Success', `You entered: ${number}`);
  }

  const handleMaxTextChange = (newText)=>{
    /* 
      If text is above or below length of limits then exit function
    */
    if (newText.length < 10 || newText.length> 6000000){
      return;
    }
    // Else update text
    setMaxValue(newText);
  }

  const minValueTextInput = useRef(null)
  const maxValueTextInput = useRef(null)

  const [layout, setLayout] = useState(null);
  const handleLayout = (event) => {
    const { height, width, x, y } = event.nativeEvent.layout;
    setLayout({ height, width, x, y });

    // headerLayout(event)
  };

  const currency = "€"


  
  return (


      <View onLayout={handleLayout}  style={styles.contentContainer}>
          <View style={styles.content}>
          {/* <Text style={styles.text}>Price Slider</Text> */}
          {layout && layout.width && <RangeSlider
              sliderWidth={layout.width}
              min={MIN_DEFAULT}
              max={MAX_DEFAULT}
              symbol={currency}
              step={10}
              onValueChange={range => {
              setMinValue(range.min);
              setMaxValue(range.max);
              }}
          />}
          <View style={styles.tableContainer}>
              <View style={{marginBottom: 20}}>
              <Text style={styles.colorBlack}>Min Price</Text>
              <View style={styles.table}>
                {/* <Text>$</Text> */}
                {/* <TextInput 
                keyboardType='number-pad' 
                ref={minValueTextInput} 
                value={`${minValue}`}
                onChangeText={handleMinTextChange}
                style={styles.colorBlack}
                /> */}
                <Text>{currency}{minValue}</Text>
              </View>
              </View>
              <View>
              <Text style={styles.colorBlack}>Max Price</Text>
              <View style={styles.table}>
                {/* <Text>$</Text> */}
                {/* <TextInput 
                keyboardType='number-pad'
                ref={maxValueTextInput} 
                style={styles.colorBlack}
                value={`${maxValue}`}
                />   */}
                 <Text>{currency}{maxValue}</Text>
              </View>
              </View>
          </View>
          </View>
      </View>


  );
};

export default RangeSliderWidget;

const styles = StyleSheet.create({

  contentContainer: {
    width: '100%',
    // height: 300,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  content: {
    paddingHorizontal: 0,
    paddingVertical: 16,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  tableContainer: {
    marginTop: 20,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    width: "100%",

  },
  table: {
    borderColor: '#EBECF2',
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    flexDirection: "row",
    // backgroundColor: "red"
  },
  colorBlack: {color: 'black'},
});