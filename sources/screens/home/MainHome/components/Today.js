import React from 'react'
import { StyleSheet, Dimensions, FlatList } from 'react-native'
import { Container, Text } from '../../../../components'
import { colors } from '../../../../themes/colors'

const Today = ({ label, data, keyExtractor, renderItem, ...props }) => {
  return (
    <Container width={'100%'} mv={16} wrap>
      <Text color={colors.BLACK} size={16} bold>{label}</Text>
      <FlatList 
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        {...props}
      />
    </Container>    
  )
}

export default Today

const styles = StyleSheet.create({})