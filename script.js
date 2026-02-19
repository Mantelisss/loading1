// ============================================================
//   CITYARP LOADING SCREEN - PAGRINDINIS SKRIPTAS
// ============================================================

(function () {
    'use strict';

    // ── State ──────────────────────────────────────────────
    let ytPlayer        = null;
    let ytReady         = false;
    let isPlaying       = true;
    let currentVolume   = CONFIG.defaultVolume;
    let currentStepIdx  = 0;
    let currentPct      = 0;
    let playerCount     = '---';
    let serverPing      = '---';

    // ── DOM refs ───────────────────────────────────────────
    const els = {
        progressFill:  document.getElementById('progress-fill'),
        loadMsg:       document.getElementById('load-msg'),
        loadPct:       document.getElementById('load-pct'),
        volSlider:     document.getElementById('vol-slider'),
        volNum:        document.getElementById('vol-num'),
        playPauseBtn:  document.getElementById('play-pause-btn'),
        playPauseIcon: document.getElementById('play-pause-icon'),
        trackName:     document.getElementById('track-name'),
        trackArtist:   document.getElementById('track-artist'),
        ytLink:        document.getElementById('yt-link'),
        playerCountEl: document.getElementById('player-count'),
        pingEl:        document.getElementById('ping-val'),
        clock:         document.getElementById('clock'),
    };

    // ── Build rules from config ────────────────────────────
    function buildRules() {
        const list = document.getElementById('rules-list');
        if (!list) return;
        list.innerHTML = '';
        CONFIG.rules.forEach(rule => {
            const div = document.createElement('div');
            div.className = 'rule';
            div.innerHTML = `
                <div class="rule-n">${rule.num}</div>
                <div class="rule-body">
                    <div class="rule-title">${rule.title}</div>
                    <div class="rule-desc">${rule.text}</div>
                </div>`;
            list.appendChild(div);
        });
    }

    // ── Build loading steps ────────────────────────────────
    function buildSteps() {
        const stepList = document.getElementById('step-list');
        if (!stepList) return;
        stepList.innerHTML = '';
        CONFIG.loadingSteps.forEach((step, i) => {
            const sp = document.createElement('span');
            sp.className = 'step-item pending';
            sp.id = step.id;
            sp.innerHTML = `<span class="step-icon"></span>${step.label}`;
            stepList.appendChild(sp);
        });
    }

    // ── Track info from config ─────────────────────────────
    function setTrackInfo() {
        if (els.trackName)   els.trackName.textContent   = CONFIG.trackName;
        if (els.trackArtist) els.trackArtist.textContent = CONFIG.trackArtist;
        if (els.ytLink)      els.ytLink.href = `https://www.youtube.com/watch?v=${CONFIG.youtubeVideoId}`;
    }

    // ── Progress animation ─────────────────────────────────
    const pctTargets = [0, 18, 38, 60, 80, 97];

    function animatePctTo(target) {
        const step = () => {
            if (currentPct >= target) return;
            currentPct = Math.min(currentPct + 1, target);
            if (els.loadPct) els.loadPct.textContent = currentPct + '%';
            if (currentPct < target) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }

    function advanceStep() {
        const steps = CONFIG.loadingSteps;
        if (currentStepIdx >= steps.length) return;

        // Mark previous done
        if (currentStepIdx > 0) {
            const prevEl = document.getElementById(steps[currentStepIdx - 1].id);
            if (prevEl) prevEl.className = 'step-item done';
        }

        const current = steps[currentStepIdx];
        const el = document.getElementById(current.id);
        if (el) el.className = 'step-item active';

        const msgIdx = Math.min(currentStepIdx, CONFIG.loadingMessages.length - 1);
        if (els.loadMsg) els.loadMsg.textContent = CONFIG.loadingMessages[msgIdx];

        animatePctTo(pctTargets[currentStepIdx + 1] || 97);
        if (els.progressFill) {
            els.progressFill.style.width = (pctTargets[currentStepIdx + 1] || 97) + '%';
        }

        currentStepIdx++;
    }

    function startLoadingAnimation() {
        CONFIG.loadingSteps.forEach((step, i) => {
            setTimeout(advanceStep, step.delay);
        });
        // Mark last step done after all
        const lastDelay = CONFIG.loadingSteps[CONFIG.loadingSteps.length - 1].delay + 1500;
        setTimeout(() => {
            const steps = CONFIG.loadingSteps;
            const lastEl = document.getElementById(steps[steps.length - 1].id);
            if (lastEl) lastEl.className = 'step-item done';
            if (els.loadMsg) els.loadMsg.textContent = 'Beveik paruošta...';
            animatePctTo(99);
            if (els.progressFill) els.progressFill.style.width = '99%';
        }, lastDelay);
    }

    // ── Volume ─────────────────────────────────────────────
    function setVolume(val) {
        currentVolume = Math.max(0, Math.min(100, val));
        if (els.volSlider) {
            els.volSlider.value = currentVolume;
            els.volSlider.style.setProperty('--val', currentVolume + '%');
        }
        if (els.volNum) els.volNum.textContent = currentVolume + '%';
        if (ytPlayer && ytReady) ytPlayer.setVolume(currentVolume);
    }

    // ── Play / Pause ───────────────────────────────────────
    const ICONS = {
        play:  '<path d="M8 5v14l11-7z"/>',
        pause: '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>',
    };

    function setPlayState(playing) {
        isPlaying = playing;
        if (els.playPauseIcon) els.playPauseIcon.innerHTML = playing ? ICONS.pause : ICONS.play;

        // Toggle visualizer animation
        document.querySelectorAll('.vbar').forEach(b => {
            b.style.animationPlayState = playing ? 'running' : 'paused';
        });

        if (!ytPlayer || !ytReady) return;
        if (playing) ytPlayer.playVideo();
        else         ytPlayer.pauseVideo();
    }

    // ── YouTube IFrame API ─────────────────────────────────
    window.onYouTubeIframeAPIReady = function () {
        const ytContainer = document.getElementById('yt-container');
        ytPlayer = new YT.Player(ytContainer, {
            height: '1',
            width:  '1',
            videoId: CONFIG.youtubeVideoId,
            playerVars: {
                autoplay:  1,
                loop:      1,
                playlist:  CONFIG.youtubePlaylist || CONFIG.youtubeVideoId,
                controls:  0,
                disablekb: 1,
                fs:        0,
                iv_load_policy: 3,
                modestbranding: 1,
            },
            events: {
                onReady: function (e) {
                    ytReady = true;
                    e.target.setVolume(currentVolume);
                    e.target.playVideo();
                },
                onStateChange: function (e) {
                    // YT.PlayerState.ENDED = 0 — loop handles it, but backup:
                    if (e.data === 0) e.target.playVideo();
                },
            },
        });
    };

    function loadYouTubeAPI() {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
    }

    // ── Clock ──────────────────────────────────────────────
    function updateClock() {
        if (!els.clock) return;
        els.clock.textContent = new Date().toLocaleTimeString('lt-LT', {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
    }

    // ── FiveM NUI messages ─────────────────────────────────
    // FiveM siuncia NUI events per PostMessage
    window.addEventListener('message', function (e) {
        const data = e.data;
        if (!data || !data.type) return;

        switch (data.type) {
            // Serveris gali siusti player count
            case 'playerCount':
                playerCount = (data.count || '?') + '/' + (data.max || CONFIG.maxPlayers);
                if (els.playerCountEl) els.playerCountEl.textContent = playerCount;
                break;

            // Serveris gali siusti ping
            case 'ping':
                serverPing = (data.ping || '?') + 'ms';
                if (els.pingEl) els.pingEl.textContent = serverPing;
                break;

            // Galima valdyti muzika is server.lua arba client.lua
            case 'setVolume':
                setVolume(parseInt(data.volume));
                break;

            case 'pauseMusic':
                setPlayState(false);
                break;

            case 'resumeMusic':
                setPlayState(true);
                break;

            // Loading screen baigesi — FiveM automatiskai is jungimosi ekrana
            // Jei naudoji loadscreen_manual_shutdown 'yes', siusk sia zinute is client.lua:
            //   SendNUIMessage({ type = 'shutdown' })
            //   ShutdownLoadingScreenNui()
            case 'shutdown':
                document.body.style.transition = 'opacity 0.8s ease';
                document.body.style.opacity = '0';
                setTimeout(() => {
                    if (window.invokeNative) window.invokeNative('shutdown', '');
                }, 800);
                break;
        }
    });

    // ── Event listeners ────────────────────────────────────
    function bindEvents() {
        // Volume slider
        if (els.volSlider) {
            els.volSlider.addEventListener('input', function () {
                setVolume(parseInt(this.value));
            });
        }

        // Play / Pause
        if (els.playPauseBtn) {
            els.playPauseBtn.addEventListener('click', () => setPlayState(!isPlaying));
        }

        // Prev / Next (navigacija YouTube playlist)
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (ytPlayer && ytReady) ytPlayer.previousVideo();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (ytPlayer && ytReady) ytPlayer.nextVideo();
            });
        }

        // Mute toggle on icon click
        const volIco = document.getElementById('vol-ico');
        let savedVolume = currentVolume;
        if (volIco) {
            volIco.addEventListener('click', () => {
                if (currentVolume > 0) {
                    savedVolume = currentVolume;
                    setVolume(0);
                } else {
                    setVolume(savedVolume || 60);
                }
            });
        }

        // Discord button
        const discordBtn = document.getElementById('discord-btn');
        if (discordBtn) {
            discordBtn.addEventListener('click', () => {
                window.open(CONFIG.discordLink, '_blank');
            });
        }
    }

    // ── Fake ping fluctuation ──────────────────────────────
    function startPingFluctuation() {
        if (CONFIG.fakeStats.enabled) return; // Skip if using fake static
        setInterval(() => {
            const p = Math.floor(Math.random() * 28) + 10;
            if (els.pingEl && serverPing === '---') {
                els.pingEl.textContent = p + 'ms';
            }
        }, 3000);
    }

    // ── Init ───────────────────────────────────────────────
    function init() {
        buildRules();
        buildSteps();
        setTrackInfo();

        // Apply config stats
        if (CONFIG.fakeStats.enabled) {
            if (els.playerCountEl) els.playerCountEl.textContent = CONFIG.fakeStats.players;
            if (els.pingEl)        els.pingEl.textContent        = CONFIG.fakeStats.ping;
        }

        // Set initial volume display
        setVolume(CONFIG.defaultVolume);

        // Clock
        updateClock();
        setInterval(updateClock, 1000);

        // Start loading steps
        startLoadingAnimation();

        // Bind UI events
        bindEvents();

        // Load YouTube
        loadYouTubeAPI();

        // Ping fluctuation
        startPingFluctuation();
    }

    // Start after DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
