import {ViewStyle} from 'react-native';

interface commonStyles {
  flexRow: ViewStyle;
  flexCol: ViewStyle;
  primaryBtn: ViewStyle;

}
const commonStyles: commonStyles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap:10,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
  },
  primaryBtn:{
    backgroundColor:"#0096FF"

  },
};
export default commonStyles;
