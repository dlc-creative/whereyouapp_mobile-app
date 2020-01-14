import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container:{
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    fontSize: 22,
    alignSelf: 'center'
  },
  headline: {
    fontWeight: 'bold'
  },
  headlineUnderline: {
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  sectionIndent: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  sectionSubHeading: {
    fontSize: 12,
    marginBottom: 10
  },
  scrollContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: Dimensions.get('window').height * .7
  },
  button: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10
  },
  buttonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10
  },
  buttonLabel: {
    fontSize: 14,
    color: '#FFF',
    alignSelf: 'center'
  }
});
