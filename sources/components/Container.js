import React from "react";
import { View, SafeAreaView, StyleSheet, Animated, ScrollView } from "react-native";
import { colors } from "../themes/colors";

const Container = ({
  /* BORDER RADIUS: radius, top-start, top-end, bottom-start, bottom-end... radius (number) */
  r, rTopStart, rTopEnd, rBottomStart, rBottomEnd,
  
  /* BORDER WIDTH: border, border-left, border-right, border-top, border-bottom...width (number) */
  b, bl, br, bt, bb,
  
  /* BORDER WIDTH: border, border-left, border-right, border-top, border-bottom...color (number) */
  bColor, blColor, brColor, btColor, bbColor,
  
  /* BORDER STYLE: enum */
  solid, dotted, dashed,
  
  /* MARGIN: number */
  m, ml, mr, mt, mb, mh, mv,
  
  /* PADDING: number */
  p, pl, pr, pt, pb, ph, pv,
  
  /* BACKGROUNDCOLOR: string | rgba */
  bgColor,
  
  /* JUSTIFY-CONTENT: justifyStart, justifyCenter, justifyEnd */
  jStart, jCenter, jEnd,
  
  /* JUSTIFY-SPACE: space-around, space-between, space-evenly */
  around, between, evenly,
  
  /* ALIGN-ITEMS: alignStart, alignCenter, alignEnd */
  aStart, aCenter, aEnd,
  
  /* FLEX-WRAP: wrap */
  wrap,
  
  /* FLEX-DIRECTION: row, column */
  row, column,
  
  /* ALIGN-SELF: center */
  center,
  
  /* POSITION: absolute, relative, left, right, top, bottom */
  absolute, relative, left, right, top, bottom,
  
  /* SHADOW */
  shadow,

  /* FLEX-BOX */
  flex,

  /* SAFE AREA FOR IOS */
  safe,

  /* WIDTH AND HEIGHT */
  width, height,

  /* SCROLLVIEW */
  scrollView,
  hideVerticalScroll,
  hideHorizontalScroll,

  /* ANIMATED */
  animated,

  /* more properties */
  children,
  style,
  ...props
}) => {
  const containerStyle = [
    flex != 0 && { flex: flex },
    { width: width },
    { height: height },
    { borderRadius: r },
    { borderTopLeftRadius: rTopStart },
    { borderTopRightRadius: rTopEnd },
    { borderBottomLeftRadius: rBottomStart },
    { borderBottomRightRadius: rBottomEnd },
    { backgroundColor: bgColor },
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
    { borderWidth: b },
    { borderTopWidth: bt },
    { borderBottomWidth: bb },
    { borderLeftWidth: bl },
    { borderRightWidth: br },
    { borderColor: bColor },
    { borderTopColor: btColor },
    { borderBottomColor: bbColor },
    { borderLeftColor: blColor },
    { borderRightColor: brColor },
    { backgroundColor: bgColor },
    between && { justifyContent: "space-between" },
    around && { justifyContent: "space-around" },
    evenly && { justifyContent: "space-evenly" },
    jStart && { justifyContent: "flex-start" },
    jCenter && { justifyContent: "center" },
    jEnd && { justifyContent: "flex-end" },
    aStart && { alignItems: "flex-start" },
    aCenter && { alignItems: "center" },
    aEnd && { alignItems: "flex-end" },
    center && { alignSelf: "center" },
    wrap && { flexWrap: "wrap" },
    row && { flexDirection: "row" },
    column && { flexDirection: "column" },
    dotted && { borderStyle: "dotted" },
    dashed && { borderStyle: "dashed" },
    absolute && { position: "absolute" },
    relative && { position: "relative" },
    top !== -1 && { top: top },
    left !== -1 && { left: left },
    right !== -1 && { right: right },
    bottom !== -1 && { bottom: bottom },
    shadow && styles.shadow,
    style,
  ];

  if (animated) {
    return (
      <Animated.View style={containerStyle} {...props}>
        {children}
      </Animated.View>
    );
  }

  if (scrollView) {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsHorizontalScrollIndicator={hideHorizontalScroll ? false : true}
          showsVerticalScrollIndicator={hideVerticalScroll ? false : true}>
          <View style={containerStyle} {...props}>
            {children}
          </View>
        </ScrollView>
      </View>
    );
  }

  if (safe) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={containerStyle} {...props}>
          {children}
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <View style={containerStyle} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffSet: { width: -1, height: 1 },
    shadowColor: colors.SHADOW,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default Container;
