// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDX2wT8PkMszu2THIElSj6af36pp1vklOw",
    authDomain: "triomatch.firebaseapp.com",
    projectId: "triomatch",
    storageBucket: "triomatch.firebasestorage.app",
    messagingSenderId: "1071970009278",
    appId: "1:1071970009278:web:87152495a3e1ae09ba1eef"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referências úteis
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Funções de autenticação
const authFunctions = {
    signUp: async (email, password, userData) => {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            await db.collection('users').doc(userCredential.user.uid).set(userData);
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    },

    signIn: async (email, password) => {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    },

    signOut: async () => {
        try {
            await auth.signOut();
        } catch (error) {
            throw error;
        }
    }
};

// Funções do banco de dados
const dbFunctions = {
    createProfile: async (userId, profileData) => {
        try {
            await db.collection('profiles').doc(userId).set(profileData);
        } catch (error) {
            throw error;
        }
    },

    updateProfile: async (userId, profileData) => {
        try {
            await db.collection('profiles').doc(userId).update(profileData);
        } catch (error) {
            throw error;
        }
    },

    getProfiles: async () => {
        try {
            const snapshot = await db.collection('profiles').get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            throw error;
        }
    },

    createMatch: async (matchData) => {
        try {
            await db.collection('matches').add(matchData);
        } catch (error) {
            throw error;
        }
    },

    getMatches: async (userId) => {
        try {
            const snapshot = await db.collection('matches')
                .where('participants', 'array-contains', userId)
                .get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            throw error;
        }
    }
};

// Funções de armazenamento
const storageFunctions = {
    uploadPhoto: async (userId, file) => {
        try {
            const ref = storage.ref(`profiles/${userId}/${file.name}`);
            await ref.put(file);
            return await ref.getDownloadURL();
        } catch (error) {
            throw error;
        }
    },

    deletePhoto: async (photoUrl) => {
        try {
            const ref = storage.refFromURL(photoUrl);
            await ref.delete();
        } catch (error) {
            throw error;
        }
    }
};

// Exportar funções
window.Firebase = {
    auth: authFunctions,
    db: dbFunctions,
    storage: storageFunctions
};