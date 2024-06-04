import { Transaction } from "@/Services";
import { Text, Button, TextInput, RadioButton } from "react-native-paper";
import { View, Image, StyleSheet, TouchableOpacity, Modal, Alert, Keyboard, useWindowDimensions } from "react-native";
import {  useEffect, useState, useCallback, useContext } from "react";
import { Calendar } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "native-base";
import { HStack, Spinner } from "native-base";
import axios from "axios";
import { Category } from "@/Config/category";
import { useCategoryIcon } from "@/Hooks/icon";
import { Icon } from "react-native-paper";
import { Wallet } from "@/Services/wallets";
import { useFocusEffect } from "@react-navigation/native";
import { LocalizationKey, i18n } from "@/Localization";
import { newDataComing } from "./newTransactComing";


const formatAmount = (amount : number) =>{
    let strArr = Array.from(String(amount));
    let l : number = strArr.length - 3;
    while(l > 0)
    {
        strArr.splice(l, 0, ".");
        l -= 3;
    }
    
    return strArr.join('');
}

const TransactionRecord = ({data, wallets, setModTransactID} : {data : Transaction, wallets : Wallet[], setModTransactID : any}) => {



    let icon : string [] = useCategoryIcon(data.category);
    let getWalletName = (id : string) => {
        if(wallets.length >0 ){
            let index : number = wallets.findIndex((wallet) => wallet.id == id);
            return wallets[index].name;
        }
        return "Waiting";
        
    }

    return (
                <TouchableOpacity onPress={() => setModTransactID(data.id)} style={{flex:1, flexDirection: 'row', width: '100%', height: 100, alignItems:'center'}}>
                    <View style={{flex : 3, justifyContent:'center', alignItems: 'center'}}>
                        <Icon source={icon[1]} size={50} color={icon[2]}/>   
                    </View>
                    <View style={{flex:7}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{icon[0]}</Text>
                            <Text style={{fontSize: 12, fontWeight: 'light', color:'grey'}}>{data.created_at}</Text>
                            <Text style={{fontSize: 15, fontWeight: 'medium'}}>{getWalletName(data.wallet_id)}</Text>
                    </View>

                    <View style={{flex:7, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: '3%'}}>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>{data.is_pay ? '-' : '+'} {formatAmount(data.amount)} đ</Text>
                    </View>
                </TouchableOpacity>
    );
}

const TransactionList = ({data, wallets, setModTransactID} : {data : Transaction[], wallets : Wallet[], setModTransactID : any}) => {

    return (
        <ScrollView style={{marginTop:'2%', width:'100%'}}>
                {data.map((value, index) => {
                    return <TransactionRecord data={value} wallets={wallets} key={index} setModTransactID={setModTransactID}/>
                })}
        </ScrollView>
    );
}


const WalletList = ({setter, selectedValue, wallets, includeAll} : {setter : any, selectedValue : string, wallets : Wallet[], includeAll : boolean}) =>{
    let w = Object.values(wallets);
    if(includeAll){
        let pushItem : Wallet = {
            id : 'All',
            amount : 0,
            name : i18n.t(LocalizationKey.ALL),
            user_id : '',
            type : ''
        };
        w.splice(0, 0, pushItem);
    }
    return (
        <View style={{flex : 1}}>
            
            <View style={styles.categoryPicker}>
                <Picker
                    mode="dropdown"
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => {setter(itemValue)}}
                >
        
                    {Object.values(w).map((value, index)=>{
                        return (<Picker.Item label={value.name} value={value.id} key={value.id}/>)
                    })}
                </Picker>
            </View>
        </View>
    )
}

const CategoryList = ({setter, selectedValue, includeAll} : {setter : any, selectedValue : string, includeAll : boolean}) =>{
    let categories = Object.values(Category).reverse();
    if(!includeAll) categories.splice(0, 1);
    return (
        <View style={{flex : 1}}>
                
                <View style={styles.categoryPicker}>
                    <Picker
                        mode="dropdown"
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => setter(itemValue)
                    }>
                        {categories.map((value, index)=>{
                            return (<Picker.Item label={useCategoryIcon(value)[0]} value={value} key={value}/>)
                        })}
                    </Picker>
                </View>
            </View>
    )
}

export const History = ({route} : {route : any}) => {

    const {start, end, category, walletId} = route.params;
    //setup
    const [range, setRange] = useState(3);
    const defaultRange : number[] = [3, 5, 7];
    const [transactionCategory, setTransactionCategory] = useState(category);
    const [startDate, setStartDate] = useState(new Date(start));
    const [endDate, setEndDate] = useState(new Date(end));
    const [datePick, setDatePick] = useState(0);
    const [transactions, setTransaction] = useState<Transaction[]>([]);
    const [allTransact, setAllTransact] = useState<Transaction[]>([]);
    const [numTransaction, setNumTransaction] = useState(-1);
    const [walletID, setWalletID] = useState(!walletId ? 'All' : walletId);
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [firstLoad, setFirstLoad] = useState(true);
    const [modTransactID, setModTransactID] = useState('');
    const [modTransactPopup, setModTransactPopup] = useState(false);
    const [modRequestRes, setModRequestRes] = useState('');
    const [modTransactWallet, setModTransactWallet] = useState('');
    const [modTransactCategory, setModTransactCategory] = useState('');
    const [modTransactType, setModTransactType] = useState(false);
    const [modTransactAmount, setModTransactAmount] = useState(0);


    const windowHeight = useWindowDimensions().height;
    //console.log(windowHeight)

    const getFormattedDate = (date : Date) => {
        let day : string = String(date.getDate());
        let month : string = String(date.getMonth() + 1);
        let year : string = String(date.getFullYear());

        if(month.length == 1) month = '0' + month;
        if(day.length == 1) day = '0' + day;

        return day + '/' + month + '/' + year;
    }
    
    const getmarkedDate = (date : Date) => {
        let day : string = String(date.getDate());
        let month : string = String(date.getMonth() + 1);
        let year : string = String(date.getFullYear());

        if(month.length == 1) month = '0' + month;
        if(day.length == 1) day = '0' + day;

        return year + '-' + month + '-' + day;
    }

    let setData = (d : Transaction[]) => {
        if(transactionCategory == 'all' && walletID == 'All') setTransaction([...d]);
        else if(walletID == 'All'){
            let data : Transaction[] = [];
            for(let i = 0; i < allTransact.length; i++) if(allTransact[i].category == transactionCategory) data.push(allTransact[i]);
            setTransaction(data);
        }else if(transactionCategory == 'all'){
            let data : Transaction[] = [];
            for(let i = 0; i < allTransact.length; i++) if(allTransact[i].wallet_id == walletID) data.push(allTransact[i]);
            setTransaction(data);
        }else{
            let data : Transaction[] = [];
            for(let i = 0; i < allTransact.length; i++) 
                if(allTransact[i].category == transactionCategory && allTransact[i].wallet_id == walletID) 
                    data.push(allTransact[i]);
            setTransaction(data);
        }
    }

    //fetch data
    const fetchData = async (startDate : Date, endDate : Date) => {
        let start : string = getFormattedDate(startDate);
        let end : string = getFormattedDate(endDate);

        setNumTransaction(-1);

        //call api here
        try{
            let requestURL : string = `https://be-mobile-n3.onrender.com/transaction/histories/all`;
            let res = await axios.get(requestURL, {
                params : {
                    user_ID : '66237fef97705968270a6dab',
                    start_date : start,
                    end_date : end
                }
            });
            //console.log(res.data);
            let data : Transaction[] = res.data;

            //handle data
            setAllTransact(data);
            setNumTransaction(data.length);
        }catch(e){
            Alert.alert('Error', 'Cannot get transactions', [{text: 'OK'}])
            console.log(e);
        }
       
    }

    const fetchWithCond = () => {
        if(startDate > endDate) 
        {
            Alert.alert('Lưu ý', 'Ngày kết thúc phải lớn hơn ngày bắt đầu', [{text: 'OK'}])
        }
        else 
        {
            const diffTime = Math.abs(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) 
                                        - Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) );
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
            setRange(diffDays + 1);
            fetchData(startDate, endDate);
        }
    }

    const deleteTransact = () => {
        clearModPopup();

        //delete
    }

    const modifyTransact = () => {
        clearModPopup();
        console.log(modTransactID, modTransactCategory, modTransactType, modTransactAmount, modTransactWallet);
        
    }

    //events
    const changeDefaultRange = (r : number) => {
        setRange(r);
        let end : Date = new Date();
        let start : Date = new Date();
        start.setDate(start.getDate() - r + 1);
        setStartDate(start);
        setEndDate(end);
        fetchData(start, end);  
    }

    useEffect(() => {
        if(startDate.toDateString() != (new Date(-1)).toDateString()) fetchWithCond();
        else changeDefaultRange(3);
        setFirstLoad(false);
        newDataComing.newTransact = false;
    }, []);

    useEffect(() => {
        setData(allTransact);
    }, [transactionCategory, allTransact, walletID]);

    useFocusEffect(   
        useCallback(() => {
            //console.log(route.params)
            //console.log(newDataComing.newTransact);
            const getWallet = async () => {
                try{
                    let requestURL : string = `https://be-mobile-n3.onrender.com/wallets/byUsersId`;
                    let res = await axios.get(requestURL, {
                        params : {
                            user_ID : '66237fef97705968270a6dab'
                        }
                    })
                    //console.log(res.data);
                    if(res.data.length != 0) {
                        let data : Wallet[] = res.data;
                        setWallets(data);
                    }
                }catch(e){
                    Alert.alert('Error', 'Cannot get wallets', [{text: 'OK'}])
                    console.log(e);
                }
        
            }
            if(newDataComing.newWallet) {
                getWallet();
                newDataComing.newWallet = false;
            }
            if(!firstLoad && newDataComing.newTransact) {
                fetchData(startDate, endDate);
                newDataComing.newTransact = false;
            }
        }, [])
    );
    
    useEffect(() => {}, [modTransactID])

    useEffect(() => {
        getModTransactInfo();
    }, [modTransactID])


    const getModTransactInfo = () => {
        if(modTransactID=='' || wallets.length == 0) {
            setModTransactID('');
            return;
        }
        const transact_index : number = allTransact.findIndex((transact) => transact.id == modTransactID);
        const transact : Transaction = allTransact[transact_index];
        const wallet_index : number = wallets.findIndex((wallet) => wallet.id == transact.wallet_id);
        const wl = wallets[wallet_index];
        setModTransactCategory(transact.category);
        setModTransactType(transact.is_pay);
        setModTransactWallet(wl.id);
        setModTransactAmount(transact.amount);
    }

    const clearModPopup = () => {
        setModTransactID('');
        setModTransactPopup(false);
    }

    
    return (   
        <View style={{flex: 1, minHeight:Math.round(windowHeight)}}>
            
            <View style={styles.defaultRangeContainer}>
                {/* default date range buttons */}
                {<>{defaultRange.map((r, index) => {
                    return (
                    <TouchableOpacity activeOpacity={0.5} style={styles.defaultRangeBtn} key={r}>
                        <Button mode="outlined" labelStyle={{height:'50%'}} textColor={range == r ? "white" : 'black'} buttonColor={range == r ? "#FF5722" : "#FFFFFF"} onPress={() => changeDefaultRange(r)}>
                           {r} ngày
                        </Button>
                    </TouchableOpacity>
                    )
                })}</>}
                
            </View>

            {/* date picker */}
            <View style={styles.datePickerContainer}>
                <TouchableOpacity style={styles.datePicker} onPress={() => setDatePick(1)}>
                    <Image source={require('assets/calendar.png')} style={styles.icon}/>
                    <Text style={styles.dateText}>{getFormattedDate(startDate)}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.datePicker} onPress={() => setDatePick(2)}>
                    <Image source={require('assets/calendar.png')} style={styles.icon}/>
                    <Text style={styles.dateText}>{getFormattedDate(endDate)}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.datePickerContainer}>
                <View style={{flex : 1, alignItems : 'center'}}>
                    <Text style={{fontSize : 15, fontWeight: '500'}}>Ngày bắt đầu</Text>
                </View>
                <View style={{flex : 1, alignItems : 'center'}}>
                    <Text style={{fontSize : 15, fontWeight: '500'}}>Ngày kết thúc</Text>
                </View>
            </View>
            
            {/* Calendar pop-up */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={datePick == 1 || datePick == 2}
                onRequestClose={() => {
                    setDatePick(0);
                }}>
                <View style={styles.modal}>
                    <View style={{flex:1}} onTouchStart={() => setDatePick(0)}></View>
                    <View style={{flex:2}}>
                    {datePick == 1 ? <Calendar style={styles.calendar}
                    theme={{
                        todayBackgroundColor : 'cyan',
                    }}
                    markedDates={{[getmarkedDate(startDate)] : {"selected": true, "selectedColor": "#466A8F"}}}
                    onDayPress={day => {
                        setStartDate(new Date(day.dateString));
                        setDatePick(0);
                    }}
                    /> : (datePick == 2 ? <Calendar style={styles.calendar} 
                        theme={{
                            todayBackgroundColor : 'cyan',
                        }}
                        markedDates={{[getmarkedDate(endDate)] : {"selected": true, "selectedColor": "#466A8F"}}}
                        onDayPress={day => {
                            setEndDate(new Date(day.dateString));
                            setDatePick(0);
                        }}
                      /> : "")} 
                    </View>
                    <View style={{flex:1}} onTouchStart={() => setDatePick(0)}></View>
                </View>
            </Modal>
            
            {/* choose to delete or modify transact */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={(modTransactID != '' && wallets.length > 0)}
                onRequestClose={() => {
                    setModTransactID('')
                }}>
                <View style={[styles.modal, {alignItems:'center'}]}>
                    <View style={{flex:3, width:'100%'}} onTouchStart={() => clearModPopup()}></View>
                    <View style={{flex:1, borderWidth:1, backgroundColor:'rgba(200, 255, 255, 1)', borderRadius:5, width:'90%'}}>
                        <TouchableOpacity onPress={()=>{setModTransactPopup(true)}} activeOpacity={0.5} style={styles.modChooseModal}>
                            <Text style={{fontSize:20}}>
                                Chỉnh sửa
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteTransact()} activeOpacity={0.5} style={[styles.modChooseModal, {borderBottomWidth:0}]}>
                            <Text style={{fontSize:20, color:'#FF0000', fontWeight:'bold'}}>
                                Xóa
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:3, width:'100%'}} onTouchStart={() => clearModPopup()}></View>
                </View>
            </Modal>
            
            {/* Modify transaction */}
            <Modal
                animationType="fade"
                statusBarTranslucent={true}
                transparent={true}
                visible={modTransactPopup}
                onRequestClose={() => {
                    setModTransactID('')
                }}>
                <View style={[styles.modal, {alignItems:'center'}]} onTouchStart={() => Keyboard.dismiss()}>
                    <View style={{flex:2, width:'100%'}} onTouchStart={() => clearModPopup()}></View>
                    <View style={{flex:3, borderWidth:3, backgroundColor:'rgba(200, 255, 255, 1)', borderRadius:5, width:'90%'}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:22, fontWeight:'bold'}}>
                                Chỉnh sửa thông tin giao dịch
                            </Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row', marginBottom:'2%'}}>
                            <View style={{flex:1}}>
                                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{fontSize:20, fontWeight:'500'}}>Ví</Text>
                                </View>
                            </View>
                            <View style={{flex:5, justifyContent:'center'}}>
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <WalletList setter={setModTransactWallet} selectedValue={modTransactWallet} wallets={wallets} includeAll={false}/>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'row', marginBottom:'2%'}}>
                            <View style={{flex:1}}>
                                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{fontSize:20, fontWeight:'500'}}>Loại</Text>
                                </View>
                            </View>
                            <View style={{flex:5, justifyContent:'center'}}>
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <CategoryList setter={setModTransactCategory} selectedValue={modTransactCategory} includeAll={false}/>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                            <View style={{flex:1}}>
                                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{fontSize:20, fontWeight:'500'}}>Tiền</Text>
                                </View>
                            </View>
                            <View style={{flex:5, justifyContent:'center', marginLeft:'2%', marginRight:'2%'}}>
                                <TextInput style={{backgroundColor:'white', borderRadius:3, height:40}} 
                                    value={formatAmount(modTransactAmount)} 
                                    keyboardType="numeric" onChangeText={(value)=>setModTransactAmount(Number(value.replaceAll('.','')))}></TextInput>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{flex : 1, alignItems:'flex-end', justifyContent:'center'}}>
                                    <Text style={{fontSize:20}}>Thu</Text>
                                </View>
                                <View style={{flex : 1, alignItems:'center', justifyContent:'center'}}>
                                    <RadioButton value={'false'} 
                                                status={modTransactType == false ? 'checked' : "unchecked"}
                                                onPress={()=>setModTransactType(false)}/>
                                </View>
                            </View>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                                <View style={{flex : 1, alignItems:'flex-end',justifyContent:'center'}}>
                                    <Text style={{fontSize:20}}>Chi</Text>
                                </View>
                                <View style={{flex : 1, alignItems:'center'}}>
                                    <RadioButton value={'true'} 
                                                status={modTransactType == true ? 'checked' : "unchecked"}
                                                onPress={()=>setModTransactType(true)}/>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:1.5, flexDirection:'row'}}>
                            <View style={{flex : 1, justifyContent:'center', alignItems:'center'}}>
                                <TouchableOpacity activeOpacity={0.5}>
                                    <Button onPress={()=>clearModPopup()} buttonColor="#2596a1" style={{width:110}} mode="contained">Hủy</Button>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex : 1, justifyContent:'center', alignItems:'center'}}>
                                <TouchableOpacity>
                                    <Button onPress={()=>modifyTransact()} style={{width:110}} mode="contained">Xác nhận</Button>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:2, width:'100%'}} onTouchStart={() => clearModPopup()}></View>
                </View>
            </Modal>

            
            {/* Drop down walllet */}
            <WalletList setter={setWalletID} selectedValue={walletID} wallets={wallets} includeAll={true}/>

            <View style={{marginBottom:'2%'}}></View>

            {/* Drop down category */}
            <CategoryList setter={setTransactionCategory} selectedValue={transactionCategory} includeAll={true}/>

            
            {/* Search button */}
            <View style={{flex : 1, alignItems : 'center', justifyContent:'center', marginTop:'4%'}}>
                <TouchableOpacity>
                    <Button mode="contained" buttonColor="#FF5722" onPress={() => fetchWithCond()}>
                        Tìm kiếm
                    </Button>
                </TouchableOpacity>
            </View>

            {/* Transactions */}
            <View style={{flex : 10.8, alignItems : 'center'}}>
                {(numTransaction == -1)? (<HStack space={'2xs'} justifyContent="center" alignItems="center" marginBottom="auto" marginTop="auto">
                                            <Spinner accessibilityLabel="Loading posts" size={60} color="black" />
                                        </HStack>) : 
                <TransactionList data={transactions} wallets={wallets} setModTransactID={setModTransactID}/>}
            </View>
            <View style={{flex:1.2}}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    defaultRangeContainer : {
        flex : 1,
        flexDirection : 'row',
        alignContent : 'center',
        justifyContent : 'center'
    },
    defaultRangeBtn : {
        flex : 1,
        marginLeft : 8,
        marginRight : 8,
    },
    datePickerContainer : {
        marginTop : 10,
        flex : 1,
        flexDirection : 'row'
    },
    datePicker : {
        flex : 1,
        flexDirection : 'row',
        marginLeft : 10,
        marginRight : 10,
        borderColor : 'black',
        borderWidth : 2,
        borderRadius : 10,
        justifyContent : 'center',
        alignItems : 'center'
    },
    dateText : {
        fontSize : 20,
        fontWeight : 'bold'
    },
    icon : {
        resizeMode:'center',
        aspectRatio : 1,
        width: 25,
        marginRight : 15,
    },
    calendar : {
        borderWidth: 3,
        borderColor: 'grey',
        borderRadius : 10,
        position : 'absolute',
        width : '100%'
    },
    modal : {
        flex : 1,
        marginLeft : '2%',
        marginRight : '2%',
    },
    categoryPicker : {
        flex : 1,
        marginLeft : '2%',
        marginRight : '2%',
        borderWidth : 2,
        borderColor : 'gray',
        borderRadius : 5,
        justifyContent: 'center'
    },
    modChooseModal : {
        flex:1, 
        borderBottomWidth: 1,
        alignItems:'center',
        justifyContent: 'center'
    },
})