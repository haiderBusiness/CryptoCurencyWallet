import React, { PureComponent, Component } from 'react';
import {View, Text} from "react-native"
import HeaderWBT from '../HeaderWBT';
import { useResponsiveHorizontalSpace, useResponsiveVerticalSpace } from '../../hooks/useResponsiveness';
import PlaceHolderListHeader from './PlaceHolderListHeader';
import SearchField from '../SearchField';
import useThemeColors from '../../hooks/useThemeColors';

class Cell extends Component {
    // Implementing custom shouldComponentUpdate for finer control
    shouldComponentUpdate(nextProps) {
      // Only update if item or index change
      return nextProps.item !== this.props.item || nextProps.item.id !== this.props.item.id || nextProps.index !== this.props.index
    }
  
    render() {

      

        
      const { item, index, removeHeader, removeBigTitle, listItem, listHeader, bigHeaderTitle, navigation } = this.props;

      // console.log('list cell:', index, ' at ListCell file')

    //   console.log("index: ", index)
      const ListItem = listItem
      const ListHeader = listHeader
  
      return (
        <View>
          {
            !removeHeader && !removeBigTitle && item === "bigTitle" ?
            <HeaderWBT
              navigation={navigation}
              title={bigHeaderTitle}
              paddingTop={useResponsiveVerticalSpace(5)}
            />
            : listItem && item !== "listHeader" ? 
            <ListItem item={item} index={index}/>
            : item === "listHeader" && !listHeader ?
            <PlaceHolderListHeader/>
            : item === "listHeader" ?
            <ListHeader /> 
            :
            <Text>
              {item + " " + index}
            </Text>
          }
        </View>
      );
    }
}
  
  // Use the MemoizedRenderItem class in the render function
const ListCell = ({ item, index, removeHeader, removeBigTitle, listItem, listHeader, bigHeaderTitle, navigation, searchField }) => {

  console.log('list cell:', index, ' at ListCell file')

  const themeColors = useThemeColors()

  // return <Cell 
  // item={item} 
  // index={index}
  // removeBigTitle={removeBigTitle}
  // removeHeader={removeHeader}
  // listItem={listItem}
  // listHeader={listHeader} 
  // bigHeaderTitle={bigHeaderTitle}
  // navigation={navigation}
  // />;

      const ListItem = listItem
      const ListHeader = listHeader

      const searchStyle = {
        marginHorizontal: useResponsiveHorizontalSpace(18),
        marginTop: useResponsiveVerticalSpace(10)
      }

      const searchPlaceholderColor = themeColors.text3

      const onSearchFieldPress = () => {
        navigation.navigate("SearchScreen")
      }
  
      return (
        <View>
          {
            !removeHeader && !removeBigTitle && item === "bigTitle" ?
            <HeaderWBT
              navigation={navigation}
              title={bigHeaderTitle}
              paddingTop={useResponsiveVerticalSpace(15)}
              paddingBottom={useResponsiveVerticalSpace(15)}
            />
            : item === "searchField" ? 
            <SearchField style={searchStyle} placeholderColor={searchPlaceholderColor} onPress={onSearchFieldPress}/>
            : listItem && item !== "listHeader" ? 
            <ListItem item={item} index={index}/>
            : item === "listHeader" && !listHeader ?
            <PlaceHolderListHeader/>
            : item === "listHeader" ?
            <ListHeader /> 
            :
            <Text>
              {item + " " + index}
            </Text>
          }
        </View>
      );
};

  export default ListCell