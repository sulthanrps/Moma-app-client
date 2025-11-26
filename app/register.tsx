import { useRouter } from 'expo-router';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { MomaLogo } from '@/components/MomaLogo';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const COLORS = {
  primary: '#D98989', 
  textMain: '#000000',
  textSecondary: '#A0A0A0',
  bgInput: '#FFFFFF',
  bgScreen: '#F5F5F5',
  error: '#FF0000',
  link: '#007AFF'
};

export default function RegisterScreen() {
  const router = useRouter();

  // State Form
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleRegister = () => {
    // Validasi Sederhana
    let newErrors: any = {};
    if (!form.email.includes('@')) newErrors.email = "Your email is invalid";
    if (form.password.length < 6) newErrors.password = "Your password is weak";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Your password does not match";
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Jika sukses, lanjut ke Create PIN
      router.push('/create-pin');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgScreen} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Logo Section */}
        <MomaLogo size={170} />

        <Text style={styles.title}>Sign Up</Text>

        {/* Input: Full Name */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="enter your full name"
            placeholderTextColor={COLORS.textSecondary}
            style={styles.input}
            onChangeText={(text) => setForm({...form, fullName: text})}
          />
        </View>

        {/* Input: Email */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="enter your email"
            placeholderTextColor={COLORS.textSecondary}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => setForm({...form, email: text})}
          />
        </View>
        {errors.email && <Text style={styles.errorText}>✕ {errors.email}</Text>}

        {/* Input: Phone */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="enter your phone number"
            placeholderTextColor={COLORS.textSecondary}
            style={styles.input}
            keyboardType="phone-pad"
            onChangeText={(text) => setForm({...form, phone: text})}
          />
        </View>

        {/* Input: Password */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="create a strong password !"
            placeholderTextColor={COLORS.textSecondary}
            style={styles.input}
            secureTextEntry={!showPassword}
            onChangeText={(text) => setForm({...form, password: text})}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            {showPassword ? <Eye size={20} color={COLORS.textMain} /> : <EyeOff size={20} color={COLORS.textMain} />}
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.errorText}>✕ {errors.password}</Text>}

        {/* Input: Confirm Password */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="re-enter your password !"
            placeholderTextColor={COLORS.textSecondary}
            style={styles.input}
            secureTextEntry={!showConfirmPassword}
            onChangeText={(text) => setForm({...form, confirmPassword: text})}
          />
           <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
             {showConfirmPassword ? <Eye size={20} color={COLORS.textMain} /> : <EyeOff size={20} color={COLORS.textMain} />}
          </TouchableOpacity>
        </View>
         {errors.confirmPassword && <Text style={styles.errorText}>✕ {errors.confirmPassword}</Text>}

        {/* Terms Text */}
        <Text style={styles.termsText}>
          By signing up, you are agree to our <Text style={styles.linkText}>Terms & Conditions</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>

        {/* Button Create Account */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an Account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}> 
             {/* Pastikan ini mengarah ke /login */}
            <Text style={styles.linkText}>Sign In</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgScreen,
  },
  scrollContent: {
    padding: 24,
    alignItems: 'center',
    paddingTop: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textMain,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgInput,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 10,
    marginTop: 5,
    paddingHorizontal: 15,
    height: 55,
    width: '100%',
  },
  input: {
    flex: 1,
    height: '100%',
    color: COLORS.textMain,
  },
  eyeIcon: {
    padding: 5,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
    fontWeight: '500',
    marginLeft: 5,
  },
  termsText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontSize: 12,
    marginVertical: 20,
    lineHeight: 18,
  },
  linkText: {
    color: COLORS.link,
    fontWeight: '600',
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 40,
  },
  footerText: {
    color: COLORS.textSecondary,
  }
});