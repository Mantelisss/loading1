fx_version 'cerulean'
game 'gta5'

author 'CityRP Development'
description 'CityRP Premium Loading Screen'
version '1.0.0'

loadscreen 'html/index.html'
loadscreen_manual_shutdown 'yes'

files {
    'html/index.html',
    'html/style.css',
    'html/script.js',
    'html/config.js',
}

-- Jei nori rankinio uzdarymo (pvz. po NUI callbacko), naudok:
-- loadscreen_manual_shutdown 'yes'
-- Client skripte: ShutdownLoadingScreenNui() ir ShutdownLoadingScreen()
