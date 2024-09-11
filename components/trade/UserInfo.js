
import { StyleSheet, View, Text, Image} from "react-native";


import {
  useResponsiveFontSize,
  useResponsiveHeight,
  useResponsiveHorizontalSpace,
  useResponsiveRadius,
  useResponsiveVerticalSpace,
  useResponsiveWidth,
} from "../../hooks/useResponsiveness.js";
import Verified from "../Verified.js";
import { user_1 } from "../../assets/dummy/users_pictures/index.js";
import LikesDislikes from "../LikesDislikes.js";
import useThemeColors from "../../hooks/useThemeColors.js";


const containsNumberLessThan = (str, threshold) => {
    // Use a regular expression to find all numbers in the string
    const numbers = str.match(/-?\d+(\.\d+)?/g); // Matches integers and decimals, handles negative numbers
  
    if (!numbers) {
      return false; // No numbers found
    }
  
    // Check if any number is less than the threshold
    return numbers.some(num => parseFloat(num) < threshold);
};



const UserInfo = ({imageUrl, username, isVerified, likes, lastSeen = ""}) => {

    const themeColors = useThemeColors()
    // const circleBackgroundColor =

    const cricleColor = lastSeen && lastSeen.toLowerCase().includes("active") ? themeColors.successGreen : lastSeen && lastSeen.includes("m") && containsNumberLessThan(lastSeen, 5) ? themeColors.successGreen5 : themeColors.orange4


    return (
      <View style={styles.userView}>
        <View style={styles.userImageView}>

            {/* online circle */}
          <View style={{...styles.onlineCircle, backgroundColor: cricleColor}}/>

          <Image style={styles.userImage} source={{uri: imageUrl}} />
        </View>


        <View style={{flex: 1}}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.username}>
              {username}
            </Text>
            {/* <Text style={styles.createdAt}>{"Today 13:00"}</Text> */}

            <Text style={styles.createdAt}>
              {lastSeen}
            </Text>

          </View>

          <View 
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            // backgroundColor: "red",
            marginTop: useResponsiveVerticalSpace(6),
          }}
          >
            <LikesDislikes numOflikes={likes} style={{}}/>
            {isVerified && <Verified isVerified={true}/>}

          </View>

 
        </View>

        
      </View>
    );
};



  
const styles = StyleSheet.create({

    userView: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
        // backgroundColor: "red",
    },


    userFirstLastName: {
        fontSize: useResponsiveFontSize(16),
        fontWeight: "600",
        textTransform: "capitalize",
        marginRight: useResponsiveHorizontalSpace(14),

    },

    username: {
        fontSize: useResponsiveFontSize(14),
        fontWeight: "600",
        textTransform: "capitalize",
        marginRight: useResponsiveHorizontalSpace(14),
    },

    userImageView: {
        shadowOffset: { width: -1, height: 1 },
        shadowColor: "rgba(0,0,0,0.3)",
        shadowOpacity: 0.35,
        shadowRadius: useResponsiveRadius(7),
        elevation: 10,

        // backgroundColor: "red",
        height: useResponsiveHeight(55),
        width: useResponsiveWidth(55),
        borderRadius: useResponsiveRadius(30),
        justifyContent: "center",
        alignItems: "center",
        marginRight: useResponsiveHorizontalSpace(9),

        // backgroundColor: "red",
    },


    onlineCircle: {
        width: useResponsiveWidth(7), 
        height: useResponsiveHeight(7), 
        backgroundColor: "red", 
        position: "absolute", 
        zIndex: 1,
        top: useResponsiveHeight(10),
        left: useResponsiveWidth(6),
        borderRadius: useResponsiveRadius(3.5)
    },




    userImage: {
        width: useResponsiveWidth(40),
        height: useResponsiveHeight(40),
        borderRadius: useResponsiveRadius(15),
        borderWidth: 1.5,
        borderColor: "white",
    },
    

})


export default UserInfo;