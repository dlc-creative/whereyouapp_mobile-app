import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 20,
    backgroundColor: '#A62D2D'
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    marginVertical: 10,
    color: '#000',
    paddingLeft: 10,
    borderRadius: 5
  },
  content: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    marginBottom: 20
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
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  navigationFilename: {
    marginTop: 5,
  }
});
