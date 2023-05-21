
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPagination, getPhotos, setCategory} from './src/store/action/actionCreator'
import {
  FlatList,
  Image,
  ListRenderItem,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootState } from './src/store/reducers';
import { Categories, PaginationState } from './src/store/action/actionInterface';
import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export type ElementProps = {
  id: number,
  pageURL: string,
  type: string,
  tags: string,
  previewURL: string,
  previewWidth: number,
  previewHeight: number,
  webformatURL: string,
  webformatWidth: number,
  webformatHeight: number,
  largeImageURL: string,
  imageWidth: number,
  imageHeight: number,
  imageSize: number,
  views: number,
  downloads: number,
  collections: number,
  likes: number,
  comments: number,
  user_id: number,
  user: string,
  userImageURL: string,
} 

const App = () => {
  
  const dispatch = useDispatch();
  const newData = useSelector(
    ({photoReducer}: RootState) => photoReducer.currentDate
  );
  const [data, setData] = useState<ElementProps[]>();
  const [modalElementValues, setModalElementValues] = useState<ElementProps>();
  const [modalElementState, seModalElementState] = useState(false);
  const [modalCategoriesState, setModalCategoriesState] = useState(false);

  console.log('App render')
  useEffect(() => {
    console.log('App mount')
    dispatch(getPhotos())    
  },[])
  useMemo(() =>{
    console.log('newData')
    setData(newData)
  },[newData])

  const keyExtractor = useCallback((item:ElementProps) => item.id.toString(), []);
  const modalElement = useCallback((item: ElementProps) => {
    setModalElementValues(item);
    seModalElementState(true)
  },[])
  const RenderElement: ListRenderItem<ElementProps> = useCallback(({item}) =>{
    const img_uri = {uri : item.previewURL}
    return(
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => modalElement(item)}
      >
      <Image source={img_uri} style={styles.imageStyle}/>
    </TouchableOpacity>
    )
  },[])
  const paginationForward = useCallback(() =>{
    dispatch(getPagination('forward'))
  },[])
  const paginationBackward = useCallback(() =>{
    dispatch(getPagination('backward'))
  },[])
  const closeModal = useCallback((modal: 'element' | 'category') =>{
    if(modal === 'element'){
      seModalElementState(false);
    }
    else if(modal === 'category'){
      setModalCategoriesState(false)
    }
  },[])
  const choseNewCategory = useCallback((category:Categories) => {
    dispatch(setCategory(category));
    dispatch(getPhotos());
    closeModal('category');
  },[])
  const ElementModal = useCallback(() =>{
    const img_uri = {uri: modalElementValues?.largeImageURL};
    return(
      <Modal
      animationType='slide'
      transparent={true}
      visible={modalElementState}
      >
        <TouchableOpacity 
          style={styles.modalBackground}
          onPress={() => closeModal('element')}
        >
          <Image source={img_uri} style={styles.largeImgStyle}/>
        
        
        
          <View style={styles.modalView}>
            <Text style={styles.textStyle}>views : {modalElementValues?.views}</Text>
            <Text style={styles.textStyle}>downloads : {modalElementValues?.downloads}</Text>
            <Text style={styles.textStyle}>likes : {modalElementValues?.likes}</Text>
            <Text style={styles.textStyle}>collections : {modalElementValues?.collections}</Text>
            <Text style={styles.textStyle}>tags : {modalElementValues?.tags}</Text>
            <Text style={styles.textStyle}>user : {modalElementValues?.user}</Text>
          </View>
        </TouchableOpacity>
        
      </Modal>

    )
  },[modalElementState])
  const CategoriesModal = useCallback(() =>{
    return(
      <Modal
      animationType='slide'
      transparent={true}
      visible={modalCategoriesState}
      >
        <TouchableOpacity 
          style={styles.modalBackground}
          onPress={() => closeModal('category')}
        >
        
          <View style={styles.modalView}>
            <TouchableOpacity 
              style={styles.btnStyleCategory}
              onPress={() => choseNewCategory('animal')}
            >
              <Text style={styles.textStyle}>animal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.btnStyleCategory}
              onPress={() => choseNewCategory('sport')}
            >
              <Text style={styles.textStyle}>sport</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.btnStyleCategory}
              onPress={() => choseNewCategory('work')}
            >
              <Text style={styles.textStyle}>work</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

    )
  },[modalCategoriesState])

  return (
    <View style={styles.container}>
        <View style={styles.btnContainer}>
          <TouchableOpacity 
            onPress={paginationBackward}
            style={styles.btnStyleTop}
          >
            <Text style={styles.textStyle}> PREV </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setModalCategoriesState(true)}
            style={styles.btnStyleTop}
          >
            <Text style={styles.textStyle}>SELECT CATEGORY</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={paginationForward}
            style={styles.btnStyleTop}
          >
            <Text style={styles.textStyle}> NEXT </Text>
          </TouchableOpacity>
        </View>   
        <FlatList 
            data={data}
            renderItem={RenderElement}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={9}
            numColumns={3}
          contentContainerStyle={styles.itemContainer}
        />
        <ElementModal/>
        <CategoriesModal/>
      </View>
        
      );
}

const styles = StyleSheet.create({
  container : {
    flex:1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent:'space-evenly',
    alignItems: 'baseline',
    margin:30
  },
  itemContainer : {
    alignItems: 'center',

    padding : 6
  },
  imageStyle : {
    height:110, 
    width:110
  },
  largeImgStyle : {
    height:height/2, 
    width:width - 10,
    alignSelf:'center',
    marginTop : 100
  },
  modalView : {
    marginTop:60,
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
  modalBackground : {
    flex:1,
    backgroundColor: 'black',
    opacity: 0.8
    
  },
  textStyle :{
    color: 'black',
    fontWeight: '700'
  },
  btnStyleTop : {
    alignContent:'center',
    alignItems:'center',
    padding: 5,
    margin:5,
    alignSelf: 'center',
    width: 'auto',
    height: 30,
    elevation:5,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 20,
    backgroundColor: '#9CE3F9'
  },
  btnStyleCategory : {
    alignContent:'center',
    alignItems:'center',
    padding: 5,
    margin:5,
    alignSelf: 'center',
    width: 100,
    height: 30,
    elevation:5,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 20,
    backgroundColor: '#9CE3F9'
  }
});

export default App;
