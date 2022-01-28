import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';

type defaultPropTypes = {
  index: number,
  dotColor: string,
  activeDotColor: string,
  data: Record<string, string>[],
}

const Pagination = ({ data, index, dotColor = 'gray', activeDotColor = 'lightblue' }: defaultPropTypes) => {
  const styles = StyleSheet.create({
    pagination: {
      width: '100%',
      justifyContent: 'center',
      flexDirection: 'row',
      zIndex: 9999,
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 2,
    },
    dotActive: { backgroundColor: activeDotColor },
    dotInactive: { backgroundColor: dotColor },
  });
  return (
    <View style={ styles.pagination } pointerEvents='none'>
      { data.map((item, i) => {
        return (
          <View
            key={ item.id.toString() }
            style={ [
              styles.paginationDot,
              index === i ? styles.dotActive : styles.dotInactive,
            ] }
          />
        );
      }) }
    </View>
  );
};

export default memo(Pagination);
