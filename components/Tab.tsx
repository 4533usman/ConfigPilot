import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Tab = ({ name, active, setActive }: any) => {
    const onPressHandler = (s: any) => {
        setActive(s)
    }
    return (
        <TouchableOpacity style={{ ...styles.btn, backgroundColor: active === name ? '#0d0c32' : 'lightgray' }} onPress={() => onPressHandler(name)}>
            <Text style={styles.btnText}>{name}</Text>
        </TouchableOpacity>
    )
}

export default Tab

const styles = StyleSheet.create({
    btn: {
        borderRadius: 10,
        // height: 100,
        // width: 100,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: 'white'
    }
})