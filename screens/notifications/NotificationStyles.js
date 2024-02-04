import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
    notificationForm: {
        borderColor: COLORS.gray,
        paddingLeft: 20,
        paddingVertical: 10,
        fontSize: SIZES.medium,
    },
    notificationRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      notificationIconContainer: {
        marginRight: 10,
        marginTop:15,
    },
    notificationStatus: {
        fontSize: SIZES.medium,
        fontWeight: 'bold',
        marginRight: 10,
    },
    notificationDate: {
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    notificationDetail:{
        marginLeft: 60,
        
    },
    notificationIcon:{
        width: 35,
        height: 35,
        marginRight: 15,
        },
});

export default styles;
