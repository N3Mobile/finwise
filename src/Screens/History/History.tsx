import { Transaction } from "@/Services";
import { Text, Button } from "react-native-paper";
import { View, Image, StyleSheet, TouchableOpacity, Modal, Alert } from "react-native";
import {  useEffect, useState, useCallback } from "react";
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
import { Colors } from "@/Theme";
import { LocalizationKey, i18n } from "@/Localization";

const TransactionRecord = ({data, wallets} : {data : Transaction, wallets : Wallet[]}) => {

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

    let icon : string [] = useCategoryIcon(data.category);
    let getWalletName = (id : string) => {
        if(wallets.length >0 ){
            let index : number = wallets.findIndex((wallet) => wallet.id == id);
            return wallets[index].name;
        }
        return "Waiting";
        
    }

    return (
                <TouchableOpacity style={{flex:1, flexDirection: 'row', width: '100%', height: 100, alignItems:'center'}}>
                    <View style={{flex : 3, justifyContent:'center', alignItems: 'center'}}>
                        <Icon source={icon[1]} size={50} color={icon[2]}/>   
                    </View>
                    <View style={{flex:7}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{icon[0]}</Text>
                            <Text style={{fontSize: 12, fontWeight: 'light', color:'grey'}}>{data.created_at}</Text>
                            <Text style={{fontSize: 15, fontWeight: 'medium'}}>{getWalletName(data.wallet_id)}</Text>
                    </View>

                    <View style={{flex:7, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: '3%'}}>
                            <Text style={{fontSize:23, fontWeight:'bold'}}>{data.is_pay ? '-' : '+'} {formatAmount(data.amount)} đ</Text>
                    </View>
                </TouchableOpacity>
    );
}

const TransactionList = ({data, wallets} : {data : Transaction[], wallets : Wallet[]}) => {

    return (
        <ScrollView style={{marginTop:'2%', width:'100%'}}>
                {data.map((value, index) => {
                    return <TransactionRecord data={value} wallets={wallets} key={index}/>
                })}
        </ScrollView>
    );
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
            console.log(e)
        }
       
    }

    const fetchWithCond = () => {
        if(startDate > endDate) 
        {
            Alert.alert('Lưu ý', 'Ngày kết thúc phải lớn hơn ngày bắt đầu', [{text: 'OK'}])
        }
        else 
        {
            setRange(endDate.getDate() - startDate.getDate());
            fetchData(startDate, endDate);
        }
    }

    //events
    const changeDefaultRange = (r : number) => {
        setRange(r);
        let end : Date = new Date();
        let start : Date = new Date();
        start.setDate(start.getDate() - r);
        setStartDate(start);
        setEndDate(end);
        fetchData(start, end);
    }

    useEffect(() => {
        changeDefaultRange(3);
        setFirstLoad(false);
    }, []);

    useEffect(() => {
        setData(allTransact);
    }, [transactionCategory, allTransact, walletID]);

    useFocusEffect(
        useCallback(() => {

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
                    console.log(e);
                }
        
            }
            getWallet();
            if(!firstLoad) fetchData(startDate, endDate);
        }, [])
    );
    
    return (   
        <View style={{flex: 1}}>

            <View style={styles.defaultRangeContainer}>
                {/* default date range buttons */}
                {<>{defaultRange.map((r, index) => {
                    return (
                    <TouchableOpacity activeOpacity={0.5} style={styles.defaultRangeBtn} key={r}>
                        <Button mode="outlined" textColor={range == r ? "white" : 'black'} buttonColor={range == r ? "#FF5722" : "#FFFFFF"} onPress={() => changeDefaultRange(r)}>
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
                    <View style={{flex:1.5}}>
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
            
            {/* Drop down walllet */}
            <View style={{flex : 1, marginBottom: '2%'}}>
                
                <View style={styles.categoryPicker}>
                    <Picker
                        mode="dropdown"
                        selectedValue={walletID}
                        onValueChange={(itemValue, itemIndex) => {setWalletID(itemValue)}}
                    >
                        <Picker.Item label={i18n.t(LocalizationKey.ALL)} value={"All"}/>
                        {Object.values(wallets).map((value, index)=>{
                            return (<Picker.Item label={value.name} value={value.id} key={value.id}/>)
                        })}
                    </Picker>
                </View>
            </View>

            {/* Drop down category */}
            <View style={{flex : 1}}>
                
                <View style={styles.categoryPicker}>
                    <Picker
                        mode="dropdown"
                        selectedValue={transactionCategory}
                        onValueChange={(itemValue, itemIndex) => setTransactionCategory(itemValue)
                    }>
                        {Object.values(Category).reverse().map((value, index)=>{
                            return (<Picker.Item label={useCategoryIcon(value)[0]} value={value} key={value}/>)
                        })}
                    </Picker>
                </View>
            </View>

            
            {/* Search button */}
            <View style={{flex : 1, alignItems : 'center', justifyContent:'center', marginTop:'4%'}}>
                <TouchableOpacity>
                    <Button mode="contained" buttonColor="#FF5722" onPress={() => fetchWithCond()}>
                        Tìm kiếm
                    </Button>
                </TouchableOpacity>
            </View>

            {/* Transactions */}
            <View style={{flex : 10, alignItems : 'center'}}>
                {numTransaction == -1 ? (<HStack space={'2xs'} justifyContent="center" alignItems="center" marginBottom="auto" marginTop="auto">
                                            <Spinner accessibilityLabel="Loading posts" size={60} color="black" />
                                        </HStack>) : 
                <TransactionList data={transactions} wallets={wallets}/>}
            </View>
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
        marginRight : '2%'
    },
    categoryPicker : {
        flex : 1,
        marginLeft : '2%',
        marginRight : '2%',
        borderWidth : 2,
        borderColor : 'gray',
        borderRadius : 5,
        justifyContent: 'center'
    }
})