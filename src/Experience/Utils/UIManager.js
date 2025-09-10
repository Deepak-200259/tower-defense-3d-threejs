import { DEFENSE_TYPES, DEFENSES_STATS } from "../World/GameConfig";

export default class UIManager {
  updateCardsPopup(
    requiredItems,
    itemsInfo,
    position,
    previousTower,
    experience,
    callback
  ) {
    const itemsContainer = document.querySelector('.card-container');
    if (!itemsContainer) return;

    callback(false);
    // Clear old cards first
    itemsContainer.innerHTML = '';
    console.log(Object.keys(requiredItems), Object.values(requiredItems));
    
    Object.values(requiredItems).forEach((itemKey, index) => {
      const itemInfo = itemsInfo[itemKey];
      if (!itemInfo) return;
      console.log(itemInfo);
      
      // Build card element
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-tilt', '');
      card.setAttribute('data-tilt-max', '10');
      card.setAttribute('data-tilt-speed', '400');
      card.setAttribute('data-tilt-perspective', '1000');
      card.setAttribute('data-tilt-glare', '');
      card.setAttribute('data-tilt-max-glare', '0.2');

      card.innerHTML = `
              <div class="card-left">
                <img src="${itemInfo.image}" class="card-image" alt="${itemInfo.title}" />
              </div>
              <div class="card-right">
                <h2 class="card-title">${itemInfo.title}</h2>
                <p class="card-price"><span class="currency">$</span>${itemInfo.price}</p>
                <p class="card-description">${itemInfo.description}</p>
                <ul class="features-list">
                  ${itemInfo.features.map(f => `
                    <li>
                      <svg class="rotating-disc-svg" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="8" />
                      </svg>
                      ${f}
                    </li>
                  `).join('')}
                </ul>
                <button class="cta-button">Build ${itemInfo.title}</button>
              </div>
            `;

      itemsContainer.appendChild(card);
      const button = document.querySelectorAll('.cta-button')
      button[index].addEventListener('click', () => {
        experience.world.mapGenerator.setupTower(position, previousTower, itemKey)
        itemsContainer.style.display = 'none';
        itemsContainer.innerHTML = '';
        callback(true);
      })
    });

    // Show container after filling
    itemsContainer.style.display = Object.values(requiredItems).length ? 'grid' : 'none';
  }

  showUpgradeTowerPopup(name, level, upgradeCallBack, removeCallback, raycastCallback) {
    raycastCallback(false);
    const container = document.querySelector(".upgrade-popup-overlay");
    const upgradeButton = document.querySelector('.upgrade-popup-card-upgrade');
    const removeButton = document.querySelector('.upgrade-popup-card-remove');
    const closeButton = document.querySelector('.upgrade-popup-close');
    const sellAmount = document.querySelector('.sell-amount');
    const upgradeCost = document.querySelector('.upgrade-cost');
    const statIncrease = document.querySelector('.stat-increase');

    container.style.display = 'flex';
    upgradeButton.style.display = 'flex';
    console.log(name);
    if (name == DEFENSE_TYPES.FIRE_WIZARD) {
      if (level === 1) {
        sellAmount.textContent = DEFENSES_STATS.FIRE_WIZARD.UPGRADE_POPUP_INFO.LV1.SELL_AMOUNT;
        upgradeCost.textContent = DEFENSES_STATS.FIRE_WIZARD.UPGRADE_POPUP_INFO.LV1.UPGRADE_COST;
        statIncrease.textContent = DEFENSES_STATS.FIRE_WIZARD.UPGRADE_POPUP_INFO.LV1.STAT_INCREASE;
      } else {
        sellAmount.textContent = DEFENSES_STATS.FIRE_WIZARD.UPGRADE_POPUP_INFO.LV2.SELL_AMOUNT;
        upgradeButton.style.display = 'none';
      }
    } else if (name == 'cannonDefense') {
      if (level === 1) {
        sellAmount.textContent = DEFENSES_STATS.CANNON_DEFENSE.UPGRADE_POPUP_INFO.LV1.SELL_AMOUNT;
        upgradeCost.textContent = DEFENSES_STATS.CANNON_DEFENSE.UPGRADE_POPUP_INFO.LV1.UPGRADE_COST;
        statIncrease.textContent = DEFENSES_STATS.CANNON_DEFENSE.UPGRADE_POPUP_INFO.LV1.STAT_INCREASE;
      } else {
        sellAmount.textContent = DEFENSES_STATS.CANNON_DEFENSE.UPGRADE_POPUP_INFO.LV2.SELL_AMOUNT;
        upgradeButton.style.display = 'none';
      }
    }

    const onUpgradeClick = () => {
      upgradeCallBack();
      cleanup();
    };

    const onRemoveClick = () => {
      removeCallback();
      cleanup();
    };

    const onCloseClick = () => {
      cleanup();
    };

    const cleanup = () => {
      container.style.display = 'none';
      upgradeButton.removeEventListener('click', onUpgradeClick);
      removeButton.removeEventListener('click', onRemoveClick);
      closeButton.removeEventListener('click', onCloseClick);
      raycastCallback(true);
    };

    // ✅ bind listeners directly, no .bind(this)
    upgradeButton.addEventListener('click', onUpgradeClick);
    removeButton.addEventListener('click', onRemoveClick);
    closeButton.addEventListener('click', onCloseClick);
  }
}
