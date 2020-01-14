import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#A62D2D'
  },
  buttonContainer: {
    margin: 30,
    justifyContent: 'center'
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
  release: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    margin: 10
  },
  releaseNumber: { color: '#fff' }
});
