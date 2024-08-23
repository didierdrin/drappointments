'use client';
import React, { useState } from 'react';
import { useAuth } from './authprovider';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { auth } from './authprovider';
import { setCookie } from 'cookies-next';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        setCookie('auth_token', token, { maxAge: 60 * 60 * 24 * 7 }); // 1 week
        login(email, password); // This will handle the redirection
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        // After successful signup, log the user in automatically
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        setCookie('auth_token', token, { maxAge: 60 * 60 * 24 * 7 }); // 1 week
        login(email, password);
      }
    } catch (err) {
      const firebaseError = err as AuthError;
      if (firebaseError.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists. Please try logging in instead.');
      } else if (firebaseError.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (firebaseError.code === 'auth/user-not-found') {
        setError('No account found with this email. Please sign up.');
      } else {
        setError(isLogin ? 'Failed to log in. Please try again.' : 'Failed to create an account. Please try again.');
      }
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
  {/* Welcome section */}
  <div className='w-1/2 bg-violet-500 text-white p-12 flex flex-col justify-between'>
    <div>
      <h1 className="text-4xl font-bold mb-4">Drappointments</h1>
      <p className="text-xl mb-8">Welcome to appointments management platform</p>
    </div>
    <div className="space-y-4">
      <p className="text-lg">Monitor your appointments, track your patients, and achieve your health care milestone with Drappointments.</p>
      <p className="text-sm opacity-75">Join thousands of users who have already improved their productivity.</p>
    </div>
  </div>

  {/* Login/Sign up section */}
  <div className='w-1/2 bg-white p-12 flex flex-col justify-center'>
    <h2 className="text-3xl font-semibold mb-6">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button 
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        {isLogin ? 'Log In' : 'Sign Up'}
      </button>
    </form>
    <p className="mt-4 text-center text-sm text-gray-600">
      {isLogin ? "Don't have an account? " : "Already have an account? "}
      <button 
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-600 hover:underline font-medium"
      >
        {isLogin ? 'Sign Up' : 'Log In'}
      </button>
    </p>
  </div>
</div>
  );
}