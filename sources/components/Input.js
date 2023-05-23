import React from 'react';
import { TextInput } from 'react-native';

const InputText = ({
    /* 
        *SIZE OF TYPOGRAPHY: 42 | 34 | 28 | 22 | 20 | 16 | 14 | 12 
    */ 
    display, header, title, subtitle, headline, body, paragraph, caption,
    /* 
        *CUSTOM SIZE OF TYPOGRAPHY: number
    */ 
    size,
    /*
        *MARGIN: number
    */
    m, ml, mr, mt, mb, mh, mv,
    /*
        *PADDING: number
    */
    p, pl, pr, pt, pb, ph, pv,
    /*
        *TYPOGRAPHY WEIGHT
    */
    light, bold,
    /*
        *TYPOGRAPHY STYLE
    */
    italic,
    /*
    *COLORS: string | rgba
    */
    color, bgColor,
    /*
        *RADIUS: NUMBER
    */
    radius,
    /*
        *TEXT ALIGNMENT
    */
    left, right, center, justify,
    placeholder,
    placeholderTextColor,
    secureTextEntry,
    email,
    number,
    phone,
    autoFocus,
    height,
    width,
    style,
    editable,
    returnKeyType,
    onSubmitEditing,
    multiline,
    maxLength,
    numberOfLines,
    onChangeText,
    value,
    ref,
    ...props
}) => {
  const inputStyle = [
    display && {fontSize: 42},
    header && {fontSize: 34},
    title && {fontSize: 28},
    subtitle && {fontSize: 22},
    headline && {fontSize: 20},
    body && {fontSize: 16},
    paragraph && {fontSize: 14},
    caption && {fontSize: 12},
    !bold && light && {fontWeight: '200'},
    !light && bold && {fontWeight: 'bold'},
    italic && {fontStyle: 'italic'},
    left && {textAlign: 'left'},
    right && {textAlign: 'right'},
    center && {textAlign: 'center'},
    justify && {justify: 'justify'},
    { borderRadius: radius },
    { backgroundColor: bgColor },
    { color: color },
    { width: width },
    { height: height },
    { fontSize: size },
    { margin: m },
    { marginHorizontal: mh },
    { marginVertical: mv },
    { marginTop: mt },
    { marginBottom: mb },
    { marginLeft: ml },
    { marginRight: mr },
    { padding: p },
    { paddingHorizontal: ph },
    { paddingVertical: pv },
    { paddingTop: pt },
    { paddingBottom: pb },
    { paddingLeft: pl },
    { paddingRight: pr },
    style,
  ];
  const keyboardType = email
    ? 'email-address'
    : number
    ? 'numeric'
    : phone
    ? 'phone-pad'
    : 'default';
  return (
      <TextInput
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
        // autoComplete="off"
        autoCapitalize="none"
        // autoCorrect={false}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        style={inputStyle}
        editable={editable}
        onChangeText={onChangeText}
        value={value}
        {...props}
      />
  );
};

export default InputText;

