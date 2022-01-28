import React, { useCallback, useRef, useState } from 'react';
import { FlatList, Dimensions, StyleSheet, View } from 'react-native';
import * as PropTypes from 'prop-types';
import Pagination from './Pagination';

type defaultPropTypes = {
  height: number,
  dotColor: string,
  activeDotColor: string,
  showsPagination: boolean,
  data: [],
  renderSlide: ({}) => {},
}

const CustomSwiper = ({ height, dotColor, activeDotColor, showsPagination, data, renderSlide }:defaultPropTypes) => {
  const { width: windowWidth } = Dimensions.get('window');

  const styles = StyleSheet.create({
    carousel: { flex: 1 },
    slide: {
      height,
      width: windowWidth,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
  });
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: number; }; }; }) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    // eslint-disable-next-line no-shadow
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = distance > 0.4;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((s: { id: number; }) => String(s.id), []),
    getItemLayout: useCallback(
      (_: any, eq: number) => ({
        index: eq,
        length: windowWidth,
        offset: eq * windowWidth,
      }),
      [],
    ),
  };

  type itemType = {
    item: Record<string, string>
  };
  const renderItem = ({ item } : itemType) => {
    return <View style={[styles.slide]}>{renderSlide({ item })}</View>;
  };

  const renderFooter = () => {
    if (!showsPagination || data.length <= 1) return null;
    return (
      <View style={{ marginTop: 0 }}>
        <Pagination index={index} data={data} dotColor={dotColor} activeDotColor={activeDotColor} />
      </View>
    );
  };

  return (
    <View style={{ height: height + 10 }}>
      <FlatList
        data={data}
        style={styles.carousel}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      {renderFooter()}
    </View>
  );
};
CustomSwiper.defaultProps = {
  height: 100,
  dotColor: 'gray',
  activeDotColor: 'lightblue',
  showsPagination: true,
  data: [],
  renderSlide: () => {},
};

CustomSwiper.propTypes = {
  height: PropTypes.number,
  dotColor: PropTypes.string,
  activeDotColor: PropTypes.string,
  showsPagination: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  renderSlide: PropTypes.func,
};

export default CustomSwiper;
