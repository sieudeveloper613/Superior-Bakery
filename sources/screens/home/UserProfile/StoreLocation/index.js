import React, { useState, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Button, Text } from '../../../../components'
import { colors } from '../../../../themes/colors'
import { Header } from '../../../../components/custom'
import StorePicker from './components/StorePicker'
import StoreSheet from './components/StoreSheet'
import { stores } from '../../../../utils/data'
import { othersApi } from '../../../../APIs'
import RBSheet from "@nonam4/react-native-bottom-sheet"
import { useEffect } from 'react'
import { logDebug, logError } from '../../../../utils/console'
import MapView, { Marker, UrlTile} from 'react-native-maps'

const StoreLocation = () => {
  const [valueStore, setValueStore] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [storeList, setStoreList] = useState([]);
  const bottomSheetRef = useRef(null)
  console.log('value: ', valueStore)
  useEffect(() => {
    onCollectStore();
  },[]);

  const onCollectStore = async () => {
    try {
      const onCollect = await othersApi.collectStore();
      if (onCollect) {
        const { store } = onCollect;
        let newStore = [];
        store.forEach(item => {
          const text_1 = item.branch.toString();
          let text_2 = item.ward.toString();
          let label = text_1.concat(" - ", text_2);
          newStore.push({label, value: {...item}});
        })
        logDebug('new-store: ', newStore)
        setStoreList(newStore);
      } else {
        setStoreList([])
      }
    } catch (error) {
      logError('collect-store-catch: ', error);
    }
  }

  return (
  <Container safe flex={1} bgColor={colors.LIGHT_GREY}>
    <Header label={'Vị trí cửa hàng'} />
    <Container flex={1}>
      <StorePicker
        label={'Cửa hàng'}
        data={storeList}
        placeholder={'Chọn tiệm bánh mì'}
        labelField={'label'}
        valueField={'value'}
        value={valueStore}
        onChange={(value) => {
         
          if(value){
            setValueStore(value);
            bottomSheetRef.current?.open();
          }
        }}
      />
      <MapView
        style={{flex: 1}}
        provider={MapView.PROVIDER_OPENSTREETMAP} // sử dụng bản đồ từ OpenStreetMap
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
          <UrlTile
            urlTemplate={`https://www.openstreetmap.org/oauth/access_token=DWcPi2foVRUF3uVWcgMqtr8gIfiags8VCI7Txhnr`}
            maximumZ={19}
          />
        <Marker
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          title="Marker"
          description="This is a marker in San Francisco"
        />
      </MapView>

      <RBSheet
          ref={bottomSheetRef}
          animationType='slide'
          height={220}
          minClosingHeight={0}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            container: {
              paddingHorizontal: 16, 
              paddingVertical: 8,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              elevation: 2,
            },
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "#000"
            }
          }}
        >
          <StoreSheet
            source={valueStore?.value?.image}
            name={valueStore?.value?.name}
            store={valueStore?.value?.branch}
            isOpen={isOpen}
            onPress={() => {}}
            address={valueStore?.value?.address}
          />
        </RBSheet>
    </Container>
    
  </Container>    
  )
}

export default StoreLocation

const styles = StyleSheet.create({})