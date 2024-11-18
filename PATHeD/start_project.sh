#!/bin/bash
# Start the Android Emulator
emulator -avd Pixel_4a_API_34 &
sleep 15

# Open Metro bundler in a new Terminal window
osascript -e 'tell application "Terminal" to do script "cd \"$(pwd)\" && npx react-native start"'

# Run the Android app
npx react-native run-android

