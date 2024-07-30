import React from 'react';
import { StyleSheet, Text, View, Pressable, Modal, Linking } from 'react-native';

export const ExampleModal = ({ visible, updateAgreement }) => {
    const openLink = () => {
        Linking.openURL('https://www.freeprivacypolicy.com/live/34c06d58-0432-4c6a-9faf-3f84cf735416');
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Please agree to our privacy policy to continue</Text>
                    <Text onPress={openLink} style={styles.modalUnderlineText}>Privacy Policy</Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => updateAgreement()}>
                        <Text style={styles.textStyle}>I agree</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalUnderlineText: {
        textDecorationLine: 'underline',
        textAlign: 'center'
    }
});