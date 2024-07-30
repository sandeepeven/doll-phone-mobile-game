import { StyleSheet } from "react-native";
import { Colors } from './colors';

export const PhoneBodyStyle = StyleSheet.create({
    flex: 1,
    borderRadius: 4,
    backgroundColor: Colors.background,
    padding: 8
})

export const PhoneBodyOutlineStyle = StyleSheet.create({
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 20,
    borderWidth: 5,
    padding: 8,
})

export const PhoneButtonContainerStyle = StyleSheet.create({
    flexDirection: 'row',
    justifyContent: 'center'
})

export const PhoneButtonStyle = StyleSheet.create({
    width: 90,
    height: 55,
    margin: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 25,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
})

export const PhoneButtonTextStyle = StyleSheet.create({
    color: Colors.darkPink,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 8,
})

export const SignContentStyle = StyleSheet.create({
    fontSize: 14
})

export const CoverStyle = StyleSheet.create({
    height: 250,
    width: 300,
    borderRadius: 25,
    resizeMode: 'contain'
})

export const PhoneDisplayStyle = StyleSheet.create({
    flex:1,
    marginTop: 25,
    alignItems: 'center',
})

export const TitleTextStyle = StyleSheet.create({
    marginTop: 30,
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.yellow
})

