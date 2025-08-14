import React from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../types/navigation';
import GradientHeader from '../../components/common/Authheader';
import CustomButton from '../../components/common/CustomButton';
import images from '../../constants/images';
import LottieView from 'lottie-react-native';

type OtpSuccessScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'OtpSuccess'>;

const OtpSuccessScreen: React.FC = () => {
  const navigation = useNavigation<OtpSuccessScreenNavigationProp>();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={{ backgroundColor: 'violet' }}>
        <GradientHeader
          logoSource={images.AppLogo}
          logoStyle={{ width: 200, height: 100, marginBottom: 20 }}
        />
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: '#FFFFFF99',
            borderRadius: 150,
            top: 230,
            height: 60,
            width: '90%',
            left: '5%',
          }}
        />
      </View>

      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContent}>
          {/* Lottie Animation */}
          <LottieView
            source={require('../../../assets/success.json')}
            autoPlay
            loop={false}
            style={{ width: 100, height: 100 }}
          />

          {/* Success Title */}
          <Text style={styles.title}>OTP Verified Successfully</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            We've sent a secure link to your registered email to reset your password
          </Text>

          {/* Button */}
          <CustomButton
            title="Return to Login"
            onPress={() => navigation.navigate('Login')}
            style={styles.loginButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -25,
    position: 'relative',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  innerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  loginButton: {
    marginTop: 10,
    width: '100%',
    elevation: 8,
  },
});

export default OtpSuccessScreen;
