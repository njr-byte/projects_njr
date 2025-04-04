import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase/config';
import { signInWithPopup } from 'firebase/auth';

const AuthCard: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleLogin = () => {
        // Placeholder for username/password login logic
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        setError(null);
        console.log('Logging in with:', { username, password });
    };

    return (
        <div style={styles.card}>
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>Welcome</h1>
                <p style={styles.headerSubtitle}>Sign in to continue</p>
            </header>
            <div style={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button style={styles.button} onClick={handleLogin}>
                    Login
                </button>
            </div>
            <div style={styles.separator}>
                <span style={styles.separatorText}>OR</span>
            </div>
            <button style={styles.button} onClick={handleSignIn}>
                Sign in with Google
            </button>
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        backgroundColor: '#1e1e1e',
        color: '#fff',
        boxSizing: 'border-box', // Ensures padding is included in the width
        overflow: 'hidden', // Prevents content from overflowing the card
    },
    header: {
        marginBottom: '20px',
        padding: '10px',
        borderBottom: '1px solid #333',
    },
    headerTitle: {
        fontSize: '28px',
        margin: '0',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: '16px',
        margin: '5px 0 0',
        color: '#aaa',
    },
    form: {
        marginBottom: '20px',
    },
    input: {
        display: 'block',
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #333',
        backgroundColor: '#2e2e2e',
        color: '#fff',
        fontSize: '16px',
        boxSizing: 'border-box', // Ensures the input stays within the card's width
    },
    separator: {
        margin: '20px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    separatorText: {
        backgroundColor: '#1e1e1e',
        padding: '0 10px',
        color: '#aaa',
    },
    button: {
        display: 'block',
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007BFF',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    error: {
        marginTop: '20px',
        color: '#ff4d4d',
        fontSize: '14px',
    },
};

export default AuthCard;