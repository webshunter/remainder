import { login } from '../myapp.js';
import { menu } from '../menu.js';

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: async function () {


        globalThis.hostApi = 'https://gugus-darmayanto.online/api/';


        function getPhoneGapPath() {
            var path = window.location.pathname;
            path = path.substr(path, path.length - 10);
            return path;
        };


        function playAudio(url) {
            // Play the audio file at url
            var my_media = new Media(url,
                // success callback
                function () { console.log("playAudio():Audio Success"); },
                // error callback
                function (err) { console.log("playAudio():Audio Error: " + err); }
            );

            // Play audio
            my_media.play();

            // Pause after 10 seconds
            setTimeout(function () {
                my_media.pause();
            }, 10000);
        }

        cordova.plugins.autoStart.enable();
        // High priority with notification id 10
        // ('myicon.png' is in the 'res/drawable' folder)
        cordova.plugins.foregroundService.start('GPS Running', 'Background Service', 'myicon', 3, 10);

        cordova.plugins.backgroundMode.enable();

        cordova.plugins.backgroundMode.isActive();

        cordova.plugins.backgroundMode.wakeUp();

        cordova.plugins.backgroundMode.on('activate', function () {
            cordova.plugins.backgroundMode.disableWebViewOptimizations();
        });

        cordova.plugins.backgroundMode.on('enable', function () {



        })

        cordova.plugins.backgroundMode.on('activate', function () {

            // set notification

        });

        cordova.plugins.backgroundMode.isScreenOff(function (bool) {
            cordova.plugins.backgroundMode.wakeUp();
        });

        cordova.plugins.backgroundMode.overrideBackButton();

        cordova.plugins.backgroundMode.on('enable', function () {

            setInterval(function () {
                axios.post(globalThis.hostApi + 'get').then(function (res) {

                    console.log();

                    for (let i = 0; i < res.data.length; i++) {

                        if (res.data[i].tgl_tempo == tanggal().normal && res.data[i].status != 'selesai') {

                            cordova.plugins.notification.local.schedule({
                                id: res.data[i].id,
                                title: res.data[i].nama_fintech,
                                text: 'jatuh tempo pembayaran ' + res.data[i].tgl_tempo,
                                smallIcon: 'res://calendar',
                                icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfXKe6Yfjr6rCtR6cMPJB8CqMAYWECDtDqH-eMnerHHuXv9egrw'
                            });

                            playAudio(getPhoneGapPath() + "sound/alarm.mp3");

                        }

                    }

                })
            }, 60 * 1000 * 5);




        });


        let status = await BackgroundFetch.configure({
            minimumFetchInterval: 15,
            forceAlarmManager: true,
            stopOnTerminate: false,
            startOnBoot: true,
            enableHeadless: true,
            delay: 5000,
            requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY
        }, async (taskId) => {


            axios.post(globalThis.hostApi + 'get').then(function (res) {

                for (let i = 0; i < res.data.length; i++) {

                    if (res.data[i].tgl_tempo == tanggal().normal && res.data[i].status != 'selesai') {

                        cordova.plugins.notification.local.schedule({
                            id: res.data[i].id,
                            title: res.data[i].nama_fintech,
                            text: 'jatuh tempo pembayaran ' + res.data[i].tgl_tempo,
                            smallIcon: 'res://calendar',
                            icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfXKe6Yfjr6rCtR6cMPJB8CqMAYWECDtDqH-eMnerHHuXv9egrw'
                        });

                        playAudio(getPhoneGapPath() + "sound/alarm.mp3");

                    }

                }

            })


            console.log("[BackgroundFetch] taskId: ", taskId);
            BackgroundFetch.finish(taskId);
        }, async (taskId) => {
            // This task has exceeded its allowed running-time.
            // You must stop what you're doing and immediately .finish(taskId)

            console.log('[BackgroundFetch] TIMEOUT taskId: ', taskId);
            BackgroundFetch.finish(taskId);
        });

        if (localStorage.getItem('login') != undefined) {
            menu()
        } else {
            login()
        }

    }
};

app.initialize();