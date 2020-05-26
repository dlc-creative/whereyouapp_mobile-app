import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  restaurantList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    zIndex: 0
  },
  slidePanel: {
    flex: 1,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 20
  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    zIndex: 10
  },
  panelHeader: {
    height: 180,
    backgroundColor: "#fe8800",
    justifyContent: "flex-end",
    padding: 24
  },
  textHeader: {
    fontSize: 28,
    color: "#FFF"
  },
  restaurantProfileContainer: {
    flex: 1,
    zIndex: 10,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
   },
  restaurant: {
    color: '#000',
    flex: 1,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 10
  },
  restaurantImage: {
    width: Dimensions.get('window').width - 20,
    height: 150,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: '#A62D2D',
    flex: 1
  },
  restaurantImageDefault: {
    width: Dimensions.get('window').width - 20,
    height: 100,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: '#A62D2D',
    flex: 1
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#000',
    opacity: 0.3
  },
  restaurantName: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    display: 'flex',
    alignItems: 'flex-end',
    paddingHorizontal: 10
  },
  baseline: {
    // flex: 1,
    width: Dimensions.get('window').width - 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  cuisines: {
    alignItems: 'flex-start',
    color: '#fff',
    fontSize: 15
  },
  votes: {
    display: 'flex',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  },
  restaurantLocation: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 12
  },
  restaurantInfoDetails: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  restaurantInfoHours: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  restaurantPhone: {color: '#000'},
  card: {
    width: Dimensions.get('window').width,
    height: 200,
    alignItems: 'center'
  }
});
