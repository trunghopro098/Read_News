import { View, Text, StyleSheet, Image , TouchableOpacity} from 'react-native'
import React, { useEffect, useState, } from 'react'
import * as fetchAPI from '../../util/fetchApi'
import VirtualizedView from '../../util/VirtualizedView';
import { API_URL } from '../../util/link';
import { windowW,windowH } from '../../util/Dimensions';
import Gift from './Gift';
import GiftBig from './GiftBig';
import GiftTop from './GiftTop';

export default function DetailNews({route,navigation}) {
    const data = route.params;
    const [DataNews, setDataNews] = useState([]);
    const [ShowContent, setShowContent] = useState(false);
    const [ShowGift, setShowGift] = useState(true);
    const [ShowGiftTop, setShowGiftTop] = useState(true);
    const [giftBig, setgiftBig] = useState(false)
    // console.log(data.id)
    useEffect(() => {
      getNewsId();
    }, [])

    const getNewsId = async()=>{
      const res = await fetchAPI.postDataAPI("/new/getNewsId",{idNews: data.id});
      setDataNews(res.msg);
      setShowContent(true);
      // console.log(res)
    }

  return (
    <View style={StyleSheet.container}>

      {ShowContent ? 
        <VirtualizedView>
            <View style={styles.content}>
                  <View style={{ flexDirection:'column'}}>
                      <Text style={styles.text}>{DataNews[0].title}</Text>
                      <Text style={{ fontSize: 13, color:'grey', marginTop: 5 }}>Ngày {DataNews[0].create_at.substring(0,10)}</Text>
                  </View>
                  <Text style={{ fontSize: 15, color: 'black' }}>
                      {DataNews[0].description}
                  </Text>
                  <Image 
                        source={{ uri: API_URL+DataNews[0].image}}
                        resizeMode='cover'
                        style={{ 
                          width: windowW*0.95,
                          height: windowH*0.3,
                          borderRadius: 3,
                          marginTop: 10
                        }}
                  />
                  <Text style={{ marginTop: 10 }}>
                    {DataNews[0].content}
                  </Text>
            </View>
        </VirtualizedView>:
        <>
        
        </>}
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
        {ShowGiftTop ? 
        <View 
            style={styles.giftTop}
        >
            <GiftTop image={require('../../assets/icongift.jpg')} showGiftTop={ShowGiftTop} setShowGiftTop={e=>setShowGiftTop(e)} navigation={navigation}/>
        </View> :
        null
      }
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    paddingTop: 5

  },
  content:{
    flex: 1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 10
  },
  text:{
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  gift: {
    width: 130,
    height: 130,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: windowH*0.1,
    right: 10,
    zIndex:1,
    borderRadius: 5
},
loading:{
  width:'100%',
  height: '100%',

},
giftTop: {
  width: 100,
  height: 100,
  backgroundColor: 'transparent',
  position: 'absolute',
  bottom: windowH*0.65,
  left: 10,
  zIndex:1,
  borderRadius: 5,
}
})