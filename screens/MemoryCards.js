import React, {useEffect, useRef, useState} from 'react';
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
  const [firstCardFlip, setFirstCardFlip] = useState(0);
  // // const [currentValue, setCurrentValue] = useState(0)
  const [data, setData] = useState();

  const animationValue = useRef(new Animated.Value(0)).current;

  let flipRotation = 0;
  animationValue.addListener(({value}) => (flipRotation = value));

  const shuffledData = () => {
    let a = [...imageData, ...imageData];
    const t = a.sort(() => Math.random() - 0.5);
    const result = t.map((item, index) => {
      return {...item, key: index};
    });
    // setData(result);
    return result;
  };

  useEffect(() => {
    setData(shuffledData());
  }, []);

  console.log('shuffledData - ', data);
  // console.log('firstCardFlip - ', firstCardFlip);

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: animationValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateY: animationValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '0deg'],
        }),
      },
    ],
  };

  const flipToFront = () => {
    Animated.timing(animationValue, {
      toValue: 180,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const flipToBack = () => {
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const flipCard = () => {
    console.log('flipRotation - ', flipRotation);
    if (flipRotation > 0) {
      flipToFront();
    } else if (flipRotation < 180) {
      flipToBack();
    }
  };

  const selectImage = key => {
    const image = data.find(item => item.key === key);
    return image;
  };

  const ImageCard = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          item.flag = !item.flag;
          console.log('item - ', item);
          console.log('shuffledData - ', data);
          flipCard();
          !!flipRotation ? flipToBack() : flipToFront();
        }}>
        <Animated.Image
          style={[styles.cardFront, flipToBackStyle, styles.image]}
          source={item.name}
        />
        <Animated.Image
          style={[styles.cardBack, flipToFrontStyle, styles.image]}
          source={require('../assets/images/deck.png')}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowSpace}>
        <Text style={styles.time}>Time: 00:00</Text>
        <TouchableOpacity onPress={() => {}} style={styles.reset}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <>
          {data?.map(item => {
            return (
              <>
                <ImageCard item={item} />
              </>
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
