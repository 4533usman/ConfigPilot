import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Card = ({ name, modalVisible , setModalVisible }: any) => {

    // const modalHandler = () => {
    //     setModalVisible(!modalVisible)
    // }

    return (
        <Image
        source={name} // Update this with the path to your image
        style={styles.btn}
    />
    )
}

export default Card

const styles = StyleSheet.create({
    btn: {
        backgroundColor:'#0d0c32',
        borderRadius: 10,
        height: 100,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
    }
})