import {assertObjectTypeCallProperty} from '@babel/types';
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

  // const animationValue1 = useRef(new Animated.Value(0)).current;
  // const animationValue2 = useRef(new Animated.Value(0)).current;

  // let flipRotation1 = 0;
  // animationValue1.addListener(({value}) => (flipRotation1 = value));
  // console.log('animationValue1 - ', animationValue1);

  // let flipRotation2 = 0;
  // animationValue2.addListener(({value}) => (flipRotation2 = value));

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

  console.log('data - ', data);
  // console.log('flipRotation start - ', flipRotation);

  // 1
  // const flipToFrontStyle1 = {
  //   transform: [
  //     {
  //       rotateY: animationValue1.interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  // };
  // const flipToBackStyle1 = {
  //   transform: [
  //     {
  //       rotateY: animationValue1.interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['180deg', '0deg'],
  //       }),
  //     },
  //   ],
  // };

  // const flipToFront1 = () => {
  //   Animated.timing(animationValue1, {
  //     toValue: 180,
  //     duration: 200,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const flipToBack1 = () => {
  //   Animated.timing(animationValue1, {
  //     toValue: 0,
  //     duration: 200,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const flipCard1 = () => {
  //   console.log('flipRotation - ', flipRotation1);
  //   if (flipRotation1 > 0) {
  //     flipToFront1();
  //   } else if (flipRotation1 < 180) {
  //     flipToBack1();
  //   }
  // };

  // 2
  // const flipToFrontStyle2 = {
  //   transform: [
  //     {
  //       rotateY: animationValue2.interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  // };
  // const flipToBackStyle2 = {
  // transform: [
  //   {
  //     rotateY: animationValue2.interpolate({
  //       inputRange: [0, 180],
  //       outputRange: ['180deg', '0deg'],
  //     }),
  //   },
  // ],
  // };

  // const flipToFront2 = () => {
  // Animated.timing(animationValue2, {
  //   toValue: 180,
  //   duration: 200,
  //   useNativeDriver: true,
  // }).start();
  // };

  // const flipToBack2 = () => {
  // Animated.timing(animationValue2, {
  //   toValue: 0,
  //   duration: 200,
  //   useNativeDriver: true,
  // }).start();
  // };

  // const flipCard2 = () => {
  // console.log('flipRotation - ', flipRotation2);
  // if (flipRotation2 > 0) {
  //   flipToFront2();
  // } else if (flipRotation2 < 180) {
  //   flipToBack2();
  // }
  // };

  // All
  let flipRotationArray = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  let animationValueArray = useRef([]);
  animationValueArray.current = [];

  // const [animationData, setAnimationData] = useState([]);
  // const [flipRotationArray, SetFlipRotationArray] = useState([
  //   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  // ]);
  const [flipToFrontStyleArray, setFlipToFrontStyleArray] = useState([]);
  const [flipToBackStyleArray, setFlipToBackStyleArray] = useState([]);
  const [flipToFrontArray, setFlipToFrontArray] = useState([() => {}]);
  const [flipToBackArray, setFlipToBackArray] = useState([() => {}]);
  const [flipCardArray, setFlipCardArray] = useState([() => {}]);
  // const [animationValueCurrent, setAnimationValueCurrent] = useState([]);

  // FIXME: training here
  const flipToBack1 = () => {
    Animated.timing(animationValueArray.current[0], {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const flipToBack2 = () => {
    Animated.timing(animationValueArray.current[1], {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const all = [flipToBack1, flipToBack2];

  console.log('all - ', all);

  //

  console.log('flipToFrontStyleArray - ', flipToFrontStyleArray);
  console.log('flipToBackStyleArray - ', flipToBackStyleArray);
  console.log('flipToFrontArray - ', flipToFrontArray);
  console.log('flipCardArray - ', flipCardArray);
  // console.log('animationValueCurrent - ', animationValueCurrent);

  useEffect(() => {
    if (data?.length > 0) {
      data?.map(_ => animationValueArray.current.push(new Animated.Value(0)));

      // setAnimationValueCurrent(animationValueArray?.current);

      data?.map((_, index) =>
        animationValueArray.current[index].addListener(
          ({value}) => (flipRotationArray[index] = value),
        ),
      );

      if (animationValueArray.current?.length > 0) {
        let fs = [];
        let bs = [];
        let flipFront = [];
        let flipBack = [];
        let flipCards = [];

        data?.map((_, index) => {
          if (animationValueArray.current[index]) {
            fs.push({
              transform: [
                {
                  rotateY: animationValueArray.current[index].interpolate({
                    inputRange: [0, 180],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            });

            bs.push({
              transform: [
                {
                  rotateY: animationValueArray.current[index].interpolate({
                    inputRange: [0, 180],
                    outputRange: ['180deg', '0deg'],
                  }),
                },
              ],
            });

            flipFront.push(() => {
              Animated.timing(animationValueArray.current[index], {
                toValue: 180,
                duration: 200,
                useNativeDriver: true,
              }).start();
            });

            flipBack.push(() => {
              Animated.timing(animationValueArray.current[index], {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }).start();
            });

            flipCards.push(() => {
              if (flipRotationArray[index] > 0) {
                flipToFrontArray[index];
              } else if (flipRotationArray[index] < 180) {
                flipToBackArray[index];
              }
            });
          }
        });

        fs.length > 0 && setFlipToFrontStyleArray(fs);
        bs.length > 0 && setFlipToBackStyleArray(bs);
        flipFront.length > 0 && setFlipToFrontArray(flipFront);
        flipBack.length > 0 && setFlipToBackArray(flipBack);
        flipCards.length > 0 && setFlipCardArray(flipCards);
      }
    }
  }, [data]);

  // const flipToFrontStyle = {
  //   transform: data?.map((_, index) => ({
  //     rotateY: animationValueArray[index].interpolate({
  //       inputRange: [0, 180],
  //       outputRange: ['0deg', '180deg'],
  //     }),
  //   })),
  // };

  // const flipToFrontStyle = {
  // transform0: [
  //   {
  //     rotateY: animatioValueArray[0].interpolate({
  //       inputRange: [0, 180],
  //       outputRange: ['0deg', '180deg'],
  //     }),
  //   },
  // ],
  //   transform1: [
  //     {
  //       rotateY: animatioValueArray[1].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform2: [
  //     {
  //       rotateY: animatioValueArray[2].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform3: [
  //     {
  //       rotateY: animatioValueArray[3].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform4: [
  //     {
  //       rotateY: animatioValueArray[4].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform5: [
  //     {
  //       rotateY: animatioValueArray[5].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform6: [
  //     {
  //       rotateY: animatioValueArray[6].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform7: [
  //     {
  //       rotateY: animatioValueArray[7].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform8: [
  //     {
  //       rotateY: animatioValueArray[8].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform9: [
  //     {
  //       rotateY: animatioValueArray[9].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform10: [
  //     {
  //       rotateY: animatioValueArray[10].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform11: [
  //     {
  //       rotateY: animatioValueArray[11].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform12: [
  //     {
  //       rotateY: animatioValueArray[12].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform13: [
  //     {
  //       rotateY: animatioValueArray[13].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform14: [
  //     {
  //       rotateY: animatioValueArray[14].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform15: [
  //     {
  //       rotateY: animatioValueArray[15].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform16: [
  //     {
  //       rotateY: animatioValueArray[16].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform17: [
  //     {
  //       rotateY: animatioValueArray[17].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform18: [
  //     {
  //       rotateY: animatioValueArray[18].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  //   transform19: [
  //     {
  //       rotateY: animatioValueArray[19].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  // };

  // flipToFrontStyleArray = Object.entries(flipToFrontStyle);
  // console.log('flipToFrontStyleArray - ', flipToFrontStyleArray);

  // const animationDataAndStyles = () => {
  //   data?.map((_, index) => {
  //     flipRotationArray.push(0);
  //     animatioValueArray[index].addListener(
  //       ({value}) => (flipRotationArray[index] = value),
  //     );

  //     flipToFrontStyleArray.push({
  //       transform: [
  //         {
  //           rotateY: animatioValueArray[index].interpolate({
  //             inputRange: [0, 180],
  //             outputRange: ['0deg', '180deg'],
  //           }),
  //         },
  //       ],
  //     });

  //     flipToBackStyleArray.push({
  //       transform: [
  //         {
  //           rotateY: animatioValueArray[index].interpolate({
  //             inputRange: [0, 180],
  //             outputRange: ['180deg', '0deg'],
  //           }),
  //         },
  //       ],
  //     });
  //     // FIXME:
  //     flipToFrontArray.push(() => {
  //       Animated.timing(animatioValueArray[index], {
  //         toValue: 180,
  //         duration: 200,
  //         useNativeDriver: true,
  //       }).start();
  //     });

  //     // FIXME:
  //     flipToBackArray.push(() => {
  //       Animated.timing(animatioValueArray[index], {
  //         toValue: 0,
  //         duration: 200,
  //         useNativeDriver: true,
  //       }).start();
  //     });

  //     // FIXME:
  //     flipCardArray.push(() => {
  //       console.log('flipRotation - ', flipRotationArray[index]);
  //       if (flipRotationArray[index] > 0) {
  //         flipToFrontArray[index]();
  //       } else if (flipRotationArray[index] < 180) {
  //         flipToBackArray[index]();
  //       }
  //     });
  //   });
  // };

  const ImageCard = ({item, index}) => {
    // console.log('item ImageCard - ', item);
    // console.log('key ImageCard - ', item.key);
    // console.log('index - ', index);
    return (
      <>
        <Pressable
          onPress={() => {
            // setFirstCard(!item.flag);
            item.flag = !item.flag;
            console.log('clicked item - ', item);
            console.log('key = ', item.key);

            // selectImage(item.key);
            // if (item.key === 0) {
            //   flipCard1();
            //   !!flipRotation1 ? flipToBack1() : flipToFront1();
            // } else if (item.key === 1) {
            //   flipCard2();
            //   !!flipRotation2 ? flipToBack2() : flipToFront2();
            // }
            // if (index === 0) {

            // console.log(
            //   '!!flipRotationArray[index] - ',
            //   flipRotationArray[index],
            // );
            // console.log(
            //   'flipToFrontArray[index]() = ',
            //   flipToFrontArray[index](),
            // );

            flipCardArray[index]();
            !!flipRotationArray[index]
              ? flipToBackArray[index]()
              : flipToFrontArray[index]();
          }}>
          <Animated.Image
            style={[
              styles.cardFront,
              flipToBackStyleArray[index],
              styles.image,
            ]}
            source={item.name}
          />
          <Animated.Image
            style={[
              styles.cardBack,
              flipToFrontStyleArray[index],
              styles.image,
            ]}
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
        <TouchableOpacity onPress={() => {}} style={styles.reset}>
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
