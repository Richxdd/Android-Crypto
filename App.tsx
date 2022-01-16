import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Cotizacion from './components/Cotizacion';
import Formulario from './components/Formulario';
import Header from './components/Header';

const App = () => {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState({
    PRICE: '',
    HIGHDAY: '',
    LOWDAY: '',
    CHANGEPCT24HOUR: '',
    LASTUPDATE: '',
  });

  useEffect(() => {
    const cotizarCrypto = async () => {
      if (consultarAPI) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const res = await axios.get(url);
        setCargando(true);
        setTimeout(() => {
          setResultado(res.data.DISPLAY[criptomoneda][moneda]);
          setConsultarAPI(false);
          setCargando(false);
        }, 3000);
      }
    };
    cotizarCrypto();
  }, [consultarAPI]);

  const componente = cargando ? (
    <ActivityIndicator size="large" color="#5E49E2" />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <ScrollView style={styles.contenedor}>
      <Header />
      <Image
        style={styles.image}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
          setConsultarAPI={setConsultarAPI}
        />
      </View>
      <View style={{marginTop: 40, flex: 1}}>{componente}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedor: {flex: 1},
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});
export default App;
