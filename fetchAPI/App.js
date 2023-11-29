import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";

const movieURL = "https://reactnative.dev/movies.json";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState({ title: "", description: "", movies: [] });

  useEffect(() => {
    getMoviesAsync();
  }, []);

  async function getMoviesAsync() {
    try {
      let response = await fetch(movieURL);
      let json = await response.json();
      setMovieData({
        title: json.title,
        description: json.description,
        movies: json.movies,
      });
    } catch (error) {
      alert("Error fetching data: " + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.blackBackground}>
        {isLoading ? (
          <ActivityIndicator color="green" />
        ) : (
          <View>
            <Text style={styles.title}>{movieData.title}</Text>
            <View style={styles.separator}></View>
            <FlatList
              data={movieData.movies}
              keyExtractor={({ id }) => id.toString()}
              renderItem={({ item }) => (
                <View style={styles.movieContainer}>
                  <Text style={styles.movieText}>
                    {item.id}. {item.title}, {item.releaseYear}
                  </Text>
                </View>
              )}
            />
            <Text style={styles.description}>{movieData.description}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 48,
  },
  blackBackground: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
  },
  movieContainer: {
    paddingBottom: 10,
  },
  movieText: {
    fontSize: 18,
    fontWeight: "200",
    color: "lime", // Verde fosforescente
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "lime",
  },
  separator: {
    borderBottomWidth: 1,
    marginBottom: 12,
    borderColor: "lime",
  },
  description: {
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "200",
    color: "lime",
  },
});

export default App;

