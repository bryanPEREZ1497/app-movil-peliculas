import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { SearchBar } from 'react-native-elements';

export const Inicio = ({ navigation }) => {
  const [listaPeliculas, setListaPeliculas] = useState([]);
  const [pelicula, setPelicula] = useState('');

  const buscar = peli => {
    let api_url = `http://www.omdbapi.com/?s=${peli}&apikey=68a0d0e6`;
    fetch(api_url)
      .then(data => {
        return data.json();
      })
      .then(resultado => {
        const { Search } = resultado;
        setListaPeliculas(Search);
      });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detalles', { movie: item })}>
      {item.Poster === 'N/A' ? (
        <Text>Imagen no encontrada</Text>
      ) : (
        <Image style={styles.images} source={{ uri: item.Poster }} />
      )}
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Busca tu peli</Text>
      <SearchBar
        round
        containerStyle={{
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        onChangeText={texto => {
          setPelicula(texto);
          buscar(texto);
        }}
        onClear={() => {
          setPelicula('');
          setListaPeliculas([]);
        }}
        value={pelicula}
        placeholder="Título de la Película"
      />
      <FlatList
        contentContainerStyle={{ alignItems: 'center' }}
        data={listaPeliculas}
        numColumns={2}
        keyExtractor={item => item.imdbID}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  images: {
    width: 125,
    height: 250,
    margin: 5,
    borderRadius: 3,
  },
  txt: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
});
