import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Label = ({ content, screentype, routertype, setRouterType, other }: any) => {
    const deviceHandler = (s: any) => {
        setRouterType(s)
    }
    return (
        <View style={{ ...styles.container, borderRadius: screentype === 'home' ? 10 : 50 }}>
            {screentype === 'home' ?
                <TouchableOpacity onPress={() => deviceHandler(content)} style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }} disabled={other}>
                    <Text>{content}</Text>
                    {routertype === content ? <MaterialIcons name="check-circle" size={24} color="#0d0c32" /> : null}
                </TouchableOpacity>
                :
                <Text>{content}</Text>
            }
        </View>
    );
}

export default Label;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgray',
        padding: 20,
        width: width - 20,
        marginVertical: 10,
        borderRadius: 50,  // Added border radius
    }
});
