# 🏰 Tower Defense - 3D - ThreeJS

A **3D Tower Defense Game** built with **Three.js**, featuring wave-based enemies, towers, coins, and HUD management.  
The game uses a **custom JSON-based map generation system** for easy level creation.

---

## ⚙️ Map Generation Tool

This project comes with a **JSON Map Generation Tool** that allows you to:

- Design maps visually.
- Export them as JSON for direct use in the game.
- Spawn paths, decorations, and map elements automatically.

### 🔄 JSON Upload Support

- Users can **upload an already created JSON** from the tool.
- Alternatively, you can **manually create JSON** of the required format (cells, positions, pathPoints, etc.).
- Once uploaded, the tool will **render the corresponding map visually**, allowing quick iteration and validation.

---

## 📑 JSON Structure

### Path

Defines the route enemies will take.

### Angles

Define how enemies turn at corners:

- **0°** → Top → Down
- **-90°** → Right → Left
- **90°** → Left → Right
- **180°** → Bottom → Up

### Placeable Elements

- 🪨 **Stones**
- 🌲 **Trees**
- 🏰 **Castle**
- ⛉ **Boundaries**
- 🏠 **Houses**
- 🗼 **Towers**

Enemies will strictly follow the defined path and rotate based on the angle values in the JSON.

---

## 🕹️ Game Structure

### `GameConfig.js`

Holds all configuration data:

- **Enemies** → Speed, health, rewards, damage, etc.
- **Defenses** → Tower stats, attack ranges, damage values, costs.
- **Wave Handling** → Enemy types, spawn count, delays per wave.

### `World.js`

Handles wave generation:

- **count** → Number of enemies
- **type** → Enemy type
- **delay** → Time between spawns

---

## 🛡️ Towers & Economy

- Players can **purchase and sell towers**.
- Currently supports **a single tower**, but other types are already scaffolded and can be added easily.

### `CoinsManager.js`

- Handles all additions/subtractions of coins.
- Updates directly on the HUD.

---

## 📊 HUD & Gameplay Info

The **HUDManager** updates and displays important game info:

- 💰 **Coins** → Real-time update when earning/spending.
- ❤️ **Main Tower Health** → Decreases when enemies reach the base.
- 👾 **Enemies** → Spawned based on `World.js` wave data.

Enemies:

- Follow the path defined in the JSON.
- Rotate at corners according to the angle defined in JSON.

---

## 🚀 Features

- ✅ JSON-based Map Creation Tool
- ✅ Upload & Visualize Existing JSON Maps
- ✅ Path-based Enemy Movement
- ✅ Real-Time HUD (Coins & Health)
- ✅ Wave Management System
- ✅ Tower Placement, Selling, Buying
- ✅ Scalable for Multiple Towers & Enemies

---

## 🏗️ Scalability

The game is designed to be **easily extensible**:

- Add more towers with different attack types.
- Define new enemies with unique abilities.
- Create complex maps using the JSON tool.
- Adjust game balance in a single config file (`GameConfig.js`).
