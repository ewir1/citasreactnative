import {Button, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import React from 'react';

const Cita = ({cita, eliminarPaciente}) => {
  const dialogoEliminar = id => {
    console.log('eliminar', id);
    eliminarPaciente(id);
  };

  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}>Paciente: </Text>
        <Text style={styles.texto}>{cita.paciente}</Text>
      </View>
      <View>
        <Text style={styles.label}>Propietario: </Text>
        <Text style={styles.texto}>{cita.propietario}</Text>
      </View>
      <View>
        <Text style={styles.label}>Sintomas: </Text>
        <Text style={styles.texto}>{cita.sintomas}</Text>
      </View>

      <View>
        <TouchableHighlight
          onPress={() => dialogoEliminar(cita.id)}
          style={styles.btnEliminar}>
          <Text style={styles.textoEliminar}>Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Cita;

const styles = StyleSheet.create({
  cita: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E1E1E1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  texto: {fontSize: 18},
  btnEliminar: {
    padding: 10,
    backgroundColor: '#e63946',
    marginVertical: 10,
    borderRadius: 4,
  },
  textoEliminar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
