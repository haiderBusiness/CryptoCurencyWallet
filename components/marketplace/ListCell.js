import React, { PureComponent, Component } from 'react';
import {View, Text} from "react-native"
import HeaderWBT from '../HeaderWBT';
import { useResponsiveVerticalSpace } from '../../hooks/useResponsiveness';
import PlaceHolderListHeader from './PlaceHolderListHeader';

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
const ListCell = ({ item, index, removeHeader, removeBigTitle, listItem, listHeader, bigHeaderTitle, navigation }) => {

  console.log('list cell:', index, ' at ListCell file')

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