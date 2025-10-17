// import React, { JSX } from 'react';
// import {
//   Text,
//   View,
//   Image,
//   StyleSheet,
//   Linking,
//   StyleProp,
//   TextStyle,
//   ViewStyle,
//   ImageStyle,
// } from 'react-native';

// type MarkdownStyle = StyleProp<TextStyle | ViewStyle | ImageStyle>;

// type CustomMarkdownProps = {
//   content: string;
//   styles?: Partial<Record<keyof typeof defaultStyles, MarkdownStyle>>;
//   resolveImageSource?: (path: string) => any;
// };

// const CustomMarkdown: React.FC<CustomMarkdownProps> = ({
//   content,
//   styles = {},
//   resolveImageSource,
// }) => {
//   const getMergedStyle = (key: keyof typeof defaultStyles): MarkdownStyle => {
//     return [defaultStyles[key], styles[key]];
//   };

//   // const parseInlineMarkdown = (text: string) => {
//   //   const elements: (JSX.Element | string)[] = [];
//   //   let remaining = text;
//   //   let index = 0;

//   //   const applyRegex = (
//   //     regex: RegExp,
//   //     styleKey: keyof typeof defaultStyles,
//   //     isLink = false,
//   //     isCode = false,
//   //     isHtmlTag = false,
//   //     renderText?: (value: string) => string,
//   //   ) => {
//   //     const match = regex.exec(remaining);
//   //     if (match) {
//   //       const [full, inner, link] = match;
//   //       const before = remaining.substring(0, match.index);
//   //       const after = remaining.substring(match.index + full.length);
//   //       if (before) elements.push(before);

//   //       if (isLink) {
//   //         elements.push(
//   //           <Text
//   //             key={`link-${index++}`}
//   //             style={getMergedStyle(styleKey)}
//   //             onPress={() => Linking.openURL(link)}
//   //           >
//   //             {inner}
//   //           </Text>,
//   //         );
//   //       } else if (isHtmlTag && renderText) {
//   //         elements.push(
//   //           <Text key={`html-${index++}`} style={getMergedStyle(styleKey)}>
//   //             {renderText(inner)}
//   //           </Text>,
//   //         );
//   //       } else {
//   //         elements.push(
//   //           <Text key={`styled-${index++}`} style={getMergedStyle(styleKey)}>
//   //             {inner}
//   //           </Text>,
//   //         );
//   //       }

//   //       remaining = after;
//   //       return true;
//   //     }
//   //     return false;
//   //   };

//   //   while (remaining.length) {
//   //     const patterns = [
//   //       { regex: /\*\*\*(.*?)\*\*\*/g, style: ['bold', 'italic'] },
//   //       { regex: /\*\*(.*?)\*\*/g, style: ['bold'] },
//   //       { regex: /_(.*?)_/g, style: ['italic'] },
//   //       { regex: /`([^`]+)`/g, style: ['code'], isCode: true },
//   //       { regex: /\[(.*?)\]\((.*?)\)/g, style: ['link'], isLink: true },
//   //       { regex: /<b>(.*?)<\/b>/i, style: ['bold'], isHtmlTag: true },
//   //       { regex: /<i>(.*?)<\/i>/i, style: ['italic'], isHtmlTag: true },
//   //       { regex: /<u>(.*?)<\/u>/i, style: ['underline'], isHtmlTag: true },
//   //       {
//   //         regex: /<br\s*\/?>/i,
//   //         style: ['paragraph'],
//   //         isHtmlTag: true,
//   //         renderText: () => '\n',
//   //       },
//   //     ];

//   //     let matched = false;
//   //     for (const pattern of patterns) {
//   //       if (
//   //         applyRegex(
//   //           pattern.regex,
//   //           pattern.style[0] as keyof typeof defaultStyles,
//   //           pattern.isLink,
//   //           pattern.isCode,
//   //           pattern.isHtmlTag,
//   //           pattern.renderText,
//   //         )
//   //       ) {
//   //         matched = true;
//   //         break;
//   //       }
//   //     }

//   //     if (!matched) {
//   //       elements.push(remaining);
//   //       break;
//   //     }
//   //   }

//   //   return <Text>{elements}</Text>;
//   // };

//   const parseInlineMarkdown = (text: string) => {
//   const elements: (JSX.Element | string)[] = [];
//   let remaining = text;
//   let index = 0;

//   // Helper function to parse formatting within colored text
//   const parseFormattedText = (content: string, baseColor: string, startIdx: number) => {
//     const formattedElements: JSX.Element[] = [];
//     let formattedRemaining = content;
//     let formattedIndex = startIdx;

//     while (formattedRemaining.length > 0) {
//       // Check for bold text
//       const boldMatch = /\*\*(.*?)\*\*/g.exec(formattedRemaining);
//       if (boldMatch) {
//         const before = formattedRemaining.substring(0, boldMatch.index);
//         if (before) {
//           formattedElements.push(
//             <Text key={`text-${formattedIndex++}`} style={{ color: baseColor }}>
//               {before}
//             </Text>
//           );
//         }

//         formattedElements.push(
//           <Text key={`bold-${formattedIndex++}`} style={{ color: baseColor, fontWeight: 'bold' }}>
//             {boldMatch[1]}
//           </Text>
//         );

//         formattedRemaining = formattedRemaining.substring(boldMatch.index + boldMatch[0].length);
//         continue;
//       }

//       // Check for italic text
//       const italicMatch = /_(.*?)_/g.exec(formattedRemaining);
//       if (italicMatch) {
//         const before = formattedRemaining.substring(0, italicMatch.index);
//         if (before) {
//           formattedElements.push(
//             <Text key={`text-${formattedIndex++}`} style={{ color: baseColor }}>
//               {before}
//             </Text>
//           );
//         }

//         formattedElements.push(
//           <Text key={`italic-${formattedIndex++}`} style={{ color: baseColor, fontStyle: 'italic' }}>
//             {italicMatch[1]}
//           </Text>
//         );

//         formattedRemaining = formattedRemaining.substring(italicMatch.index + italicMatch[0].length);
//         continue;
//       }

//       // No more formatting, push remaining text
//       if (formattedRemaining) {
//         formattedElements.push(
//           <Text key={`text-${formattedIndex++}`} style={{ color: baseColor }}>
//             {formattedRemaining}
//           </Text>
//         );
//       }
//       break;
//     }

//     return formattedElements;
//   };

//   const applyRegex = (
//     regex: RegExp,
//     styleKey: keyof typeof defaultStyles,
//     isLink = false,
//     isCode = false,
//     isHtmlTag = false,
//     isColor = false,
//     renderText?: (
//       value: string,
//       match?: RegExpExecArray,
//     ) => string | JSX.Element,
//   ) => {
//     regex.lastIndex = 0;
//     const match = regex.exec(remaining);
//     if (match) {
//       const [full, inner, inner2] = match;
//       const before = remaining.substring(0, match.index);
//       const after = remaining.substring(match.index + full.length);
//       if (before) elements.push(before);

//       if (isLink) {
//         elements.push(
//           <Text
//             key={`link-${index++}`}
//             style={getMergedStyle(styleKey)}
//             onPress={() => Linking.openURL(inner2)}
//           >
//             {inner}
//           </Text>,
//         );
//       } else if (isColor) {
//         // Handle color syntax :::{.color-blue}text:::
//         const colorName = inner;
//         const coloredText = inner2;

//         console.log('DEBUG - Color processing:');
//         console.log('Color:', colorName);
//         console.log('Text:', coloredText);

//         // Parse formatted text within the color
//         const coloredElements = parseFormattedText(coloredText, colorName.toLowerCase(), index);
//         elements.push(...coloredElements);
//         index += coloredElements.length;
//       } else if (isHtmlTag && renderText) {
//         const rendered = renderText(inner, match);
//         if (typeof rendered === 'string') {
//           elements.push(rendered);
//         } else {
//           elements.push(rendered);
//         }
//       } else {
//         elements.push(
//           <Text key={`styled-${index++}`} style={getMergedStyle(styleKey)}>
//             {inner}
//           </Text>,
//         );
//       }

//       remaining = after;
//       return true;
//     }
//     return false;
//   };

//   while (remaining.length) {
//     const patterns = [
//       // COLOR PATTERN FIRST
//       {
//         regex: /:::\s*{\s*\.color-([a-zA-Z]+)\s*}\s*([\s\S]*?)\s*:::/g,
//         style: ['paragraph'],
//         isColor: true,
//       },
//       { regex: /\*\*\*(.*?)\*\*\*/g, style: ['bold', 'italic'] },
//       { regex: /\*\*(.*?)\*\*/g, style: ['bold'] },
//       { regex: /_(.*?)_/g, style: ['italic'] },
//       { regex: /`([^`]+)`/g, style: ['code'], isCode: true },
//       { regex: /\[(.*?)\]\((.*?)\)/g, style: ['link'], isLink: true },
//       { regex: /<b>(.*?)<\/b>/i, style: ['bold'], isHtmlTag: true },
//       { regex: /<i>(.*?)<\/i>/i, style: ['italic'], isHtmlTag: true },
//       { regex: /<u>(.*?)<\/u>/i, style: ['underline'], isHtmlTag: true },
//       {
//         regex: /<br\s*\/?>/i,
//         style: ['paragraph'],
//         isHtmlTag: true,
//         renderText: () => '\n',
//       },
//     ];

//     let matched = false;
//     for (const pattern of patterns) {
//       if (
//         applyRegex(
//           pattern.regex,
//           pattern.style[0] as keyof typeof defaultStyles,
//           pattern.isLink,
//           pattern.isCode,
//           pattern.isHtmlTag,
//           pattern.isColor,
//           pattern.renderText,
//         )
//       ) {
//         matched = true;
//         break;
//       }
//     }

//     if (!matched) {
//       elements.push(remaining);
//       break;
//     }
//   }

//   return <Text>{elements}</Text>;
// };

//! to be uncommented
// import React, { JSX } from 'react';
// import {
//   Text,
//   View,
//   Image,
//   StyleSheet,
//   Linking,
//   StyleProp,
//   TextStyle,
//   ViewStyle,
//   ImageStyle,
//   Platform,
// } from 'react-native';

// type MarkdownStyle = StyleProp<TextStyle | ViewStyle | ImageStyle>;

// type CustomMarkdownProps = {
//   content: string;
//   styles?: Partial<Record<keyof typeof defaultStyles, MarkdownStyle>>;
//   resolveImageSource?: (path: string) => any;
// };

// // Color mapping for React Native
// const COLOR_MAP: Record<string, string> = {
//   blue: '#007AFF',
//   red: '#FF3B30',
//   green: '#34C759',
//   orange: '#FF9500',
//   yellow: '#FFCC00',
//   purple: '#5856D6',
//   pink: '#FF2D55',
//   brown: '#A2845E',
//   black: '#000000',
//   white: '#FFFFFF',
//   gray: '#8E8E93',
// };

// const CustomMarkdown: React.FC<CustomMarkdownProps> = ({
//   content,
//   styles = {},
//   resolveImageSource,
// }) => {
//   const getMergedStyle = (key: keyof typeof defaultStyles): MarkdownStyle => {
//     return [defaultStyles[key], styles[key]];
//   };

//   const parseInlineMarkdown = (text: string) => {
//     const elements: (JSX.Element | string)[] = [];
//     let remaining = text;
//     let index = 0;

//     const applyRegex = (
//       regex: RegExp,
//       styleKey: keyof typeof defaultStyles,
//       isLink = false,
//       isCode = false,
//       isHtmlTag = false,
//       isColor = false,
//       renderText?: (
//         value: string,
//         match?: RegExpExecArray,
//       ) => string | JSX.Element,
//     ) => {
//       regex.lastIndex = 0;
//       const match = regex.exec(remaining);
//       if (match) {
//         const [full, inner, inner2] = match;
//         const before = remaining.substring(0, match.index);
//         const after = remaining.substring(match.index + full.length);
//         if (before) elements.push(before);

//         if (isLink) {
//           elements.push(
//             <Text
//               key={`link-${index++}`}
//               style={getMergedStyle(styleKey)}
//               onPress={() => Linking.openURL(inner2)}
//             >
//               {inner}
//             </Text>,
//           );
//         } else if (isColor) {
//           // Handle color syntax :::{.color-blue}text:::
//           const colorName = (inner || '').trim();
//           const coloredText = (inner2 || '').trim();

//           console.log(
//             'Color processing - Color:',
//             colorName,
//             'Text:',
//             coloredText,
//           );

//           // Get actual color value from mapping
//          if (coloredText.length > 0) {
//   const colorValue = COLOR_MAP[colorName.toLowerCase()] || '#000000';
//   elements.push(
//     <Text key={`color-${index++}`} style={{ color: colorValue }}>
//       {coloredText}
//     </Text>
//   );
// }
//         } else if (isHtmlTag && renderText) {
//           const rendered = renderText(inner, match);
//           if (typeof rendered === 'string') {
//             elements.push(rendered);
//           } else {
//             elements.push(rendered);
//           }
//         } else {
//           elements.push(
//             <Text key={`styled-${index++}`} style={getMergedStyle(styleKey)}>
//               {inner}
//             </Text>,
//           );
//         }

//         remaining = after;
//         return true;
//       }
//       return false;
//     };

//     while (remaining.length) {
//       const patterns = [
//         // COLOR PATTERN FIRST
//         {
//           // Match lines like ::: {.color-blue}Text:::
//           regex: /^:::\{\.color-([a-zA-Z]+)\}(.*?):::$/g,
//           style: ['paragraph'],
//           isColor: true,
//         },
//         { regex: /\*\*\*(.*?)\*\*\*/g, style: ['bold', 'italic'] },
//         { regex: /\*\*(.*?)\*\*/g, style: ['bold'] },
//         { regex: /_(.*?)_/g, style: ['italic'] },
//         { regex: /`([^`]+)`/g, style: ['code'], isCode: true },
//         { regex: /\[(.*?)\]\((.*?)\)/g, style: ['link'], isLink: true },
//         { regex: /<b>(.*?)<\/b>/i, style: ['bold'], isHtmlTag: true },
//         { regex: /<i>(.*?)<\/i>/i, style: ['italic'], isHtmlTag: true },
//         { regex: /<u>(.*?)<\/u>/i, style: ['underline'], isHtmlTag: true },
//         {
//           regex: /<br\s*\/?>/i,
//           style: ['paragraph'],
//           isHtmlTag: true,
//           renderText: () => '\n',
//         },
//       ];

//       let matched = false;
//       for (const pattern of patterns) {
//         if (
//           applyRegex(
//             pattern.regex,
//             pattern.style[0] as keyof typeof defaultStyles,
//             pattern.isLink,
//             pattern.isCode,
//             pattern.isHtmlTag,
//             pattern.isColor,
//             pattern.renderText,
//           )
//         ) {
//           matched = true;
//           break;
//         }
//       }

//       if (!matched) {
//         elements.push(remaining);
//         break;
//       }
//     }

//     return <Text>{elements}</Text>;
//   };

//   const renderMarkdown = () => {
//     const lines = content.split('\n');
//     const result: JSX.Element[] = [];
//     let inCodeBlock = false;
//     let codeBlockContent: string[] = [];

//     lines.forEach((line, index) => {
//       if (line.trim() === '```') {
//         inCodeBlock = !inCodeBlock;
//         if (!inCodeBlock) {
//           result.push(
//             <View key={`code-${index}`} style={getMergedStyle('codeBlock')}>
//               <Text style={getMergedStyle('code')}>
//                 {codeBlockContent.join('\n')}
//               </Text>
//             </View>,
//           );
//           codeBlockContent = [];
//         }
//         return;
//       }

//       if (inCodeBlock) {
//         codeBlockContent.push(line);
//         return;
//       }

//       const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
//       if (imgMatch) {
//         const altText = imgMatch[1];
//         const imgPath = imgMatch[2];
//         const source = resolveImageSource
//           ? resolveImageSource(imgPath)
//           : { uri: imgPath };

//         result.push(
//           <Image
//             key={`img-${index}`}
//             source={source}
//             style={getMergedStyle('image') as StyleProp<ImageStyle>}
//             accessibilityLabel={altText}
//           />,
//         );
//         return;
//       }

//       const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
//       if (headingMatch) {
//         const level = headingMatch[1].length;
//         const headingText = headingMatch[2];
//         const styleKey = `heading${level}` as keyof typeof defaultStyles;
//         result.push(
//           <Text key={`heading-${index}`} style={getMergedStyle(styleKey)}>
//             {headingText}
//           </Text>,
//         );
//         return;
//       }

//       if (line.startsWith('>')) {
//         result.push(
//           <View
//             key={`quote-${index}`}
//             style={getMergedStyle('blockquoteContainer')}
//           >
//             <Text style={getMergedStyle('blockquoteText')}>
//               {line.replace(/^>\s?/, '')}
//             </Text>
//           </View>,
//         );
//         return;
//       }

//       if (line.trim().startsWith('- ')) {
//         result.push(
//           <View key={`list-${index}`} style={getMergedStyle('bulletRow')}>
//             <Text style={getMergedStyle('bullet')}>{'\u2022'}</Text>
//             <Text style={getMergedStyle('listText')}>
//               {parseInlineMarkdown(line.replace('- ', ''))}
//             </Text>
//           </View>,
//         );
//         return;
//       }

//       const numberedMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
//       if (numberedMatch) {
//         result.push(
//           <View key={`list-num-${index}`} style={getMergedStyle('bulletRow')}>
//             <Text style={getMergedStyle('bullet')}>
//               {numberedMatch[1] + '.'}
//             </Text>
//             <Text style={getMergedStyle('listText')}>
//               {parseInlineMarkdown(numberedMatch[2])}
//             </Text>
//           </View>,
//         );
//         return;
//       }

//       if (line.trim()) {
//         result.push(
//           <Text key={`text-${index}`} style={getMergedStyle('paragraph')}>
//             {parseInlineMarkdown(line)}
//           </Text>,
//         );
//       }
//     });

//     return result;
//   };

//   return <View>{renderMarkdown()}</View>;
// };

// export default CustomMarkdown;

// const defaultStyles = StyleSheet.create({
//   paragraph: {
//     fontSize: 16,
//     lineHeight: 24,
//     color: '#333',
//     marginBottom: 8,
//   },
//   heading1: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   heading2: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginVertical: 8,
//   },
//   heading3: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginVertical: 6,
//   },
//   heading4: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 4,
//   },
//   heading5: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginVertical: 4,
//   },
//   heading6: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginVertical: 2,
//   },
//   bold: {
//     fontWeight: 'bold',
//   },
//   italic: {
//     fontStyle: 'italic',
//   },
//   underline: {
//     textDecorationLine: 'underline',
//   },
//   code: {
//     backgroundColor: '#f4f4f4',
//     padding: 4,
//     borderRadius: 4,
//   },
//   codeBlock: {
//     backgroundColor: '#eee',
//     padding: 10,
//     borderRadius: 6,
//     marginVertical: 10,
//   },
//   blockquoteContainer: {
//     borderLeftWidth: 4,
//     borderLeftColor: '#ccc',
//     paddingLeft: 10,
//     marginVertical: 8,
//   },
//   blockquoteText: {
//     fontStyle: 'italic',
//     color: '#666',
//   },
//   bulletRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 6,
//   },
//   bullet: {
//     fontSize: 16,
//     lineHeight: 24,
//     marginRight: 6,
//     fontWeight: 'bold',
//   },
//   listText: {
//     flex: 1,
//     fontSize: 16,
//     lineHeight: 24,
//   },
//   link: {
//     color: '#007AFF',
//     textDecorationLine: 'underline',
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'contain',
//     marginVertical: 10,
//   },
// });

import React, { JSX } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Linking,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageStyle,
} from 'react-native';

// --- Types ---
type MarkdownStyle = StyleProp<TextStyle | ViewStyle | ImageStyle>;

type CustomMarkdownProps = {
  content: string;
  styles?: Partial<Record<keyof typeof defaultStyles, MarkdownStyle>>;
  resolveImageSource?: (path: string) => any;
};

// Optional color map (Kept for convenience, allowing names like 'red')
const COLOR_MAP: Record<string, string> = {
  blue: '#007AFF',
  red: '#FF3B30',
  green: '#34C759',
  orange: '#FF9500',
  yellow: '#FFCC00',
  purple: '#5856D6',
  pink: '#FF2D55',
  brown: '#A2845E',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#8E8E93',
};

// --- Component ---
const CustomMarkdown: React.FC<CustomMarkdownProps> = ({
  content,
  styles = {},
  resolveImageSource,
}) => {
  // We need to keep a consistent index for key generation across recursive calls
  let globalIndex = 0; 
  
  const getMergedStyle = (key: keyof typeof defaultStyles): MarkdownStyle => {
    return [defaultStyles[key], styles[key]];
  };

  /** Parses inline markdown and supports <color style="#xxxxxx">text</color> */
  const parseInlineMarkdown = (text: string): JSX.Element => {
    const elements: (JSX.Element | string)[] = [];
    let remaining = text;
    // local index is used for array iteration, globalIndex for unique React keys
    let localIndex = 0;

    const applyRegex = (
      regex: RegExp,
      styleKey: keyof typeof defaultStyles,
      options: {
        isLink?: boolean;
        isCode?: boolean;
        isHtmlTag?: boolean;
        renderText?: (value: string, match?: RegExpExecArray) => string | JSX.Element;
      } = {},
    ) => {
      // Ensure the regex is not global or reset its index if it is
      regex.lastIndex = 0; 
      const match = regex.exec(remaining);
      
      if (match) {
        // group1 is the first captured group, group2 is the second (if present)
        const [full, group1, group2] = match;
        const before = remaining.substring(0, match.index);
        const after = remaining.substring(match.index + full.length);
        if (before) elements.push(before);

        if (options.isLink) {
          // Standard Markdown Link: [text](url) -> group1=text, group2=url
          elements.push(
            <Text
              key={`link-${globalIndex++}`}
              style={getMergedStyle(styleKey)}
              onPress={() => Linking.openURL(group2)}
            >
              {group1}
            </Text>,
          );
        } else if (options.isHtmlTag && options.renderText) {
          // Custom HTML Tags (like <color>, <b>, <br/>)
          const rendered = options.renderText(group1, match);
          elements.push(rendered);
        } else {
          // Standard Markdown (Bold, Italic, Code) -> group1=content
          elements.push(
            <Text key={`styled-${globalIndex++}`} style={getMergedStyle(styleKey)}>
              {group1}
            </Text>,
          );
        }

        remaining = after;
        return true;
      }
      return false;
    };

    while (remaining.length) {
      const patterns = [
        // 1. Custom Color Tag with Nested Parsing Support (Highest Priority)
        // match[1] = Color value (e.g., "#007AFF" or "red")
        // match[2] = Text content (e.g., "Hello **World**")
        {
          regex: /<color\s+style="([^"]+)">([\s\S]*?)<\/color>/i,
          style: 'paragraph',
          options: {
            isHtmlTag: true,
            renderText: (_: string, match?: RegExpExecArray) => {
              const colorAttribute = match ? match[1] : 'black';
              const textContent = match ? match[2] : '';
              
              const colorValue = COLOR_MAP[colorAttribute.toLowerCase()] || colorAttribute;

              // Recursive call: Correctly parse content and extract its children
              const nestedResult = parseInlineMarkdown(textContent).props.children;
              
              return (
                <Text key={`color-${globalIndex++}`} style={{ color: colorValue }}>
                  {nestedResult}
                </Text>
              );
            },
          },
        },
        // 2. Strong/Emphasis Markdown
        { regex: /\*\*\*(.*?)\*\*\*/g, style: 'bold', options: {} },
        { regex: /\*\*(.*?)\*\*/g, style: 'bold', options: {} },
        { regex: /_(.*?)_/g, style: 'italic', options: {} },
        // 3. Code and Links
        { regex: /`([^`]+)`/g, style: 'code', options: {} },
        { regex: /\[(.*?)\]\((.*?)\)/g, style: 'link', options: { isLink: true } },
        // 4. Other HTML Tags (FIXED: Explicitly typed 'value' as string)
        {
          regex: /<b>(.*?)<\/b>/i,
          style: 'bold',
          options: {
            isHtmlTag: true,
            renderText: (value: string) => (
              <Text key={`b-${globalIndex++}`} style={getMergedStyle('bold')}>{value}</Text>
            ),
          },
        },
        {
          regex: /<i>(.*?)<\/i>/i,
          style: 'italic',
          options: {
            isHtmlTag: true,
            renderText: (value: string) => (
              <Text key={`i-${globalIndex++}`} style={getMergedStyle('italic')}>{value}</Text>
            ),
          },
        },
        {
          regex: /<u>(.*?)<\/u>/i,
          style: 'underline',
          options: {
            isHtmlTag: true,
            renderText: (value: string) => (
              <Text key={`u-${globalIndex++}`} style={getMergedStyle('underline')}>{value}</Text>
            ),
          },
        },
        {
          regex: /<br\s*\/?>/i,
          style: 'paragraph',
          options: {
            isHtmlTag: true,
            renderText: () => '\n',
          },
        },
      ];

      let matched = false;
      for (const pattern of patterns) {
        if (applyRegex(pattern.regex, pattern.style as keyof typeof defaultStyles, pattern.options)) {
          matched = true;
          break;
        }
      }

      if (!matched) {
        elements.push(remaining);
        break;
      }
    }
    
    // We use a local index for the final wrapping Text component key
    return <Text key={`inline-wrapper-${localIndex++}`}>{elements}</Text>;
  };

  /** Parses block-level markdown lines */
  const renderMarkdown = () => {
    const lines = content.split('\n');
    const result: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let blockIndex = 0; // Use a dedicated index for block-level elements

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.trim() === '```') {
        inCodeBlock = !inCodeBlock;
        if (!inCodeBlock) {
          result.push(
            <View key={`code-block-${blockIndex++}`} style={getMergedStyle('codeBlock')}>
              <Text style={getMergedStyle('code')}>{codeBlockContent.join('\n')}</Text>
            </View>,
          );
          codeBlockContent = [];
        }
        return;
      }
      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }
      
      // ... (other block-level logic like images, headings, etc. using parseInlineMarkdown) ...

      // Handle paragraph
      if (line.trim()) {
        result.push(
          <Text key={`text-${blockIndex++}`} style={getMergedStyle('paragraph')}>
            {parseInlineMarkdown(line)}
          </Text>,
        );
      } else {
        // Handle empty lines for spacing
        result.push(<Text key={`spacer-${blockIndex++}`}>{'\n'}</Text>);
      }
    });

    return result;
  };

  return <View style={getMergedStyle('container')}>{renderMarkdown()}</View>;
};

// --- Default Styles (MUST be defined for the component to work) ---
const defaultStyles = StyleSheet.create({
  container: {
    // Add a container style if needed
  },
  paragraph: { fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 8 },
  heading1: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  heading2: { fontSize: 22, fontWeight: 'bold', marginVertical: 8 },
  heading3: { fontSize: 20, fontWeight: 'bold', marginVertical: 6 },
  heading4: { fontSize: 18, fontWeight: 'bold', marginVertical: 4 },
  heading5: { fontSize: 16, fontWeight: 'bold', marginVertical: 4 },
  heading6: { fontSize: 14, fontWeight: 'bold', marginVertical: 2 },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  underline: { textDecorationLine: 'underline' },
  code: { backgroundColor: '#f4f4f4', padding: 4, borderRadius: 4 },
  codeBlock: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  blockquoteContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#ccc',
    paddingLeft: 10,
    marginVertical: 8,
  },
  blockquoteText: { fontStyle: 'italic', color: '#666' },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
  bullet: { fontSize: 16, lineHeight: 24, marginRight: 6, fontWeight: 'bold' },
  listText: { flex: 1, fontSize: 16, lineHeight: 24 },
  link: { color: '#007AFF', textDecorationLine: 'underline' },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
});

export default CustomMarkdown;