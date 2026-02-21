import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import CustomMarkdown from './src/CustomMarkdown'; // or from 'react-native-custom-markdown' if published or linked

const sampleMarkdown = `
# Welcome to My Library

This is a **bold** text, and this is _italic_ text.

Here is some <color style="red">red text</color> and <color style="blue">**bold blue text**</color>.

> This is a blockquote.

- Item 1
- Item 2
- Item 3

1. First
2. Second
3. Third

Here is a [link](https://example.com)

![Alt text](https://via.placeholder.com/150)

\`\`\`
console.log("Code block");
\`\`\`
`;

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CustomMarkdown content={sampleMarkdown} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default App;
