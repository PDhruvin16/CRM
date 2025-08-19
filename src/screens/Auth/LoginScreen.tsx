
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../types/navigation';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import Loader from '../../components/common/Loader';
import GradientHeader from '../../components/common/Authheader';
import images from '../../constants/images';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import * as Yup from 'yup';

// Validation schema must be declared before it's used
const loginValidationSchema: any = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, isLoading, error } = useAuth() as any;

  // Debug logging
  console.log('LoginScreen - isLoading:', isLoading);
  console.log('LoginScreen - error:', error);

  const { values, errors, handleChange, handleSubmit, isSubmitting, handleBlur } = useForm<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  }, loginValidationSchema);

  const handleLogin = async (formValues: { email: string; password: string }) => {
    try {
      console.log('LoginScreen: Attempting login with:', formValues);
      const result = await login(formValues);
      console.log('LoginScreen: Login result:', result);
      Alert.alert('Success', 'Login successful!');
    } catch (error: any) {
      console.log('LoginScreen: Login error:', error);
      Alert.alert('Login Failed', error?.message || 'Please check your credentials');
    }
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
 

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Loader visible={isLoading} text="Logging in..." />



      <View style={{

        backgroundColor: 'violet',

      }}>
        <GradientHeader
          logoSource={images.AppLogo} // ✅ Directly pass SVG component
          logoStyle={{ width: 200, height: 100, marginBottom: 20, backgroundColor: 'violet' }}
        />
        <View style={{
          ...StyleSheet.absoluteFillObject, // makes it fill its parent
          backgroundColor: '#FFFFFF99',

          borderRadius: 150,
          top: 230,
          bottom: 0,
          height: 60,
          width: '90%',
          left: '5%',

        }} />
      </View>

      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle,]}>Welcome to AI SANTE!</Text>

          <Text numberOfLines={2} style={[styles.headerSubtitle]}>Discover a smarter way to manage your products with our platform.</Text>

        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Username*</Text>
            <CustomInput
              value={values.email}
              onChangeText={(text) => handleChange('email', text)}
              onBlur={() => handleBlur('email')}
              placeholder="Enter username"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={errors.email}
            // style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password*</Text>
            <CustomInput
              value={values.password}
              onChangeText={(text) => handleChange('password', text)}
              onBlur={() => handleBlur('password')}
              placeholder="••••••••••"
              secureTextEntry
              error={errors.password}
            // style={styles.input}
            />
          </View>


          <TouchableOpacity
            // style={{ alignSelf: 'center', marginTop: 12 }}
            style={styles.forgotPasswordContainer}
            onPress={navigateToForgotPassword}
          >
            <MaskedView
              maskElement={
                <Text style={[styles.forgotPasswordText, { backgroundColor: 'transparent' }]}>
                  forgot password?
                </Text>
              }
            >
              <LinearGradient
                colors={['#404698', '#882785']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={[styles.forgotPasswordText, { opacity: 0 }]}>
                  forgot password?
                </Text>
              </LinearGradient>
            </MaskedView>
          </TouchableOpacity>

          <CustomButton
            title="Log In"
            onPress={() => handleSubmit(handleLogin)}
            loading={isSubmitting}
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
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333333',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 30,
    marginTop: -20
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#7B68EE',
    fontWeight: '600',
  },
  loginButton: {

    marginBottom: 30,

    shadowOffset: {
      width: 0,
      height: 4,
    },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
  },
  // 
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
    marginRight: 4,
  },
  signupText: {
    fontSize: 14,
    color: '#7B68EE',
    fontWeight: '600',
  },
});

export default LoginScreen;