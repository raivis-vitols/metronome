let Metronome = (function () {
    'use strict';

    return function () {
        let _public = {
            },
            _private = {
                bpm: {
                    min: 20,
                    max: 300,
                    current: 120
                },
                isPlaying: 0,
                bars: {
                    current: {
                        beats: 4,
                        subdivision: 4
                    },
                    next: false
                },
                audio: {
                    isReady: false,
                    interval: null,
                    source: {
                        alpha: [
                            'alpha-regular.mp3',
                            'alpha-accent.mp3',
                        ]
                    }
                },
            };

        /**
         *
         */
        _public.playBar = function () {
            let bar = _private.getBar(8, 8, [1]);

            _public.play(bar);
        };

        /**
         *
         */
        _public.play = function (bar) {
            let bpm = _public.getBpm(),
                currentBeat = 1;

            _private.audio.interval = setInterval(function () {
                let audio = bar.audio[currentBeat - 1];
                console.log(currentBeat);

                if (++currentBeat > bar.beats) {
                    currentBeat = 1;
                }

                audio.play();
            }, _private.getBpmAsMs(bpm));
        };

        /**
         *
         */
        _public.stop = function () {
            clearInterval(_private.audio.interval);
        };

        /**
         * @param {number} bpm
         * @return {boolean}
         */
        _public.setBpm = function (bpm) {
            return _private.setTempo(bpm);
        };

        /**
         * @return {number}
         */
        _public.getBpm = function () {
            return _private.bpm.current;
        };

        /**
         *
         */
        _private.init = function () {
            _private.loadAudio();
        };

        /**
         * @param {number} bpm
         * @return {boolean}
         */
        _private.setTempo = function (bpm) {
            if (isNaN(bpm)) {
                return false;
            }

            if (bpm > _private.bpm.max) {
                return false;
            }

            if (bpm < _private.bpm.min) {
                return false;
            }

            _private.bpm.current = bpm;
            return true;
        };

        /**
         * @returns {object}
         */
        _private.getBar = function (beats, subdivision, accents) {
            if (!Array.isArray(accents)) {
                accents = [];
            }

            let bar = {
                audio: [],
                beats: beats,
                subdivision: subdivision
            };

            for (let i = 1; i <= beats; i++) {
                let audio = accents.indexOf(i) < 0
                    ? _private.getRegularAudio()
                    : _private.getAccentAudio();

                bar.audio.push(audio);
            }

            return bar;
        };

        /**
         * @param {number} bpm
         * @returns {number}
         */
        _private.getBpmAsMs = function (bpm) {
            return (60 * 1000) / bpm;
        };

        /**
         *
         */
        _private.getRegularAudio = function () {
            let audio = new Audio('alpha-regular.mp3');

            audio.addEventListener('canplaythrough', event => {
                console.log("alpha-regular.mp3 Ready");
            });

            return audio;
        };

        /**
         *
         */
        _private.getAccentAudio = function () {
            let audio = new Audio('alpha-accent.mp3');

            audio.addEventListener('canplaythrough', event => {
                console.log("alpha-accent.mp3 Ready");
            });

            return audio;
        };

        /**
         *
         */
        _private.loadAudio = function () {

        };

        _private.init();
        return _public;
    };
})();

let m = new Metronome();
