import { StyleSheet, Text, Animated } from 'react-native'
import React from 'react'

const Typography = ({
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
    light, bold, medium,
    /*
        *TYPOGRAPHY STYLE
    */
    italic,
    /*
        *COLORS: string | rgba
    */
    color, 
    /*
        *TEXT ALIGNMENT
    */
    left, right, center, justify,
    /*
        *LINE HEIGHT: number
    */
    lineHeight,
    /*
        *LETTER SPACING: number
    */
    letterSpacing,
    /*
        *TYPOGRAPHY DECORATION: enum('none', 'underline', 'line-through', 'underline line-through')
    */
    underline, lineThrough, underlineLineThrough,
    /*
        *TYPOGRAPHY TRANSFORM: enum('none', 'uppercase', 'lowercase', 'capitalize')
    */
    uppercase, capitalize,
    /*
        *Properties
    */
    /* 
      adjustFontSizeTofit: fonts should be scaled down automatically to fit given style constraints.
      type: bool - default value: false
    */
    adjustsFontSizeToFit,
    /* 
      allowFontScaling: fonts should scale to respect Text Size accessibility settings.
      type: bool - default value: true
    */
    allowFontScaling,
    /* 
      numberOfLines: truncate the text with an ellipsis after computing the text layout
      type: number - default value: 0
    */
    numberOfLines,
    /* 
      numberOfLines: this prop defines how the text will be truncated.
      type: enum('head', 'middle', 'tail', 'clip') - default value: tail
    */
    ellipsizeMode,
    /* 
      onPress - onLongPress: This function is called on long press or on press.
      type:({nativeEvent: PressEvent}) => void
    */
    onPress, onLongPress,
    /* more properties */
    width,
    animated, 
    children,
    style,
    ...props
}) => {
  const textStyles = [
    display && {fontSize: 42},
    header && {fontSize: 34},
    title && {fontSize: 28},
    subtitle && {fontSize: 22},
    headline && {fontSize: 20},
    body && {fontSize: 16},
    paragraph && {fontSize: 14},
    caption && {fontSize: 12},
    size && {fontSize: size},
    m && {margin: m},
    ml && {marginLeft: ml},
    mr && {marginRight: mr},
    mt && {marginTop: mt},
    mb && {marginBottom: mb},
    mh && {marginHorizontal: mh},
    mv && {marginVertical: mv},
    p && {padding: p},
    pl && {paddingLeft: pl},
    pr && {paddingRight: pr},
    pt && {paddingTop: pt},
    pb && {paddingBottom: pb},
    ph && {paddingHorizontal: ph},
    pv && {paddingVertical: pv},
    !bold && light && {fontWeight: '300'},
    !light && bold && {fontWeight: 'bold'},
    medium && !light && !bold && {fontWeight: '400'},
    italic && {fontStyle: 'italic'},
    color && {color: color},
    width && {width: width},
    left && {textAlign: 'left'},
    right && {textAlign: 'right'},
    center && {textAlign: 'center'},
    justify && {textAlign: 'justify'},
    lineHeight && {lineHeight: lineHeight},
    letterSpacing && {letterSpacing: letterSpacing},
    underline && {textDecorationLine: 'underline'},
    lineThrough && {textDecorationLine: 'line-through'},
    underlineLineThrough && {textDecorationLine: 'underline line-through'},
    uppercase && {textTransform: 'uppercase'},
    capitalize && {textTransform: 'capitalzie'},
  ]
  if (animated) {
    return (
      <Animated.Text
        adjustsFontSizeToFit={adjustsFontSizeToFit}
        allowFontScaling={false} 
        numberOfLines={numberOfLines} 
        ellipsizeMode={ellipsizeMode} 
        style={textStyles}
        onPress={onPress}
        onLongPress={onLongPress} 
        {...props}>
          {children}
      </Animated.Text>
    );
  }
  return (
    <Text 
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      allowFontScaling={false} 
      numberOfLines={numberOfLines} 
      ellipsizeMode={ellipsizeMode} 
      style={textStyles}
      onPress={onPress}
      onLongPress={onLongPress} 
      {...props}>
        {children}
    </Text>
  );
}

export default Typography

