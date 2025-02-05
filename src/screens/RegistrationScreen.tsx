import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

type RegistrationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Registration'
>;

type Props = {
  navigation: RegistrationScreenNavigationProp;
};

interface FormData {
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
}

interface Errors {
  fullName?: string;
  email?: string;
  mobileNumber?: string;
  password?: string;
}

const RegistrationScreen: React.FC<Props> = ({navigation}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const clearInput = (name: keyof FormData) => {
    setFormData({...formData, [name]: ''});
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      newErrors.email = 'Enter a valid email address';

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.mobileNumber))
      newErrors.mobileNumber = 'Enter a valid 10-digit mobile number';

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password))
      newErrors.password =
        'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validate()) {
      Alert.alert('Sign-up Successful!');
      navigation.navigate('ProductsListing');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <View style={styles.backButtonRow}>
            <TouchableOpacity>
              <FeatherIcon name="chevron-left" size={24} color="#566546" />
            </TouchableOpacity>
            <Text style={styles.exploreText}>Explore our app</Text>
          </View>

          <View style={styles.titleRow}>
            <Text style={styles.headerTitle}>Welcome to </Text>
            <Text style={styles.headerTitle}>Pantry by Marble</Text>
            <Text style={styles.description}>
              Sign up for easy payment, collection and much more
            </Text>
          </View>
        </View>

        <View style={styles.headerDivider} />
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={formData.fullName}
              onChangeText={value => handleInputChange('fullName', value)}
            />
            {formData.fullName.length > 0 && (
              <TouchableOpacity onPress={() => clearInput('fullName')}>
                <FeatherIcon name="x" size={20} color="#54634B" />
              </TouchableOpacity>
            )}
          </View>
          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName}</Text>
          )}

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              value={formData.email}
              onChangeText={value => handleInputChange('email', value)}
            />
            {formData.email.length > 0 && (
              <TouchableOpacity onPress={() => clearInput('email')}>
                <FeatherIcon name="x" size={20} color="#54634B" />
              </TouchableOpacity>
            )}
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <Text style={styles.label}>Mobile number</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              value={formData.mobileNumber}
              onChangeText={value => handleInputChange('mobileNumber', value)}
            />
            {formData.mobileNumber.length > 0 && (
              <TouchableOpacity onPress={() => clearInput('mobileNumber')}>
                <FeatherIcon name="x" size={20} color="#54634B" />
              </TouchableOpacity>
            )}
          </View>
          {errors.mobileNumber && (
            <Text style={styles.errorText}>{errors.mobileNumber}</Text>
          )}

          <Text style={styles.label}>Create password</Text>
          <View style={styles.inputWrapperPassword}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={value => handleInputChange('password', value)}
            />
            {formData.password.length > 0 && (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <FeatherIcon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#54634B"
                  style={{marginRight: 20}}
                />
              </TouchableOpacity>
            )}
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{marginVertical: 10}}>
          <Text style={styles.loginText}>
            Have an account? <Text style={styles.linkText}>Login</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Explore our app</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By signing up you agree to our{' '}
          <Text style={styles.linkText}>Terms</Text>,{' '}
          <Text style={styles.linkText}>Data Policy</Text>, and{' '}
          <Text style={styles.linkText}>Cookies Policy</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FAFAF8',
    padding: 2,
  },
  backButtonRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  exploreText: {
    fontFamily: 'Avenir',
    fontWeight: 400,
    fontSize: 14,
    color: '#54634B',
    marginHorizontal: 8,
  },
  titleRow: {
    paddingHorizontal: 10,
    paddingBottom: 4,
    marginLeft: 0,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: '700',
    fontStyle: 'italic',
    fontFamily: 'Adobe Garamond Pro Bold',
    color: '#566546',
  },
  headerDivider: {
    height: 15,
    backgroundColor: '#566546',
    marginHorizontal: 10,
  },
  subHeaderTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4B4B3F',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Avenir',
    color: '#54634B',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    marginHorizontal: 12,
    marginTop: 40,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Avenir',
    color: '#54634B',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#54634B',
  },
  inputWrapperPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#54634B',
  },
  input: {
    fontSize: 18,
    fontWeight: 600,
    fontFamily: 'Adobe Garamond Pro',
    color: '#54634B',
    paddingVertical: 8,
    width: '90%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#54634B',
    paddingVertical: 18,
    borderRadius: 80,
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Avenir',
    fontWeight: 400,
  },
  loginText: {
    textAlign: 'center',
    color: '#54634B',
    fontSize: 14,
    fontFamily: 'Avenir',
    fontWeight: 400,
  },
  linkText: {
    color: '#54634B',
    fontFamily: 'Avenir',
    fontWeight: 800,
    fontSize: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#54634B',
  },
  dividerText: {
    marginHorizontal: 18,
    color: '#54634B',
    fontSize: 14,
    fontFamily: 'Avenir',
    fontWeight: 400,
  },
  secondaryButton: {
    borderColor: '#566546',
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#566546',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    textAlign: 'center',
    color: '#4B4B3F',
    fontSize: 12,
    fontFamily: 'Avenir',
    fontWeight: 400,
    marginTop: 20,
    marginHorizontal: 12,
  },
});

export default RegistrationScreen;
