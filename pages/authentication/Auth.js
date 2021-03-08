import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native';
import {
  Button,
  Surface,
  TextInput,
  HelperText,
  ActivityIndicator,
  Title,
  Text,
} from 'react-native-paper';
import * as yup from 'yup';
import {useFormik} from 'formik';
import * as AuthUtils from './../../utils/auth';

const AuthPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLogin, setLogin] = useState(false);
  const [passwordAgain, setPasswordAgain] = useState('');
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Something went wrong!', errorMessage, [
        {
          text: 'Okay',
          onPress: () => {
            setErrorMessage(null);
            setLoading(false);
          },
        },
      ]);
    }
  }, [errorMessage]);

  const onGoogleSignInButtonPressed = () => {
    AuthUtils.googleSignIn().catch((error) => {
      console.log(error);
    });
  };

  const onEmailAndPasswordSignInButtonPressed = async (values) => {
    setLoading(true);
    setPasswordError(null);
    try {
      if (!isLogin) {
        if (passwordAgain === '') {
          setPasswordError('this field cannot be empty');
        } else if (passwordAgain === values.password) {
          await AuthUtils.emailAndPasswordRegister(
            values.email,
            values.password,
          );
        } else {
          setPasswordError("Passwords don't match");
        }
      } else {
        await AuthUtils.emailAndPasswordLogin(values.email, values.password);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: onEmailAndPasswordSignInButtonPressed,
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(5).required(),
    }),
  });

  const onSwitchMode = () => setLogin(!isLogin);

  const onReenterPassword = (text) => setPasswordAgain(text);

  return (
    <KeyboardAvoidingView behavior="height" style={styles.rootView}>
      <View>
        <Title style={styles.titleText}>Carto.</Title>
        <Text>For the most premium shoppers</Text>
      </View>
      <Surface style={styles.surfaceView}>
        <ScrollView>
          <TextInput
            mode="outlined"
            label="Email Address"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={() => formik.setFieldTouched('email')}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <HelperText
            type="error"
            visible={formik.touched.email && formik.errors.email}>
            {formik.errors.email}
          </HelperText>
          <TextInput
            mode="outlined"
            label="Password"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={() => formik.setFieldTouched('password')}
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <HelperText
            type="error"
            visible={formik.touched.password && formik.errors.password}>
            {formik.errors.password}
          </HelperText>
          {!isLogin && (
            <>
              <TextInput
                mode="outlined"
                label="Enter Password Again"
                value={passwordAgain}
                onChangeText={onReenterPassword}
                autoCapitalize="none"
                secureTextEntry={true}
              />
              <HelperText type="error" visible={passwordError}>
                {passwordError}
              </HelperText>
            </>
          )}
          <View style={styles.buttonView}>
            {isLoading === false ? (
              <Button
                mode="contained"
                icon="login"
                disabled={!formik.isValid}
                onPress={formik.handleSubmit}>
                {isLogin ? 'Log In' : 'Sign In'}
              </Button>
            ) : (
              <ActivityIndicator animating={true} size="small" />
            )}
            <Button
              mode="contained"
              icon="toggle-switch"
              onPress={onSwitchMode}>
              Switch to {isLogin ? 'Sign In' : 'Log In'}
            </Button>
            <Button
              mode="contained"
              icon="google"
              onPress={onGoogleSignInButtonPressed}>
              Sign In With Google
            </Button>
          </View>
        </ScrollView>
      </Surface>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 20,
  },
  titleText: {
    fontSize: 20,
  },
  surfaceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    width: 350,
    elevation: 4,
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  buttonView: {
    margin: 10,
    padding: 10,
    height: 150,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default AuthPage;
