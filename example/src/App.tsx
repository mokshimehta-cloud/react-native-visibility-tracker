import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { VisibilityView } from 'react-native-visibility-tracker';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.placeholder} />
      <VisibilityView
        onFocus={() => console.log('VisibilityView focused (visible)')}
        onBlur={() => console.log('VisibilityView blurred (not visible)')}
      >
        <View style={styles.box}>
          <Text style={styles.text}>
            VisibilityView – check console for focus/blur
          </Text>
        </View>
      </VisibilityView>
      <View style={styles.placeholder} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholder: {
    height: 400,
    backgroundColor: '#333',
  },
  box: {
    height: 200,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
