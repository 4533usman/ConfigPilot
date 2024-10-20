import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PagerView from 'react-native-pager-view';
import Label from '../components/Label';

const { width, height } = Dimensions.get('window');

const Introduction = ({ navigation }) => {

    const letsStartHandler = () => {
        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            {/* <Text>Introduction</Text> */}
            <Text style={styles.heading}>ConfigPilot</Text>
            <View>
                <Text style={{ ...styles.heading, fontSize: 30 }}>Simplify Your Configurations</Text>
                <Text style={styles.content}>
                    ConfigPilot automates and simplifies network device configurations for routers, switches, and servers, offering step-by-step guidance for both IT professionals and non-technical users.
                </Text>
            </View>
            <View style={styles.contentContainer}>
                <Label content='1- Navigate the type of your device' />
                <Label content='2- Select the network device provider' />
                <Label content='3- Ask away to get your problem solve' />
            </View>
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.btn} onPress={letsStartHandler}>
                    <Text style={styles.btnText}>Let's Start</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Introduction

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
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
        fontWeight: 'bold',
    },
    heading: {
        fontSize: 40,
        padding: 10,
        fontWeight: 'bold'
    },
    contentContainer: {
        paddingVertical: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        paddingHorizontal: 10,
        fontSize: 20
    }

})