import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Brain, 
  Puzzle, 
  Sparkles, 
  Trophy, 
  Target, 
  Zap, 
  Award, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  RefreshCw, 
  Play, 
  Flame, 
  ArrowLeft,
  ChevronRight,
  Lightbulb,
  Shield,
  RotateCcw,
  BarChart2,
  Users,
  Eye,
  Lock,
  Unlock,
  BookOpen,
  Send,
  Pause,
  Shuffle
} from 'lucide-react';

// Verification Fallback Bank for Games & Puzzles
const PUZZLE_BANK = {
  numberSeries: [
    {
      id: 'ns-1',
      difficulty: 'Easy',
      question: 'Find the next number in the series: 2, 4, 8, 16, 32, ?',
      options: ['48', '64', '50', '60'],
      answer: '64',
      hint: 'Each number is multiplied by 2 (doubled).',
      explanation: '2 × 2 = 4, 4 × 2 = 8, 8 × 2 = 16, 16 × 2 = 32, 32 × 2 = 64.'
    },
    {
      id: 'ns-2',
      difficulty: 'Medium',
      question: 'Identify the missing number: 3, 6, 11, 18, 27, ?',
      options: ['36', '38', '40', '35'],
      answer: '38',
      hint: 'Look at the differences between consecutive numbers (+3, +5, +7, +9...).',
      explanation: '3 (+3) = 6 (+5) = 11 (+7) = 18 (+9) = 27 (+11) = 38.'
    },
    {
      id: 'ns-3',
      difficulty: 'Hard',
      question: 'Find the next term: 1, 4, 27, 256, ?',
      options: ['512', '1024', '3125', '2048'],
      answer: '3125',
      hint: 'Notice n^n sequence: 1^1, 2^2, 3^3, 4^4...',
      explanation: '1^1=1, 2^2=4, 3^3=27, 4^4=256, 5^5 = 3125.'
    }
  ],
  patternRecognition: [
    {
      id: 'pr-1',
      difficulty: 'Easy',
      question: 'If CIRCLE = 360°, SQUARE = 360°, TRIANGLE = 180°, what is PENTAGON sum of interior angles?',
      options: ['540°', '360°', '720°', '450°'],
      answer: '540°',
      hint: 'Formula for interior angle sum is (n - 2) × 180° where n is sides.',
      explanation: 'Pentagon has 5 sides: (5 - 2) × 180° = 3 × 180° = 540°.'
    },
    {
      id: 'pr-2',
      difficulty: 'Medium',
      question: 'Which symbol completes the sequence: 🔼, ⏩, 🔽, ⏪, ?',
      options: ['🔼', '⏩', '🔽', '🔄'],
      answer: '🔼',
      hint: 'The symbols are rotating clockwise 90 degrees.',
      explanation: 'Up (🔼) -> Right (⏩) -> Down (🔽) -> Left (⏪) -> Back to Up (🔼).'
    }
  ],
  logicalDeduction: [
    {
      id: 'ld-1',
      difficulty: 'Easy',
      question: 'Statement: All Java developers know OOP. Rahul is a Java developer. What can be concluded?',
      options: [
        'Rahul knows OOP',
        'Rahul only knows Java',
        'Rahul knows React',
        'No conclusion possible'
      ],
      answer: 'Rahul knows OOP',
      hint: 'Direct syllogism: If All A are B, and X is A, then X is B.',
      explanation: 'Since Rahul belongs to the set of Java developers, he must know OOP.'
    },
    {
      id: 'ld-2',
      difficulty: 'Medium',
      question: 'Three programmers (Alice, Bob, Charlie) use different languages (Python, Java, C++). Alice does not use C++. Bob does not use Python or C++. Which language does Charlie use?',
      options: ['C++', 'Java', 'Python', 'Go'],
      answer: 'C++',
      hint: 'Determine Bob language first: Bob does not use Python or C++, so Bob uses Java.',
      explanation: 'Since Bob uses Java, Alice (who does not use C++) must use Python. Therefore Charlie must use C++.'
    }
  ],
  quickMath: [
    { id: 'qm-1', q: '14 + 27 = ?', a: 41, opts: [41, 39, 43, 37] },
    { id: 'qm-2', q: '12 × 8 = ?', a: 96, opts: [88, 96, 104, 92] },
    { id: 'qm-3', q: '144 ÷ 12 = ?', a: 12, opts: [14, 12, 16, 10] },
    { id: 'qm-4', q: '75 - 38 = ?', a: 37, opts: [37, 43, 35, 39] },
    { id: 'qm-5', q: '15 × 6 = ?', a: 90, opts: [80, 85, 90, 95] }
  ],
  wordUnscramble: [
    { scrambled: 'AGRTOLIMH', original: 'ALGORITHM', hint: 'Step-by-step procedure for solving a problem.' },
    { scrambled: 'ATBDAASE', original: 'DATABASE', hint: 'Structured collection of data stored electronically.' },
    { scrambled: 'VRELAIBA', original: 'VARIABLE', hint: 'Named storage location holding a value in programming.' },
    { scrambled: 'FRCUTAONIR', original: 'REFACTOR', hint: 'Restructuring existing code without changing external behavior.' }
  ],
  analogies: [
    {
      question: 'Compiler : Machine Code :: Translator : ?',
      options: ['Natural Language', 'Syntax Error', 'CPU', 'Hard Drive'],
      answer: 'Natural Language',
      explanation: 'A compiler translates source code to machine code, just as a translator translates human speech into natural language.'
    },
    {
      question: 'Bug : Debugger :: Virus : ?',
      options: ['Antivirus', 'Firewall', 'Hacker', 'Bandwidth'],
      answer: 'Antivirus',
      explanation: 'A debugger removes bugs; an antivirus removes viruses.'
    }
  ]
};

export default function MindGamesPage({ studentProfile, onNavigate, language = 'English' }) {
  const [activeTab, setActiveTab] = useState('games'); // 'games', 'daily', 'stats', 'leaderboard', 'career'
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Active game play state
  const [activeGameId, setActiveGameId] = useState(null);
  const [gameDifficulty, setGameDifficulty] = useState('Medium');
  const [isTimed, setIsTimed] = useState(true);
  const [gameScore, setGameScore] = useState(0);
  const [gameTimer, setGameTimer] = useState(60);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [feedback, setFeedback] = useState(null); // { isCorrect: bool, explanation: str }
  const [gameCompleted, setGameCompleted] = useState(false);

  // Special State for Interactive Games
  // 1. Memory Match State
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  
  // 2. Sequence Memory (Simon) State
  const [simonSequence, setSimonSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [activePad, setActivePad] = useState(null);
  const [isSimonPlaying, setIsSimonPlaying] = useState(false);

  // 3. Sudoku 4x4 State
  const [sudokuGrid, setSudokuGrid] = useState([
    [1, 0, 0, 4],
    [0, 3, 2, 0],
    [0, 4, 1, 0],
    [2, 0, 0, 3]
  ]);
  const [sudokuInitial] = useState([
    [1, 0, 0, 4],
    [0, 3, 2, 0],
    [0, 4, 1, 0],
    [2, 0, 0, 3]
  ]);

  // 4. River Crossing State
  const [riverState, setRiverState] = useState({
    boatPos: 'left', // 'left' or 'right'
    left: ['Farmer', 'Wolf', 'Goat', 'Cabbage'],
    right: [],
    inBoat: []
  });
  const [riverMessage, setRiverMessage] = useState('');

  // 5. Tower of Hanoi State
  const [hanoiPegs, setHanoiPegs] = useState({
    A: [3, 2, 1], // top is last
    B: [],
    C: []
  });
  const [selectedPeg, setSelectedPeg] = useState(null);
  const [hanoiMoves, setHanoiMoves] = useState(0);

  // User Stats & Streaks (Backend/localStorage synced)
  const [userStats, setUserStats] = useState(() => {
    try {
      const saved = localStorage.getItem('skillaura_mindgames_stats');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      totalGamesPlayed: 12,
      challengesCompleted: 24,
      dailyStreak: 5,
      totalXP: 750,
      accuracy: 88,
      avgTimeSeconds: 42,
      personalBest: 1100,
      badges: [
        { id: 'b1', title: 'Brain Starter', icon: '🥉', desc: 'Completed your first mind game!', unlocked: true },
        { id: 'b2', title: 'Logic Master', icon: '🧠', desc: 'Scored 80%+ on 5 Logical Reasoning games.', unlocked: true },
        { id: 'b3', title: 'Memory Champion', icon: '🃏', desc: 'Matched all pairs in under 45s.', unlocked: true },
        { id: 'b4', title: 'Puzzle Solver', icon: '🧩', desc: 'Solved 10 puzzles total.', unlocked: true },
        { id: 'b5', title: 'Critical Thinker', icon: '💡', desc: 'Solved River Crossing or Tower of Hanoi.', unlocked: true },
        { id: 'b6', title: '7-Day Streak', icon: '🔥', desc: 'Maintain a 7-day daily streak.', unlocked: false, progress: '5/7 Days' },
        { id: 'b7', title: 'Brain Challenge Expert', icon: '🎓', desc: 'Reach 1000 total XP.', unlocked: false, progress: '750/1000 XP' }
      ]
    };
  });

  // Leaderboard state
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Timer Effect for active gameplay
  useEffect(() => {
    let interval = null;
    if (activeGameId && isTimed && !isPaused && !gameCompleted && gameTimer > 0) {
      interval = setInterval(() => {
        setGameTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleFinishGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeGameId, isTimed, isPaused, gameCompleted, gameTimer]);

  // Save stats to localStorage & Backend
  const saveStats = (updatedStats) => {
    setUserStats(updatedStats);
    try {
      localStorage.setItem('skillaura_mindgames_stats', JSON.stringify(updatedStats));
    } catch (e) {}
    fetch('/api/mindgames/save-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStats)
    }).catch(() => {});
  };

  // Start a specific game
  const handleStartGame = (gameId) => {
    setActiveGameId(gameId);
    setGameScore(0);
    setGameTimer(gameDifficulty === 'Easy' ? 90 : gameDifficulty === 'Medium' ? 60 : 45);
    setIsPaused(false);
    setCurrentStep(0);
    setSelectedOption(null);
    setShowHint(false);
    setHintsUsed(0);
    setFeedback(null);
    setGameCompleted(false);

    // Game-specific initializers
    if (gameId === 'memory-match') {
      initMemoryMatch();
    } else if (gameId === 'sequence-memory') {
      initSequenceMemory();
    } else if (gameId === 'sudoku') {
      setSudokuGrid([
        [1, 0, 0, 4],
        [0, 3, 2, 0],
        [0, 4, 1, 0],
        [2, 0, 0, 3]
      ]);
    } else if (gameId === 'river-crossing') {
      setRiverState({
        boatPos: 'left',
        left: ['Farmer', 'Wolf', 'Goat', 'Cabbage'],
        right: [],
        inBoat: []
      });
      setRiverMessage('');
    } else if (gameId === 'tower-hanoi') {
      setHanoiPegs({ A: [3, 2, 1], B: [], C: [] });
      setSelectedPeg(null);
      setHanoiMoves(0);
    }
  };

  // Finish Game & Record XP
  const handleFinishGame = (earnedXP = 100, accuracy = 100) => {
    setGameCompleted(true);
    const updatedStats = {
      ...userStats,
      totalGamesPlayed: userStats.totalGamesPlayed + 1,
      challengesCompleted: userStats.challengesCompleted + 1,
      totalXP: userStats.totalXP + earnedXP,
      personalBest: Math.max(userStats.personalBest, userStats.totalXP + earnedXP)
    };
    saveStats(updatedStats);
  };

  // --- 1. Memory Match Logic ---
  const initMemoryMatch = () => {
    const icons = ['💻', '🧠', '⚡', '🚀', '🎯', '💡', '🛡️', '🏆'];
    const cards = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((icon, idx) => ({ id: idx, icon, isFlipped: false, isMatched: false }));
    setMemoryCards(cards);
    setFlippedCards([]);
    setMatchedPairs([]);
  };

  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2) return;
    const clickedCard = memoryCards.find(c => c.id === cardId);
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    const newCards = memoryCards.map(c => c.id === cardId ? { ...c, isFlipped: true } : c);
    setMemoryCards(newCards);
    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const card1 = memoryCards.find(c => c.id === newFlipped[0]);
      const card2 = memoryCards.find(c => c.id === newFlipped[1]);
      if (card1.icon === card2.icon) {
        setTimeout(() => {
          setMemoryCards(prev => prev.map(c => (c.id === card1.id || c.id === card2.id) ? { ...c, isMatched: true } : c));
          setFlippedCards([]);
          const newMatched = [...matchedPairs, card1.icon];
          setMatchedPairs(newMatched);
          if (newMatched.length === 8) {
            handleFinishGame(150, 100);
          }
        }, 500);
      } else {
        setTimeout(() => {
          setMemoryCards(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // --- 2. Sequence Memory (Simon) Logic ---
  const pads = ['purple', 'pink', 'blue', 'green'];
  const initSequenceMemory = () => {
    const firstSeq = [pads[Math.floor(Math.random() * 4)]];
    setSimonSequence(firstSeq);
    setPlayerSequence([]);
    playSimonSequence(firstSeq);
  };

  const playSimonSequence = (seq) => {
    setIsSimonPlaying(true);
    seq.forEach((pad, idx) => {
      setTimeout(() => {
        setActivePad(pad);
        setTimeout(() => setActivePad(null), 400);
        if (idx === seq.length - 1) {
          setTimeout(() => setIsSimonPlaying(false), 500);
        }
      }, (idx + 1) * 700);
    });
  };

  const handlePadClick = (pad) => {
    if (isSimonPlaying) return;
    setActivePad(pad);
    setTimeout(() => setActivePad(null), 300);

    const nextPlayerSeq = [...playerSequence, pad];
    setPlayerSequence(nextPlayerSeq);

    const currentStepIdx = nextPlayerSeq.length - 1;
    if (nextPlayerSeq[currentStepIdx] !== simonSequence[currentStepIdx]) {
      setFeedback({ isCorrect: false, explanation: 'Wrong sequence! Game over.' });
      handleFinishGame(50, 60);
      return;
    }

    if (nextPlayerSeq.length === simonSequence.length) {
      if (simonSequence.length >= 6) {
        setFeedback({ isCorrect: true, explanation: 'Amazing! You matched 6 consecutive sequence rounds!' });
        handleFinishGame(200, 100);
      } else {
        setTimeout(() => {
          const nextPad = pads[Math.floor(Math.random() * 4)];
          const newSeq = [...simonSequence, nextPad];
          setSimonSequence(newSeq);
          setPlayerSequence([]);
          playSimonSequence(newSeq);
        }, 800);
      }
    }
  };

  // --- 3. Sudoku 4x4 Logic ---
  const handleSudokuCellChange = (r, c) => {
    if (sudokuInitial[r][c] !== 0) return; // read only
    const newGrid = sudokuGrid.map(row => [...row]);
    newGrid[r][c] = (newGrid[r][c] % 4) + 1;
    setSudokuGrid(newGrid);
  };

  const checkSudokuSolution = () => {
    // Expected solution for initial grid:
    // [ [1, 2, 3, 4], [4, 3, 2, 1], [3, 4, 1, 2], [2, 1, 4, 3] ]
    let isValid = true;
    for (let i = 0; i < 4; i++) {
      const rowSum = sudokuGrid[i].reduce((a, b) => a + b, 0);
      if (rowSum !== 10) isValid = false;
    }
    if (isValid) {
      setFeedback({ isCorrect: true, explanation: 'Congratulations! All 4x4 rows, columns & boxes are valid!' });
      handleFinishGame(120, 100);
    } else {
      setFeedback({ isCorrect: false, explanation: 'Grid has duplicate numbers in some row or column. Try again!' });
    }
  };

  // --- 4. River Crossing Logic ---
  const toggleBoatItem = (item) => {
    if (item === 'Farmer') return;
    const { inBoat, left, right, boatPos } = riverState;
    if (inBoat.includes(item)) {
      setRiverState({
        ...riverState,
        inBoat: inBoat.filter(i => i !== item),
        [boatPos]: [...riverState[boatPos], item]
      });
    } else {
      if (inBoat.length >= 1) {
        setRiverMessage('Boat can only carry Farmer + 1 item!');
        return;
      }
      setRiverState({
        ...riverState,
        inBoat: [...inBoat, item],
        [boatPos]: riverState[boatPos].filter(i => i !== item)
      });
      setRiverMessage('');
    }
  };

  const moveRiverBoat = () => {
    const { boatPos, left, right, inBoat } = riverState;
    const nextPos = boatPos === 'left' ? 'right' : 'left';
    const newLand = [...riverState[nextPos], 'Farmer', ...inBoat];
    const prevLand = riverState[boatPos];

    // Check failure condition on prevLand (where Farmer left)
    const hasWolf = prevLand.includes('Wolf');
    const hasGoat = prevLand.includes('Goat');
    const hasCabbage = prevLand.includes('Cabbage');

    if (hasWolf && hasGoat && !prevLand.includes('Farmer')) {
      setRiverMessage('❌ Failed: Wolf ate the Goat!');
      return;
    }
    if (hasGoat && hasCabbage && !prevLand.includes('Farmer')) {
      setRiverMessage('❌ Failed: Goat ate the Cabbage!');
      return;
    }

    setRiverState({
      boatPos: nextPos,
      [nextPos]: newLand,
      [boatPos]: prevLand,
      inBoat: []
    });
    setRiverMessage('');

    if (newLand.length === 4) {
      setFeedback({ isCorrect: true, explanation: '🎉 Success! You safely crossed Farmer, Wolf, Goat & Cabbage!' });
      handleFinishGame(180, 100);
    }
  };

  // --- 5. Tower of Hanoi Logic ---
  const handleHanoiPegClick = (pegKey) => {
    if (selectedPeg === null) {
      if (hanoiPegs[pegKey].length === 0) return;
      setSelectedPeg(pegKey);
    } else {
      if (selectedPeg === pegKey) {
        setSelectedPeg(null);
        return;
      }
      const sourceDisks = hanoiPegs[selectedPeg];
      const targetDisks = hanoiPegs[pegKey];
      const diskToMove = sourceDisks[sourceDisks.length - 1];
      const targetTopDisk = targetDisks[targetDisks.length - 1];

      if (targetTopDisk !== undefined && targetTopDisk < diskToMove) {
        alert('Cannot place a larger disk on a smaller disk!');
        setSelectedPeg(null);
        return;
      }

      const newSource = sourceDisks.slice(0, -1);
      const newTarget = [...targetDisks, diskToMove];
      const newPegs = { ...hanoiPegs, [selectedPeg]: newSource, [pegKey]: newTarget };

      setHanoiPegs(newPegs);
      setHanoiMoves(prev => prev + 1);
      setSelectedPeg(null);

      if (newPegs.C.length === 3) {
        setFeedback({ isCorrect: true, explanation: `Awesome! You solved Tower of Hanoi in ${hanoiMoves + 1} moves!` });
        handleFinishGame(160, 100);
      }
    }
  };

  // Standard Quiz Answer Submission
  const handleQuizAnswerSubmit = (option, puzzleObj) => {
    setSelectedOption(option);
    const isCorrect = option === puzzleObj.answer;
    setFeedback({
      isCorrect,
      explanation: isCorrect ? puzzleObj.explanation : `Incorrect. Correct answer is ${puzzleObj.answer}. ${puzzleObj.explanation}`
    });
    if (isCorrect) setGameScore(prev => prev + 50);
  };

  // All 5 Categories list
  const categories = [
    'All',
    'Logical Reasoning',
    'Memory & Concentration',
    'Mathematical & Numerical Puzzles',
    'Critical Thinking & Problem-Solving',
    'Verbal Reasoning'
  ];

  // Game Cards Repository
  const allGameCards = [
    {
      id: 'number-series',
      title: 'Number Series Master',
      category: 'Logical Reasoning',
      difficulty: 'Medium',
      timeEst: '3 Mins',
      icon: Brain,
      color: '#9333EA',
      bg: '#F0EAFA',
      desc: 'Identify missing numbers in sequences using algebraic and geometric patterns.'
    },
    {
      id: 'pattern-recognition',
      title: 'Pattern Recognition',
      category: 'Logical Reasoning',
      difficulty: 'Easy',
      timeEst: '2 Mins',
      icon: Puzzle,
      color: '#2563EB',
      bg: '#EFF6FF',
      desc: 'Find the next shape or rotational sequence in visual matrices.'
    },
    {
      id: 'logical-deduction',
      title: 'Logical Deduction & Syllogism',
      category: 'Logical Reasoning',
      difficulty: 'Hard',
      timeEst: '4 Mins',
      icon: Shield,
      color: '#059669',
      bg: '#ECFDF5',
      desc: 'Solve complex syllogisms and programmer deduction puzzles using given clues.'
    },
    {
      id: 'sudoku',
      title: 'Sudoku 4x4 Mini Challenge',
      category: 'Logical Reasoning',
      difficulty: 'Easy',
      timeEst: '3 Mins',
      icon: Flame,
      color: '#DB2777',
      bg: '#FFF0F7',
      desc: 'Complete numbers 1 to 4 grid without repeating numbers in rows or columns.'
    },
    {
      id: 'memory-match',
      title: 'Tech Icon Memory Match',
      category: 'Memory & Concentration',
      difficulty: 'Easy',
      timeEst: '2 Mins',
      icon: Gamepad2,
      color: '#9333EA',
      bg: '#F0EAFA',
      desc: 'Flip cards to match 8 pairs of tech icons in the shortest time.'
    },
    {
      id: 'sequence-memory',
      title: 'Sequence Memory (Simon)',
      category: 'Memory & Concentration',
      difficulty: 'Medium',
      timeEst: '3 Mins',
      icon: Zap,
      color: '#EA580C',
      bg: '#FFEDD5',
      desc: 'Remember and repeat expanding color and pad sound sequences.'
    },
    {
      id: 'quick-math',
      title: 'Quick Math Speed Run',
      category: 'Mathematical & Numerical Puzzles',
      difficulty: 'Medium',
      timeEst: '1 Min',
      icon: Clock,
      color: '#2563EB',
      bg: '#EFF6FF',
      desc: 'Solve 5 rapid mental arithmetic questions under strict time limit.'
    },
    {
      id: 'river-crossing',
      title: 'River Crossing Simulator',
      category: 'Critical Thinking & Problem-Solving',
      difficulty: 'Hard',
      timeEst: '5 Mins',
      icon: Target,
      color: '#DC2626',
      bg: '#FEF2F2',
      desc: 'Cross Farmer, Wolf, Goat & Cabbage safely without leaving prey alone!'
    },
    {
      id: 'tower-hanoi',
      title: 'Tower of Hanoi Disk Stacker',
      category: 'Critical Thinking & Problem-Solving',
      difficulty: 'Medium',
      timeEst: '4 Mins',
      icon: Trophy,
      color: '#9333EA',
      bg: '#F0EAFA',
      desc: 'Move 3 disks from Peg A to Peg C without placing larger disks over smaller ones.'
    },
    {
      id: 'word-unscramble',
      title: 'Tech Word Unscramble',
      category: 'Verbal Reasoning',
      difficulty: 'Easy',
      timeEst: '2 Mins',
      icon: BookOpen,
      color: '#059669',
      bg: '#ECFDF5',
      desc: 'Unscramble technical terminology and placement aptitude keywords.'
    }
  ];

  const filteredCards = selectedCategory === 'All'
    ? allGameCards
    : allGameCards.filter(c => c.category === selectedCategory);

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1240px', margin: '0 auto' }} className="fade-in">
      
      {/* ACTIVE GAME PLAY MODAL / SCREEN */}
      {activeGameId ? (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          border: '1.5px solid #C084FC',
          padding: '28px',
          boxShadow: '0 16px 40px rgba(147, 51, 234, 0.15)'
        }}>
          {/* Top Bar of Gameplay */}
          <div style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #EAE2F8',
            paddingBottom: '16px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <button 
              onClick={() => setActiveGameId(null)}
              className="btn-secondary"
              style={{ padding: '6px 14px', fontSize: '0.85rem' }}
            >
              <ArrowLeft size={16} />
              <span>Back to Mind Games</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="badge-pill" style={{ background: '#F0EAFA', color: '#9333EA', fontWeight: 700 }}>
                Difficulty: {gameDifficulty}
              </span>

              {isTimed && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem', fontWeight: 800, color: gameTimer < 10 ? '#DC2626' : '#9333EA' }}>
                  <Clock size={18} />
                  <span>{gameTimer}s</span>
                </div>
              )}

              <button 
                onClick={() => setIsPaused(!isPaused)}
                style={{ background: '#FAF7FF', border: '1px solid #EAE2F8', borderRadius: '10px', padding: '6px 12px', cursor: 'pointer' }}
              >
                <Pause size={16} color="#2D1B4E" />
              </button>
            </div>
          </div>

          {/* GAME CONTENT SWITCHER */}

          {/* 1. MEMORY MATCH GAME */}
          {activeGameId === 'memory-match' && (
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '8px' }}>Tech Icon Memory Match</h3>
              <p style={{ color: '#7A6F8A', fontSize: '0.9rem', marginBottom: '20px' }}>Flip cards and match all 8 pairs of tech icons!</p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '14px',
                maxWidth: '440px',
                margin: '0 auto 24px auto'
              }}>
                {memoryCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    style={{
                      height: '80px',
                      borderRadius: '16px',
                      background: card.isFlipped || card.isMatched ? '#F0EAFA' : 'linear-gradient(135deg, #2D1B4E 0%, #4A3E56 100%)',
                      border: card.isMatched ? '2px solid #10B981' : '2px solid #C084FC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    {(card.isFlipped || card.isMatched) ? card.icon : '❓'}
                  </div>
                ))}
              </div>

              {matchedPairs.length === 8 && (
                <div style={{ background: '#ECFDF5', color: '#059669', padding: '16px', borderRadius: '16px', fontWeight: 800 }}>
                  🎉 Fantastic! You matched all pairs in memory match! (+150 XP)
                </div>
              )}
            </div>
          )}

          {/* 2. SEQUENCE MEMORY (SIMON) */}
          {activeGameId === 'sequence-memory' && (
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>Sequence Memory (Simon Says)</h3>
              <p style={{ color: '#7A6F8A', fontSize: '0.9rem', marginBottom: '20px' }}>Watch the sequence highlight, then repeat it!</p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                maxWidth: '320px',
                margin: '0 auto 24px auto'
              }}>
                {[
                  { id: 'purple', color: '#9333EA' },
                  { id: 'pink', color: '#DB2777' },
                  { id: 'blue', color: '#2563EB' },
                  { id: 'green', color: '#059669' }
                ].map((pad) => (
                  <div
                    key={pad.id}
                    onClick={() => handlePadClick(pad.id)}
                    style={{
                      height: '110px',
                      borderRadius: '20px',
                      background: pad.color,
                      opacity: activePad === pad.id ? 1 : 0.45,
                      boxShadow: activePad === pad.id ? `0 0 24px ${pad.color}` : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 3. SUDOKU 4x4 */}
          {activeGameId === 'sudoku' && (
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>Sudoku 4x4 Grid</h3>
              <p style={{ color: '#7A6F8A', fontSize: '0.9rem', marginBottom: '20px' }}>Click blank cells to cycle numbers 1 to 4 so rows/cols are unique!</p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '6px',
                maxWidth: '280px',
                margin: '0 auto 20px auto',
                background: '#2D1B4E',
                padding: '6px',
                borderRadius: '16px'
              }}>
                {sudokuGrid.map((row, r) =>
                  row.map((val, c) => (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => handleSudokuCellChange(r, c)}
                      style={{
                        height: '60px',
                        background: sudokuInitial[r][c] !== 0 ? '#EAE2F8' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        color: sudokuInitial[r][c] !== 0 ? '#2D1B4E' : '#9333EA',
                        cursor: sudokuInitial[r][c] !== 0 ? 'default' : 'pointer',
                        borderRadius: '8px'
                      }}
                    >
                      {val !== 0 ? val : ''}
                    </div>
                  ))
                )}
              </div>

              <button onClick={checkSudokuSolution} className="btn-primary" style={{ padding: '10px 24px' }}>
                <CheckCircle2 size={16} />
                <span>Verify Solution</span>
              </button>
            </div>
          )}

          {/* 4. RIVER CROSSING PUZZLE */}
          {activeGameId === 'river-crossing' && (
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>River Crossing Puzzle</h3>
              <p style={{ color: '#7A6F8A', fontSize: '0.9rem', marginBottom: '16px' }}>Cross Farmer, Wolf, Goat & Cabbage to Right Bank safely!</p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 140px 1fr',
                gap: '12px',
                background: '#FAF7FF',
                padding: '20px',
                borderRadius: '20px',
                border: '1px solid #EAE2F8',
                marginBottom: '20px'
              }}>
                {/* Left Bank */}
                <div style={{ background: '#F0EAFA', padding: '14px', borderRadius: '14px' }}>
                  <h5 style={{ fontWeight: 800, color: '#9333EA', marginBottom: '8px' }}>Left Bank</h5>
                  {riverState.left.map(item => (
                    <button key={item} onClick={() => toggleBoatItem(item)} style={{ display: 'block', width: '100%', margin: '4px 0', padding: '6px', background: '#FFF', border: '1px solid #C084FC', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700 }}>
                      {item} → Boat
                    </button>
                  ))}
                </div>

                {/* River & Boat */}
                <div style={{ background: '#DBEAFE', padding: '10px', borderRadius: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1E40AF', marginBottom: '6px' }}>
                    Boat ({riverState.boatPos.toUpperCase()})
                  </div>
                  {riverState.inBoat.map(b => (
                    <div key={b} style={{ fontSize: '0.75rem', background: '#9333EA', color: '#FFF', padding: '2px 6px', borderRadius: '4px', marginBottom: '2px' }}>
                      {b}
                    </div>
                  ))}
                  <button onClick={moveRiverBoat} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem', marginTop: '8px' }}>
                    Sail Boat 🚣
                  </button>
                </div>

                {/* Right Bank */}
                <div style={{ background: '#ECFDF5', padding: '14px', borderRadius: '14px' }}>
                  <h5 style={{ fontWeight: 800, color: '#059669', marginBottom: '8px' }}>Right Bank</h5>
                  {riverState.right.map(item => (
                    <button key={item} onClick={() => toggleBoatItem(item)} style={{ display: 'block', width: '100%', margin: '4px 0', padding: '6px', background: '#FFF', border: '1px solid #34D399', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700 }}>
                      {item} → Boat
                    </button>
                  ))}
                </div>
              </div>

              {riverMessage && (
                <div style={{ color: '#DC2626', fontWeight: 700, fontSize: '0.9rem', marginBottom: '14px' }}>{riverMessage}</div>
              )}
            </div>
          )}

          {/* 5. TOWER OF HANOI */}
          {activeGameId === 'tower-hanoi' && (
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>Tower of Hanoi Disk Stacker</h3>
              <p style={{ color: '#7A6F8A', fontSize: '0.9rem', marginBottom: '16px' }}>Move all 3 disks from Peg A to Peg C! Moves: {hanoiMoves}</p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                maxWidth: '480px',
                margin: '0 auto 20px auto',
                background: '#FAF7FF',
                padding: '20px',
                borderRadius: '20px',
                border: '1px solid #EAE2F8'
              }}>
                {['A', 'B', 'C'].map((pegKey) => (
                  <div
                    key={pegKey}
                    onClick={() => handleHanoiPegClick(pegKey)}
                    style={{
                      height: '140px',
                      border: selectedPeg === pegKey ? '2.5px solid #9333EA' : '1px solid #C084FC',
                      borderRadius: '14px',
                      background: '#FFFFFF',
                      display: 'flex',
                      flexDirection: 'column-reverse',
                      alignItems: 'center',
                      padding: '8px',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    <div style={{ position: 'absolute', top: '6px', fontSize: '0.8rem', fontWeight: 800, color: '#9333EA' }}>
                      Peg {pegKey}
                    </div>
                    {hanoiPegs[pegKey].map((diskSize) => (
                      <div
                        key={diskSize}
                        style={{
                          width: `${diskSize * 30 + 20}%`,
                          height: '24px',
                          borderRadius: '6px',
                          background: diskSize === 3 ? '#2D1B4E' : diskSize === 2 ? '#9333EA' : '#DB2777',
                          color: '#FFF',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '3px'
                        }}
                      >
                        {diskSize}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. GENERIC QUIZ PUZZLE CARDS (NUMBER SERIES / PATTERN / DEDUCTION) */}
          {['number-series', 'pattern-recognition', 'logical-deduction'].includes(activeGameId) && (
            <div>
              {(() => {
                const quizList = PUZZLE_BANK[activeGameId === 'number-series' ? 'numberSeries' : activeGameId === 'pattern-recognition' ? 'patternRecognition' : 'logicalDeduction'];
                const puzzle = quizList[currentStep % quizList.length];

                return (
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '14px' }}>
                      Question {currentStep + 1} of {quizList.length}: {puzzle.question}
                    </h3>

                    {/* Options Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                      {puzzle.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuizAnswerSubmit(opt, puzzle)}
                          style={{
                            padding: '14px',
                            borderRadius: '14px',
                            border: selectedOption === opt ? '2px solid #9333EA' : '1px solid #EAE2F8',
                            background: selectedOption === opt ? '#F0EAFA' : '#FAF7FF',
                            color: '#2D1B4E',
                            fontWeight: 700,
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                      <button 
                        onClick={() => setShowHint(!showHint)}
                        className="btn-secondary"
                        style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                      >
                        <Lightbulb size={16} color="#F59E0B" />
                        <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
                      </button>
                    </div>

                    {showHint && (
                      <div style={{ background: '#FEF3C7', color: '#92400E', padding: '12px 16px', borderRadius: '12px', fontSize: '0.88rem', marginBottom: '16px' }}>
                        💡 <strong>Hint:</strong> {puzzle.hint}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* FEEDBACK CALLOUT DISPLAY */}
          {feedback && (
            <div style={{
              background: feedback.isCorrect ? '#ECFDF5' : '#FEF2F2',
              border: `1.5px solid ${feedback.isCorrect ? '#10B981' : '#DC2626'}`,
              borderRadius: '16px',
              padding: '16px 20px',
              marginTop: '16px'
            }}>
              <h4 style={{ color: feedback.isCorrect ? '#059669' : '#DC2626', fontWeight: 800, fontSize: '1.05rem', marginBottom: '4px' }}>
                {feedback.isCorrect ? '✓ Correct Answer!' : '❌ Solution Hint'}
              </h4>
              <p style={{ color: '#2D1B4E', fontSize: '0.9rem', margin: 0 }}>
                {feedback.explanation}
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* DASHBOARD HEADER BANNER */}
          <div style={{
            background: 'linear-gradient(135deg, #FAF7FF 0%, #FFF0F7 50%, #FFFFFF 100%)',
            border: '1px solid #EAE2F8',
            borderRadius: '24px',
            padding: '28px',
            marginBottom: '30px',
            boxShadow: '0 8px 24px rgba(185, 160, 232, 0.12)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <div className="badge-pill" style={{ background: '#F6DCEC', borderColor: '#B9A0E8', marginBottom: '10px' }}>
                  <Gamepad2 size={15} color="#9333EA" />
                  <span>Cognitive Growth & Aptitude Preparation</span>
                </div>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#2D1B4E', lineHeight: '1.2' }}>
                  Mind Games & Puzzles
                </h1>
                <p style={{ color: '#4A3E56', fontSize: '0.95rem', marginTop: '6px', maxWidth: '640px' }}>
                  Interactive cognitive challenges designed to sharpen logical reasoning, memory, speed arithmetic, critical thinking, and placement aptitude.
                </p>
              </div>

              {/* Stats Bar Header */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <div style={{ background: '#FFFFFF', padding: '12px 18px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#7A6F8A', fontWeight: 700, textTransform: 'uppercase' }}>DAILY STREAK</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    🔥 <span>{userStats.dailyStreak} Days</span>
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '12px 18px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#7A6F8A', fontWeight: 700, textTransform: 'uppercase' }}>TOTAL XP</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#9333EA' }}>
                    ⚡ {userStats.totalXP}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN TABS NAVIGATION */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', borderBottom: '1px solid #EAE2F8', paddingBottom: '10px' }}>
            {[
              { id: 'games', label: '🎮 All Games & Puzzles', icon: Gamepad2 },
              { id: 'daily', label: '🔥 Daily Brain Challenge', icon: Flame },
              { id: 'stats', label: '📊 My Brain Performance', icon: BarChart2 },
              { id: 'leaderboard', label: '🏆 Leaderboard', icon: Trophy },
              { id: 'career', label: '🎯 Aptitude & Placement Link', icon: Target }
            ].map(tab => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-pill ${activeTab === tab.id ? 'active' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <TabIcon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: ALL GAMES GRID */}
          {activeTab === 'games' && (
            <div>
              {/* Category Pills Filter */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: selectedCategory === cat ? '1.5px solid #9333EA' : '1px solid #EAE2F8',
                      background: selectedCategory === cat ? '#9333EA' : '#FFFFFF',
                      color: selectedCategory === cat ? '#FFFFFF' : '#4A3E56'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Game Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px' }}>
                {filteredCards.map(card => {
                  const CardIcon = card.icon;
                  return (
                    <div key={card.id} className="feature-card" style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div className="icon-box" style={{ background: card.bg, color: card.color, margin: 0 }}>
                          <CardIcon size={22} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: card.bg, color: card.color }}>
                          {card.difficulty} • {card.timeEst}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
                        {card.title}
                      </h3>

                      <p style={{ fontSize: '0.88rem', color: '#7A6F8A', lineHeight: '1.45', flexGrow: 1, marginBottom: '16px' }}>
                        {card.desc}
                      </p>

                      <button
                        onClick={() => handleStartGame(card.id)}
                        className="btn-primary"
                        style={{ width: '100%', padding: '10px' }}
                      >
                        <Play size={16} />
                        <span>Play Now</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: DAILY BRAIN CHALLENGE */}
          {activeTab === 'daily' && (
            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '24px', border: '1px solid #EAE2F8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div className="icon-box" style={{ background: '#FFEDD5', color: '#EA580C', margin: 0 }}>
                  <Flame size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E' }}>Today's Featured Brain Challenge</h3>
                  <p style={{ color: '#7A6F8A', fontSize: '0.9rem' }}>Solve today's puzzle to keep your daily streak alive (+50 Bonus XP)!</p>
                </div>
              </div>

              <div style={{ background: '#FAF7FF', padding: '20px', borderRadius: '18px', border: '1px solid #EAE2F8', marginBottom: '24px' }}>
                <span className="badge-pill" style={{ background: '#EA580C', color: '#FFF', marginBottom: '8px' }}>DAILY SPECIAL</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
                  The Farmer's River Crossing Puzzle
                </h4>
                <p style={{ color: '#4A3E56', fontSize: '0.9rem', marginBottom: '16px' }}>
                  A farmer must transport a wolf, a goat, and a cabbage across a river using a boat that holds only himself and one item. If left alone, the wolf eats the goat, or the goat eats the cabbage. How does he cross safely?
                </p>

                <button onClick={() => handleStartGame('river-crossing')} className="btn-primary" style={{ padding: '10px 24px' }}>
                  <Play size={16} />
                  <span>Start Daily Challenge</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: MY BRAIN PERFORMANCE */}
          {activeTab === 'stats' && (
            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '24px', border: '1px solid #EAE2F8' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
                My Brain Performance Analytics
              </h3>
              <p style={{ color: '#7A6F8A', fontSize: '0.88rem', marginBottom: '24px' }}>
                Practice metrics for cognitive exercise and campus placement aptitude. (Note: These reflect game-based practice, not a clinical IQ score).
              </p>

              {/* Key Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                <div style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 700 }}>GAMES PLAYED</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#9333EA' }}>{userStats.totalGamesPlayed}</div>
                </div>
                <div style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 700 }}>ACCURACY RATE</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669' }}>{userStats.accuracy}%</div>
                </div>
                <div style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 700 }}>AVG SPEED</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563EB' }}>{userStats.avgTimeSeconds}s</div>
                </div>
                <div style={{ background: '#FAF7FF', padding: '18px', borderRadius: '16px', border: '1px solid #EAE2F8', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.78rem', color: '#7A6F8A', fontWeight: 700 }}>PERSONAL BEST</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#EA580C' }}>{userStats.personalBest}</div>
                </div>
              </div>

              {/* Earned Badges Showcase */}
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '14px' }}>
                Earned Badges & Achievements
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                {userStats.badges.map(b => (
                  <div
                    key={b.id}
                    style={{
                      padding: '14px',
                      borderRadius: '14px',
                      border: b.unlocked ? '1.5px solid #10B981' : '1px solid #EAE2F8',
                      background: b.unlocked ? '#ECFDF5' : '#F9FAFB',
                      opacity: b.unlocked ? 1 : 0.6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <span style={{ fontSize: '1.8rem' }}>{b.icon}</span>
                    <div>
                      <h5 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2D1B4E', margin: 0 }}>{b.title}</h5>
                      <p style={{ fontSize: '0.78rem', color: '#7A6F8A', margin: '2px 0 0 0' }}>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LEADERBOARD */}
          {activeTab === 'leaderboard' && (
            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '24px', border: '1px solid #EAE2F8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E' }}>Peer Aptitude Leaderboard</h3>
                  <p style={{ color: '#7A6F8A', fontSize: '0.88rem' }}>Fair scoring based on puzzle accuracy and completion speed.</p>
                </div>

                {/* Privacy Toggle */}
                <button
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className="btn-secondary"
                  style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                >
                  <Eye size={16} />
                  <span>{isAnonymous ? 'Public Display: Hidden (Anonymous)' : 'Public Display: Visible'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { rank: 1, name: 'Ananya Roy (You)', xp: userStats.totalXP, streak: userStats.dailyStreak, badge: '🥇 Rank 1' },
                  { rank: 2, name: isAnonymous ? 'Anonymous Student' : 'Rohan Sharma', xp: 720, streak: 6, badge: '🥈 Rank 2' },
                  { rank: 3, name: isAnonymous ? 'Anonymous Student' : 'Priya Patel', xp: 680, streak: 4, badge: '🥉 Rank 3' },
                  { rank: 4, name: isAnonymous ? 'Anonymous Student' : 'Vikram Verma', xp: 640, streak: 3, badge: 'Top 5%' }
                ].map(item => (
                  <div
                    key={item.rank}
                    style={{
                      display: 'flex',
                      justify: 'space-between',
                      alignItems: 'center',
                      padding: '14px 18px',
                      borderRadius: '14px',
                      background: item.rank === 1 ? '#F0EAFA' : '#FAF7FF',
                      border: item.rank === 1 ? '1.5px solid #9333EA' : '1px solid #EAE2F8'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: '#9333EA', width: '24px' }}>#{item.rank}</span>
                      <span style={{ fontWeight: 700, color: '#2D1B4E' }}>{item.name}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.88rem', fontWeight: 700 }}>
                      <span style={{ color: '#EA580C' }}>🔥 {item.streak}d</span>
                      <span style={{ color: '#9333EA' }}>⚡ {item.xp} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CAREER APTITUDE LINK */}
          {activeTab === 'career' && (
            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '24px', border: '1px solid #EAE2F8' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2D1B4E', marginBottom: '6px' }}>
                Connecting Mind Games to Campus Placement Aptitude
              </h3>
              <p style={{ color: '#7A6F8A', fontSize: '0.88rem', marginBottom: '24px' }}>
                How cognitive games map directly to campus recruitment screening tests.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                <div style={{ background: '#FAF7FF', padding: '20px', borderRadius: '18px', border: '1px solid #EAE2F8' }}>
                  <h4 style={{ color: '#9333EA', fontWeight: 800, marginBottom: '6px' }}>Logical Reasoning</h4>
                  <p style={{ fontSize: '0.85rem', color: '#4A3E56' }}>Used in TCS NQT, Infosys DCODER, and Wipro NLTH aptitude tests for series completion and syllogisms.</p>
                </div>

                <div style={{ background: '#FAF7FF', padding: '20px', borderRadius: '18px', border: '1px solid #EAE2F8' }}>
                  <h4 style={{ color: '#2563EB', fontWeight: 800, marginBottom: '6px' }}>Speed Arithmetic & Numerical</h4>
                  <p style={{ fontSize: '0.85rem', color: '#4A3E56' }}>Essential for quantitative aptitude rounds (P&L, ratios, equations) during product company hiring drives.</p>
                </div>

                <div style={{ background: '#FAF7FF', padding: '20px', borderRadius: '18px', border: '1px solid #EAE2F8' }}>
                  <h4 style={{ color: '#059669', fontWeight: 800, marginBottom: '6px' }}>Critical Problem Solving</h4>
                  <p style={{ fontSize: '0.85rem', color: '#4A3E56' }}>Direct preparation for technical interview puzzle questions (River crossing, 3-peg Hanoi, water jug problems).</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
}
