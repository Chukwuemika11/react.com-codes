import React, {useState} from 'react';
import { useMutation } from '@tanstack/react-query';

const signUpApi = async (formData) => {
  try {
    // Simulate sign-up API call using JSONPlaceholder
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to sign up');
    }

    // Simulated response data
    return { success: true }; // Simulate successful sign-up
  } catch (error) {
    console.error('Error signing up:', error);
    throw error; // Rethrow the error for handling
  }
};

const loginApi = async (formData) => {
  try {
    // Simulate login API call using JSONPlaceholder
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to log in');
    }

    // Simulated response data
    return { success: true }; // Simulate successful login
  } catch (error) {
    console.error('Error logging in:', error);
    throw error; // Rethrow the error for handling
  }
};

function App() {
  const [signUpFormData, setSignUpFormData] = useState({ username: '', email: '', password: '' });
  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });

  const signUpMutation = useMutation(signUpApi);
  const loginMutation = useMutation(loginApi);

  const handleSignUp = async (e) => {
    e.preventDefault();
    await signUpMutation.mutateAsync(signUpFormData);
    console.log('Sign-up successful');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginMutation.mutateAsync(loginFormData);
    console.log('Login successful');
  };

  const handleInputChange = (e, setFormData) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input type="text" name="username" value={signUpFormData.username} onChange={(e) => handleInputChange(e, setSignUpFormData)} placeholder="Username" required />
        <input type="email" name="email" value={signUpFormData.email} onChange={(e) => handleInputChange(e, setSignUpFormData)} placeholder="Email" required />
        <input type="password" name="password" value={signUpFormData.password} onChange={(e) => handleInputChange(e, setSignUpFormData)} placeholder="Password" required />
        <button type="submit" disabled={signUpMutation.isLoading}>Sign Up</button>
        {signUpMutation.isLoading && <span>Loading...</span>}
        {signUpMutation.isError && <span>Error: {signUpMutation.error.message}</span>}
      </form>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" value={loginFormData.email} onChange={(e) => handleInputChange(e, setLoginFormData)} placeholder="Email" required />
        <input type="password" name="password" value={loginFormData.password} onChange={(e) => handleInputChange(e, setLoginFormData)} placeholder="Password" required />
        <button type="submit" disabled={loginMutation.isLoading}>Login</button>
        {loginMutation.isLoading && <span>Loading...</span>}
        {loginMutation.isError && <span>Error: {loginMutation.error.message}</span>}
      </form>
    </div>
  );
};

export default App;
