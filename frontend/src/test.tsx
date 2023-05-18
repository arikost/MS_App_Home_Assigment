import React, { useCallback, useState } from "react";
import { Image, ListRenderItemInfo, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native/types";
import { ElementProps } from "../App";

const RenderElement = ({item}:ListRenderItemInfo<ElementProps>) =>{
    const [modalState, setModalState] = useState(false);
    return(
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => setModalState(true)}
      >
      <Image source={{uri : item.previewURL}} style={styles.imageStyle}/>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalState}
       
      >
        <View style={styles.modalView}>
          <Text>{item.tags}</Text>
        </View>
      </Modal>
    </TouchableOpacity>
    )
}
export default React.memo(RenderElement)

  const styles = StyleSheet.create({
    imageStyle : {
      height:100, 
      width:100
    },
    modalView : {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems: 'baseline',
        margin:5
      },
    
  });
  