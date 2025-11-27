import { MomaLogo } from '@/components/MomaLogo';
import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import {
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

export default function LoginScreen() {
  const router = useRouter();

  // State Form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // State Error
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const handleLogin = () => {
    // Reset error
    setErrors({ username: '', password: '' });

    // Simulasi Validasi (Logic Hardcode Sederhana)
    let isValid = true;
    let newErrors = { username: '', password: '' };

    if (!username) {
        newErrors.username = "The username has not been registered yet";
        isValid = false;
    }
    
    if (!password) {
        newErrors.password = "You may have inputted the wrong password";
        isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      // Jika Login Sukses, langsung ke Home (Tabs)
      // Menggunakan replace agar user tidak bisa back ke halaman login
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgScreen} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Logo Section */}
        <MomaLogo size={170} />

        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Enter valid username and password to continue</Text>

        {/* Input: Username */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="enter username"
            placeholderTextColor={COLORS.textSecondary}
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        {/* Error Message Username */}
        {errors.username ? <Text style={styles.errorText}>✕ {errors.username}</Text> : null}

        {/* Input: Password */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="enter password"
            placeholderTextColor={COLORS.textSecondary}
            style={styles.input}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            {showPassword ? <Eye size={20} color={COLORS.textMain} /> : <EyeOff size={20} color={COLORS.textMain} />}
          </TouchableOpacity>
        </View>
        {/* Error Message Password */}
        {errors.password ? <Text style={styles.errorText}>✕ {errors.password}</Text> : null}

        {/* Button Sign In */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Footer Links */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don’t have any account? </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => alert('Fitur Lupa Password')}>
            <Text style={styles.linkTextBlue}>Forget password</Text>
        </TouchableOpacity>

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
    paddingTop: 60,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textMain,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgInput,
    borderRadius: 30, // Lebih rounded sesuai gambar Login
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 5, // Jarak dikit ke error message
    paddingHorizontal: 20,
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
    marginBottom: 15, // Jarak setelah error message
    fontWeight: '500',
    marginLeft: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 55,
    borderRadius: 30, // Tombol Login terlihat lebih bulat di desain
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
    marginBottom: 10,
  },
  footerText: {
    color: COLORS.textSecondary,
  },
  linkText: {
    color: '#007AFF', // Biru Sign Up
    fontWeight: '600',
  },
  linkTextBlue: {
    color: '#007AFF', // Biru Forget Password
    fontWeight: '500',
  }
});