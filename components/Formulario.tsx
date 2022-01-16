import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {StyleSheet, Text, TouchableHighlight, View, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

interface Props {
  moneda: string;
  criptomoneda: string;
  setMoneda: React.Dispatch<React.SetStateAction<string>>;
  setCriptomoneda: React.Dispatch<React.SetStateAction<string>>;
  setConsultarAPI: React.Dispatch<React.SetStateAction<boolean>>;
}

const Formulario = ({
  moneda,
  criptomoneda,
  setMoneda,
  setCriptomoneda,
  setConsultarAPI,
}: Props) => {
  const [tipo, setTipo] = useState([
    {
      CoinInfo: {
        Id: '',
        FullName: '',
        Name: '',
      },
    },
  ]);

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

      const res = await axios.get(url);
      setTipo(res.data.Data);
    };
    consultarAPI();
  }, []);

  const ObtenerMoneda = (moneda: string) => {
    setMoneda(moneda);
  };

  const ObtenerCripto = (cripto: string) => {
    setCriptomoneda(cripto);
  };

  const cotizarPrecio = () => {
    moneda.trim() === '' || criptomoneda.trim() === '' ? mostrarAlerta() : null;
    setConsultarAPI(true);
  };
  const mostrarAlerta = () => {
    Alert.alert('Error...', 'Ambos campos son obligatorios', [{text: 'OK'}]);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={moneda => ObtenerMoneda(moneda)}
        itemStyle={{height: 120}}>
        <Picker.Item label="- seleccione -" value="" />
        <Picker.Item label="Dolar" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
        <Picker.Item label="Soles" value="PEN" />
      </Picker>
      <Text style={styles.label}>Cryptomenda</Text>
      <Picker
        selectedValue={criptomoneda}
        onValueChange={cripto => ObtenerCripto(cripto)}
        itemStyle={{height: 120}}>
        <Picker.Item label="- seleccione -" value="" />
        {tipo.map(cripto => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight style={styles.btnCotizar} onPress={cotizarPrecio}>
        <Text style={styles.texto}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
  },
  texto: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
export default Formulario;
