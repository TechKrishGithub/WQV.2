import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

export const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: '#f3f8fb',
  },
  Timer:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10
  },
  ButtonStyle: {
    elevation: 20,
    backgroundColor: "#3863d7",
    margin: 10
  },
  univ:
  {
    margin: 10
  },
  Geograph:
  {
    margin: 10
  },
  GeoTit:
  {
    fontWeight: '700',
    fontSize: 13,
    color: '#3863d7',
    borderBottomColor: '#2d6c80',
    borderBottomWidth: 0.7,
    borderRadius: 50,
    padding: 10
  },
  box: {
    // // marginTop: 16,
    // // marginRight: 16,
    // // marginLeft: 16,
    // marginVertical:10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  showTimeContent:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f3f8fb',
    overflow: 'hidden',
  },
  spinner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff', // Customize the spinner color as needed
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10, // Add elevation for a glowing effect on Android devices
  },
  spinnerText: {
    color: '#FFF',
  },
  noteContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  noteText: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#900'
  },
  noteContent: {
    color: '#555555',
  },
  Switch:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomWidth: 0.7,
    borderColor: '#38373e',
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 10,
    paddingHorizontal: 5,

  },
  question:
  {
    fontWeight: '400'
  },
  YesNo:
  {
    flexDirection: 'row',
    borderRadius: 8,
    margin: 10,
    borderWidth: 1,
    justifyContent: 'space-between',
    borderColor: '#2f2e37',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 3

  },
  containerCor:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16
  },
  label: {
    color: '#333',
    width: '45%',
    fontWeight: 'bold'
  },
  value: {
    color: '#007AFF',
    fontWeight: '400'
  },
  noteContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  noteText: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#900'
  },
  noteContent: {
    color: '#555555',
  },
  loader:
  {
    margin: 10,
    alignItems: 'flex-start',
    backgroundColor: '#bad8e3',
    padding: 10,
    borderRadius: 10
  },
})