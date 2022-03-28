import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as fecthAPI from '../../util/fetchApi'
import { windowH } from '../../util/Dimensions';
import { API_URL } from '../../util/link';
import GiftBig from './GiftBig';
import Gift from './Gift';

export default function Search({navigation}) {
    const [ShowGift, setShowGift] = useState(true);
    const [giftBig, setgiftBig] = useState(false)
    const [text, settext] = useState('');
    const [DataSearch, setDataSearch] = useState([]);
    const [ShowContent, setShowContent] = useState(false)
    const handleSearch = async()=>{
        const res  = await fecthAPI.postDataAPI("/new/search",{'text':text});
        setDataSearch(res.msg)
        setShowContent(true)
        // console.log(DataSearch);
    }

  return (
    <View style={styles.container}>
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
        <View style={styles.header}>
            <View style={styles.search}>
                <TextInput
                    style={{ 
                        backgroundColor: 'white',
                        width: '86%',
                        height:'100%',
                        borderRadius: 30
                        
                    }}
                    placeholder='Tìm kiếm'
                    onChangeText={settext}
                    value={text}
                    
                />
                <TouchableOpacity 
                    style={styles.buttonSearch}
                    onPress={()=>{
                        handleSearch()
                        // console.log(text)
                    }}
                >
                <EvilIcons name='search' size={30}/>
                </TouchableOpacity>
            </View>
        </View>
        {ShowContent ? 
                <ScrollView>
                    {DataSearch.length > 0 ? 
                        <>
                        {DataSearch.map((item)=>{
                                return(
                                    <TouchableOpacity 
                                        key={item.id} 
                                        style={styles.ItemSearch}
                                        onPress={()=>{
                                            console.log(item.id)
                                            navigation.navigate('detailnews',{id:item.id})
                                        }}
                                    >
                                            <View style={styles.content}>
                                                <Text style={{ fontSize: 14, fontWeight:'bold', color: 'black' }}>{item.title}</Text>
                                                <Text style={{ fontSize: 13, color: 'grey' }}>{item.description.substring(0,100)+'...'}</Text>
                                            </View>
                                            <View style={styles.img}>
                                                <Image
                                                    source={{ uri: API_URL+item.image }}
                                                    resizeMode='cover'
                                                    style={{ 
                                                        width: '95%',
                                                        height: '95%',
                                                        borderRadius: 5
                                                    }}
                                                />
                                            </View>
                                    </TouchableOpacity>
                                )
                            })} 
                        </>:
                        <View style={{ flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent:'center', height: windowH*0.8 }}>
                            <Text style={{ color: 'red', }}>KHÔNG TÌN THẤY KẾT QUẢ TÌM KIẾM</Text>
                        </View> }
                </ScrollView>:
           null}
    </View>
  )
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    header:{
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height: 3,

        },
        shadowOpacity: .5,
        shadowRadius: 4,
        elevation: 2,
        flexDirection:'column',
        alignItems:'center',
    },
    search:{
        width: '95%',
        height:'75%',
        backgroundColor: 'white',
        marginTop: 6,
        borderRadius:40,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        shadowColor: '#000',
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: .5,
        shadowRadius: 3,
        elevation: 4
    },
    buttonSearch:{
        width:35,
        height:35,
        backgroundColor: 'white' ,
        borderRadius: 50,
        justifyContent:'center',
        alignItems:'center',
    },
    SearchContent:{
        flexDirection: 'column',
        alignContent: 'center',
        

    },
    ItemSearch:{
        width: '97%',
        backgroundColor: 'white',
        maxHeight: windowH*0.19,
        margin: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: .2,
        shadowRadius: 3,
        elevation: 7,
        padding: 5,
        flexDirection:'row',
        alignContent:'center',
        alignItems:'center'
    },
    content:{
        
        height: '98%',
        width: '70%',
        flexDirection:'column'
    },
    img:{
        height: '98%',
        width: '28%',
        marginLeft: 5,
        justifyContent:'center',
        alignItems:'center'
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