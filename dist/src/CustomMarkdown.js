"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const CustomMarkdown = ({ content, styles = {}, resolveImageSource, }) => {
    const getMergedStyle = (key) => {
        return [defaultStyles[key], styles[key]];
    };
    const parseInlineMarkdown = (text) => {
        const elements = [];
        let remaining = text;
        let index = 0;
        const applyRegex = (regex, styleKey, isLink = false, isCode = false, isHtmlTag = false, renderText) => {
            const match = regex.exec(remaining);
            if (match) {
                const [full, inner, link] = match;
                const before = remaining.substring(0, match.index);
                const after = remaining.substring(match.index + full.length);
                if (before)
                    elements.push(before);
                if (isLink) {
                    elements.push(<react_native_1.Text key={`link-${index++}`} style={getMergedStyle(styleKey)} onPress={() => react_native_1.Linking.openURL(link)}>
              {inner}
            </react_native_1.Text>);
                }
                else if (isHtmlTag && renderText) {
                    elements.push(<react_native_1.Text key={`html-${index++}`} style={getMergedStyle(styleKey)}>
              {renderText(inner)}
            </react_native_1.Text>);
                }
                else {
                    elements.push(<react_native_1.Text key={`styled-${index++}`} style={getMergedStyle(styleKey)}>
              {inner}
            </react_native_1.Text>);
                }
                remaining = after;
                return true;
            }
            return false;
        };
        while (remaining.length) {
            const patterns = [
                { regex: /\*\*\*(.*?)\*\*\*/g, style: ['bold', 'italic'] },
                { regex: /\*\*(.*?)\*\*/g, style: ['bold'] },
                { regex: /_(.*?)_/g, style: ['italic'] },
                { regex: /`([^`]+)`/g, style: ['code'], isCode: true },
                { regex: /\[(.*?)\]\((.*?)\)/g, style: ['link'], isLink: true },
                { regex: /<b>(.*?)<\/b>/i, style: ['bold'], isHtmlTag: true },
                { regex: /<i>(.*?)<\/i>/i, style: ['italic'], isHtmlTag: true },
                { regex: /<u>(.*?)<\/u>/i, style: ['underline'], isHtmlTag: true },
                {
                    regex: /<br\s*\/?>/i,
                    style: ['paragraph'],
                    isHtmlTag: true,
                    renderText: () => '\n',
                },
            ];
            let matched = false;
            for (const pattern of patterns) {
                if (applyRegex(pattern.regex, pattern.style[0], pattern.isLink, pattern.isCode, pattern.isHtmlTag, pattern.renderText)) {
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                elements.push(remaining);
                break;
            }
        }
        return <react_native_1.Text>{elements}</react_native_1.Text>;
    };
    const renderMarkdown = () => {
        const lines = content.split('\n');
        const result = [];
        let inCodeBlock = false;
        let codeBlockContent = [];
        lines.forEach((line, index) => {
            if (line.trim() === '```') {
                inCodeBlock = !inCodeBlock;
                if (!inCodeBlock) {
                    result.push(<react_native_1.View key={`code-${index}`} style={getMergedStyle('codeBlock')}>
              <react_native_1.Text style={getMergedStyle('code')}>
                {codeBlockContent.join('\n')}
              </react_native_1.Text>
            </react_native_1.View>);
                    codeBlockContent = [];
                }
                return;
            }
            if (inCodeBlock) {
                codeBlockContent.push(line);
                return;
            }
            const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
            if (imgMatch) {
                const altText = imgMatch[1];
                const imgPath = imgMatch[2];
                const source = resolveImageSource
                    ? resolveImageSource(imgPath)
                    : { uri: imgPath };
                result.push(<react_native_1.Image key={`img-${index}`} source={source} style={getMergedStyle('image')} accessibilityLabel={altText}/>);
                return;
            }
            const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
            if (headingMatch) {
                const level = headingMatch[1].length;
                const headingText = headingMatch[2];
                const styleKey = `heading${level}`;
                result.push(<react_native_1.Text key={`heading-${index}`} style={getMergedStyle(styleKey)}>
            {headingText}
          </react_native_1.Text>);
                return;
            }
            if (line.startsWith('>')) {
                result.push(<react_native_1.View key={`quote-${index}`} style={getMergedStyle('blockquoteContainer')}>
            <react_native_1.Text style={getMergedStyle('blockquoteText')}>
              {line.replace(/^>\s?/, '')}
            </react_native_1.Text>
          </react_native_1.View>);
                return;
            }
            if (line.trim().startsWith('- ')) {
                result.push(<react_native_1.View key={`list-${index}`} style={getMergedStyle('bulletRow')}>
            <react_native_1.Text style={getMergedStyle('bullet')}>{'\u2022'}</react_native_1.Text>
            <react_native_1.Text style={getMergedStyle('listText')}>
              {parseInlineMarkdown(line.replace('- ', ''))}
            </react_native_1.Text>
          </react_native_1.View>);
                return;
            }
            const numberedMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
            if (numberedMatch) {
                result.push(<react_native_1.View key={`list-num-${index}`} style={getMergedStyle('bulletRow')}>
            <react_native_1.Text style={getMergedStyle('bullet')}>{numberedMatch[1] + '.'}</react_native_1.Text>
            <react_native_1.Text style={getMergedStyle('listText')}>
              {parseInlineMarkdown(numberedMatch[2])}
            </react_native_1.Text>
          </react_native_1.View>);
                return;
            }
            if (line.trim()) {
                result.push(<react_native_1.Text key={`text-${index}`} style={getMergedStyle('paragraph')}>
            {parseInlineMarkdown(line)}
          </react_native_1.Text>);
            }
        });
        return result;
    };
    return <react_native_1.View>{renderMarkdown()}</react_native_1.View>;
};
exports.default = CustomMarkdown;
const defaultStyles = react_native_1.StyleSheet.create({
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        marginBottom: 8,
    },
    heading1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    heading2: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    heading3: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 6,
    },
    heading4: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 4,
    },
    heading5: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 4,
    },
    heading6: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 2,
    },
    bold: {
        fontWeight: 'bold',
    },
    italic: {
        fontStyle: 'italic',
    },
    underline: {
        textDecorationLine: 'underline',
    },
    code: {
        backgroundColor: '#f4f4f4',
        padding: 4,
        borderRadius: 4,
    },
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
    blockquoteText: {
        fontStyle: 'italic',
        color: '#666',
    },
    bulletRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    bullet: {
        fontSize: 16,
        lineHeight: 24,
        marginRight: 6,
        fontWeight: 'bold',
    },
    listText: {
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
    },
    link: {
        color: '#007AFF',
        textDecorationLine: 'underline',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginVertical: 10,
    },
});
