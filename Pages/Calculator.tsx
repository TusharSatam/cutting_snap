import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import commonStyles from '../styles/common-styles';
import DatePicker from 'react-native-date-picker';
import {Table, Row, Rows} from 'react-native-table-component';
import PrimaryButton from '../components/buttons/PrimaryButton';
import CustomButton from '../components/buttons/CustomButton';

interface ListItem {
  id: number;
  challanNumber: number;
  quantity: number;
  type: string;
  pricePerPiece: number;
}

const Calculator: React.FC = () => {
  const [challanNumber, setChallanNumber] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [type, setType] = useState<string>('');
  const [pricePerPiece, setPricePerPiece] = useState<number | null>(null);
  const [date_From, setDate_From] = useState<Date>(new Date());
  const [date_To, setDate_To] = useState<Date>(new Date());
  const [open_From, setOpen_From] = useState<boolean>(false);
  const [open_To, setOpen_To] = useState<boolean>(false);
  const [Lists, setLists] = useState<ListItem[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [income, setIncome] = useState<number>(0);
  const [Total, setTotal] = useState<number>(0);

  useEffect(() => {
    const total_income = Lists.reduce(
      (total, item) => total + item.quantity * item.pricePerPiece,
      0,
    );
    setIncome(total_income);
    const totalPcs = Lists.reduce((total, item) => total + item.quantity, 0);
    setTotal(totalPcs);
  }, [Lists]);

  const handleAdd = () => {
    if (
      challanNumber !== null &&
      quantity !== null &&
      type !== '' &&
      pricePerPiece !== null
    ) {
      if (editIndex !== null) {
        // Edit existing item
        const updatedLists = Lists.map((item, index) =>
          index === editIndex ? {...item, challanNumber, quantity, type} : item,
        );
        setLists(updatedLists);
        setEditIndex(null);
      } else {
        // Add new item
        const id = Lists.length > 0 ? Lists[Lists.length - 1].id + 1 : 1;
        const newObj: ListItem = {
          id,
          challanNumber,
          quantity,
          type,
          pricePerPiece,
        };
        setLists(prevLists => [...prevLists, newObj]);
      }
      // Clear input fields
      setChallanNumber(null);
      setQuantity(null);
      setType('');
      setPricePerPiece(null);
      setSuccessMessage('Item added successfully!');
    } else {
      setInfoMessage('Please fill in all fields.');
    }
  };

  const handleAction = (action: string, item: ListItem, index: number) => {
    switch (action) {
      case 'edit':
        // Set input fields with selected item values for editing
        setChallanNumber(item.challanNumber);
        setQuantity(item.quantity);
        setType(item.type);
        setEditIndex(index);
        setPricePerPiece(item.pricePerPiece);
        break;
      case 'delete':
        // Remove item from the list
        Alert.alert(
          'Confirm Deletion',
          'Are you sure you want to delete this item?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Deletion canceled'),
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => {
                // Delete item from the list
                const updatedLists = Lists.filter((_, i) => i !== index);
                setLists(updatedLists);
                setChallanNumber(null);
                setQuantity(null);
                setType('');
                setPricePerPiece(null);
                setSuccessMessage('Item deleted successfully!');
              },
              style: 'destructive',
            },
          ],
          {cancelable: true},
        );
        break;
      default:
        console.log('Unknown action:', action);
    }
  };
  useEffect(() => {
    if (successMessage || infoMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setInfoMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, infoMessage]);
  return (
    <View style={styles.calculator}>
      {/* message */}
      {successMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successMessageText}>{successMessage}</Text>
        </View>
      )}
      {infoMessage && (
        <View style={styles.infoMessage}>
          <Text style={styles.infoMessageText}>{infoMessage}</Text>
        </View>
      )}
      {/* All Input Section */}
      <View style={styles.InputContainer}>
        <View style={commonStyles.flexRow}>
          <TextInput
            style={styles.inputBox}
            placeholder="Challan number"
            onChangeText={newText =>
              setChallanNumber(newText !== '' ? parseInt(newText, 10) : null)
            }
            value={challanNumber !== null ? challanNumber.toString() : ''}
            placeholderTextColor="#D3D3D3"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Quantity"
            onChangeText={newText =>
              setQuantity(newText !== '' ? parseFloat(newText) : null)
            }
            value={quantity !== null ? quantity.toString() : ''}
            placeholderTextColor="#D3D3D3"
            keyboardType="numeric"
          />
        </View>
        <TextInput
          style={styles.inputTypeBox}
          placeholder="Type"
          onChangeText={newText => setType(newText)}
          value={type}
          placeholderTextColor="#D3D3D3"
        />
        <View style={commonStyles.flexRow}>
          <TextInput
            style={styles.inputBox}
            placeholder="Price/pcs"
            onChangeText={newText =>
              setPricePerPiece(newText !== '' ? parseFloat(newText) : null)
            }
            value={pricePerPiece !== null ? pricePerPiece.toString() : ''}
            keyboardType="numeric"
            placeholderTextColor="#D3D3D3"
          />
          <View style={styles.AddBtn}>
            <CustomButton
              text="Add"
              action={handleAdd}
              style={{backgroundColor: '#0096FF'}}
            />
          </View>
        </View>
      </View>
      {/*  Date Picker Section */}

      <View style={styles.datePickerContainer}>
        <Text style={{color: 'black', fontSize: 20}}>Date</Text>
        <View style={styles.DateBtns}>
          <View>
            <CustomButton
              text="Start"
              action={() => setOpen_From(true)}
              style={{backgroundColor: '#0096FF'}}
            />
            <DatePicker
              modal
              mode="date"
              open={open_From}
              date={date_From}
              onConfirm={date => {
                setOpen_From(false);
                setDate_From(date);
              }}
              onCancel={() => {
                setOpen_From(false);
              }}
            />
          </View>
          <Text style={{color: 'black', fontSize: 20}}>-</Text>
          <View>
            <CustomButton
              text="End"
              action={() => setOpen_To(true)}
              style={{backgroundColor: '#0096FF'}}
            />
            <DatePicker
              modal
              mode="date"
              open={open_To}
              date={date_To}
              onConfirm={date => {
                setOpen_To(false);
                setDate_To(date);
              }}
              onCancel={() => {
                setOpen_To(false);
              }}
            />
          </View>
        </View>
      </View>
      {/*  List Section */}
      <View style={styles.listsWrapper}>
        <Text style={{color: 'black', marginBottom: 10}}>
          {date_From.toLocaleDateString()} - {date_To.toLocaleDateString()}
        </Text>
        {/* lists Options */}
        <View style={styles.listsOptions}>
          <CustomButton text={'pdf'} style={{backgroundColor: '#0096FF'}} />
          <CustomButton text={'Clear'} style={{backgroundColor: 'red'}} />
          <View>
            <Text style={{color: 'black', fontSize: 20}}>₹ {income.toLocaleString()}</Text>
            <Text style={{color: 'black', fontSize: 20}}>Total : {Total}</Text>
          </View>
        </View>
        {Lists.length === 0 ? (
          <Text style={[styles.noData, {textAlign: 'center', lineHeight: 300}]}>
            No Data
          </Text>
        ) : (
          <View style={styles.tableWrapper}>
            <Table borderStyle={{borderWidth: 1, borderColor: '#0096FF'}}>
              <Row
                data={['#', 'Challan Number', 'Type', 'Quantity', 'Actions']}
                textStyle={styles.headText}
                style={styles.head}
              />
              <Rows
                data={Lists.map((item, index) => [
                  index + 1,
                  item.challanNumber,
                  item.type,
                  item.quantity,
                  <View style={styles.actionButtons}>
                    <CustomButton
                      text="Edit"
                      style={{backgroundColor: 'green'}}
                      action={() => handleAction('edit', item, index)}
                    />
                    <CustomButton
                      text="Delete"
                      style={{backgroundColor: 'red'}}
                      action={() => handleAction('delete', item, index)}
                    />
                  </View>,
                ])}
                textStyle={styles.text}
              />
            </Table>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calculator: {
    width: '100%',
    height: '100%',
    position: 'relative',
    fontFamily: 'Times New Roman',
  },
  datePickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    padding: 10,
    color: 'black',
  },
  InputContainer: {
    backgroundColor: '#bf8bff',
    height: 200,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    gap: 10,
    marginVertical: 10,
    alignContent: 'center',
    textAlign: 'center',
  },
  inputBox: {
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: '#0096FF',
    height: 50,
    flex: 1,
  },
  inputTypeBox: {
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: '#0096FF',
    height: 50,
    width: '100%',
  },
  AddBtn: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  DateBtns: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    gap: 20,
  },
  listsWrapper: {
    backgroundColor: '#D3D3D3',
    padding: 4,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 30,
    width: '100%',
    overflow:"scroll"
  },
  tableWrapper: {
    width: '100%',
    backgroundColor: 'white',
  },
  item: {
    color: 'black',
  },
  head: {height: 'auto', backgroundColor: '#f1f8ff'},
  headText: {margin: 3, textAlign: 'center', color: '#0096FF'},
  text: {margin: 3, textAlign: 'center', color: 'black'},
  noData: {color: 'gray'},
  actionButtons: {display: 'flex', gap: 4, marginVertical: 8},
  successMessage: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: '#32de84',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    zIndex: 100,
  },
  successMessageText: {
    color: 'white',
    textAlign: 'center',
  },
  infoMessage: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: '#ffca28',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    zIndex: 100,
  },
  infoMessageText: {
    color: 'black',
    textAlign: 'center',
  },
  listsOptions: {
    backgroundColor: 'white',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
});

export default Calculator;
