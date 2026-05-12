import React, { createContext, useContext, useEffect, useState, Component } from 'react';
import { auth, onAuthStateChanged, User, db, handleFirestoreError, OperationType } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export type UserRole = 'admin' | 'miner' | 'buyer' | 'client' | null;

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isMiner: boolean;
  isBuyer: boolean;
  role: UserRole;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  isMiner: false,
  isBuyer: false,
  role: null,
});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMiner, setIsMiner] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);
  const [role, setRole] = useState<UserRole>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (!userDoc.exists()) {
            // Create user profile if it doesn't exist
            const userEmail = user.email?.toLowerCase().trim();
            const isDefaultAdmin = userEmail === "dvd.gondwe9@gmail.com" || userEmail === "admin@afritradexafrica.com";
            const initialRole: UserRole = isDefaultAdmin ? 'admin' : 'client';
            
            const newUser = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              role: initialRole,
              createdAt: serverTimestamp(),
            };
            await setDoc(userDocRef, newUser);
            setRole(initialRole);
            setIsAdmin(isDefaultAdmin);
            setIsMiner(false);
            setIsBuyer(false);
          } else {
            const userData = userDoc.data();
            const userEmail = user.email?.toLowerCase().trim();
            const isCoreAdmin = userEmail === "dvd.gondwe9@gmail.com" || userEmail === "admin@afritradexafrica.com";
            
            let currentRole = userData.role as UserRole;

            // If it's a core admin but the role in DB is not admin, update it
            if (isCoreAdmin && currentRole !== 'admin') {
              await setDoc(userDocRef, { role: 'admin' }, { merge: true });
              currentRole = 'admin';
            }

            setRole(currentRole);
            setIsAdmin(currentRole === 'admin');
            setIsMiner(currentRole === 'miner');
            setIsBuyer(currentRole === 'buyer');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          if (user.email === "dvd.gondwe9@gmail.com") {
            setRole('admin');
            setIsAdmin(true);
          }
        }
      } else {
        setRole(null);
        setIsAdmin(false);
        setIsMiner(false);
        setIsBuyer(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, loading, isAdmin, isMiner, isBuyer, role }}>
      {children}
    </FirebaseContext.Provider>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo: string | null;
}

export class ErrorBoundary extends Component<any, any> {
  constructor(props: any) {
    super(props);
    (this as any).state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if ((this as any).state.hasError) {
      let displayMessage = "Something went wrong.";
      try {
        const parsed = JSON.parse((this as any).state.errorInfo || "");
        if (parsed.error) {
          displayMessage = `Firestore Error: ${parsed.error} (Op: ${parsed.operationType}, Path: ${parsed.path})`;
        }
      } catch (e) {
        displayMessage = (this as any).state.errorInfo || displayMessage;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-jet-black p-6 text-center">
          <div className="glass-card p-12 max-w-md">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Application Error</h2>
            <p className="text-soft-grey mb-8">{displayMessage}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary px-8 py-3"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
