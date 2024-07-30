import React from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Vibration,
    Image,
} from 'react-native';

export const PhoneButtonContainer = ({ phoneButtonContainerStyle, children }) => {
    return (
        <View style={phoneButtonContainerStyle}>
            {children}
        </View>
    )
}

export const PhoneBody = ({ bodyStyle, bodyOutlineStyle, children }) => {
    return (
        <View style={bodyStyle}>
            <View style={bodyOutlineStyle}>
                {children}
            </View>
        </View>
    )
}

export const PhoneButton = ({ content, signContent, bodyStyle, textStyle, signContentStyle, onPressPlay }) => {
    const [pressed, setPress] = React.useState(false);
    return (
        <TouchableWithoutFeedback
            onPress={onPressPlay}
            onPressIn={() => setPress(true)}
            onPressOut={() => setPress(false)}>
            <View style={[bodyStyle, pressed && { transform: [{ translateY: 5 }] }]}>
                <Text style={textStyle}>{content}</Text>
                <Text style={signContentStyle}>{signContent}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export const DisplayCover = ({ src, coverStyle }) => {
    return (
        <Image
            source={{ uri: src }}
            style={coverStyle} />
    )
}

export const PhoneDisplay = ({ bodyStyle, children }) => {
    return (
        <View style={bodyStyle}>
            {children}
        </View>
    )
}

export const TitleText = ({ textStyle, content }) => {
    return (
        <Text style={textStyle}>
            {content}
        </Text>
    )
}