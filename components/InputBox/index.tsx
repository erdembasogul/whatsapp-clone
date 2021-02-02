import React, { useState } from 'react'
import { View, Text} from 'react-native';
import styles from './styles'
import { 
    MaterialCommunityIcons, 
    FontAwesome5,
    Entypo,
    Fontisto,
    MaterialIcons
} from '@expo/vector-icons'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const InputBox = () => {
    
    const [message, setMessage] = useState('');

    const onMicrofonPress = () => {
        console.warn("Microphone")
    }

    const onSendPress = () => {
        console.warn(message)
        setMessage('')
    }

    const onPress = () => {
        if(!message) {
            onMicrofonPress();
        }else {
            onSendPress()
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FontAwesome5 name="laugh-beam" size={24} color="gray" />
                <TextInput 
                    placeholder="Type a message"
                    style={styles.textInput}
                    multiline
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />
                <Entypo name="attachment" size={24} color="gray" style={styles.icon} />
                {!message && <Fontisto name="camera" size={24} color="gray" style={styles.icon}/>}
            </View>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.buttonContainer}>
                    {!message 
                    ? <MaterialCommunityIcons name="microphone" size={28} color="white" />
                    : <MaterialIcons name="send" size={28} color="white" />}
                    
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default InputBox;
