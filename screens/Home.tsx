import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Card from '../components/Card'
import SelectionModal from '../components/SelectionModal';
import Tab from '../components/Tab';
import Label from '../components/Label';

const { width, height } = Dimensions.get('window');


const Home = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [active, setActive] = useState<any>('Router');
    const [routertype, setRouterType] = useState<any>('CISCO')

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Choose Your Device for a Seamless Setup Experience!</Text>
            <View style={styles.row}>
                <Card name={require('../images/router.jpg')} />
                <Card name={require('../images/switch.jpg')} />
                <Card name={require('../images/server.jpg')} />
            </View>
            <View style={styles.tabRow}>
                <Tab name='Router' active={active} setActive={setActive} />
                <Tab name='Switches' active={active} setActive={setActive} />
                <Tab name='Servers' active={active} setActive={setActive} />
            </View>

            {active === 'Router' ?
                <View style={styles.contentContainer}>
                    <Label content='CISCO' screentype='home' routertype={routertype} setRouterType={setRouterType} />
                    <Label content='HUAWEI' screentype='home' routertype={routertype} setRouterType={setRouterType} />
                    <Label content='TP-LINK' screentype='home' routertype={routertype} setRouterType={setRouterType} />
                    <Label content='Other Devices will be available in next release' screentype='home' routertype={routertype} setRouterType={setRouterType} other={true} />                    
                </View>
                :
                <View style={styles.contentContainer} pointerEvents='none'>
                    <Label content='In Progress feature will be available in Next Release' screentype='home' />
                </View>
            }
            {active === 'Router' ?
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={styles.btn} onPress={
                        () => {
                            navigation.navigate('ChatScreen' as never, {
                                active,
                                routertype
                            } as never);
                        }
                    }>
                        <Text style={styles.btnText}>Next</Text>
                    </TouchableOpacity>
                </View> : null
            }

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        // justifyContent: "center",
        alignItems: "center",
        flex: 1,
        margin: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: width,
        marginVertical: 10
    },
    heading: {
        fontSize: 30,
        marginVertical: 20,
        textAlign: 'center',
        fontWeight: "bold"
    },
    tabRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: width,
        marginVertical: 10

    },
    contentContainer: {
        paddingVertical: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: '#0d0c32',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 50,
        // width: width / 3,
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        // fontWeight: 'bold',
    },
})