import React, {useRef, useState} from 'react';
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

const MemoryCards = () => {
  // const animatedValue = useRef(new Animated.Value(0)).current;
  // const [firstCardFlip, setFirstCardFlip] = useState(false);
  // // const [currentValue, setCurrentValue] = useState(0)
  // let currentValue = 0;

  // animatedValue.addListener(({value}) => {
  //   // setCurrentValue(v)
  //   console.log('v - ', value);
  //   currentValue = value;
  // });

  // console.log('currentValue - ', currentValue);
  // // useEffect(() => {
  // //   animatedValue.addListener(({v}) => {
  // //     value = v
  // //   })
  // // }, [value])

  // const frontInterpolate = animatedValue.interpolate({
  //   inputRange: [0, 180],
  //   outputRange: ['0deg', '180deg'],
  // });

  // const backInterpolate = animatedValue.interpolate({
  //   inputRange: [0, 180],
  //   outputRange: ['180deg', '360deg'],
  // });

    const flipAnimation = useRef( new Animated.Value( 0 ) ).current;

  let flipRotation = 0;
  flipAnimation.addListener( ( { value } ) => flipRotation = value );

  const flipToFrontStyle = {
    transform: [
      { rotateY: flipAnimation.interpolate( {
        inputRange: [ 0, 180 ],
        outputRange: [ "0deg", "180deg" ]
      } ) }
    ]
  };
  const flipToBackStyle = {
    transform: [
      { rotateY: flipAnimation.interpolate( {
        inputRange: [ 0, 180 ],
        outputRange: [ "180deg", "0deg" ]
      } ) }
    ]
  };

  // const frontAnimatedStyle = {
  //   transform: [{rotateY: frontInterpolate}],
  // };

  // const backAnimatedStyle = {
  //   transform: [{rotateY: backInterpolate}],
  // };

  const flipToFront = () => {
    Animated.timing( flipAnimation, {
      toValue: 180,
      duration: 200,
      useNativeDriver: true,
    } ).start();
  };

  const flipToBack = () => {
    Animated.timing( flipAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    } ).start();
  };

  const flipCard = () => {
    console.log('flipRotation - ', flipRotation);
    if(flipRotation > 0) {
      flipToFront()
    } else if(flipRotation < 180) {
      flipToBack()
    }
  }

  // const flipCard = () => {
  //   if (currentValue >= 90) {
  //     Animated.timing(animatedValue, {
  //       toValue: 0,
  //       duration: 500,
  //       useNativeDriver: false,
  //     }).start();
  //   } else {
  //     Animated.timing(animatedValue, {
  //       toValue: 180,
  //       duration: 500,
  //       useNativeDriver: false,
  //     }).start();
  //   }

  //   setFirstCardFlip(!firstCardFlip);
  // };

  const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
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

  const shuffledData = () => {
    let a = [...imageData, ...imageData];
    const t = a.sort(() => Math.random() - 0.5);
    return t;
  };

  console.log('shuffledData - ', shuffledData());
  // console.log('frontAnimatedStyle - ', frontAnimatedStyle);

  const selectImage = id => {
    shuffledData.map(item => {
      if (item.id === id) {
        item = undefined;
      }
      return item;
    });
  };

  // const ImageCard = ({name, id, onPress}) => {
  //   return (
  //     // <Animated.View style={[styles.imageCard, firstCardFlip ? frontInterpolate : backInterpolate]}>
  //     <TouchableWithoutFeedback
  //       // style={styles.imageCard}
  //       onPress={() => {
  //         console.log('id - ', id);
  //         // flag = true
  //         onPress();
  //       }}>
  //       {/* <Animated.Image style={[styles.image, frontAnimatedStyle]}  source={firstCardFlip ? name : require('../assets/images/deck.png')} resizeMode="contain"  /> */}
  //       <Animated.Image
  //         style={[styles.image, frontAnimatedStyle]}
  //         source={name}
  //         resizeMode="contain"
  //       />
  //       <Animated.Image
  //         style={[styles.image, backAnimatedStyle]}
  //         source={name}
  //         resizeMode="contain"
  //       />
  //       {/* <Image style={styles.image}  source={name} resizeMode="contain" /> */}
  //     </TouchableWithoutFeedback>
  //     // </Animated.View>
  //   );
  // };

  return (
    <View style={styles.container}>
      <View style={styles.rowSpace}>
        <Text style={styles.time}>Time: 00:00</Text>
        <TouchableOpacity onPress={() => {}} style={styles.reset}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {/* {shuffledData().map(item => {
          console.log('item - ', item);
          return (
            <Animated.View style={firstCardFlip ? frontInterpolate : backInterpolate}>
              <ImageCard
                name={
                  item.flag ? item.name : require('../assets/images/deck.png')
                }
                id={item.id}
                onPress={() => flipCard()}
              />
            </Animated.View>
          );
        })} */}
        {/* <Animated.View style={firstCardFlip ? frontInterpolate : backInterpolate}> */}
        {/* <Animated.View style={backInterpolate}> */}
        {/* <ImageCard
                name={
                  require('../assets/images/Animals/1.png')
                }
                id={1}
                onPress={() => flipCard()}
              /> */}
        {/* </Animated.View> */}

        <>
          <Pressable
            style={ styles.imageCard }
            onPress={() => {
              flipCard();
              !!flipRotation ? flipToBack() : flipToFront()
            }}>
            <Animated.Image
              style={{...styles.cardFront, ...flipToBackStyle, ...styles.image}}
              source={require('../assets/images/Animals/1.png')}
            />
            <Animated.Image
              style={{...styles.cardBack, ...flipToFrontStyle, ...styles.image}}
              source={require('../assets/images/deck.png')}
            />
          </Pressable>
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
  imageCard: {
    // margin: 8
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
