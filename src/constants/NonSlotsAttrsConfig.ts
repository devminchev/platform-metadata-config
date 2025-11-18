// ----- options -----
const VOLATILITY_OPTIONS = ["low", "medium", "high"];
const ROUND_LENGTH_OPTIONS = ["0-29 Secs", "30-59 Secs", "60+ Secs"];
const MAX_MULTIPLIER_OPTIONS = ["1-99x", "100-4999x", "5000x +"];

const LANGUAGE_OPTIONS = ["English", "Spanish"];

// ----- form input config -----
export const NON_SLOT_GAME_FORM = [
    { id: "liveDealer", type: "radio", label: "Live Dealer" },
    { id: "sidebets", type: "radio", label: "Sidebets" },
    { id: "bonusRounds", type: "radio", label: "Bonus Rounds" },
    { id: "traditional", type: "radio", label: "Traditional" },
    { id: "brandedSkin", type: "radio", label: "Branded Skin" },
    { id: "volatility", type: "select", label: "Volatility", options: VOLATILITY_OPTIONS },
    { id: "averageGameRoundLength", type: "select", label: "Average Game Round Length", options: ROUND_LENGTH_OPTIONS },
    { id: "maxMultiplierRange", type: "select", label: "Max Multiplier Range", options: MAX_MULTIPLIER_OPTIONS },
    { id: "languages", type: "multiselect", label: "Languages", options: LANGUAGE_OPTIONS },
];
