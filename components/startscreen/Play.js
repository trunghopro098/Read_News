import React,{useEffect,useState,useRef} from 'react';
import {View,StyleSheet,BackHandler} from 'react-native';
import { WebView } from 'react-native-webview';
import Gift from './Gift';
import GiftBig from './GiftBig';
import {windowH} from '../../util/Dimensions'
function Play({navigation}){
    const [ShowGift, setShowGift] = useState(true);
    const [giftBig, setgiftBig] = useState(false);
    const [showContent, setshowContent] = useState(false);
    const webViewRef = useRef(null)

    useEffect(() => {
        navigation.addListener("focus",()=>{
            setshowContent(false);
            setTimeout(()=>{
                setshowContent(true);
            },100)
         
        })
    },[])
    const backAction = () => {
        webViewRef.current.goBack();
        return true;
    };
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);
    return(
        <View style={styles.wrapper}>
            {showContent &&
            <>
            <WebView
                ref={webViewRef}
                source={{
                    uri: 'https://api.flygame.io/igr?partner=com.volio.yonline&bx_third_client=com.volio.yonline&pid=25&inner=0&wid=921&showMore=1&level=gameCenter'
                }}
                style={{ marginBottom:50 }}
            />
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
            </>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper:{
        flex:1
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
export default Play;