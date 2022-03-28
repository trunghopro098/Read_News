import React ,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ToastAndroid,FlatList,Dimensions} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {getPrice} from '../../util/getPriceVND';
import LinearGradient from "react-native-linear-gradient";
import * as FetchAPI from '../../util/fetchApi';
import VirtualizedView from '../../util/VirtualizedView';
import {CreateRandomAvatar} from '../../util/avatar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector,useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUer } from '../../redux/reducer/user.reducer';
import { windowH, windowW } from '../../util/Dimensions';
import Gift from './Gift';
import GiftBig from './GiftBig';
import { LinearTextGradient } from 'react-native-text-gradient';
import { WebView } from 'react-native-webview';


function Introduce({navigation}){

    const [friendIntroduced, setfriendIntroduced] = useState([]);
    const [dataFullMission, setdataFullMission] = useState([]);
    const [dataMission, setdataMission] = useState([]);
    const {currentUser} = useSelector(e=>e.UserReducer);
    const dispath = useDispatch();
    const [heightWebView, setheightWebView] = useState(0);
    const [ShowGift, setShowGift] = useState(true);
    const [giftBig, setgiftBig] = useState(false)

    useEffect(()=>{
        getFriendIntroduced();
        getMission();
    },[currentUser])

    const getFriendIntroduced = async()=>{
        const data = {"idUser":currentUser.id}
        const res = await FetchAPI.postDataAPI("/reward/getFriendIntroduced",data);
        if(res!==undefined){
            if(res.msg){
                let tmp = [];
                res.msg.map((e,index)=>{
                    console.log(e)
                    if(index<8){
                        tmp.push(e);
                    }
                })
                setfriendIntroduced(tmp);
                
            }
        }
    }
    const getMission = async()=>{
        const data = {"idUser":currentUser.id}
        const res = await FetchAPI.postDataAPI("/mission/getMission",data);
        setdataMission(res.msg)
        // console.log(res)
    }
    const refresh = async()=>{
        getFriendIntroduced();
        await CheckAuth();
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
            if(res[0].status === 1){
                await AsyncStorage.removeItem('token');
                return false;
            }else{
                dispath(updateUer(res[0]))
                return true;
            }
            }
    }
    const handleCopyCode = ()=>{
        Clipboard.setString(currentUser.code);
        ToastAndroid.showWithGravityAndOffset(
            "Sao chép mã thành công !!",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            200
        );
    }

    const handleSpurlus = async(id,idUser, bonus)=>{
        
        const data = {
            "idMission": id,    
            "idUser":idUser,
            "spurlus": currentUser.spurlus + bonus
        }
        const res = await FetchAPI.postDataAPI("/mission/AddCompleteMission",data);
        refresh();
    }

    const renderItemIntroduced = ({item})=>(
        <View style={styles.itemIntroduced}>
            <View style={styles.contentItem}>
                <View style={{ flexDirection:'row',alignItems:'center',marginLeft:10 }}>
                    <CreateRandomAvatar name={item.name} width={30} height={30}/>
                    <View style={{ flexDirection:'column',marginLeft:10 }}>
                        <Text style={{ fontWeight:'bold' }}>{item.name}</Text>
                        <Text style={{ fontStyle: 'italic' }}>{`@${item.username}`}</Text>
                    </View>
                </View>
                <Text style={{ color:'green' }}>+5,000 vnđ</Text>
            </View>
        </View>
    )

    const renderItemMission = ({item})=>(
            <View style={styles.itemIntroduced}>
            <View style={styles.contentItem}>
                <View style={{ flexDirection:'row',alignItems:'center',marginLeft:10, maxWidth: "73%" }}>
                    {/* <CreateRandomAvatar name={item.name} width={30} height={30}/> */}
                    <View style={{ flexDirection:'column',marginLeft:10 }}>
                        <Text style={{ fontWeight:'bold', }}>{item.title}</Text>
                        <Text style={{ fontStyle: 'italic' }}>{`Tiền thưởng: ${getPrice(item.bonus)} vnđ`}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{ 
                        backgroundColor:'transparent',
                        borderWidth:.5,
                        borderColor:'red',
                        padding:5,
                        borderRadius:10
                    }}
                    onPress={()=>{
                        handleSpurlus(item.id,currentUser.id, item.bonus);
                        navigation.navigate('detailnews',{id:item.idNews});
                        setTimeout(() => {
                            ToastAndroid.showWithGravity(
                                `Chúc mừng bạn đã nhận được ${getPrice(item.bonus)} vnđ`,
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            )
                        }, 2000);

                    }}
                >
                    <Text style={{ color:'red' }}>Đọc ngay</Text>
                </TouchableOpacity>
            </View>
            </View>
    )

    return(
        <View>
                       
            {ShowGift ? 
                <View style={styles.gift}>
                     <Gift navigation={navigation} setShowGift={(e)=>setShowGift(e)} setGif={a=>setgiftBig(a)} nameImage={require('../../assets/1000vnd.jpg')} radius={48} width={80} height={85}/>
                </View>:
                null
            }
            {giftBig ? 
                <View style={styles.gift}>
                     <GiftBig navigation={navigation} setShowGift={(e)=>setShowGift(e)} setGif={a=>setgiftBig(a)} nameImage={require('../../assets/gift.gif')} radius={48} width={80} height={80} resizeMode={'cover'}/>
                </View>:
                null
            }
            
        <VirtualizedView >
            <View style={styles.wrapper}>
          
            <View style={styles.banner}>
                <LinearTextGradient
                        locations={[0,1]}
                        colors={['#99815B','#FD8469']}
                        start={{ x:0, y:0 }}
                        end={{ x:1,y:0 }}
                    >
                <Text style={{ fontWeight:'bold',fontSize: 18}}>Giới thiệu nhận quà liền tay</Text>
                </LinearTextGradient>
                <TouchableOpacity onPress={refresh}>
                    <Ionicons name="refresh" size={22} style={{marginRight:10}}/>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:10,marginLeft:10}}>
                <View style={{ flexDirection:'row',alignItems:'center' }}>
                    <Text style={{ fontSize:16 }}>Số dư: </Text>
                    <Text style={{ fontWeight:'bold',fontSize:18 }}>{getPrice(currentUser.spurlus)+"vnđ"}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.btnTakeOut}
                    onPress={()=>navigation.navigate("takemoney")}
                >
                   <Text style={{ color:'white',fontSize:16 }}>Rút tiền ngay</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ fontSize:16,marginLeft:10,fontStyle:'italic' }}>Với mỗi người bạn giới thiệu, bạn và bạn của bạn sẽ nhận được 5,000vnđ </Text>
            <View style={{ flexDirection:'row',alignItems:'center',marginLeft:10}}>
                <Text style={{ fontSize:16 }}>Mã giới thiệu của bạn: </Text>
                <Text style={{ fontWeight:'bold',fontSize:18 }}>{`"${currentUser.code}"`}</Text>
                <TouchableOpacity 
                    style={{ marginLeft:10,backgroundColor:'rgb(180,180,180)',padding:5,borderRadius:5 }}
                    onPress={handleCopyCode}
                >
                   <Text style={{ color:'white' }}>Sao chép</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop:20 }}>
                <LinearGradient  colors= {["#EDDAF5","white"]} style={{ borderRadius:10,padding:5 }}>
                    <LinearGradient  colors= {['#F767C3','#E5B7BF', '#8fcbbc','gray']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{ borderRadius:10 }}>
                        <View style={{ justifyContent: "center", flexDirection: "row" }}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight:'bold', marginLeft: 15 }}>Danh sách bạn đã giới thiệu</Text>
                        </View>
                        <View style={styles.productsale}>
                            {friendIntroduced.length===0 ?
                            <Text style={{ textAlign:'center',color:'white' }}>Bạn chưa giới thiệu được ai...</Text>
                            :
                            <FlatList
                                data={friendIntroduced}
                                keyExtractor= {item=>item.id}
                                listKey={(item, index) => `_key${index.toString()}`}
                                renderItem={renderItemIntroduced}
                                style={{ marginTop:10 }}
                            />
                            }
                            
                        </View>
                    </LinearGradient>
                </LinearGradient>
            </View>

            <View style={{ marginTop:20 }}>
                <LinearGradient  colors= {["#EDDAF5","white"]} style={{ borderRadius:10,padding:5 }}>
                    <LinearGradient  colors= {['#F767C3','#E5B7BF', '#8fcbbc','gray']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{ borderRadius:10 }}>
                        <View style={{ justifyContent: "center", flexDirection: "row" }}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight:'bold', marginLeft: 15 }}>Nhiệm vụ hằng ngày</Text>
                        </View>
                        <View style={styles.productsale}>
                            {dataMission.length===0 ?
                            <Text style={{ textAlign:'center',color:'white' }}>Đã hết nhiệm vụ, vui lòng quay lại sau...</Text>
                            :
                            <>
                            <FlatList
                                data={dataMission}
                                renderItem={renderItemMission}
                                keyExtractor= {item=>item.id}
                                listKey={(item, index) => `_key${index.toString()}`}
                                style={{ marginTop:10 }}
                            />
                            </>
                            }                            
                        </View>
                    </LinearGradient>
                </LinearGradient>
              
            </View>
            <View style={{ flex:1, alignSelf: 'stretch', }}>
                <WebView
                    source={{
                        uri: 'https://www.baovui24h.com/uudai'
                    }}
                    style={{ height:heightWebView}}
                    injectedJavaScript="window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));"
                    startInLoadingState={true}
                    scalesPageToFit={true}
                    onMessage={(e)=>setheightWebView(parseInt(e.nativeEvent.data))}
                />
           </View>
            </View>
        </VirtualizedView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        paddingBottom:50
    },
    itemIntroduced:{
        width:'100%',
        marginBottom:10,
        alignItems:'center'
    },
    contentItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:5,
        width:'90%',
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
    },
    btnTakeOut:{
        marginLeft:10,
        backgroundColor:'tomato',
        padding:5,
        borderRadius:5,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        marginRight:10,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:10 ,
        },
        shadowOpacity:0.6,
        shadowRadius:4,
        elevation:7
    },
    banner:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white',
        padding:10,
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
export default Introduce;