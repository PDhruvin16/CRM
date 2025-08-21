// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import { useForm } from '../../hooks/useForm';
// import * as Yup from 'yup';
// import CustomInput from '../../components/common/CustomInput';
// import CustomButton from '../../components/common/CustomButton';
// import GradientHeader from '../../components/common/Authheader';
// import CustomHeader from '../../components/common/CustomHeader';
// import FooterButtonGroup from '../../components/common/FooterHeader';
// import { useNavigation } from '@react-navigation/native';

// // Validation schema for Edit Profile form
// const editProfileValidationSchema = Yup.object().shape({
//   fullName: Yup.string().required('Full Name is required'),
//   userName: Yup.string().required('User Name is required'),
//   mobileNumber: Yup.string().required('Mobile Number is required'),
//   email: Yup.string().email('Enter valid email').required('Email is required'),
//   // Add more validations if needed
// });

// const EditProfileScreen = () => {
//   const {
//     values,
//     errors,
//     handleChange,
//     handleSubmit,
//     handleBlur,
//     isSubmitting,
//   } = useForm({
//     fullName: '',
//     userName: '',
//     designation: '',
//     mobileNumber: '',
//     email: '',
//     city: '',
//     state: '',
//   }, editProfileValidationSchema);

//   const onSave = (formValues: any) => {
//     // Your save logic here
//     Alert.alert('Profile Saved Successfully!');
//   };
// const navigation= useNavigation();
//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//         <View style={{ flex: 1 }} >
//       <CustomHeader variant={{type:'basic',title:'Edit Profile'}} />

//       <ScrollView contentContainerStyle={styles.content}>
//         <View style={styles.avatarContainer}>
//           <Image
//             source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
//             style={styles.avatar}
//           />
//           <TouchableOpacity style={styles.editIcon}>
//             <Text style={{ color: 'white', fontWeight: 'bold' }}>✎</Text>
//           </TouchableOpacity>
//           <Text style={styles.userName}>Ronald Richards</Text>
//         </View>

//         <View style={styles.form}>
//           <CustomInput
//             label="Full Name *"
//             value={values.fullName}
//             onChangeText={text => handleChange('fullName', text)}
//             onBlur={() => handleBlur('fullName')}
//             placeholder="Enter Full Name"
//             error={errors.fullName}
//           />

//           <CustomInput
//             label="User Name"
//             value={values.userName}
//             onChangeText={text => handleChange('userName', text)}
//             onBlur={() => handleBlur('userName')}
//             placeholder="Enter User Name"
//             error={errors.userName}
//           />

//           <CustomInput
//             label="Designation"
//             value={values.designation}
//             onChangeText={text => handleChange('designation', text)}
//             onBlur={() => handleBlur('designation')}
//             placeholder="Enter Designation"
//           />

//           <CustomInput
//             label="Mobile Number *"
//             value={values.mobileNumber}
//             onChangeText={text => handleChange('mobileNumber', text)}
//             onBlur={() => handleBlur('mobileNumber')}
//             placeholder="Enter Mobile Number"
//             keyboardType="phone-pad"
//             error={errors.mobileNumber}
//           />

//           <CustomInput
//             label="Email *"
//             value={values.email}
//             onChangeText={text => handleChange('email', text)}
//             onBlur={() => handleBlur('email')}
//             placeholder="Enter Email"
//             keyboardType="email-address"
//             error={errors.email}
//           />

//           <CustomInput
//             label="City"
//             value={values.city}
//             onChangeText={text => handleChange('city', text)}
//             onBlur={() => handleBlur('city')}
//             placeholder="Enter City"
//           />

//           <CustomInput
//             label="State"
//             value={values.state}
//             onChangeText={text => handleChange('state', text)}
//             onBlur={() => handleBlur('state')}
//             placeholder="Enter State"
//           />
//           </View>
//      </ScrollView>
          
          

//         <FooterButtonGroup
//           onSave={() => handleSubmit(onSave)}
//           onCancel={() => navigation.goBack()}
//           isSubmitting={isSubmitting}
//         />
//         </View>
 
      
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F5F5F5' },
//   content: { padding: 20 },
//   avatarContainer: {
//     alignItems: 'flex-start',
//     marginBottom: 20,
//     position: 'relative',
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   editIcon: {
//     position: 'absolute',
//     right: 10,
//     bottom: 10,
//     backgroundColor: '#6C63FF',
//     padding: 6,
//     borderRadius: 20,
//   },
//   userName: {
//     marginTop: 10,
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   form: { marginTop: 10 },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 30,
//   },
//   saveButton: { flex: 1, marginRight: 10 },
//   cancelButton: { flex: 1, marginLeft: 10 },
// });

// export default EditProfileScreen;
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useForm } from '../../hooks/useForm';
import * as Yup from 'yup';
import CustomInput from '../../components/common/CustomInput';
import CustomHeader from '../../components/common/CustomHeader';
import FooterButtonGroup from '../../components/common/FooterHeader';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Validation schema for Edit Profile form
const editProfileValidationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  userName: Yup.string().required('User Name is required'),
  mobileNumber: Yup.string().required('Mobile Number is required'),
  email: Yup.string().email('Enter valid email').required('Email is required'),
});

const EditProfileScreen = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
  } = useForm(
    {
      fullName: '',
      userName: '',
      designation: '',
      mobileNumber: '',
      email: '',
      city: '',
      state: '',
    },
    editProfileValidationSchema,
  );

  const navigation = useNavigation();

  const onSave = (formValues: any) => {
    Alert.alert('Profile Saved Successfully!');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flex: 1}}>
        {/* Header without title */}
        <CustomHeader variant={{type: 'basic'}} />

        {/* Back Button + Edit Profile text */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.avatarContainer}>
            <Image
              source={{uri: 'https://randomuser.me/api/portraits/men/75.jpg'}}
              style={styles.avatar}
            />
            {/* Edit Icon aligned on border */}
            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="pencil" size={12} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.userName}>Ronald Richards</Text>
          </View>

          <View style={styles.form}>
            <CustomInput
              label="Full Name *"
              value={values.fullName}
              onChangeText={text => handleChange('fullName', text)}
              onBlur={() => handleBlur('fullName')}
              placeholder="Enter Full Name"
              error={errors.fullName}
            />

            <CustomInput
              label="User Name"
              value={values.userName}
              onChangeText={text => handleChange('userName', text)}
              onBlur={() => handleBlur('userName')}
              placeholder="Enter User Name"
              error={errors.userName}
            />

            <CustomInput
              label="Designation"
              value={values.designation}
              onChangeText={text => handleChange('designation', text)}
              onBlur={() => handleBlur('designation')}
              placeholder="Enter Designation"
            />

            <CustomInput
              label="Mobile Number *"
              value={values.mobileNumber}
              onChangeText={text => handleChange('mobileNumber', text)}
              onBlur={() => handleBlur('mobileNumber')}
              placeholder="Enter Mobile Number"
              keyboardType="phone-pad"
              error={errors.mobileNumber}
            />

            <CustomInput
              label="Email *"
              value={values.email}
              onChangeText={text => handleChange('email', text)}
              onBlur={() => handleBlur('email')}
              placeholder="Enter Email"
              keyboardType="email-address"
              error={errors.email}
            />

            <CustomInput
              label="City"
              value={values.city}
              onChangeText={text => handleChange('city', text)}
              onBlur={() => handleBlur('city')}
              placeholder="Enter City"
            />

            <CustomInput
              label="State"
              value={values.state}
              onChangeText={text => handleChange('state', text)}
              onBlur={() => handleBlur('state')}
              placeholder="Enter State"
            />
          </View>
        </ScrollView>

        <FooterButtonGroup
          onSave={() => handleSubmit(onSave)}
          onCancel={() => navigation.goBack()}
          isSubmitting={isSubmitting}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5'},
  content: {padding: 20},
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
  avatarContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    left: 60, // keep aligned to bottom-right border
    bottom: 18,
    backgroundColor: '#6C63FF',
    padding: 6,
    borderRadius: 20,
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  form: {marginTop: 10},
});

export default EditProfileScreen;
