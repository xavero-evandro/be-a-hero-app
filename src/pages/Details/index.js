import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import logoImg from '../../assets/logo.png';
import * as MailComposer from 'expo-mail-composer';

export default function Details() {
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;
  const formatedValue = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(incident.value);
  const message = `Hello ${incident.name}, I'm reaching out regarding your incident(${incident.title}) and I want to help with ${formatedValue}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Incident's Hero: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  function sendWhats() {
    Linking.openURL(`whatsapp://send?phone=${incident.whats}$&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>NGO:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} from {incident.city}, {incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>Incident:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>Value:</Text>
        <Text style={styles.incidentValue}>{formatedValue}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be The Hero for this incident</Text>

        <Text style={styles.heroDescription}>Be in Touch</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhats}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
