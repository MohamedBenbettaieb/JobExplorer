import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

type Job = {
  id: string;
  company: string;
  position: string;
  location: string;
  tags: string[];
  url: string;
};

export default function HomeScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const primaryColor = '#7b4fff';

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const query = `?keyword=${keyword}&location=${location}`;
      const res = await fetch(`https://localhost:44316/api/jobs${query}`);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#121212' : '#ffffff' },
      ]}
    >
      <Text style={[styles.title, { color: primaryColor }]}>
        Job Explorer
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? '#1e1e1e' : '#f5f5f5',
            color: isDark ? '#fff' : '#000',
            borderColor: primaryColor,
          },
        ]}
        placeholder="Keyword"
        placeholderTextColor={isDark ? '#aaa' : '#666'}
        value={keyword}
        onChangeText={setKeyword}
      />
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? '#1e1e1e' : '#f5f5f5',
            color: isDark ? '#fff' : '#000',
            borderColor: primaryColor,
          },
        ]}
        placeholder="Location"
        placeholderTextColor={isDark ? '#aaa' : '#666'}
        value={location}
        onChangeText={setLocation}
      />

      <Pressable style={[styles.button, { backgroundColor: primaryColor }]} onPress={fetchJobs}>
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>

      {loading ? (
        <ActivityIndicator size="large" color={primaryColor} />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? '#1e1e1e' : '#f9f9f9',
                  borderColor: isDark ? '#333' : '#ddd',
                },
              ]}
            >
              <Text style={[styles.position, { color: isDark ? '#fff' : '#000' }]}>
                {item.position}
              </Text>
              <Text style={{ color: isDark ? '#ccc' : '#333' }}>
                {item.company} - {item.location}
              </Text>
              <Text style={styles.tags}>{item.tags?.join(', ')}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
  },
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
  position: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  tags: {
    color: '#888',
    fontStyle: 'italic',
    marginTop: 4,
  },
});
