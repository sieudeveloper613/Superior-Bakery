import React, {useState} from 'react';
import {Image} from 'react-native';
const ImageView = ({
  imageUri,
  width,
  height,
  radius,
  contain,
  cover,
  stretch,
  center,
  square,
  round,
  style,
  source,
  ...props
}) => {
  const onSquare = params => {
    return {
      width: params,
      height: params,
    };
  };

  const onRound = params => {
    return {
      width: params,
      height: params,
      borderRadius: params / 2,
    };
  };

  const imageStyle = [
    { width: width },
    { height: height },
    { borderRadius: radius },
    square && {...onSquare(square)},
    round && {...onRound(round)},
    style,
  ];

  return (
    <Image
      source={imageUri ? {uri: imageUri} : source}
      resizeMode={ center ? 'center' : contain ? 'contain' : cover ? 'cover' : stretch ? 'stretch' : 'stretch'}
      style={imageStyle}
      {...props}
    />
  );
};

export default ImageView;
