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
  // const [firstCard, setFirstCard] = useState(undefined);
  // const [secondCard, setSecondCard] = useState(undefined);

  const firstCard = useRef(undefined);
  const secondCard = useRef(undefined);

  const [data, setData] = useState([]);
  const [flipRotation, setFlipRotation] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  // let flipRotation = [
  //   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  // ];

  console.log('flipRotation - ', flipRotation);
  console.log('length - ', flipRotation.length);
  console.log('data - ', data);
  // console.log('firstCard - ', firstCard);
  // console.log('secondCard - ', secondCard);

  const shuffledData = () => {
    let a = [...imageData, ...imageData];
    const t = a.sort(() => Math.random() - 0.5);
    const result = t.map((item, index) => {
      return {...item, key: index + 1};
    });
    return result;
  };

  useEffect(() => {
    setData(shuffledData());
    // animationDataAndStyles();
  }, []);

  // console.log('data length - ', data.length);

  // let flipRotation = [
  //   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  // ];

  const animationValue = flipRotation.map(
    _ => useRef(new Animated.Value(0)).current,
  );

  // console.log('animationValue - ', animationValue);

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

  const reset = () => {
    const temp = data.map(item => (item = 0));
    // flipRotation = temp;
    setFlipRotation(...temp);

    data.map((_, index) => {
      flipCard(index);
    });

    animationValue = data.map(
      (_, index) => (animationValue[index].current = 0),
    );

    // reset data properties
    const tempData = data.map((_, index) => {
      return {...data[index], flag: false};
    });
    setData(tempData);
    setFirstCard(undefined);
    setSecondCard(undefined);
  };

  console.log('firstCard - ', firstCard);
  console.log('secondCard - ', secondCard);

  // FIXME:  set - is the cards the same logic ?
  const isCardtheSame = card => {
    if (!firstCard.current) {
      // setFirstCard(card);
      firstCard.current = card;
    } else if (!secondCard.current) {
      // setSecondCard(card);
      secondCard.current = card;

      if (firstCard.current.item.id === card.item.id) {
        console.log('YEES the same');
        console.log('firstCard id - ', firstCard.current);
        console.log('card id - ', card);

        setTimeout(() => {
          firstCard.current = undefined;
          secondCard.current = undefined;
          console.log('100 - done');
        }, 100);
      } else {
        console.log('NOT same cards - ', firstCard, secondCard);
        // flipRotation[firstCard.item.key] = 0;
        let f = flipRotation;
        f[firstCard.current.item.key - 1] = 0;
        f[secondCard.current.item.key - 1] = 0;
        console.log('f - ', f);
        // setFlipRotation(f);

        // flipRotation[card.item.key] = 0;
        // const s = flipRotation;

        // console.log('s - ', s);
        setFlipRotation(f);

        // console.log('rotation - ', flipRotation);

        setTimeout(() => {
          flipCard(firstCard.current.item.key - 1);
          flipCard(secondCard.current.item.key - 1);
        }, 1000);

        setTimeout(() => {
          flipToBack[firstCard.current.item.key - 1]();
          flipToBack[secondCard.current.item.key - 1]();
        }, 1100);

        setTimeout(() => {
          firstCard.current = undefined;
          secondCard.current = undefined;
        }, 1600);
        // firstCard.current = undefined;
        // secondCard.current = undefined;
        // setFirstCard(undefined);
        // setSecondCard(undefined);
      }
    }
  };

  const ImageCard = ({item, index}) => {
    return (
      <>
        <Pressable
          onPress={() => {
            item.flag = !item.flag;
            console.log('clicked item - ', item);

            isCardtheSame({item});
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
          {data?.map((item, index) => {
            return (
              <React.Fragment key={item.key}>
                <ImageCard item={item} index={index} />
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
