import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const App = () => {
  const [number, setNumber] = useState(0);
  const [btnGo, setBtnGo] = useState('Start go!');
  const [last, setLast] = useState(null);
  const [timer, setTimer] = useState(null);

  // Necessário este let para corrigir o problema da incompatibilidade do setInterval com os Hooks
  let numberChronometer = number;

  const startGo = () => {
    if (timer !== null) {
      clearInterval(timer);
      setTimer(null);
      setBtnGo('Start go!');
    } else {
      setTimer(
        setInterval(() => {
          numberChronometer = numberChronometer + 0.1;
          setNumber(numberChronometer);
        }, 100),
      );
      setBtnGo('Stop go!');
    }
  };

  const resetGo = () => {
    if (timer !== null) {
      clearInterval(timer);
      setTimer(null);
    }

    setLast(number);
    setNumber(0);
    setBtnGo('Start go!');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./img/cronometro.png')}
        style={styles.cronometro}
      />

      <Text style={styles.timer}> {number.toFixed(1)} </Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={startGo}>
          <Text style={styles.btnTexto}> {btnGo} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={resetGo}>
          <Text style={styles.btnTexto}>RESET</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaUltima}>
        <Text style={styles.textoCorrida}>
          {last > 0 ? 'Ultimo tempo: ' + last.toFixed(2) + 's' : ''}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef',
  },
  timer: {
    marginTop: -150,
    marginBottom: 30,
    color: '#FFF',
    fontSize: 65,
    fontWeight: 'bold',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 70,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef',
    textTransform: 'uppercase',
  },
  areaUltima: {
    marginTop: 70,
  },
  textoCorrida: {
    fontSize: 22,
    fontWeight: '500',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    color: '#FFF',
  },
});
export default App;
