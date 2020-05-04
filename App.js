/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  FlatList,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';

const App = () => {
  const [citas, setCitas] = useState([
    // {id: '1', paciente: 'Hook', propietario: 'Juan', sintomas: 'No come'},
    // {id: '2', paciente: 'Redux', propietario: 'Itzel', sintomas: 'No Duerme'},
    // {id: '3', paciente: 'Native', propietario: 'Josue', sintomas: 'No Canta'},
  ]);
  const [mostrarForm, guardarMostrarForm] = useState(false);

  useEffect(() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        if (citasStorage) {
          setCitas(JSON.parse(citasStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCitasStorage();
  }, []);

  const eliminarPaciente = (id) => {
    const citasFiltradas = citas.filter((cita) => cita.id !== id);
    setCitas(citasFiltradas);
    guardarCitasStorage(JSON.stringify(citasFiltradas));
    // setCitas((citasActuales) => {
    //   return citasActuales.filter((cita) => cita.id !== id);
    // });
  };

  // Muestra u oculta el form
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  };

  // oculta teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  const guardarCitasStorage = async (citasJSON) => {
    try {
      await AsyncStorage.setItem('citas', citasJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableNativeFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>
        <View>
          <TouchableHighlight
            onPress={() => mostrarFormulario()}
            style={styles.btnMostratForm}>
            <Text style={styles.textoMostrarForm}>
              {mostrarForm ? 'Cancelar esta cita' : 'Crear nueva cita'}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear Nueva Cita</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
                guardarCitasStorage={guardarCitasStorage}
              />
            </>
          ) : (
            <>
              <Text style={styles.titulo}>
                {citas.length > 0 ? 'Administra tus citas' : 'No hay citas'}
              </Text>
              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={({item}) => (
                  <Cita cita={item} eliminarPaciente={eliminarPaciente} />
                )}
                keyExtractor={(cita, i) => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  titulo: {
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#232323',
    borderRadius: 20,
  },
  listado: {
    flex: 1,
  },
  btnMostratForm: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#457b9d',
  },
  textoMostrarForm: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
