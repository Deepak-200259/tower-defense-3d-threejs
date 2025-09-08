🏰 Tower Defense - 3D - ThreeJS

A 3D Tower Defense Game built with Three.js, featuring wave-based enemies, towers, coins, and HUD management. The game uses a custom JSON-based map generation system for easy level creation.

⚙️ Map Generation Tool

This project comes with a JSON Map Generation Tool that allows you to design maps visually and export them as JSON.
The JSON is directly used by the game for spawning paths, decorations, and map elements.

JSON Structure:

Path: Defines the route enemies will take.

Angles: Define how enemies turn at corners:

0° → Top → Down

-90° → Right → Left

90° → Left → Right

180° → Bottom → Up

Placeable Elements:

🪨 Stones

🌲 Trees

🏰 Castle

⛉ Boundaries

🏠 Houses

🗼 Towers

Enemies will strictly follow the defined path and rotate based on the angle values in the JSON.

🕹️ Game Structure
GameConfig.js

Holds all configuration data:

Enemies → Speed, health, rewards, damage, etc.

Defenses → Tower stats, attack ranges, damage values, costs.

Wave Handling → Enemy types, spawn count, delays per wave.

world.js

Handles wave generation:

Easily define new waves by adding:

count → Number of enemies

type → Enemy type

delay → Time between spawns

🛡️ Towers & Economy

Players can purchase and sell towers.

Currently supports a single tower, but other tower types are already scaffolded and can be added easily (scalable system).

coinsManager:

Handles all additions/subtractions of coins.

Updates directly on the HUD.

📊 HUD & Gameplay Info

HUDManager updates and displays important info:

💰 Coins (real-time update when earning/spending).

❤️ Main Tower Health (decreases when enemies reach the base).

👾 Enemies

Enemies are spawned according to waves defined in world.js.

They follow the path defined in the JSON file created by the tool.

At each corner, enemies rotate according to the angle in the JSON.

🚀 Features

✅ JSON-based Map Creation Tool
✅ Path-based Enemy Movement
✅ Real-Time HUD (Coins & Health)
✅ Wave Management System
✅ Tower Placement, Selling, Buying
✅ Scalable for Multiple Towers & Enemies

🏗️ Scalability

The game is designed to be easily extensible:

Add more towers with different attack types.

Define new enemies with unique abilities.

Create complex maps using the JSON tool.

Adjust game balance in a single config file (GameConfig.js).
