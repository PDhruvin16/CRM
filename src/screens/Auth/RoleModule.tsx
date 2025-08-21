import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../../components/common/CustomButton';
import GradientHeader from '../../components/common/Authheader';
import CustomHeader from '../../components/common/CustomHeader';
import FooterButtonGroup from '../../components/common/FooterHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
const RoleModuleScreen = ({navigation}: any) => {
  const roles = ['Admin', 'Manager', 'Super User', 'User'];
  const modules = ['Customer Service', 'Admin Console', 'Sales Hub', 'Marketing Insights'];

  const onSave = () => {
    Alert.alert('Roles & Modules saved');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <View style = {{flex:1}}>
      <CustomHeader variant={{type:'basic'}} />
 <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Role & Module</Text>
        </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Roles</Text>
          {roles.map((role) => (
            <Text key={role} style={styles.listItem}>• {role}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modules</Text>
          {modules.map((module) => (
            <Text key={module} style={styles.listItem}>• {module}</Text>
          ))}
        </View>

        {/* <CustomButton title="Save" onPress={onSave} style={{ marginTop: 30 }} /> */}
      </ScrollView>
          <FooterButtonGroup
          onSave={() => {}}
          onCancel={() => {}}
          isSubmitting={false}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  content: { padding: 20 },
  section: {
    marginBottom: 30,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 15,
  },
  listItem: {
    fontSize: 14,
    marginVertical: 6,
    color: '#333',
  },
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

export default RoleModuleScreen;
