import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export const Detalles = ({ route }) => {
  const { movie } = route.params;
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const api_url = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=68a0d0e6`;
    fetch(api_url)
      .then(data => {
        return data.json();
      })
      .then(data => {
        setDatos(data);
      });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        {datos.Poster === 'N/A' ? (
          <View >
            <Text>Imagen no encontrada</Text>
          </View>
        ) : (
          <View>
            <Image style={styles.images} source={{ uri: datos.Poster }} />
          </View>
        )}
        <View style={styles.container}>
          <Text style={styles.texto}>Estreno: {datos.Released}</Text>
          <Text style={styles.texto}>Actores: {datos.Actors}</Text>
          <Text style={styles.texto}>Resumen: {datos.Plot}</Text>
          <Text style={styles.texto}>Género:{datos.Genre}</Text>
          <Text style={styles.texto}>Productora:{datos.Production}</Text>
          <Text style={styles.texto}>Premios:{datos.Awards}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  images: {
    width: 125,
    height: 250,
    margin: 5,
    alignSelf: 'center',
    borderRadius: 3
  },
  texto: {
    paddingTop: 30,
    margin: 5
  },
});
