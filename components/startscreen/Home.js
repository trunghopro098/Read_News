import React, { useEffect, useState,memo } from 'react';
import {View,Text,StyleSheet,TouchableOpacity, FlatList, Image} from 'react-native';
import { LinearTextGradient } from 'react-native-text-gradient';
import { useSelector } from 'react-redux';
import { windowH, windowW } from '../../util/Dimensions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as fetchAPI from '../../util/fetchApi';
import { SliderBox } from "react-native-image-slider-box";
import {API_URL} from '../../util/link';
import VirtualizedView from '../../util/VirtualizedView';
import { SubString } from '../../util/Substring';
import Gift from './Gift';
import GiftBig from './GiftBig';


function Home({navigation}){
    const [ImageSlide, setImageSlide] = useState([]);
    const [CurrenImage, setCurrenImage] = useState([]);
    const [showItem, setshowItem] = useState(false);
    const [News, setNews] = useState([]);
    const [ShowGift, setShowGift] = useState(true);
    const [giftBig, setgiftBig] = useState(false)
    const user = useSelector((value)=>value.UserReducer.currentUser)
    useEffect(() => {
        handleNews();
    //   console.log(user)
    }, [])
    const handleNews = ()=>{
        getImage();
        getNews();
        setshowItem(true);
        
    }

    const getImage = async()=>{
        let arr = [];
        const res = await fetchAPI.getAPI('/new/getImage');
        // console.log(res)
        for(let i = 0 ; i < res.msg.length; i++){
            arr.push(API_URL+res.msg[i].image);
        }
        setCurrenImage(res.msg);
        setImageSlide(arr);
    }
    const getNews = async()=>{
        const res = await fetchAPI.getAPI('/new/getNews');
        setNews(res.msg)
    }

    const rendereItem = ({item})=>{
        return(
            <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate('detailnews',{id:item.id})
                }}
                style={styles.wrapItem}>
                <View style= {styles.title}>
                    <Text style={{ color:'black', fontWeight: 'bold' }}>{item.title}</Text>
                    <Text>{SubString(item.description)}</Text>
                </View>
                <Image 
                    source={{uri:`${API_URL}${item.image}`}}
                    resizeMode='cover'
                    style={{ 
                        width: windowW*0.28,
                        height: windowH*0.15,
                        borderRadius: 5,
                     }}
                />
            </TouchableOpacity>
        )
    }
    return(
        <View style={styles.wrapper}>
            <View style={styles.search}>
                <LinearTextGradient
                    locations={[0,1]}
                    colors={['#99815B','#FD8469']}
                    start={{ x:0, y:0 }}
                    end={{ x:1,y:0 }}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>NEWS</Text>
                </LinearTextGradient>
                <TouchableOpacity 
                    style={styles.itemSearch}
                    onPress={()=>{
                        navigation.navigate('search')
                    }}
                >
                    <EvilIcons name='search' size={30}/>
                </TouchableOpacity> 
            </View>
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
            

            {showItem ? 
                <VirtualizedView>
                    <View style={styles.ScrollItem}>
                        <View 
                            style={{ 
                                width:'100%',
                                flexDirection: 'row',
                                padding: 10,
                                
                            }}
                        >  
                            <Octicons name='graph' size={22} color={'red'}/>
                            <Text style={{ 
                                fontSize: 16, 
                                fontWeight: 'bold',
                                marginLeft: 5, 
                                color:'black'  
                                }}
                            >
                                Tin tiêu điểm
                            </Text>
                        </View>
                        
                        <View style={styles.NewsSlide}>
                            <SliderBox
                                images={ImageSlide}
                                sliderBoxHeight={200}
                                onCurrentImagePressed={index =>
                                    // console.warn(`${CurrenImage[index].id} nef nef` )
                                    navigation.navigate('detailnews',{id:CurrenImage[index].id})

                                    
                                }
                                ImageComponentStyle={{
                                    borderRadius: 5, 
                                    width: '91%', 
                                    marginTop: 5,
                                }}
                                autoplay={true}
                                circleLoop={true}
                            />
                        </View>

                        <View style={styles.newsNew}>
                            <Text style={{ color:'red', fontWeight:'bold',fontSize: 16  }}>
                                Tin Mới Nhất
                            </Text>
                        </View>
                        <FlatList
                            data={News}
                            renderItem={rendereItem}
                            keyExtractor={item=>item.id}
                        />
                    </View>                 
                </VirtualizedView>
                :
                    null
            }


        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
    },
    search:{
        width: '100%',
        height:50,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignContent: 'center',
        alignItems:'center',
        padding: 3,
        paddingHorizontal: 15,
        backgroundColor:'rgb(240, 240, 240)',
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height:2,
        },
        shadowOpacity: .3,
        shadowRadius: 4,
        elevation: 3


             
    },
    itemSearch:{
        width: 40,
        height: 40,
        backgroundColor:'white',
        borderRadius: 50,
        shadowColor:'#000',
        shadowOffset:{
            width:3,
            height: 2
        },
        shadowOpacity: .5,
        shadowRadius: 5,
        elevation: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    NewsSlide:{
        width: '96%',
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: .3,
        shadowRadius: 3,
        elevation: 5,
        paddingBottom: 10,
        backgroundColor: 'white',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    },
    ScrollItem:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        paddingBottom: 60
    },
    newsNew:{
        width: '100%',
        justifyContent: 'flex-start',
        marginTop: 5,
        paddingHorizontal: 10

    },
    wrapItem:{
        width: windowW*0.96,
        backgroundColor: 'white',
        maxHeight: windowH*0.19,
        borderRadius: 5,
        marginTop: 12,
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height: 4,
        },
        shadowOpacity: .3,
        shadowRadius: 5,
        elevation: 2,
        padding: 10,
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'center',
    },
    title:{
        width: windowW*0.63,
        height: windowH*0.16,
    },
    gift: {
        width: 115,
        height: 115,
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: windowH*0.3,
        right: 10,
        zIndex:1,
        borderRadius: 5,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems:'center'
    },
    btnCancel:{
        width: '100%',
        flexDirection:'row',
        justifyContent:'flex-end',
        marginBottom: -10
    }


})
export default Home;