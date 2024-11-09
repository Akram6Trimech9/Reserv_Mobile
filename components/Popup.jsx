import { StyleSheet, View, Modal, Pressable } from 'react-native';

export default function Popup({ children, visible, dismiss }) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={dismiss}
    >
      <Pressable style={styles.modalOverlay} onPress={dismiss} />
      <View style={styles.modalContent}>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
    marginHorizontal: '10%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
