import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useForm } from '../../hooks/useForm';
import * as Yup from 'yup';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import GradientHeader from '../../components/common/Authheader';
import CustomHeader from '../../components/common/CustomHeader';
import FooterButtonGroup from '../../components/common/FooterHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Validation for change password
const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old Password is required'),
  newPassword: Yup.string().min(6, 'Minimum 6 characters').required('New Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ChangePasswordScreen = ({navigation}: {navigation: any}) => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
  } = useForm({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }, changePasswordSchema);

  const onSave = (formValues: any) => {
    // Save password change logic here
    Alert.alert('Password changed successfully!');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <CustomHeader variant={{
        type:'basic'
      }} />
 <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Change Password</Text>
        </View>
      <ScrollView contentContainerStyle={styles.content}>
        <CustomInput
          label="Old Password *"
          value={values.oldPassword}
          onChangeText={text => handleChange('oldPassword', text)}
          onBlur={() => handleBlur('oldPassword')}
          placeholder="Enter Old Password"
          secureTextEntry
          error={errors.oldPassword}
        />

        <CustomInput
          label="New Password *"
          value={values.newPassword}
          onChangeText={text => handleChange('newPassword', text)}
          onBlur={() => handleBlur('newPassword')}
          placeholder="Enter New Password"
          secureTextEntry
          error={errors.newPassword}
        />

        <CustomInput
          label="Confirm Password *"
          value={values.confirmPassword}
          onChangeText={text => handleChange('confirmPassword', text)}
          onBlur={() => handleBlur('confirmPassword')}
          placeholder="Confirm New Password"
          secureTextEntry
          error={errors.confirmPassword}
        />
      </ScrollView>
      <FooterButtonGroup
          onSave={() => handleSubmit(onSave)}
          onCancel={() => navigation.goBack()}
          isSubmitting={isSubmitting}
        />
        
     
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  content: { padding: 20 },
   headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
});

export default ChangePasswordScreen;
