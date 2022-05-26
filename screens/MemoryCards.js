import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native';

const imageData = [
  { id: 1, name: require('../assets/images/Animals/1.png'), flag: false },
  { id: 2, name: require('../assets/images/Animals/2.png'), flag: false },
  { id: 3, name: require('../assets/images/Animals/3.png'), flag: false },
  { id: 4, name: require('../assets/images/Animals/4.png'), flag: false },
  { id: 5, name: require('../assets/images/Animals/5.png'), flag: false },
  { id: 6, name: require('../assets/images/Animals/6.png'), flag: false },
  { id: 7, name: require('../assets/images/Animals/7.png'), flag: false },
  { id: 8, name: require('../assets/images/Animals/8.png'), flag: false },
  { id: 9, name: require('../assets/images/Animals/9.png'), flag: false },
  { id: 10, name: require('../assets/images/Animals/10.png'), flag: false },
];

const MemoryCards = () => {
  // const [firstCard, setFirstCard] = useState(undefined);
  // const [secondCard, setSecondCard] = useState(undefined);

  const firstCard = useRef(undefined);
  const secondCard = useRef(undefined);
  // const disabled = useRef(false);

  const [data, setData] = useState([]);
  const [flipRotation, setFlipRotation] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const [hideCards, setHideCards] = useState([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ]);

  const shuffledData = () => {
    let a = [...imageData, ...imageData];
    const t = a.sort(() => Math.random() - 0.5);
    const result = t.map((item, index) => {
      return { ...item, key: index + 1 };
    });
    return result;
  };

  useEffect(() => {
    setData(shuffledData());
    // animationDataAndStyles();
  }, []);

  useEffect(() => {
    if (firstCard && secondCard) {
      console.log('57 - point');
      flipRotation.map((_, i) => {
        hidenCardStyle[i];
      });
    }
  }, [hidenCardStyle, flipRotation]);

  let animationValue = flipRotation.map(
    _ => useRef(new Animated.Value(0)).current,
  );

  flipRotation.map((_, index) =>
    animationValue[index].addListener(
      ({ value }) => (flipRotation[index] = value),
    ),
  );

  let opacityAnimationValue = flipRotation.map(
    _ => useRef(new Animated.Value(1)).current,
  );

  flipRotation.map((_, index) =>
    opacityAnimationValue[index].addListener(
      ({ value }) => (opacityAnimationValue[index] = value),
    ),
  );

  console.log('flipRotation - ', flipRotation);
  console.log('data - ', data);
  console.log('opacityAnimationValue - ', opacityAnimationValue);

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

  const hideCard = flipRotation.map((_, index) => () => {
    Animated.timing(opacityAnimationValue[index], {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  });

  // ------------------------------------------------

  const flipCard = index => {
    if (flipRotation[index] > 0) {
      flipToFront[index]();
    } else if (flipRotation[index] < 180) {
      flipToBack[index]();
    }
  };

  // -----------------------------------------------

  const hideTwoCards = useCallback(
    (firstCard, secondCard) => {
      if (
        firstCard &&
        secondCard &&
        firstCard.current.item.id === secondCard.current.item.id
      ) {
        console.log('TWO CARDS ARE HIDDEN');
        console.log('first key - ', firstCard.current.item.key - 1);
        console.log('second key - ', secondCard.current.item.key - 1);

        hideCard[firstCard.current.item.key - 1]();
        hideCard[secondCard.current.item.key - 1]();

        console.log('opacityAnimationValue - ', opacityAnimationValue);

        console.log('All hidenCardStyle - ', hidenCardStyle);
        console.log(
          'hidenCardStyle[index] - ',
          hidenCardStyle[0].opacity._parent._value,
        );
      }
    },
    [hidenCardStyle, opacityAnimationValue, hideCard],
  );

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

  // ------------------------------------------------

  const hidenCardStyle = flipRotation.map((_, index) => ({
    opacity: opacityAnimationValue[index].interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
    }),
  }));

  // ------------------------------------------------

  const reset = () => {
    const temp = data.map((_, index) => (flipRotation[index] = 0));
    setFlipRotation([...temp]);

    data.map((_, index) => {
      flipCard(index);
    });

    animationValue = data.map((_, index) => {
      animationValue[index].current = 0;
    });

    opacityAnimationValue = data.map((_, index) => {
      opacityAnimationValue[index]._value = 1;
    });

    flipRotation.map((_, i) => {
      console.log('hideCard - ', hideCard[i]);
    });

    setData(shuffledData());
    firstCard.current = undefined;
    secondCard.current = undefined;
  };

  // FIXME:  set - is the cards the same logic ?
  const isCardtheSame = card => {
    if (!firstCard.current) {
      firstCard.current = card;
      console.log('firstCard - ', firstCard);
      console.log('animationValue - ', animationValue);
    } else if (!secondCard.current) {
      secondCard.current = card;

      if (firstCard.current.item.id === card.item.id) {
        console.log('YEES the same');
        console.log('firstCard id - ', firstCard.current);
        console.log('secondCard id - ', secondCard.current);

        // TODO: hide the acrds here
        hideTwoCards(firstCard, secondCard);
        console.log(
          `hidenCardStyle[${firstCard.current.item.key - 1}] - `,
          hidenCardStyle[firstCard.current.item.key - 1].opacity._parent._value,
        );

        setTimeout(() => {
          firstCard.current = undefined;
          secondCard.current = undefined;
          console.log('100 - done');
        }, 100);
      } else {
        console.log('NOT same cards - ', firstCard, secondCard);

        let f = flipRotation;
        f[firstCard.current.item.key - 1] = 0;
        f[secondCard.current.item.key - 1] = 0;
        setFlipRotation(f);

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
          // disabled.current = false;
        }, 1600);
        // firstCard.current = undefined;
        // secondCard.current = undefined;
        // setFirstCard(undefined);
        // setSecondCard(undefined);
      }
    }
  };

  const ImageCard = ({ item, index }) => {
    // console.log('flipToFront[index]() - ', flipToFront[index]());

    return (
      <Animated.View
        style={{
          opacity: hidenCardStyle[index].opacity._parent._value,
        }}
        pointerEvents={
          hidenCardStyle[index].opacity._parent._value ? 'auto' : 'none'
        }>
        <Pressable
          onPress={() => {
            item.flag = !item.flag;
            isCardtheSame({ item });
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
      </Animated.View>
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
      <View style={[styles.box, { opacity: 0 }]}>
        <Text>ARSEN</Text>
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
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reset: {
    // borderWidth: 1,
    // borderColor: '#fff',
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
    // borderWidth: 1,
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
  box: {
    marginTop: 24,
    borderWidth: 1,
  },
});

export default MemoryCards;
