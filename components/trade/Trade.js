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


import viewStyleSample from "../RNComponents/viewStyleSample.js";
import useThemeColors from "../../hooks/useThemeColors.js";
import { 
  interfaceExchangeCryptoBlack, interfaceShieldTrustGreen, usdt, btc, eth, usdc, 
  interface_alarm_clock_fill_black,
  interface_arrow_trend_down_green_fill,
  interface_arrow_trend_up_black_fill,
  interface_heart_outline_black,
  interface_heart_fill_red

} from "../../assets/dummy/icons_pictures/index.js";

import styles from "./styles.js";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.js";
import useLanguage from "../../hooks/useLanguage.js";
import English from "../../constants/English.js";
import Verified from "../Verified.js";
import LikesDislikes from "../LikesDislikes.js";

import CustomPressable from "../RNComponents/CustomPressable.js"
import UserInfo from "./UserInfo.js";
import { convertMinutes, getLastSeen } from "../../utils/time.js";


const placeHolderObj = {
  "id": "87cb58cf-e7be-4344-b664-1d18b5780d56",
  "ownerData": {
    "id": "95a68a51-512a-453b-8e43-1c422a57520f",
    "username": "Christop3",
    "avatar": "https://avatars.githubusercontent.com/u/46711448",
    "lastSeen": 1721273325983,
    "likes": 1388,
    "dislikes": 18,
    "verified": true
  },
  "paymentMethod": "GoBank",
  "note": "quick response time",
  "tradeType": "buying",
  "coin": "ETH",
  "avgTradeSpeed": 180,
  "priceAdjustmentPercentage": "-5.88",
  "minLimit": 80,
  "maxLimit": 29000,
  "currency": "EUR"
}


const btcPriceInEuro = 50458.71
const usdtPriceInEuro = 0.90
const usdcPriceInEuro = 0.90
const ethPriceInEuro = 2131.80




export default function Trade({ tradeInfo, style = viewStyleSample, }) {
  const receivedStyle = style.flex !== 1000 ? style : {};

  const themeColors = useThemeColors();

  // console.log("orderStatus", tradeInfo && tradeInfo.orderStatus)

  // const isRealData = !!order && !!receivedTradeInfo.coin
  const receivedTradeInfo = tradeInfo && tradeInfo.coin ? tradeInfo : placeHolderObj

  const coinIcon = receivedTradeInfo.coin === "USDT" ? usdt : receivedTradeInfo.coin === "BTC" ? btc : receivedTradeInfo.coin === "ETH" ? eth : usdc


  const coin = receivedTradeInfo.coin


  

  const TradeInfo = () => {

    const paymentMethod = receivedTradeInfo.paymentMethod
    return (
      <View
        style={{
          ...styles.orderView,
          backgroundColor: themeColors.background2,
        }}
      >
        <OrderFirstPart />
        <Text style={{...styles.paymentMethod, color: themeColors.text2}}>
          {paymentMethod}
        </Text>

        <LastPart/>
      </View>
    );
  };

  const OrderFirstPart = () => {
    const tradeType = receivedTradeInfo.tradeType === "buying" ? "Buy " : "Sell "

    

    const SpeedMinutes = receivedTradeInfo.avgTradeSpeed

    const covertedSpeed = convertMinutes(SpeedMinutes)

    return (
      <View style={{ ...styles.orderFirstRow }}>
        <View style={{
          flexDirection: "row", 
          justifyContent: "space-between", 
          alignItems: "center",
          width: "100%"
          }}>
          <View style={styles.buyingTextAndCoinView}>
          <Text style={{ ...styles.buySellText, color: themeColors.text }}>
            {capitalizeFirstLetter(tradeType) + " "} 
            {coin} 
          </Text>
          <Image style={styles.coin} source={coinIcon} />
          </View>
          
          <View 
          style={{
            flexDirection: "row", 
            justifyContent: "space-between", 
            alignItems: "center",
          }}
          >
          <Image style={styles.timer} source={interface_alarm_clock_fill_black} />
            <Text style={styles.createdAt}>{covertedSpeed}</Text> 
          </View>


        </View>
      </View>
    );
  };


  const LastPart = () => {

    const type = receivedTradeInfo.tradeType

    const minLimitValue = receivedTradeInfo.minLimit + " " + receivedTradeInfo.currency

    const maxLimitValue = receivedTradeInfo.maxLimit + " " + receivedTradeInfo.currency


    const percentage = receivedTradeInfo.priceAdjustmentPercentage

    const upOrDown = percentage >= 0 ? interface_arrow_trend_up_black_fill
    : interface_arrow_trend_down_green_fill


    //TODO fetch real data prices
    let originalNumber = coin === "BTC" ? btcPriceInEuro : coin === "ETH" ? ethPriceInEuro : coin === "USDC" ? usdcPriceInEuro : usdtPriceInEuro ;  // The base number
    // // Dynamic percentage that could be positive or negative

    // Adjust the number by the given percentage
    let adjustedValue = originalNumber + (originalNumber * (percentage / 100));

    const price = parseFloat(adjustedValue.toFixed(2)).toLocaleString('en-US');

    const currency = receivedTradeInfo.currency

    const oppositeOfPercentage = percentage * -1;


    const currencyPriceDiffrence = 1 + (1 * (oppositeOfPercentage / 100))

    return(
      <View style={styles.exchangeView}>
        <View style={styles.payingDetailsView}>
            {/* <View style={{flexDirection: "row"}} >
              <Text style={{...styles.youPay, color: themeColors.text3}}>
                {minLimit + ":"}
              </Text>

              <Text style={{...styles.amountPaid, color: themeColors.text}}>
                {minLimitValue}
              </Text>
            </View> */}



            <View style={{flexDirection: "row"}}>
              <Text style={{...styles.youPay, color: themeColors.text3}}>
                {"purchase limit" + ":"}
              </Text>

              <Text style={{...styles.amountPaid, color: themeColors.text}}>
                { minLimitValue + " - " + maxLimitValue}
              </Text>
            </View>







            <View style={{flexDirection: "row", marginTop: 5}}>

              <Text style={{...styles.amountPaid, color: themeColors.text}}>
                {price + " " + currency}
              </Text>
            </View>




            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 5,
              }}>

              <Text style={{...styles.amountPaid, color: themeColors.text}}>
                {`1 USD = ${currencyPriceDiffrence.toFixed(2)} USD of ${coin}`}
              </Text>

              <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
              >

                <Image style={styles.timer} source={upOrDown}/>

              <Text style={{...styles.amountPaid, color: themeColors.text}}>
                {percentage + "%"}
              </Text>
              </View>

            </View>

        </View>


        

        {/* <View style={{...styles.orderStatus, backgroundColor: statusBackgroundColor, borderColor: statusColor}}>
          <Text style={{...styles.orderStatusText, color: statusColor}}>
            {status}
          </Text>
        </View> */}
        

        {/* <Image style={styles.exchangeIcon} source={interfaceExchangeCryptoBlack}/> */}

 
      </View>
    )
  }

  const fakeImageUrl = "https://st.depositphotos.com/2639909/56568/i/450/depositphotos_565681106-stock-photo-yellow-male-persian-cat-photo.jpg"

  const imageUrl = receivedTradeInfo.ownerData.avatar ? receivedTradeInfo.ownerData.avatar : fakeImageUrl;

  const userName = receivedTradeInfo.ownerData.username
  const isVerified = receivedTradeInfo.ownerData.verified
  const likes = receivedTradeInfo.ownerData.likes
  const dislikes = receivedTradeInfo.ownerData.dislikes

  const lastSeen =  getLastSeen(receivedTradeInfo.ownerData.lastSeen)


  return (
    <CustomPressable  style={{ ...styles.container, ...receivedStyle }}>
      <View style={styles.child}>
        <UserInfo imageUrl={imageUrl} isVerified={isVerified} likes={likes} username={userName} lastSeen={lastSeen}/>

        <TradeInfo/>

      </View>
    </CustomPressable>
  );
}

// const TradeInfo = () => {
//   return (
//     <View
//       style={{
//         ...styles.orderView,
//         backgroundColor: themeColors.background2,
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
