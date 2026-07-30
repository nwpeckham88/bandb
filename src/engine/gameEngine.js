// Game Engine for Backdoors & Breaches

import {
  CARD_TYPES,
  INJECT_CARDS,
  getDeck,
  DEFAULT_DECK_ID
} from '../data/cards.js';

/**
 * Pick a random item from array
 */
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Shuffle array helper
 */
export function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Initialize a new secret game scenario using the specified deck
 */
export function initializeNewGame(customSecretCards = null, deckId = DEFAULT_DECK_ID) {
  const activeDeck = getDeck(deckId);
  const cards = activeDeck.cards;

  const secretCards = customSecretCards || {
    [CARD_TYPES.INITIAL]: getRandomItem(cards[CARD_TYPES.INITIAL]),
    [CARD_TYPES.PIVOT]: getRandomItem(cards[CARD_TYPES.PIVOT]),
    [CARD_TYPES.PERSISTENCE]: getRandomItem(cards[CARD_TYPES.PERSISTENCE]),
    [CARD_TYPES.C2]: getRandomItem(cards[CARD_TYPES.C2])
  };

  const shuffledProcedures = shuffle(cards[CARD_TYPES.PROCEDURE]);
  const hand = shuffledProcedures.slice(0, 5);
  const deck = shuffledProcedures.slice(5);

  return {
    turn: 1,
    maxTurns: 10, // Official BHIS Rules: 10 Turns Maximum
    phase: 'SETUP', // SETUP, PLAYING, ROLLING, AI_THINKING, GAME_OVER
    deckId: activeDeck.id,
    deckName: activeDeck.name,
    deckShortName: activeDeck.shortName,
    secretCards,
    discovered: {
      [CARD_TYPES.INITIAL]: false,
      [CARD_TYPES.PIVOT]: false,
      [CARD_TYPES.PERSISTENCE]: false,
      [CARD_TYPES.C2]: false
    },
    procedureHand: hand,
    procedureDeck: deck,
    procedureDiscard: [],
    activeInject: null,
    failureCount: 0,
    logs: [],
    isWin: false,
    stats: {
      totalRolls: 0,
      successes: 0,
      failures: 0
    }
  };
}

/**
 * Roll a 20-sided die (1-20)
 */
export function rollD20() {
  return Math.floor(Math.random() * 20) + 1;
}

/**
 * Calculate Procedure Card Bonus — respects active inject blockedCategories
 */
export function getProcedureBonus(procedureCard, targetCategory, activeInject = null) {
  if (!procedureCard) return 0;
  // If a 'no_procedure_bonus' inject is active, check if this card's category is suppressed
  if (
    activeInject?.card?.mechanic?.type === 'no_procedure_bonus' &&
    activeInject.card.mechanic.blockedCategories?.includes(procedureCard.category)
  ) {
    return 0;
  }
  if (procedureCard.bonusTargets && procedureCard.bonusTargets.includes(targetCategory)) {
    return procedureCard.bonusValue || 3;
  }
  return 0;
}

/**
 * Derive the active inject's mechanical modifiers for use in roll calculation.
 * activeInject shape: { card: InjectCard, turnsRemaining: number } | null
 */
export function getInjectModifiers(activeInject) {
  const none = { rollPenalty: 0, thresholdDelta: 0, blockedCategories: [] };
  if (!activeInject?.card?.mechanic) return none;
  const { mechanic } = activeInject.card;
  return {
    rollPenalty:        mechanic.rollPenalty        ?? 0,
    thresholdDelta:     mechanic.thresholdDelta      ?? 0,
    blockedCategories:  mechanic.blockedCategories   ?? []
  };
}

/**
 * Draw random Inject card
 */
export function getRandomInject(deckId = DEFAULT_DECK_ID) {
  const activeDeck = getDeck(deckId);
  const injects = activeDeck.cards[CARD_TYPES.INJECT] || INJECT_CARDS;
  return getRandomItem(injects);
}

/**
 * Find next unrevealed target vector category
 */
export function getNextUndiscoveredCategory(discoveredState, currentCategory) {
  const categories = [CARD_TYPES.INITIAL, CARD_TYPES.PIVOT, CARD_TYPES.PERSISTENCE, CARD_TYPES.C2];
  // Find first unrevealed category starting after currentCategory or from start
  const unrevealed = categories.filter((cat) => !discoveredState[cat]);
  if (unrevealed.length === 0) return null;
  if (unrevealed.includes(currentCategory)) return currentCategory;
  return unrevealed[0];
}

/**
 * Recycle played procedure card into hand and handle deck reshuffling if empty
 */
export function processProcedureCardPlay(playedCard, hand, deck, discard) {
  let newHand = hand.filter((c) => c.id !== playedCard.id);
  let newDiscard = [...discard, playedCard];
  let newDeck = [...deck];

  if (newDeck.length === 0 && newDiscard.length > 0) {
    newDeck = shuffle(newDiscard);
    newDiscard = [];
  }

  if (newDeck.length > 0) {
    newHand.push(newDeck[0]);
    newDeck = newDeck.slice(1);
  }

  return {
    procedureHand: newHand,
    procedureDeck: newDeck,
    procedureDiscard: newDiscard
  };
}

