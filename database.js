// Estrutura da base de dados usando localStorage

// Função para inicializar a base de dados
function initDatabase() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('matches')) {
        localStorage.setItem('matches', JSON.stringify([]));
    }
    if (!localStorage.getItem('messages')) {
        localStorage.setItem('messages', JSON.stringify([]));
    }
}

// Funções para gerenciar usuários
const userDB = {
    create: (user) => {
        const users = JSON.parse(localStorage.getItem('users'));
        users.push({
            id: Date.now(),
            ...user,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('users', JSON.stringify(users));
    },
    
    update: (userId, data) => {
        const users = JSON.parse(localStorage.getItem('users'));
        const index = users.findIndex(u => u.id === userId);
        if (index !== -1) {
            users[index] = { ...users[index], ...data };
            localStorage.setItem('users', JSON.stringify(users));
        }
    },
    
    delete: (userId) => {
        const users = JSON.parse(localStorage.getItem('users'));
        const filtered = users.filter(u => u.id !== userId);
        localStorage.setItem('users', JSON.stringify(users));
    },
    
    getById: (userId) => {
        const users = JSON.parse(localStorage.getItem('users'));
        return users.find(u => u.id === userId);
    },
    
    getAll: () => {
        return JSON.parse(localStorage.getItem('users'));
    }
};

// Funções para gerenciar matches
const matchDB = {
    create: (match) => {
        const matches = JSON.parse(localStorage.getItem('matches'));
        matches.push({
            id: Date.now(),
            ...match,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('matches', JSON.stringify(matches));
    },
    
    getByUserId: (userId) => {
        const matches = JSON.parse(localStorage.getItem('matches'));
        return matches.filter(m => 
            m.user1Id === userId || 
            m.user2Id === userId || 
            m.user3Id === userId
        );
    }
};

// Funções para gerenciar mensagens
const messageDB = {
    create: (message) => {
        const messages = JSON.parse(localStorage.getItem('messages'));
        messages.push({
            id: Date.now(),
            ...message,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('messages', JSON.stringify(messages));
    },
    
    getByMatchId: (matchId) => {
        const messages = JSON.parse(localStorage.getItem('messages'));
        return messages.filter(m => m.matchId === matchId);
    }
};

// Inicializar a base de dados
initDatabase();

// Exportar as funções
window.DB = {
    users: userDB,
    matches: matchDB,
    messages: messageDB
};