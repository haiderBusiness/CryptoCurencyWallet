import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import useThemeColors from '../hooks/useThemeColors';
import { useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius, useResponsiveVerticalSpace, useResponsiveWidth } from '../hooks/useResponsiveness';
import {dislikePurple, likeGreen, likePurple, likePurple2, thumbsUpPurple } from '../assets/dummy/icons_pictures';
import English from '../constants/English';
import viewStyleSample from './RNComponents/viewStyleSample';

export default function LikesDislikes({numOflikes, numOfDislikes, style = viewStyleSample}) {

    const receivedStyle = style.flex !== 1000 ? style : {}
    
    const themeColors = useThemeColors()

 return (
    <View style={{...styles.container, ...receivedStyle}}>
        <View style={{...styles.likesView, backgroundColor: themeColors.lightPurple10}}>
            <Image style={styles.likeImage} source={thumbsUpPurple}/>
            <Text style={{...styles.numOfLikesText, color: themeColors.purple}}>{numOflikes ? numOflikes : "0"}</Text>
        </View>

        <View style={{...styles.likesView, backgroundColor: themeColors.lightPurple10}}>
            <Image style={styles.dislikeImage} source={thumbsUpPurple}/>
            <Text style={{...styles.numOfLikesText, color: themeColors.purple}}>{numOfDislikes ? numOfDislikes : "0"}</Text>
        </View>

    </View>

 );
}



const styles = StyleSheet.create({

container: {
    flexDirection: "row"
},

likesView: {
    // width: useResponsiveWidth(20),
    // height: useResponsiveHeight(20),
    alignSelf: 'flex-start',
    paddingVertical: useResponsiveVerticalSpace(5),
    paddingHorizontal: useResponsiveHorizontalSpace(10),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: useResponsiveRadius(20),
    marginRight: useResponsiveHorizontalSpace(10),
},

likeImage: {
    width: useResponsiveWidth(15),
    height: useResponsiveHeight(15),
    marginRight: useResponsiveHorizontalSpace(8),
    // backgroundColor: "red",
},

dislikeImage: {
    width: useResponsiveWidth(15),
    height: useResponsiveHeight(15),
    marginRight: useResponsiveHorizontalSpace(8),
    transform: [{scaleY: -1}]
    // backgroundColor: "red",
},



numOfLikesText: {

},

});