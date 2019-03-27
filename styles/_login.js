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
    marginVertical: 20
  },
  text: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
    textAlign: 'center'
  },
  logo: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  username: {
    fontSize: 18
  },
  buttonContainer: {},
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
    backgroundColor: '#fff',
    width: '100%',
    height: 35,
    marginVertical: 5,
    color: '#000',
    paddingLeft: 10
  },
  signup: {
    justifyContent: 'center',
    flexDirection: 'row',
    color: '#fff'
  }
});
