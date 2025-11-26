import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default function ReportPage(){
    return (
        <View style={styles.container}>
            <Text style={{color: 'white'}}>Report Page</Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})