import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ChannelItem from './ChannelItem';

const ChannelsList = ({navigation, route, channels}) => {
    return (
        <FlatList
                data={channels}
                keyExtractor={channel => channel.name}
                renderItem={({channel}) => {
                    return (
                        <ChannelItem navigation={navigation} route={route} id={channel.id}/>
                    );
                }}
            style={{flex: 1 /*//ScrollView child layout (["alignItems","justifyContent"]) must be applied through the contentContainerStyle prop. , alignItems: 'center', justifyContent: 'center'*/}}
            />
        
    );
};

export default ChannelsList;