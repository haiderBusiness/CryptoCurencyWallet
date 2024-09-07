import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  useResponsiveFontSize,
  useResponsiveHeight,
  useResponsiveHorizontalSpace,
  useResponsiveRadius,
  useResponsiveVerticalSpace,
  useResponsiveWidth,
} from "../../hooks/useResponsiveness.js";
import { user_1 } from "../../assets/dummy/users_pictures/index.js";

import viewStyleSample from "../RNComponents/viewStyleSample.js";
import useThemeColors from "../../hooks/useThemeColors.js";
import { interfaceExchangeCryptoBlack, interfaceShieldTrustGreen, usdt, btc, eth, usdc} from "../../assets/dummy/icons_pictures/index.js";

import styles from "./styles.js";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.js";
import useLanguage from "../../hooks/useLanguage.js";
import English from "../../constants/English.js";
import Verified from "../Verified.js";
import LikesDislikes from "../LikesDislikes.js";

import CustomPressable from "../RNComponents/CustomPressable.js"


const placeHolderObj = {
  "id": 1,
        "ownerData": {
            "id": 1,
            "firstName": "Olivia",
            "lastName": "Williams",
            "photoUrl": "https://example.com/photos/oliviawilliams.jpg",
            "lastSeen": 1728747567890,
            "likes": 4920,
            "dislikes": 2,
            "verified": true,
            "joinedAt": 1613742565991
        },
        "orderStatus": "completed",
        "paymentMethod": "Google Pay- Gold Locker (MMTC-PAMP)",
        "note": "Reliable and quick service",
        "tradeType": "buying",
        "coin": "usdt",
        "priceAdjustmentPercentage": -4.8,
        "currentMarketPrice": 49500.80,
        "minLimit": 2500,
        "maxLimit": 7500000,
        "currency": "AUD",
        "createdAt": 1727747567890
}


const btcPriceInEuro = 50458.71
const usdtPriceInEuro = 0.90
const usdcPriceInEuro = 0.90
const ethPriceInEuro = 2131.80




export default function Order({ orderInfo = placeHolderObj, style = viewStyleSample, }) {
  const receivedStyle = style.flex !== 1000 ? style : {};

  const themeColors = useThemeColors();

  console.log("orderStatus", orderInfo && orderInfo.orderStatus)


  // const isRealData = !!order && !!receivedOrderInfo.coin
  const receivedOrderInfo = orderInfo && orderInfo.coin ? orderInfo : placeHolderObj

  const coinIcon = receivedOrderInfo.coin === "usdt" ? usdt : receivedOrderInfo.coin === "bitcoin" ? btc : receivedOrderInfo.coin === "ethereum" ? eth : usdc

  const OrderInfo = () => {
    return (
      <View
        style={{
          ...styles.orderView,
          backgroundColor: themeColors.second_background,
        }}
      >
        <OrderFirstPart />
        <Text style={{...styles.paymentMethod, color: themeColors.secondary_text}}>
        {receivedOrderInfo.paymentMethod}
        </Text>

        <LastPart/>
      </View>
    );
  };

  const OrderFirstPart = () => {
    return (
      <View style={{ ...styles.orderFirstRow }}>
        <View style={styles.buyingTextAndCoinView}>
          <Text style={{ ...styles.buySellText, color: themeColors.text }}>
            {receivedOrderInfo.tradeType === "buying" ? "Buy " : "Sell "} 
            {receivedOrderInfo.coin.toUpperCase()} 
          </Text>
          <Image style={styles.coin} source={coinIcon} />

          <Text style={styles.createdAt}>{"Today 13:00"}</Text>
        </View>
      </View>
    );
  };


  const LastPart = () => {

    const type = receivedOrderInfo.tradeType

    const whoPays = capitalizeFirstLetter(type === "buying" ? "you pay" : "you receive");
    const whoReceives = capitalizeFirstLetter(type === "buying" ? "you receive" : "you pay")
    const status = receivedOrderInfo.orderStatus

    const statusBackgroundColor = status === "canceled" ? themeColors.lightRed10 : status === "unpaid" ? themeColors.lightOrange9 : status === "paid" ? themeColors.lightGreen10 : themeColors.lightPurple10;


    const statusColor = status === "canceled" ? themeColors.red6 : status === "unpaid" ? themeColors.orange3 : status === "paid" ? themeColors.green3 : themeColors.purple4;


    // const borderColor = 

    //TODO complete from here
    const orderStatusBackgroundColor = null

    return(
      <View style={styles.exchangeView}>
        <View style={styles.payingDetailsView}>
            <View style={{flexDirection: "row"}} >
              <Text style={{...styles.youPay, color: themeColors.tertiary_text}}>
                {whoPays + ":"}
              </Text>

              <Text style={{...styles.amountPaid, color: themeColors.text}}>
                {"8.00 USD"}
              </Text>
            </View>



            <View style={{flexDirection: "row"}}>
              <Text style={{...styles.youRceive, color: themeColors.tertiary_text}}>
                {whoReceives + ":"}
              </Text>

              <Text style={{...styles.amountPaid, color: themeColors.text}}>
                {"10.973553 USDT"}
              </Text>
            </View>

            
        </View>

        <View style={{...styles.orderStatus, backgroundColor: statusBackgroundColor, borderColor: statusColor}}>
          <Text style={{...styles.orderStatusText, color: statusColor}}>
            {status}
          </Text>
        </View>
        

        {/* <Image style={styles.exchangeIcon} source={interfaceExchangeCryptoBlack}/> */}

 
      </View>
    )
  }

  const UserInfo = () => {
    return (
      <View style={styles.userView}>
        <View style={styles.userImageView}>
          <Image style={styles.userImage} source={user_1} />
        </View>


        <View style={{flex: 1}}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.userFirstLastName}>
              {
              receivedOrderInfo.ownerData.firstName 
              + " " + 
              receivedOrderInfo.ownerData.lastName
              }
            </Text>
            {/* <Text style={styles.createdAt}>{"Today 13:00"}</Text> */}
            {receivedOrderInfo.ownerData.verified && <Verified isVerified={true}/>}
          </View>

          <LikesDislikes numOflikes={receivedOrderInfo.ownerData.likes} numOfDislikes={receivedOrderInfo.ownerData.dislikes} style={{marginTop: useResponsiveVerticalSpace(5)}}/>

        </View>
        
      </View>
    );
  };

  return (
    <CustomPressable  style={{ ...styles.container, ...receivedStyle }}>
      <View style={styles.child}>
        <UserInfo/>

        <OrderInfo/>

      </View>
    </CustomPressable>
  );
}

// const OrderInfo = () => {
//   return (
//     <View
//       style={{
//         ...styles.orderView,
//         backgroundColor: themeColors.second_background,
//       }}
//     >
//       <OrderFirstRow />
//     </View>
//   );
// };

// const OrderFirstRow = () => {
//   return (
//     <View style={{ ...styles.orderFirstRow }}>
//       <View style={styles.BuyingTextAndCoinView}>
//         <Text style={{ ...styles.buySellText, color: themeColors.text }}>
//           {"Buy USDT"}
//         </Text>
//         <Image style={styles.coin} source={usdt} />
//       </View>

//       <View>
//         <Text>canceled</Text>
//       </View>
//     </View>
//   );
// };

// const HeaderWithUserInfo = ({ children }) => {
//   return (
//     <View style={styles.userView}>
//       <View style={styles.userImageView}>
//         <Image style={styles.userImage} source={user_1} />
//       </View>

//       {/* <View style={{ flexDirection: "row" }}>
//           <Text style={styles.userFirstLastName} t>
//             {"elijah mateo"}
//           </Text>
//           <Text style={styles.createdAt}>{"Today 13:00"}</Text>
//         </View> */}

//       {children}
//     </View>
//   );
// };
