import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';
// import CustomButton from './CustomButton';

interface FooterButtonGroupProps {
  onSave: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const FooterButtonGroup: React.FC<FooterButtonGroupProps> = ({
  onSave,
  onCancel,
  isSubmitting = false,
}) => {
  return (
    <View style={styles.footer}>
      <CustomButton
        title="Save"
        onPress={onSave}
        loading={isSubmitting}
        style={styles.saveButton}
      />
      <CustomButton
        title="Cancel"
        onPress={onCancel}
        type="outline"
        style={styles.cancelButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  saveButton: {
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
    marginLeft: 10,
  },
});

export default FooterButtonGroup;
