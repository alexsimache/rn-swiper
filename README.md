# rn-swiper

carousel swiper for react native apps

## Installation

```sh
npm install rn-swiper
```
or
```sh
yarn add rn-swiper
```

### Basic Usage

- Install `react-native` first

```bash
$ npm i react-native-cli -g
```

- Initialization of a react-native project

```bash
$ react-native init myproject
```

- Then, edit `App.js`, like this:

```jsx
import React, { Component } from 'react'
import { AppRegistry, Text, View } from 'react-native'

import CustomSwiper from 'rn-swiper'

const data = Array.from({ length: 10 }).map((row, i) => {
  return {
    id: i,
    name: `Name ${i + 1}`,
    desc: `Description ${i + 1}!`,
  };
});

const renderSlide = ({item}) => {
  return (
    <View>
      <Text style={{ fontSize: 12 }}>{item.name}</Text>
      <Text style={{ fontSize: 10 }}>{item.desc}</Text>
    </View>
  )
}

export default class SwiperComponent extends Component {
  render() {
    return (
      <CustomSwiper
        height={100}
        dotColor="grey"
        activeDotColor="blue"
        showsPagination
        data={data}
        renderSlide={renderSlide}
      />
    )
  }
}

AppRegistry.registerComponent('myproject', () => SwiperComponent)
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
