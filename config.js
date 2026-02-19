// ============================================================
//   CITYARP LOADING SCREEN - KONFIGURACIJA
//   Pakeisk cia norimus nustatymus
// ============================================================

const CONFIG = {

    // --- SERVERIO INFORMACIJA ---
    serverName: "SAVO PAVADINIMAS",
    serverTagline: "Roleplay Serveris",
    serverVersion: "v2.4",
    discordLink: "https://discord.gg/tavo-discord",
    maxPlayers: 500,

    // --- MUZIKA ---
    // Pakeisk youtube video ID (tai kas po ?v= YouTube nuorodoje)
    // Pavyzdziai:
    //   https://www.youtube.com/watch?v=5qap5aO4i9A  ->  youtubeVideoId: '5qap5aO4i9A'
    //   https://www.youtube.com/watch?v=ABC123xyz    ->  youtubeVideoId: 'ABC123xyz'
    youtubeVideoId: '5qap5aO4i9A',
    youtubePlaylist: '5qap5aO4i9A',   // Jei turi playlist ID, dek cia
    defaultVolume: 60,                 // 0 - 100
    trackName: "Loading Atmosphere Mix",
    trackArtist: "  SS",

    // --- SPALVOS (CSS kintamieji) ---
    colors: {
        dark:     '#0a0c0f',
        darker:   '#060809',
        charcoal: '#111418',
        steel:    '#1a1f26',
        accent:   '#4fc3f7',   // Pagrindine neon spalva
        accent2:  '#00e5ff',
        gold:     '#c9a84c',
        text:     '#d0d8e4',
        muted:    '#6b7a8d',
    },

    // --- STATISTIKA (rodoma virsuje) ---
    // Jei nori fake statistikos, uzpildyk cia. 
    // Realaus player count gavimui reikia server.lua
    fakeStats: {
        enabled: false,
        players: "247/500",
        ping: "24ms",
    },

    // --- LOADING ZINGSNIAI ---
    loadingSteps: [
        { id: 'step1', label: 'Tekstūros',   delay: 800  },
        { id: 'step2', label: 'Modeliai',    delay: 2500 },
        { id: 'step3', label: 'Garsai',      delay: 4200 },
        { id: 'step4', label: 'Skriptai',    delay: 6000 },
        { id: 'step5', label: 'Žemėlapis',   delay: 7800 },
    ],

    loadingMessages: [
        "Kraunami resursai...",
        "Modeliai inicializuojami...",
        "Garso failai įkeliami...",
        "Skriptai paleidžiami...",
        "Žemėlapis generuojamas...",
        "Beveik paruošta...",
    ],

    // --- TAISYKLES ---
    rules: [
        {
            num: "01",
            title: "Roleplay visada",
            text: "Išlaikyk personažą bet kokioje situacijoje. OOC kalbėjimas draudžiamas be /ooc komandos."
        },
        {
            num: "02",
            title: "RDM draudžiamas",
            text: "Nežudyk žaidėjų be roleplay priežasties ir logikos. Kiekviena žmogžudystė turi turėti kontekstą."
        },
        {
            num: "03",
            title: "VDM draudžiamas",
            text: "Transporto priemonės nenaudojamos kaip ginklas prieš žmones be roleplay pagrindo."
        },
        {
            num: "04",
            title: "Pagarba administracijai",
            text: "Admin sprendimai galutiniai. Ginčus spręsk tik Discord'e per ticketą."
        },
        {
            num: "05",
            title: "Mikrofono kokybė",
            text: "Komunikuok aiškiai. Triukšmingas mikrofonas = perspėjimas. Naudok push-to-talk."
        },
        {
            num: "06",
            title: "Exploit'ai draudžiami",
            text: "Klaidų ar žaidimo spragų išnaudojimas sukelia momentinį ir nuolatinį baną."
        },
        {
            num: "07",
            title: "New Life Rule",
            text: "Po mirties neatsimenate paskutinių 30 minučių įvykių. Grįžimas į mirties vietą draudžiamas."
        },
        {
            num: "08",
            title: "AFK taisyklė",
            text: "Ilgesnio AFK atveju išeik iš serverio, kad neblokuotum vietos kitiems žaidėjams."
        },
        {
            num: "09",
            title: "Metagaming draudžiamas",
            text: "Informacijos naudojimas iš Discord, stream'o ar kitų ne-žaidimo šaltinių RP situacijose."
        },
        {
            num: "10",
            title: "Powergaming draudžiamas",
            text: "Nerealistiški veiksmai ar kito žaidėjo privalomas vaidmuo be sutikimo yra draudžiamas."
        },
    ],
};
