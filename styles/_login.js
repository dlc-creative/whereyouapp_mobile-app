import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  align: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    width: null,
    resizeMode: 'cover'
  },
  content: {
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
    textAlign: 'center'
  },
  username: {
    fontSize: 18
  },
  buttonContainer: {
    // padding: 10,
    // borderRadius: 10
  },
  button: {
    color: '#fff',
    fontWeight: 'bold',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: 'solid',
    textAlign: 'center',
    textTransform: 'uppercase',
    padding: 10
  },
  input: {
    backgroundColor: 'transparent',
    width: 200,
    height: 50,
    borderStyle: 'solid',
    borderBottomWidth: 5,
    borderColor: "#000"
  },
  signup: {
    justifyContent: 'center',
    flexDirection: 'row',
    color: '#fff'
  }
});
