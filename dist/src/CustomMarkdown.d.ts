import React from 'react';
import { StyleProp, TextStyle, ViewStyle, ImageStyle } from 'react-native';
type MarkdownStyle = StyleProp<TextStyle | ViewStyle | ImageStyle>;
type CustomMarkdownProps = {
    content: string;
    styles?: Partial<Record<keyof typeof defaultStyles, MarkdownStyle>>;
    resolveImageSource?: (path: string) => any;
};
declare const CustomMarkdown: React.FC<CustomMarkdownProps>;
declare const defaultStyles: {
    container: {};
    paragraph: {
        fontSize: number;
        lineHeight: number;
        color: string;
        marginBottom: number;
    };
    heading1: {
        fontSize: number;
        fontWeight: "bold";
        marginVertical: number;
    };
    heading2: {
        fontSize: number;
        fontWeight: "bold";
        marginVertical: number;
    };
    heading3: {
        fontSize: number;
        fontWeight: "bold";
        marginVertical: number;
    };
    heading4: {
        fontSize: number;
        fontWeight: "bold";
        marginVertical: number;
    };
    heading5: {
        fontSize: number;
        fontWeight: "bold";
        marginVertical: number;
    };
    heading6: {
        fontSize: number;
        fontWeight: "bold";
        marginVertical: number;
    };
    bold: {
        fontWeight: "bold";
    };
    italic: {
        fontStyle: "italic";
    };
    underline: {
        textDecorationLine: "underline";
    };
    code: {
        backgroundColor: string;
        padding: number;
        borderRadius: number;
    };
    codeBlock: {
        backgroundColor: string;
        padding: number;
        borderRadius: number;
        marginVertical: number;
    };
    blockquoteContainer: {
        borderLeftWidth: number;
        borderLeftColor: string;
        paddingLeft: number;
        marginVertical: number;
    };
    blockquoteText: {
        fontStyle: "italic";
        color: string;
    };
    bulletRow: {
        flexDirection: "row";
        alignItems: "flex-start";
        marginBottom: number;
    };
    bullet: {
        fontSize: number;
        lineHeight: number;
        marginRight: number;
        fontWeight: "bold";
    };
    listText: {
        flex: number;
        fontSize: number;
        lineHeight: number;
    };
    link: {
        color: string;
        textDecorationLine: "underline";
    };
    image: {
        width: "100%";
        height: number;
        resizeMode: "contain";
        marginVertical: number;
    };
};
export default CustomMarkdown;
//# sourceMappingURL=CustomMarkdown.d.ts.map