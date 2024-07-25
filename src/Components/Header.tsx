import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '@/styles/colors';

export function Header() {
  const [isNotificationOn, setIsNotificationOn] = useState(true);

  const toggleNotification = () => {
    setIsNotificationOn(!isNotificationOn);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.username}>Olá, Claúdia</Text>
      <TouchableOpacity onPress={toggleNotification}>
        <Image
          source={
            isNotificationOn
              ? require('@/assets/Sino ativado.png')
              : require('@/assets/Sino desativado.png')
          }
          style={styles.notificationIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 361,
    height: 50,
    flexShrink: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 1,
    paddingHorizontal: 10,
  },
  username: {
    color: '#000',
    //fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21,
  },
  notificationIcon: {
    width: 13,
    height: 13,
    flexShrink: 0,
  },
});
