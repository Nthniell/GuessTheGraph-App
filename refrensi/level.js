// Remove imports and use Firebase Compat
const firebaseConfig = {
    apiKey: "AIzaSyBgyGIHcBlqkV2XHNTEnLPH3xd6ecXzY1w",
    authDomain: "guessthegraph-app.firebaseapp.com",
    projectId: "guessthegraph-app",
    storageBucket: "guessthegraph-app.firebasestorage.app",
    messagingSenderId: "250501863956",
    appId: "1:250501863956:web:8fe7d2df70620755da2501"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

const levels = {
    level1: { equation: 'x^2 + 2*x + 1' },
    level2: { equation: 'x^3 - 3*x^2 + 2' },
    level3: { equation: 'sin(x)' },
    level4: { equation: 'cos(x)' },
    level5: { equation: 'tan(x)' },
    level6: { equation: 'log(x)' },
    level7: { equation: 'e^x' },
    level8: { equation: 'sqrt(x)' },
    level9: { equation: 'x^4 - 4*x^3 + 6*x^2 - 4*x + 1' },
    level10: { equation: '1/(1 + e^-x)' }
};

let currentLevel = levels.level1;
let currentUser = null;
let userGameData = null;

// Listen for auth state changes
auth.onAuthStateChanged(async (user) => {
    if (user) {
        currentUser = user;
        await loadUserGameData();
    } else {
        window.location.href = 'index.html';
    }
});

async function loadUserGameData() {
    if (!currentUser) return;
    
    try {
        const userDoc = await db.collection("users").doc(currentUser.uid).get();
        if (userDoc.exists) {
            userGameData = userDoc.data();
            // Ensure data structure is correct
            if (userGameData.userId !== currentUser.email) {
                await db.collection("users").doc(currentUser.uid).set({
                    userId: currentUser.email,
                    highestLevel: "level1",
                    totalScore: userGameData.totalScore || 0
                });
                userGameData.userId = currentUser.email;
            }
        } else {
            userGameData = {
                userId: currentUser.email,
                highestLevel: "level1",
                totalScore: 0
            };
            await db.collection("users").doc(currentUser.uid).set(userGameData);
        }
        console.log('User data loaded:', userGameData);
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

async function updateUserProgress(levelCompleted) {
    if (!currentUser || !userGameData) return;

    try {
        // Add points for level completion
        userGameData.totalScore += 10;
        
        // Update highest level if current level is higher
        const currentLevelNum = parseInt(levelCompleted.replace('level', ''));
        const highestLevelNum = parseInt(userGameData.highestLevel.replace('level', ''));
        
        if (currentLevelNum > highestLevelNum) {
            userGameData.highestLevel = `level${currentLevelNum}`;
        }

        // Update with correct data structure
        const updates = {
            userId: currentUser.email,
            highestLevel: userGameData.highestLevel,
            totalScore: userGameData.totalScore
        };

        await db.collection("users").doc(currentUser.uid).update(updates);
        console.log('Progress updated:', updates);
        
    } catch (error) {
        console.error('Error updating progress:', error);
    }
}

function setLevel(level) {
    currentLevel = levels[level];
}

function getLevelEquation() {
    return currentLevel.equation;
}

// Export necessary functions
window.setLevel = setLevel;
window.getLevelEquation = getLevelEquation;
window.updateUserProgress = updateUserProgress;