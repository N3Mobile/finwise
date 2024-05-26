import { Transaction } from "@/Services";
import { Text, Button } from "react-native-paper";
import { View, Image, StyleSheet, TouchableOpacity, Modal, Alert } from "react-native";
import { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "native-base";
import { HStack, Spinner, Heading } from "native-base";
import { i18n, LocalizationKey } from "@/Localization";


const TransactionRecord = ({data} : {data : Transaction}) => {

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

    return (
                <TouchableOpacity style={{flex:1, flexDirection: 'row', width: '100%', height: 100, marginBottom:'2%', alignItems:'center'}}>

                        <Image source={data.category == 'billing' ?
                                    require('assets/billing.png') :
                                    (data.category == 'shopping' ?  
                                    require('assets/shopping.png') :
                                    require('assets/food.png')
                                    )} 
                        style={{aspectRatio:1, resizeMode:'center'}}/>

                    <View style={{flex:5}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{data.category}</Text>
                            <Text style={{fontSize: 12, fontWeight: 'light', color:'grey'}}>{data.created_at}</Text>
                            <Text style={{fontSize:15}}>Nguồn tiền: Ví {data.wallet_id}</Text>
                    </View>

                    <View style={{flex:7, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: '3%'}}>
                            <Text style={{fontSize:23, fontWeight:'bold'}}>{data.is_pay ? '-' : '+'} {formatAmount(data.amount)} đ</Text>
                    </View>

                </TouchableOpacity>
    );
}

const TransactionList = ({data} : {data : Transaction[]}) => {

    return (
        <ScrollView style={{marginTop:'2%', width:'100%'}}>
                {data.map((value, index) => {
                    return <TransactionRecord data={value} key={index}/>
                })}
        </ScrollView>
    );
}

export const History = ({route, navigation}) => {

    const {start, end, category} = route.params;

    //setup
    const [range, setRange] = useState(3);
    const defaultRange : number[] = [3, 5, 7];
    const [transactionCategory, setTransactionCategory] = useState(category);
    const [startDate, setStartDate] = useState(start == -1 ? new Date() : start);
    const [endDate, setEndDate] = useState(end == -1 ? new Date() : end);
    const [datePick, setDatePick] = useState(0);
    const [markedStartDate, setMarkedStartDate] = useState({selected : {}});
    const [markedEndDate, setMarkedEndDate] = useState({selected : {}});
    const [transactions, setTransaction] = useState<Transaction[]>([]);
    const [transactFood, setTransactFood] = useState<Transaction[]>([]);
    const [transactShopping, setTransactShopping] = useState<Transaction[]>([]);
    const [transactBilling, setTransactBilling] =useState<Transaction[]>([]);
    const [numTransaction, setNumTransaction] = useState(-1);

    const getFormattedDate = (date : Date) => {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    const filter = (data : Transaction[]) : Transaction[][] => {
        let billing : Transaction [] = [];
        let shopping : Transaction [] = [];
        let food : Transaction [] = [];
        for(let i = 0; i < data.length; i++)
        {
            if(data[i].category == 'billing') billing.push(data[i]);
            else if(data[i].category == 'shopping') shopping.push(data[i]);
            else food.push(data[i]);
        }
        return [billing, shopping, food];
    }
    

    //fetch data
    const fetchData = (startDate : Date, endDate : Date) => {
        let start : string = getFormattedDate(startDate);
        let end : string = getFormattedDate(endDate);

        //call api here
        let res : number = 1;
        if(res == 0) setNumTransaction(0);
        else
        {
            let data : Transaction[] = [];
            data.push({
                id : 1,
                wallet_id : 1,
                category : 'food',
                amount : 100000,
                created_at : '21/05/2023',
                is_pay : false,
            });
            data.push({
                id : 1,
                wallet_id : 1,
                category : 'shopping',
                amount : 100000,
                created_at : '21/05/2023',
                is_pay : false,
            })
            data.push({
                id : 1,
                wallet_id : 1,
                category : 'billing',
                amount : 100000,
                created_at : '21/05/2023',
                is_pay : false,
            })
            let filtered : Transaction[][] = filter(data);
            setTransactBilling(filtered[0]);
            setTransactShopping(filtered[1]);
            setTransactFood(filtered[2]);
            if(transactionCategory == 'all')  setTransaction([...data]);
            else if(transactionCategory == 'billing') setTransaction([...transactBilling]);
            else if(transactionCategory == 'shopping') setTransaction([...transactShopping]);
            else setTransaction([...transactFood]);
            setNumTransaction(data.length);
            console.log(transactionCategory);
        }

        

    }

    const fetchWithCond = () => {
        if(startDate > endDate) 
        {
            Alert.alert('Lưu ý', 'Ngày kết thúc phải lớn hơn ngày bắt đầu', [{text: 'OK'}])
        }
        else 
        {
            setRange(0);
            setNumTransaction(-1);
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
    }, []);

    return (   
        <View style={{flex: 1}}>

            {/* screen name */}
            <Text style={styles.screenName}>
                Lịch sử giao dịch
            </Text>
            <View style={styles.defaultRangeContainer}>
                {/* default date range buttons */}
                {<>{defaultRange.map((r, index) => {
                    return (
                    <TouchableOpacity activeOpacity={0.5} style={styles.defaultRangeBtn} key={r}>
                        <Button mode="contained" buttonColor={range == r ? "cyan" : "grey"} onPress={() => changeDefaultRange(r)}>
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
                    markedDates={markedStartDate.selected}
                    onDayPress={day => {
                        setStartDate(new Date(day.dateString));
                        setMarkedStartDate({selected:{[day.dateString]:{selected: true, selectedColor: '#466A8F'}}})
                        setDatePick(0);
                    }}
                    /> : (datePick == 2 ? <Calendar style={styles.calendar} 
                        theme={{
                            todayBackgroundColor : 'cyan',
                        }}
                        markedDates={markedEndDate.selected}
                        onDayPress={day => {
                            setEndDate(new Date(day.dateString));
                            setMarkedEndDate({selected:{[day.dateString]:{selected: true, selectedColor: '#466A8F'}}})
                            setDatePick(0);
                        }}
                      /> : "")} 
                    </View>
                    <View style={{flex:1}} onTouchStart={() => setDatePick(0)}></View>
                </View>
            </Modal>
            
            {/* Drop down category */}
            <View style={{flex : 1}}>
                
                <View style={styles.categoryPicker}>
                    <Picker
                        mode="dropdown"
                        selectedValue={transactionCategory}
                        onValueChange={(itemValue, itemIndex) => setTransactionCategory(itemValue)
                    }>
                        <Picker.Item label="Tất cả" value={"all"} />
                        <Picker.Item label="Hóa đơn" value={'billing'} />
                        <Picker.Item label="Ăn uống" value={"food"} />
                        <Picker.Item label="Mua sắm" value={"shopping"} />
                    </Picker>
                </View>
            </View>
            
            {/* Search button */}
            <View style={{flex : 1, alignItems : 'center', justifyContent:'center', marginTop:'4%'}}>
                <TouchableOpacity>
                    <Button mode="contained" buttonColor="cyan" onPress={() => fetchWithCond()}>
                        Tìm kiếm
                    </Button>
                </TouchableOpacity>
            </View>

            {/* Transactions */}
            <View style={{flex : 10, alignItems : 'center'}}>
                {numTransaction == -1 ? (<HStack space={'2xs'} justifyContent="center" alignItems="center" marginBottom="auto" marginTop="auto">
                                            <Spinner accessibilityLabel="Loading posts" size={60} color="black" />
                                        </HStack>) : 
                <TransactionList data={transactions} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenName : {
        textAlign : 'center',
        fontSize : 25,
        backgroundColor : 'rgb(0, 255, 150)',
        alignContent:'center',
        fontWeight: '500'
    },
    defaultRangeContainer : {
        marginTop : 10,
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