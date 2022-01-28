import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import * as PropTypes from 'prop-types';

type defaultPropTypes = {
  index: number,
  dotColor: string,
  activeDotColor: string,
  data: Record<string, string>[],
}

const Pagination = ({ data, index, dotColor, activeDotColor }:defaultPropTypes) => {
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
    paginationDotActive: { backgroundColor: activeDotColor },
    paginationDotInactive: { backgroundColor: dotColor },
  });
  return (
    <View style={styles.pagination} pointerEvents="none">
      {data.map((item, i) => {
        return (
          <View
            key={item.id.toString()}
            style={[
              styles.paginationDot,
              index === i ? styles.paginationDotActive : styles.paginationDotInactive,
            ]}
          />
        );
      })}
    </View>
  );
};

Pagination.defaultProps = {
  dotColor: 'gray',
  activeDotColor: 'lightblue',
};

Pagination.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dotColor: PropTypes.string,
  activeDotColor: PropTypes.string,
};

export default memo(Pagination);
