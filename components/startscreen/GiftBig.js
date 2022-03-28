import { View,StyleSheet,TouchableOpacity,Image,Linking,ToastAndroid} from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProgressCircle from 'react-native-progress-circle';
import {useSelector,useDispatch} from 'react-redux';
import * as FetchAPI from '../../util/fetchApi';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import {updateUer} from '../../redux/reducer/user.reducer';
export default function GiftBig(props) {
const {currentUser} = useSelector(e=>e.UserReducer);
  const URL = "https://api.flygame.io/igr?partner=com.volio.yonline&widgetId=569"
  const dispath = useDispatch();
  const handleSpurlus = async()=>{
    const data = { 
        "idUser":currentUser.id,
        "spurlus": currentUser.spurlus + 1000
    }
    // console.log(data)
    const res = await FetchAPI.postDataAPI("/user/updateSpurlus",data);
    if(res.msg === "Success"){
        ToastAndroid.showWithGravity(
            'Chúc mừng bạn đã nhận được 400 vnđ chơi game nhanh để nhận thêm 600 vnđ',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        )
        CheckAuth();
    }
    }
    const CheckAuth = async()=>{
      const token = await AsyncStorage.getItem('token');
      if(token === null || token === undefined){
          return false;
      }
      const data = {'token':token}
      const res = await FetchAPI.postDataAPI('/user/getUser',data);
      if(res.msg){
          if(res.msg.message ==='jwt expired'){
              ToastAndroid.showWithGravity(
                  'Phiên đăng nhập đã hết!!!',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
              )
              await AsyncStorage.removeItem('token');
              return false;
          }
      }else {
          dispath(updateUer(res[0]));
          return true;  
    }
  }
  return (
    <View>
        <TouchableOpacity 
            style={styles.btnCancel}
            onPress={()=>{
                setTimeout(() => {
                    props.setShowGift(true)
                    }, 30000);
                props.setGif(false)
            }}
        >
            <MaterialIcons name="cancel" size={24} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.itemGift}
            onPress={ async()=>{
                handleSpurlus()
                props.setShowGift(true)
                props.setGif(false);
                // await Linking.openURL(URL)
                props.navigation.navigate("clickgift");
            }}
            >
              <ProgressCircle
                        percent={100}
                        radius={props.radius}
                        borderWidth={8}
                        color="red"
                        shadowColor="white"
                        bgColor="#fff"
                    >
              <Image
                  source={props.nameImage}
                  style={{
                    width: props.width,
                    height: props.height,
                  }}
                  resizeMode={props.resizeMode}
                  // paused={false}
                />
              </ProgressCircle>
            </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    wrapper:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    btnCancel:{
      width: '100%',
      flexDirection: 'row',
      justifyContent:'flex-end',
    },
    itemGift:{
        justifyContent: 'center',
        alignItems: 'center'
    }
  })