# CityRP Loading Screen — FiveM Resurso Instrukcija

## 📁 Struktūra
```
cityRP_loadingscreen/
├── fxmanifest.lua          ← FiveM resurso manifestas
├── README.md               ← Ši instrukcija
└── html/
    ├── index.html          ← Pagrindinis HTML
    ├── style.css           ← Stiliai
    ├── config.js           ← ⭐ KONFIGURACIJA (keisk čia)
    └── script.js           ← Logika (paprastai nekeičiama)
```

---

## 🚀 Įdiegimas

1. **Nukopijuok** aplanką `cityRP_loadingscreen` į savo serverio `resources/` katalogą.
2. **server.cfg** faile pridėk:
   ```
   ensure cityRP_loadingscreen
   ```
3. **Perkrauk** serverį.

---

## ⚙️ Konfigūracija (`html/config.js`)

Atidaryk `html/config.js` ir pakeisk norimas reikšmes:

### 🎵 Muzikos keitimas
```js
youtubeVideoId: '5qap5aO4i9A',   // Pakeisk į savo YouTube video ID
trackName: "Mano Daina",
trackArtist: "Atlikėjas",
defaultVolume: 60,               // 0–100
```

Kaip rasti YouTube video ID:
- Nuoroda: `https://www.youtube.com/watch?v=XXXXXXXXX`
- ID yra: `XXXXXXXXX` (po `?v=`)

### 📋 Taisyklių keitimas
```js
rules: [
    { num: "01", title: "Tavo taisyklė", text: "Aprašymas..." },
    // ...
]
```

### 🎨 Spalvų keitimas
```js
colors: {
    accent:  '#4fc3f7',   // Pagrindine neon spalva (mėlyna)
    gold:    '#c9a84c',   // Antra akcentų spalva
    // ...
}
```

### 🌐 Serverio informacija
```js
serverName:    "CITY RP",
discordLink:   "https://discord.gg/tavo-discord",
maxPlayers:    500,
```

---

## 📡 NUI Pranešimai (iš server.lua / client.lua)

Loading screenas priima šiuos pranešimus:

```lua
-- client.lua pavyzdys:

-- Siusti player count
SendNUIMessage({ type = "playerCount", count = 247, max = 500 })

-- Siusti ping
SendNUIMessage({ type = "ping", ping = 24 })

-- Valdyti muzika
SendNUIMessage({ type = "setVolume", volume = 80 })
SendNUIMessage({ type = "pauseMusic" })
SendNUIMessage({ type = "resumeMusic" })

-- Uzdaryti loading screen (jei naudoji loadscreen_manual_shutdown 'yes')
AddEventHandler('playerSpawned', function()
    SendNUIMessage({ type = "shutdown" })
    ShutdownLoadingScreenNui()
    ShutdownLoadingScreen()
end)
```

---

## 🔧 Rankinis uždarymas (`loadscreen_manual_shutdown`)

`fxmanifest.lua` yra `loadscreen_manual_shutdown 'yes'` — tai reiškia loading screenas **NEUŽDARYTAS automatiškai**.

Tau reikia `client.lua` failo, pvz.:

```lua
-- client.lua
AddEventHandler('playerSpawned', function()
    ShutdownLoadingScreenNui()
    ShutdownLoadingScreen()
end)
```

Arba jei neturi spawno sistemos, pašalink šią eilutę iš `fxmanifest.lua`:
```
loadscreen_manual_shutdown 'yes'
```
Tada FiveM pats uždary loading screeną kai žaidėjas prisijungs.

---

## ❓ Dažnos problemos

| Problema | Sprendimas |
|----------|-----------|
| Loading screenas nerodomas | Patikrink ar `ensure cityRP_loadingscreen` yra server.cfg |
| Muzika negroja | YouTube API reikia interneto — patikrink serverio ugniasienę |
| Taisyklės neatsiranda | Patikrink `config.js` sintaksę (kableliai, kabučios) |
| Loading screenas neužsidaro | Pridėk `client.lua` su `ShutdownLoadingScreen()` |

---

## 📞 Palaikymas

Discord: **discord.gg/tavo-discord**
