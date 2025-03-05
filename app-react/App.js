import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.leftColumn}>
          <View style={styles.largeBox} />
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.smallBoxesContainer}>
            <View style={styles.smallBox} />
            <View style={styles.smallBox} />
            <View style={styles.smallBox} />
            <View style={styles.smallBox} />
          </View>
          <View style={styles.mediumBox} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomWideBox}>
          <View style={styles.wideBox} />
        </View>
        <View style={styles.bottomBoxContainer}>
          <View style={styles.bottomBox} />
          <View style={styles.bottomBox} />
          <View style={styles.bottomBox} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    padding:10,
    margin: 5,
    borderRadius: 7
  },
  topContainer:{
    flex: 0.7,
    flexDirection: 'row',
    padding: 10
  },
  bottomContainer:{
    flex: 0.3,
    padding:10,
    flexDirection: 'column'
  },
  leftColumn: {
    flex: 2,
    padding: 10
  },
  rightColumn:{
    flex: 2,
    padding: 10
  },
  smallBoxesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  smallBox: {
    width: 48,
    flex: 1,
    padding: 30,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#ddd',
    borderRadius: 7,
    marginTop: 10,
    marginLeft: 5
  },
  largeBox: {
    flex: 0.7,
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 7
  },
  mediumBox: {
    flex: 0.8,
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 7,
    marginTop: 100
  },
  wideBox: {
    flex: 1,
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 7
  },
  bottomBox: {
    flex: 1,
    padding: 30,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#ddd',
    borderRadius: 7,
    marginLeft: 5
  },
  bottomWideBox:{
    flex: 2,
    padding: 10
  },
  bottomBoxContainer:{
    flex: 2,
    padding: 10,
    justifyContent: 'space-around',
    flexDirection: 'row'
  }
});
