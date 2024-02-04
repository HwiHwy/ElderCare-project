import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../../constants'
export default StyleSheet.create({
    container:{

    },
    dateTimePickerContainer: {

        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        padding: 10,
      },
    formAddress: {
        marginTop: 20, 
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.gray,
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    textWithIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        justifyContent:'space-between',
      },
      underlineText: {
        color: COLORS.gray,
        fontSize: SIZES.large,
        fontWeight: 'bold',
        marginRight: 10, 
        marginBottom: 5,
        marginTop: 5,
      },
      editIcon: {
        width: 20,
        height: 20,
      },
      underline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderBottomWidth: 1,
        borderColor: COLORS.gray,
      },
  
    formCalendar:{
        marginTop: 20, 
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.gray,
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    formTime:{
        marginTop: 20, 
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.gray,
        width: '50%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',

    },
    editSelectIcon:{
        width: 20,
        height: 20,
        marginLeft:10,
    },

    formNote:{
        marginTop: 20, 
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.gray,
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
        
    },
   
     marginTop: 20, 
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.gray,
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
    },
});