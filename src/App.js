import React from 'react';
import './App.css';
import Chat from './components/Chat'
import { GlobalProvider } from './components/GlobalProvider';
import UserAuthentication from './components/UserAuthentication';

export default function App() {

	return (
		<GlobalProvider>
			<UserAuthentication />
			<Chat />
		</GlobalProvider>
	);
};