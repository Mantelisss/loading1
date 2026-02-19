fx_version 'cerulean'
game 'gta5'

author 'Mantelis Development'
description 'Mantelis Premium Loading Screen'
version '1.0.0'

loadscreen 'html/index.html'
loadscreen_manual_shutdown 'yes'

files {
    'index.html',
    'style.css',
    'script.js',
    'config.js',
}

-- Jei nori rankinio uzdarymo (pvz. po NUI callbacko), naudok:
-- loadscreen_manual_shutdown 'yes'
-- Client skripte: ShutdownLoadingScreenNui() ir ShutdownLoadingScreen()
