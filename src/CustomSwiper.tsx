import React, { useCallback, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Platform, StyleSheet, View } from 'react-native';
// import Pagination from './Pagination';

type defaultPropTypes = {
  height: number,
  dotColor: string,
  activeDotColor: string,
  showsPagination: boolean,
  data: [],
  renderSlide: ({ item }: { item: any; }) => JSX.Element,
  ListHeaderComponent: any,
  ListFooterComponent: any,
}

const CustomSwiper = ({
                        height = 100,
                        // dotColor = 'gray',
                        // activeDotColor = 'lightblue',
                        // showsPagination = true,
                        data = [],
                        renderSlide,
                        ListHeaderComponent,
                        ListFooterComponent,
                      }: defaultPropTypes) => {
  const { width: windowWidth } = Dimensions.get('window');
  const [scrollViewWidth, setScrollViewWidth] = React.useState(0);
  const boxWidth = scrollViewWidth * 0.9;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const pan = React.useRef(new Animated.ValueXY()).current;

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
  // onScroll={Animated.event(
  //   [{ nativeEvent: { contentOffset: { x: pan.x } } }],
  //   {
  //     useNativeDriver: false,
  //   },
  // )}
  // const onScroll = useCallback((event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: number; }; }; }) => {
  //   const slideSize = event.nativeEvent.layoutMeasurement.width;
  //   // eslint-disable-next-line no-shadow
  //   const index = event.nativeEvent.contentOffset.x / slideSize;
  //   const roundIndex = Math.round(index);
  //
  //   const distance = Math.abs(roundIndex - index);
  //
  //   const preventPixelTriggering = distance > 0.4;
  //
  //   if (roundIndex !== indexRef.current && !preventPixelTriggering) {
  //     setIndex(roundIndex);
  //   }
  //   Animated.event(
  //     [{ nativeEvent: { contentOffset: { x: pan.x } } }],
  //     {
  //       useNativeDriver: false,
  //     },
  //   )
  // }, []);

  const renderItem = ({ item, index }: any) => (
    <Animated.View
      style={{
        transform: [
          {
            scale: pan.x.interpolate({
              inputRange: [
                (index - 1) * boxWidth - halfBoxDistance - 150,
                index * boxWidth - halfBoxDistance,
                (index + 1) * boxWidth - halfBoxDistance + 150, // adjust positioning
              ],
              outputRange: [0.90, 1, 0.90], // scale down when out of scope
              extrapolate: 'clamp',
            }),
          },
        ],
      }}>
      <View style={{ height: '100%', width: boxWidth }}>
        { renderSlide({ item }) }
      </View>
    </Animated.View>
  );

  // const renderFooter = () => {
  //   if (!showsPagination || data.length <= 1) return null;
  //   return (
  //     <View style={ { marginTop: 0 } }>
  //       <Pagination index={ index } data={ data } dotColor={ dotColor } activeDotColor={ activeDotColor } />
  //     </View>
  //   );
  // };
  const keyExtractor = useCallback((s: { id: number; }) => String(s.id), []);
  const getItemLayout = useCallback(
    (_: any, eq: number) => ({
      index: eq,
      length: windowWidth,
      offset: eq * windowWidth,
    }),
    [],
  );
  return (
    <View style={ { height: height + 10 } }>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        data={ data }
        style={ styles.carousel }
        renderItem={ renderItem }
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={ false }
        bounces={ false }
        // onScroll={ onScroll }
        initialNumToRender={ 0 }
        maxToRenderPerBatch={ 2 }
        removeClippedSubviews
        windowSize={ 2 }
        keyExtractor={ keyExtractor }
        getItemLayout={ getItemLayout }
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: Platform.OS === 'ios' ? 0 : 20 }}
        contentInsetAdjustmentBehavior="never"
        snapToAlignment="center"
        decelerationRate="fast"
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        snapToInterval={boxWidth}
        contentInset={{
          left: halfBoxDistance,
          right: halfBoxDistance,
        }}
        contentOffset={{ x: halfBoxDistance * -1, y: 0 }}
        onLayout={(e: any) => {
          setScrollViewWidth(e.nativeEvent.layout.width);
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: pan.x } } }],
          {
            useNativeDriver: false,
            listener: (event: any) => {
              const slideSize = event.nativeEvent.layoutMeasurement.width;
              // eslint-disable-next-line no-shadow
              const index = event.nativeEvent.contentOffset.x / slideSize;
              const roundIndex = Math.round(index);

              const distance = Math.abs(roundIndex - index);

              const preventPixelTriggering = distance > 0.4;

              if (roundIndex !== indexRef.current && !preventPixelTriggering) {
                setIndex(roundIndex);
              }
            },
          },
        )}
      />
    </View>
  );
};

export default CustomSwiper;
