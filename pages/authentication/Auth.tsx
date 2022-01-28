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
  Title,
  Text,
} from 'react-native-paper';
import * as yup from 'yup';
import {useFormik} from 'formik';
import * as AuthUtils from '../../utils/auth';
import {LoadingModalComponent} from '../../components/Utility/LoadingModal';

/**
 * Login and Registration Pages.
 */
const AuthPage: React.FC = () => {
  // Loading and error message states.
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Login or registration state.
  const [isLogin, setLogin] = useState(false);

  // Password Again and Error states.
  const [passwordAgain, setPasswordAgain] = useState('');
  const [passwordError, setPasswordError] = useState(null);

  // Listen to the error message state and display errors if any.
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

  /**
   * Firebase registration/login function.
   * @param values Form values
   */
  const onEmailAndPasswordSignInButtonPressed = async (values) => {
    // Set loading state to true.
    setLoading(true);

    // Set an empty password error state.
    setPasswordError(null);
    try {
      // CASE 1: If the user is registering in.
      if (!isLogin) {
        // Check if the password again is not empty state
        if (passwordAgain === '') {
          setPasswordError('this field cannot be empty');
        }

        // Check if password's match.
        else if (passwordAgain === values.password) {
          await AuthUtils.emailAndPasswordRegister(
            values.email,
            values.password,
          );
        } else {
          setPasswordError("Passwords don't match");
        }
      }
      // CASE 2: If the user is logging in.
      else {
        await AuthUtils.emailAndPasswordLogin(values.email, values.password);
      }
    } catch (error) {
      // Set the error message state as the error.
      setErrorMessage(error.message);
    }
    // Set loading state as false.
    setLoading(false);
  };

  // Formik hook with initial values,
  // submit function and validation schema.
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

  // Switch mode to registration/login mode.
  const onSwitchMode = () => setLoading(true);

  // Password Again state.
  const onReenterPassword = (text) => setPasswordAgain(text);

  return (
    <React.Fragment>
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
              visible={
                formik.touched.email && (formik.errors.email ? true : false)
              }>
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
              visible={
                formik.touched.password &&
                (formik.errors.password ? true : false)
              }>
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
              <Button
                mode="contained"
                icon="login"
                disabled={!formik.isValid}
                onPress={formik.handleSubmit}>
                {isLogin ? 'Log In' : 'Sign In'}
              </Button>
              <Button
                mode="contained"
                icon="toggle-switch"
                onPress={onSwitchMode}>
                Switch to {isLogin ? 'Sign In' : 'Log In'}
              </Button>
            </View>
          </ScrollView>
        </Surface>
      </KeyboardAvoidingView>
      <LoadingModalComponent
        visible={isLoading}
        message={isLogin ? 'Logging You In!' : 'Signing You In!'}
      />
    </React.Fragment>
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
