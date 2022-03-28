import React ,{useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity, Alert,ScrollView} from 'react-native';
import {CreateRandomAvatar} from '../../util/avatar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getPrice} from '../../util/getPriceVND';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview'
import GiftBig from './GiftBig';
import {windowH} from '../../util/Dimensions'
import Gift from './Gift';

function Profile({navigation}){
    const [ShowGift, setShowGift] = useState(true);
    const [giftBig, setgiftBig] = useState(false)
    const {currentUser} = useSelector(e=>e.UserReducer);
    const [heightWebview, setheightWebview] = useState(0);
    // const currentUser = {name:"Chiến",username:"chien",spurlus:50000}
    return(
        <View style={styles.wrapper}>

        {ShowGift ? 
                <View style={styles.gift}>
                     <Gift navigation={navigation} setShowGift={(e)=>setShowGift(e)} setGif={a=>setgiftBig(a)} nameImage={require('../../assets/1000vnd.jpg')} radius={48} width={80} height={85}/>
                </View> :
                null
            }
        {giftBig ? 
                <View style={styles.gift}>
                     <GiftBig navigation={navigation} setShowGift={(e)=>setShowGift(e)} setGif={a=>setgiftBig(a)} nameImage={require('../../assets/gift.gif')} radius={48} width={80} height={80} resizeMode={'cover'}/>
                </View>:
                null
        }
        <ScrollView >
            <View style={{ width:'100%',alignItems:'center' }}>
                <View style={styles.cardProfile}>
                    <CreateRandomAvatar name={currentUser.name} width={70} height={70} sizeText={30}/>
                    <View style={{ flexDirection:'column',marginLeft:10 }}>
                        <Text style={{ fontSize:20,fontWeight:'bold' }}>{currentUser.name}</Text>
                        <Text>{`@${currentUser.username}`}</Text>
                        <Text>Số dư : {getPrice(currentUser.spurlus)+"vnđ"}</Text>
                    </View>
                </View>

                <View style={styles.cardItem}>
                    <TouchableOpacity style={styles.touch} onPress={()=>navigation.navigate("Introduce")}>
                        <AntDesign name="gift" size={22} style={{marginRight:10}}/>
                        <Text>Giới thiệu nhận quà</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardItem}>
                    <TouchableOpacity style={styles.touch}  onPress={()=>navigation.navigate("takemoney")}>
                        <FontAwesome name="money" size={22} style={{marginRight:10}}/>
                        <Text>Rút tiền</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardItem}>
                    <TouchableOpacity style={styles.touch} onPress={()=>navigation.navigate("Play")}>
                        <AntDesign name="playcircleo" size={22} style={{marginRight:10}}/>
                        <Text>Giải trí</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardItem}>
                    <TouchableOpacity style={styles.touch} onPress={()=>navigation.navigate("Introduce")}>
                        <AntDesign name="book" size={22} style={{marginRight:10}}/>
                        <Text>Nhiệm vụ</Text>
                    </TouchableOpacity>
                </View>

                <View style={{width:"100%" }}>
                    <WebView
                    
                        source={{
                            uri: 'https://www.baovui24h.com/duoinutdangxuat'
                        }}
                        style={{ width:"100%",height:878+120}}
                        startInLoadingState={true}
                        scalesPageToFit={true}
                        injectedJavaScript="window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));"
                        onMessage={(e)=>setheightWebview(parseInt(e.nativeEvent.data))}
                    
                    />
                </View>
                <View style={{...styles.cardItem,width:"95%",marginBottom:70,marginTop:20}}>
                <TouchableOpacity style={styles.touch}
                    onPress={()=>{
                        Alert.alert(
                            "NEWS",
                            "Bạn muốn đăng xuất khởi ứng dụng!!!",
                            [
                                {
                                  text: "Thoát",
                                  style: "cancel"
                                },
                                { text: "OK", onPress: async() =>{
                                    await AsyncStorage.removeItem('token');
                                    navigation.replace('signin')
                                } }
                              ]
                        )

                    }
                
                }>
                        <AntDesign name="logout" size={22} style={{marginRight:10}}/>
                        <Text>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
          
        </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper:{
        flex:1
    },
    cardProfile:{
        marginTop:10,
        flexDirection:'row',
        padding:5,
        width:'95%',
        borderRadius:10,
        backgroundColor:'white',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:10 ,
        },
        shadowOpacity:0.6,
        shadowRadius:4,
        elevation:7,
        marginBottom:10
    },
    cardItem:{
        padding:10,
        borderRadius:10,
        width:'95%',
        marginBottom:10,
        backgroundColor:'white',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:10 ,
        },
        shadowOpacity:0.6,
        shadowRadius:4,
        elevation:7
    },
    touch:{
        flexDirection:'row',
        alignItems:'center',
    },
    gift: {
      width: 130,
      height: 130,
      backgroundColor: 'transparent',
      position: 'absolute',
      bottom: windowH*0.3,
      right: 10,
      zIndex:1,
      borderRadius: 5
  }
})
export default Profile;