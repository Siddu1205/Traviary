import React from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const StepIndicator = ({ currentStep }) => {
  const totalSteps = 5; // now 5 steps

  return (
    <SafeAreaView>
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            {
              backgroundColor:
                index === currentStep ? '#1e90ff' : '#d3d3d3', // blue if active else grey
            },
          ]}
        />
      ))}
    </View>
    </SafeAreaView>
  );
};

export default StepIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('80%'),
    marginVertical: 15,
    alignSelf: 'center',
  },
  step: {
    flex: 1,
    height: 3,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
