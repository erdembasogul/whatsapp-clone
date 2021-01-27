import moment from 'moment';
import React from 'react';
import { View, Text, Image, } from 'react-native';
import { TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ChatRoom } from '../../types';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

export type ChatListItemProps = {
    chatRoom: ChatRoom;
}

const ChatListItem = (props: ChatListItemProps) => {
    const { chatRoom } = props;

    const navigation = useNavigation();
    const users = chatRoom.users;
    const user = chatRoom.users[1]

    const onClick = () => {
        navigation.navigate('ChatRoom', { 
            id: chatRoom.id,
            name: user.name,
            image: user.imageUri,
            users: users
        })
    }

    return (
        <TouchableNativeFeedback  onPress={onClick}>
            <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{ uri: user.imageUri }} style={styles.avatar} />
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text style={styles.lastMessage}>{chatRoom.lastMessage.content}</Text>
                </View>
            </View>
            <Text style={styles.time}>
                {moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}
            </Text>
        </View>
        <View
            style={{
                marginLeft: 83,
                marginRight: 15,
                borderBottomColor: '#E3E3E4',
                borderBottomWidth: 1,
            }}
        />
        </TouchableNativeFeedback>
    )
}

export default ChatListItem;