import React ,{useState} from 'react';
import {View,Text,StyleSheet,FlatList,Image,TouchableOpacity,Modal,TextInput,ToastAndroid} from 'react-native';
import {getPrice} from '../util/getPriceVND';
import VirtualizedView from '../util/VirtualizedView';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
function TakeMoney(){
    // const [surplus, setsurplus] = useState(50000);
    const [numberTakeOut, setnumberTakeOut] = useState("");
    const [accountBank, setaccountBank] = useState("");
    const [phone, setphone] = useState("");
    const [visibleModalBank, setvisibleModalBank] = useState(false);
    const [visibleModalCard, setvisibleModalCard] = useState(false);
    const [loading, setloading] = useState(false);
    const {currentUser} = useSelector(e=>e.UserReducer);

    const dataBank = [
        {
            nameBank:"Agribank",
            image:require("../assets/bank/agribank.png"),
        },
        {
            nameBank:"Sacombank",
            image:require("../assets/bank/sacombank.jpg"),
        },
        {
            nameBank:"Vietcombank",
            image:require("../assets/bank/vietcombank.jpg"),
        },
        {
            nameBank:"Mbbank",
            image:require("../assets/bank/mbbank.png")
        },
        {
            nameBank:"Viettinbank",
            image:require("../assets/bank/viettinbank.png")
        },
        {
            nameBank:"Techcombank",
            image:require("../assets/bank/techcombank.png")
        },
        {
            nameBank:"BIDV",
            image:require("../assets/bank/bidv.jpg")
        },
        {
            nameBank:"TP Bank",
            image:require("../assets/bank/tpbank.png")
        }
    ]

    const dataMobile = [
        {
            nameCard:"Thẻ cào Mobifone 50.000đ",
            image:require("../assets/mobile/mobifone50k.jpg")
        },
        {
            nameCard:"Thẻ cào Viettel 50.000đ",
            image:require("../assets/mobile/viettel50k.jpg")
        },
        {
            nameCard:"Thẻ cào Vinafone 50.000đ",
            image:require("../assets/mobile/vina50k.jpg")
        },
        {
            nameCard:"Thẻ cào Vietnammobile 50.000đ",
            image:require("../assets/mobile/vietnammobile50k.jpg")
        }
    ]

    const renderBank = ({item})=>(
        <View style={styles.itemBank}>
            <TouchableOpacity style={{ width:'100%',alignItems:'center' }} onPress={()=>{setvisibleModalBank(true);setnumberTakeOut("");setaccountBank("")}}>
                <Image source={item.image} style={{width:"70%",height:110}} resizeMode="cover"/>
            </TouchableOpacity>
            <Text style={{ fontWeight:'bold' }}>{item.nameBank}</Text>
        </View>
    )
    const renderCard = ({item})=>(
        <View style={styles.itemBank}>
            <TouchableOpacity style={{ width:'100%',alignItems:'center' }} onPress={()=>{setvisibleModalCard(true);setphone("")}}>
                <Image source={item.image} style={{width:"80%",height:110}} resizeMode="cover"/>
            </TouchableOpacity>
            <Text style={{ fontWeight:'bold',textAlign:'center' }}>{item.nameCard}</Text>
        </View>
    )
    
    const handleChangeNumberTake = (e)=>{
        setnumberTakeOut(e)
    }

    const TakeOutBank = ()=>{
        if(numberTakeOut===""){
            ToastAndroid.showWithGravityAndOffset(
                "Vui lòng chọn số tiền cần rút !!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                200
            );
        }else if(isNaN(numberTakeOut)){
            ToastAndroid.showWithGravityAndOffset(
                "Vui lòng nhập đúng định dạng để rút tiền !!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                200
            );
        }
        else if(parseInt(numberTakeOut)>parseInt(currentUser.spurlus)){
            ToastAndroid.showWithGravityAndOffset(
                "Bạn không đủ tiền để rút !!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                200
            );
        }else if(parseInt(numberTakeOut)<100000){
            ToastAndroid.showWithGravityAndOffset(
                "Bạn cần rút tối thiểu 100,000đ !!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                200
            );
        }else if(accountBank.length<10){
            ToastAndroid.showWithGravityAndOffset(
                "Số tài khoản ít nhất 10 ký tự !!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                200
            );
        }else if(isNaN(accountBank)){
            ToastAndroid.showWithGravityAndOffset(
                "Số tài khoản phải là định dạng số !!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                200
            );
        }
        else{
            setloading(true);
            setTimeout(()=>{
                setloading(false);
                ToastAndroid.showWithGravityAndOffset(
                    "Ngân hàng đang bảo trì !!",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    200
                );
            },3000)
        }
    }

    const TakeCard = ()=>{
        if(phone===""){
            ToastAndroid.showWithGravityAndOffset(
                "Vui lòng nhập số điện thoại !!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                200
            );
        }else if(isNaN(phone)){
            ToastAndroid.showWithGravityAndOffset(
                "Số điện thoại chỉ ở dạng số !!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                200
            );
        }else if(phone.length<10){
            ToastAndroid.showWithGravityAndOffset(
                "Số điện thoại có ít nhất 10 ký tự!!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                200
            );
        }else if(currentUser.spurlus<50000){
            ToastAndroid.showWithGravityAndOffset(
                "Bạn không đủ tiền để mua thẻ cào !!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                200
            );
        }else{
            setloading(true);
            setTimeout(()=>{
                setloading(false);
                ToastAndroid.showWithGravityAndOffset(
                    "Hiện tại chúng tôi đang hết loại thẻ này, vui lòng quay lại sau !!",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    200
                );
            },3000)
        }
    }
    return(
        <View>
            {/* Modal bank */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={visibleModalBank}
                onRequestClose={()=>setvisibleModalBank(false)}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ fontWeight:'bold',fontSize:16 }}>Nhập số tiền mà bạn cần rút</Text>
                    <TextInput
                        placeholder='Nhập số tiền cần rút.'
                        style={{ borderWidth:.4,width:"100%",height:50,borderRadius:10,marginTop:10,paddingLeft:10 }}
                        onChangeText={handleChangeNumberTake}
                        value={numberTakeOut}
                        keyboardType="numeric"
                    />
                    <TextInput
                        placeholder='Nhập số tài khoản ngân hàng.'
                        style={{ borderWidth:.4,width:"100%",height:50,borderRadius:10,marginTop:10,paddingLeft:10 }}
                        onChangeText={(e)=>setaccountBank(e)}
                        value={accountBank}
                        keyboardType="numeric"
                    />
                    <View style={{ flexDirection:'row',justifyContent:'space-around',width:'100%' }}>
                    <TouchableOpacity 
                        style={{backgroundColor:'tomato',padding:10,marginTop:10,borderRadius:5 }}
                        onPress={TakeOutBank}
                    >
                        <Text style={{ color:'white' }}>Rút tiền</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{backgroundColor:'tomato',padding:10,marginTop:10,borderRadius:5 }}
                        onPress={()=>setvisibleModalBank(false)}
                    >
                        <Text style={{ color:'white' }}>Trở về</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </View>
            </Modal>

            {/* Modal card */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={visibleModalCard}
                onRequestClose={()=>setvisibleModalCard(false)}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ fontWeight:'bold',fontSize:16,textAlign:'center' }}>Nhập số điện để nhận thẻ cào.</Text>
                    <TextInput
                        placeholder='Nhập số điện thoại.'
                        style={{ borderWidth:.4,width:"100%",height:50,borderRadius:10,marginTop:10,paddingLeft:10 }}
                        onChangeText={(e)=>setphone(e)}
                        value={phone}
                        keyboardType="numeric"
                    />
                    <View style={{ flexDirection:'row',justifyContent:'space-around',width:'100%' }}>
                    <TouchableOpacity 
                        style={{backgroundColor:'tomato',padding:10,marginTop:10,borderRadius:5 }}
                        onPress={TakeCard}
                    >
                        <Text style={{ color:'white' }}>Lấy thẻ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{backgroundColor:'tomato',padding:10,marginTop:10,borderRadius:5 }}
                        onPress={()=>setvisibleModalCard(false)}
                    >
                        <Text style={{ color:'white' }}>Trở về</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </View>
            </Modal>

            <VirtualizedView style={styles.wrapper}>

            <View style={{ flexDirection:'row',alignItems:"center",paddingLeft:10 }}>
                <Text style={{ fontSize:16 }}>Số dư hiện tại: </Text>
                <Text style={{ fontWeight:'bold',fontSize:18 }}>{getPrice(currentUser.spurlus)+"vnđ"}</Text>
            </View>
            <View style={{ paddingTop:20,paddingBottom:10 }}>
                <Text style={{ fontSize:16,fontWeight:'bold',paddingLeft:10 }}>Chuyển về tài khoản ngân hàng</Text>
                <FlatList
                    data={dataBank}
                    renderItem={renderBank}
                    numColumns={2}
                    listKey={(item, index) => `_key${index.toString()}`}
                />
                <Text style={{ fontSize:16,fontWeight:'bold',paddingLeft:10,marginTop:20 }}>Mua thẻ cào điện thoại</Text>
                <FlatList
                    data={dataMobile}
                    renderItem={renderCard}
                    listKey={(item, index) => `_key${index.toString()}`}
                    numColumns={2}
                />
            </View>
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={loading}
                //Text with the Spinner
                textContent={'Đang tiến hành xử lý...'}
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
            />
            </VirtualizedView>

           
        </View>
       
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        padding:10
    },
    itemBank:{ 
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        marginLeft:2,
        marginRight:2,
        padding:10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        width:'80%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
})
export default TakeMoney;