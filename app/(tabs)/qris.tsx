import { useRouter } from 'expo-router';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function QRISPaymentPage(){
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={{color: 'white'}}>Qris Page</Text>
            <TouchableOpacity onPress={() => router.push('../allocation')}>
                <Text>Open Secured Budget</Text>
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})