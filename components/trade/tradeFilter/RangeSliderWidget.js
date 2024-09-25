/* eslint-disable react-native/no-inline-styles */
import {Alert, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import RangeSlider from '../../RangeSlider';
import { useResponsiveFontSize, useResponsiveVerticalSpace, useResponsiveWidth } from '../../../hooks/useResponsiveness';
import MemoizedTextInput from '../../MemoizedTextInput';
import Animated from 'react-native-reanimated';
import AnimatedView from '../../AnimatedView';
import useLanguage from '../../../hooks/useLanguage';
import useThemeColors from '../../../hooks/useThemeColors';
const RangeSliderWidget = () => {
  const MIN_DEFAULT = 10;
  const MAX_DEFAULT = 1000000;
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);

  const themeColors = useThemeColors()


  const minValueTextInput = useRef(null)
  const maxValueTextInput = useRef(null)

  const focusInput = (textInput) => {
    console.log("clicked")
    if(textInput && textInput.current) {
      textInput.current?.focus()
    }
  }

  const onMinValueInputBlur = useCallback(() => {
    // if(minValueTextInput && minValueTextInput.current) {

    //   const text = minValueTextInput.current.value || minValueTextInput.current._lastNativeText
    //   console.log("text: ", text)
    //   if(minValue < 10 || !minValue) {

    //     minValueTextInput.current.setNativeProps({ text: "10" });
    //     setMinValue(10)
        
    //   }
    // }
  }, [])



  const currency = "€"


  useEffect(() => {
    console.log("minValue: ", minValue > maxValue)
  }, [minValue])

  
  return (


      <View   style={styles.contentContainer}>
          <View style={styles.content}>
          {/* <Text style={styles.text}>Price Slider</Text> */}
          {/* {layout && layout.width && <RangeSlider
              sliderWidth={layout.width - 20}
              min={MIN_DEFAULT}
              max={MAX_DEFAULT}
              symbol={currency}
              step={100}
              onValueChange={range => {
              setMinValue(range.min);
              setMaxValue(range.max);
              }}
          />} */}
          <View style={styles.tableContainer}>
              <View style={{marginBottom: useResponsiveVerticalSpace(10)}}>
                <Text style={styles.colorBlack}>Min Price</Text>
                <Pressable onPress={() => focusInput(minValueTextInput)} style={styles.table}>
                  <Text>{currency}</Text>
                  <MemoizedTextInput 
                  keyboardType='number-pad' 
                  componentRef={minValueTextInput} 
                  defaultValue={`${MIN_DEFAULT}`}
                  onChangeText={setMinValue}
                  style={styles.textInput}
                  onBlur={onMinValueInputBlur}
                  />
                  {/* <Text>{currency}{minValue}</Text> */}
                </Pressable>

                <AnimatedView animationType="fade" useDisplayStyle={true} show={minValue > maxValue}>
                  <Text style={[styles.errorText, {color: themeColors.red}]}>
                    {useLanguage("The minimum price must be less then the maximum")}
                  </Text>
                </AnimatedView>
              </View>
              <View>
                <Text style={styles.colorBlack}>Max Price</Text>
                <Pressable onPress={() => focusInput(minValueTextInput)} style={styles.table}>
                    <Text>{currency}</Text>
                    <MemoizedTextInput 
                    keyboardType='number-pad' 
                    componentRef={maxValueTextInput} 
                    defaultValue={`${MAX_DEFAULT}`}
                    onChangeText={setMaxValue}
                    style={styles.textInput}
                    // onBlur={onMinValueInputBlur}
                    />
                    {/* <Text>{currency}{minValue}</Text> */}
                  </Pressable>
                 {/* <Text>{currency}{maxValue}</Text> */}
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
    paddingVertical: useResponsiveVerticalSpace(10),
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  text: {
    color: 'black',
    fontSize: useResponsiveFontSize(20),
  },
  tableContainer: {
    // marginTop: useResponsiveVerticalSpace(20),
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    width: "100%",
    // flexDirection: "row",
    // justifyContent: "space-between"

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
  colorBlack: {
    color: 'black',
  },

  errorText: {
    marginTop:  useResponsiveVerticalSpace(5),
    fontSize: useResponsiveFontSize(14)
  },

  textInput: {
    fontSize: useResponsiveFontSize(16),
    fontWeight: "400",
    // width: "100%",
    // backgroundColor: "green",
    height: "100%",
    flex: 1,
    // backgroundColor: "red"
    // marginRight: useResponsiveHorizontalSpace(10),
    // backgroundColor: "red"
    // maxWidth: "94%",
    // alignSelf: 'stretch',
  },
});