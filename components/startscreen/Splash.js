import { View, Text, Image, StyleSheet, Animated, ToastAndroid } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { windowH, windowW } from '../../util/Dimensions';
import { LinearTextGradient } from 'react-native-text-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import * as GETAPI from '../../util/fetchApi'
import { updateUer } from '../../redux/reducer/user.reducer';
export default function Splash({navigation}) {
    const facetiming = useRef(new Animated.Value(0)).current;
    const dispath = useDispatch();
    useEffect(() => {
        Animated.timing(facetiming,{
            toValue: 1,
            duration: 4000,
            useNativeDriver: true 
        }).start(async()=>{
            Check();
        }    
        );
      }, [facetiming]);

    const Check = async()=>{
        const StatusAuth = await CheckAuth();
        if(StatusAuth){
            navigation.replace('tab');
        }else{
            navigation.replace('signin');
        }
    }

    const CheckAuth = async()=>{
        const token = await AsyncStorage.getItem('token');
        if(token === null || token === undefined){
            return false;
        }
        const data = {'token':token}
        const res = await GETAPI.postDataAPI('/user/getUser',data);
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
            if(res[0].status === 1){
                await AsyncStorage.removeItem('token');
                return false;
            }else{
                dispath(updateUer(res[0]))
                return true;
            }
            }
    }


  return (
    <View style={styles.container}>
      <Animated.Image 
            source={require('../../assets/logo.jpg')}
            resizeMode='contain'
            style={{ 
                width: windowW*0.3,
                height: windowH*0.3,
                borderRadius: 20,
                opacity: facetiming
             }}
      />
        <LinearTextGradient
            locations={[0,1]}
            colors={['#99815B','#FD8469']}
            start={{ x:0, y:0 }}
            end={{ x:1,y:0 }}
        >
            <Text style={{ fontWeight: 'bold', fontSize: 22 }}>THE NEWS PAPER VIP</Text>
        </LinearTextGradient>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent:'center',
        alignItems:'center',
    }
})