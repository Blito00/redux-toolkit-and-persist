import React, { useState } from 'react';
import { View, Alert, Text } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slice/userSlice';
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { selectUser } from '../redux/store';
import { router } from 'expo-router';

export default function Index () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectUser);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        router.replace('UserScreen');
      })
      .catch((err) => {
        Alert.alert('Error', err);
      });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Login</Title>
          <TextInput
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
          <Button mode="contained" onPress={handleLogin} style={styles.button} loading={loading} disabled={loading}>
            Login
          </Button>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: '20@s',
  },
  card: {
    padding: '20@s',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20@vs',
  },
  input: {
    marginBottom: '15@vs',
  },
  button: {
    marginTop: '10@vs',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10@vs',
  },
});

