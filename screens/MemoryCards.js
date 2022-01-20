import React, {Fragment, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Pressable,
} from 'react-native';

const imageData = [
  {id: 1, name: require('../assets/images/Animals/1.png'), flag: false},
  {id: 2, name: require('../assets/images/Animals/2.png'), flag: false},
  {id: 3, name: require('../assets/images/Animals/3.png'), flag: false},
  {id: 4, name: require('../assets/images/Animals/4.png'), flag: false},
  {id: 5, name: require('../assets/images/Animals/5.png'), flag: false},
  {id: 6, name: require('../assets/images/Animals/6.png'), flag: false},
  {id: 7, name: require('../assets/images/Animals/7.png'), flag: false},
  {id: 8, name: require('../assets/images/Animals/8.png'), flag: false},
  {id: 9, name: require('../assets/images/Animals/9.png'), flag: false},
  {id: 10, name: require('../assets/images/Animals/10.png'), flag: false},
];

const MemoryCards = () => {
  // const [firstCard, setFirstCard] = useState(false);
  // const [secondCard, setSecondCard] = useState(false);
  const [data, setData] = useState([]);
  const [flipRotation, setFlipRotation] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const shuffledData = () => {
    let a = [...imageData, ...imageData];
    const t = a.sort(() => Math.random() - 0.5);
    const result = t.map((item, index) => {
      return {...item, key: index};
    });
    return result;
  };

  useEffect(() => {
    setData(shuffledData());
    // animationDataAndStyles();
  }, []);

  console.log('data length - ', data.length);

  // let flipRotation = [
  //   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  // ];

  const animationValue = flipRotation.map(
    _ => useRef(new Animated.Value(0)).current,
  );

  console.log('animationValue - ', animationValue);

  flipRotation.map((_, index) =>
    animationValue[index].addListener(
      ({value}) => (flipRotation[index] = value),
    ),
  );

  const flipToBack = flipRotation.map((_, index) => () => {
    Animated.timing(animationValue[index], {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  });

  // -----------------------------------------------

  const flipToFront = flipRotation.map((_, index) => () => {
    Animated.timing(animationValue[index], {
      toValue: 180,
      duration: 200,
      useNativeDriver: true,
    }).start();
  });

  // -----------------------------------------------
  const flipCard = index => {
    if (flipRotation[index] > 0) {
      flipToFront[index]();
    } else if (flipRotation[index] < 180) {
      flipToBack[index]();
    }
  };

  // -----------------------------------------------

  const flipToFrontStyle = flipRotation.map((_, index) => ({
    transform: [
      {
        rotateY: animationValue[index].interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  }));

  // -----------------------------------------------

  const flipToBackStyle = flipRotation.map((_, index) => ({
    transform: [
      {
        rotateY: animationValue[index].interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '0deg'],
        }),
      },
    ],
  }));

  // FIXME:  set reset logic
  const reset = () => {
    const temp = flipRotation.map(item => (item = 0));
    setFlipRotation(temp);

    flipRotation.map((_, index) => {
      animationValue[index].addListener(
        ({value}) => (flipRotation[index] = value),
      );
      flipToBackStyle[index];
    });
  };

  console.log('fliprotetion - ', flipRotation);

  const ImageCard = ({item, index}) => {
    return (
      <>
        <Pressable
          onPress={() => {
            item.flag = !item.flag;
            console.log('clicked item - ', item);
            console.log('key = ', item.key);
            console.log('index - ', index);
            console.log('flipRotation[index] - ', flipRotation[index]);

            flipCard(index);
            !!flipRotation[index] ? flipToBack[index]() : flipToFront[index]();
          }}>
          <Animated.Image
            style={[styles.cardFront, flipToBackStyle[index], styles.image]}
            source={item.name}
          />
          <Animated.Image
            style={[styles.cardBack, flipToFrontStyle[index], styles.image]}
            source={require('../assets/images/deck.png')}
          />
        </Pressable>
        {/* <Animated.Image
          style={[styles.cardFront, flipToBackStyle, styles.image]}
          source={item.name}
        /> */}
        {/* <Animated.Image
          style={[styles.cardBack, flipToFrontStyle, styles.image]}
          source={require('../assets/images/deck.png')}
        /> */}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowSpace}>
        <Text style={styles.time}>Time: 00:00</Text>
        <TouchableOpacity onPress={reset} style={styles.reset}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <>
          {data?.map(item => {
            return (
              <React.Fragment key={item.key}>
                <ImageCard item={item} index={item.key} />
              </React.Fragment>
            );
          })}
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    borderWidth: 1,
    backgroundColor: 'rgba(42, 101, 59, 1.0)',
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reset: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
  },
  resetText: {
    color: '#fff',
    marginHorizontal: 6,
  },
  time: {
    color: '#fff',
  },
  imageContainer: {
    // height: '60%',
    flex: 2,
    marginTop: 24,
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  image: {
    height: 90,
    width: 66,
    margin: 8,
  },
  cardFront: {
    position: 'absolute',
  },
  cardBack: {
    backfaceVisibility: 'hidden',
  },
  // refreshText: {
  //   color: '#fff',
  //   marginHorizontal: 6,
  // },
  // refreshTouch: {
  //   borderWidth: 1,
  //   borderColor: '#fff',
  //   borderRadius: 4,
  //   alignSelf: 'flex-start',
  //   marginTop: 16
  // }
});

export default MemoryCards;
