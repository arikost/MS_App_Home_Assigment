
import React, { useCallback, useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPhotos} from './src/store/action/actionCreator'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootState } from './src/store/reducers';

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
  userImageURL: string
} 


const App = () => {
  
  const dispatch = useDispatch()
  const newData = useSelector(
    ({photoReducer}: RootState) => photoReducer.data
  )
  const [data, setData] = useState<ElementProps[]>(newData)
  
  useEffect(() => {
    dispatch(getPhotos())
  },[])
  console.log(data)
  const keyExtractor = useCallback((item:ElementProps) => item.id.toString(), []);
  return (


<View style={styles.container}>
  
      <FlatList 
        data={data}
        renderItem={({item}) => (
          
            <Text style={styles.test}>{item.id}</Text>
            //<Image source={{uri : item.previewURL}} style={{height:100, width:100}}/>
          
        )}
        keyExtractor={keyExtractor}
      />
      </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex:1,
  },
  test: {
    alignSelf: 'center',
    justifyContent:'center',
    margin:5
  }
});

export default App;
