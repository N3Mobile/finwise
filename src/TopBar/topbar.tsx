import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    topBarContainer : {
        marginTop : 10,
        flex: 1,
        flexDirection: 'row',
    },
    content1 : {
        flex : 6,
        justifyContent : 'center',    
        alignItems : 'center',
        height: '10%',
    },
    content2 : {
        flex : 2,
        justifyContent : 'center',
        alignItems : 'center',
        height: '10%'
    },
    text : {
        fontSize : 30,
        fontStyle : 'italic',
        fontWeight : 'bold'
    },
    image : {
        width : "40%",
        height : "40%"
    },
    touchable : {
        width : '100%',
        height : '100%',
        alignItems : 'center',
        justifyContent : 'center'
    }
});

function TopBar(){

    return ( 
        <View style={styles.topBarContainer}> 
            <View style={styles.content2}> 
                <TouchableOpacity style={styles.touchable}>
                    <Image source={require("../../assets/bell.png")} style={styles.image}/>
                </TouchableOpacity>
            </View>
            <View style={styles.content1}>
                <Text style={styles.text}>Finwise Pro</Text>
            </View>
            <View style={styles.content2}>
                <TouchableOpacity style={styles.touchable}>
                    <Image source={require("../../assets/setting.png")} style={styles.image}/>
                </TouchableOpacity>
            </View>
          </View> 
      ); 
}

export default TopBar;