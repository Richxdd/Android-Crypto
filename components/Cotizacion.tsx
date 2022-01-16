import React from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
interface Props {
  resultado: {
    PRICE: string;
    HIGHDAY: string;
    LOWDAY: string;
    CHANGEPCT24HOUR: string;
    LASTUPDATE: string;
  };
}

const Cotizacion = ({resultado}: Props) => {
  if (Object.keys(resultado.PRICE).length === 0) return null;
  return (
    <ScrollView style={styles.resultado}>
      <Text style={[styles.texto, styles.precio]}>
        <Text style={styles.span}>{resultado.PRICE}</Text>
      </Text>
      <Text style={styles.texto}>
        Precio más alto del día:{' '}
        <Text style={styles.span}>{resultado.HIGHDAY}</Text>
      </Text>
      <Text style={styles.texto}>
        Precio más bajo del día:{' '}
        <Text style={styles.span}>{resultado.LOWDAY}</Text>
      </Text>
      <Text style={styles.texto}>
        Variación últimas 24 horas:{' '}
        <Text style={styles.span}>{resultado.CHANGEPCT24HOUR}</Text>
      </Text>
      <Text style={styles.texto}>
        Última Actualiazcion:{' '}
        <Text style={styles.span}>{resultado.LASTUPDATE}</Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  resultado: {
    backgroundColor: '#5E49E2',
    padding: 20,
    paddingBottom: 48,
  },
  texto: {
    color: '#FFF',
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    marginBottom: 10,
  },
  precio: {
    fontSize: 38,
  },
  span: {
    fontFamily: 'Lato-Black',
  },
});
export default Cotizacion;
