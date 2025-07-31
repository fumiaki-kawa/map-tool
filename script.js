document.addEventListener('DOMContentLoaded', () => {
    
    // --- データ定義 ---
    const BOSSES = ["アデレ", "カリゴ", "フレゴール", "グラディウス", "グノスター", "ナメレス", "リブラ", "マリス"];
    const CATACLYSMS = ["なし", "ノクラテオ", "火口", "山嶺", "腐れ森"];
    
    // お客様が最終的に調整した値をここに反映させる
    const SPAWN_POINTS_COORDS = {
    1: { top: '38.6%', left: '19.9%' },
    2: { top: '58.5%', left: '20.8%' },
    3: { top: '72.0%', left: '21.3%' },
    4: { top: '39.5%', left: '36.0%' },
    5: { top: '64.8%', left: '52.8%' },
    6: { top: '80.8%', left: '55.6%' },
    7: { top: '22.5%', left: '54.3%' },
    8: { top: '37.0%', left: '65.8%' },
    9: { top: '53.5%', left: '77.1%' },
};

    // --- DOM要素の取得 ---
    let userSelection = { boss: null, cataclysm: null, spawnPoint: null, location: null };
    const steps = { boss: document.getElementById('step1-boss-selection'), cataclysm: document.getElementById('step2-cataclysm-selection'), spawn: document.getElementById('step3-spawn-selection'), location: document.getElementById('step4-location-selection'), result: document.getElementById('step5-result') };
    const bossIconsContainer = document.getElementById('boss-icons');
    const cataclysmIconsContainer = document.getElementById('cataclysm-icons');
    const spawnMapContainer = document.getElementById('spawn-map-container');
    const spawnMapImage = document.getElementById('spawn-map-image');
    const locationOptionsContainer = document.getElementById('location-options');
    const resultMapImage = document.getElementById('result-map-image');
    const resultFilename = document.getElementById('result-filename');
    const resetButton = document.getElementById('reset-button');
    const backButtons = document.querySelectorAll('.back-button');
    const adjustmentButton = document.getElementById('adjustment-mode-button');
    const coordOutput = document.getElementById('coordinate-output');
    let isAdjustmentMode = false;

    // ★★★ ここから下に関数の定義をすべてまとめる ★★★

    function createIconGrid(container, items, type) {
        container.innerHTML = '';
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'icon-item';
            div.dataset.type = type;
            div.dataset.name = item;
            
            const img = document.createElement('img');
            const folderName = (type === 'boss') ? 'bosses' : 'cataclysms';
            img.src = `images/${folderName}/${item}.png`;
            img.alt = item;
            
            const p = document.createElement('p');
            p.textContent = item;
            
            div.appendChild(img);
            div.appendChild(p);
            container.appendChild(div);
        });
    }

    function showStep(stepName) {
        Object.values(steps).forEach(step => step.classList.remove('active'));
        if (steps[stepName]) {
            steps[stepName].classList.add('active');
        }
    }

    function handleIconClick(event) {
        const target = event.target.closest('.icon-item');
        if (!target) return;
        const type = target.dataset.type;
        const name = target.dataset.name;
        if (type === 'boss') {
            userSelection.boss = name;
            showStep('cataclysm');
        } else if (type === 'cataclysm') {
            userSelection.cataclysm = name;
            spawnMapImage.src = `images/spawn-maps/${name}.png`;
            createSpawnPoints();
            showStep('spawn');
        }
    }

    function createSpawnPoints() {
        spawnMapContainer.querySelectorAll('.spawn-point').forEach(p => p.remove());
        for (const [number, coords] of Object.entries(SPAWN_POINTS_COORDS)) {
            const point = document.createElement('div');
            point.className = 'spawn-point';
            point.style.top = coords.top;
            point.style.left = coords.left;
            point.dataset.spawn = number;
            spawnMapContainer.appendChild(point);
        }
    }
    
    function handleSpawnPointClick(event) {
        const target = event.target.closest('.spawn-point');
        if (!target || isAdjustmentMode) return;
        userSelection.spawnPoint = target.dataset.spawn;
        findAndDisplayLocationOptions();
    }

    // findAndDisplayLocationOptions は、お客様のファイルリストを組み込んだ完成版に後で差し替えます
    async function findAndDisplayLocationOptions() {
        alert("（仮）拠点情報絞り込み機能");
        const dummyLocations = ["聖堂炎・遺跡雷", "野営地無・遺跡雷", "小砦魔・塔無"];
        locationOptionsContainer.innerHTML = '';
        dummyLocations.forEach(location => {
            const button = document.createElement('button');
            button.className = 'location-button';
            button.textContent = location;
            button.dataset.filename = `DUMMY_${location}.png`;
            locationOptionsContainer.appendChild(button);
        });
        showStep('location');
    }

    function handleLocationClick(event) {
        const target = event.target.closest('.location-button');
        if (!target) return;
        const filename = target.dataset.filename;
        resultMapImage.src = `images/maps/${filename}`;
        resultFilename.textContent = filename;
        resultMapImage.onerror = () => {
            resultMapImage.alt = "画像が見つかりません";
            resultFilename.textContent = `エラー: ${filename} は見つかりませんでした。`;
        };
        resultMapImage.onload = () => { resultMapImage.alt = `マップ: ${filename}`; };
        showStep('result');
    }

    function resetAll() {
        userSelection = { boss: null, cataclysm: null, spawnPoint: null, location: null };
        showStep('boss');
    }

    function handleBackClick(event) {
        const targetStep = event.target.dataset.step;
        showStep(targetStep);
    }

    function toggleAdjustmentMode() {
        isAdjustmentMode = !isAdjustmentMode;
        const spawnPoints = spawnMapContainer.querySelectorAll('.spawn-point');
        
        if (isAdjustmentMode) {
            adjustmentButton.textContent = '位置調整モードを終了';
            adjustmentButton.style.backgroundColor = '#f44336';
            spawnPoints.forEach(point => {
                point.style.cursor = 'grab';
                makeDraggable(point);
            });
            updateCoordOutput();
        } else {
            adjustmentButton.textContent = 'ドラッグで位置調整モードを開始';
            adjustmentButton.style.backgroundColor = '#4CAF50';
            spawnPoints.forEach(point => {
                point.style.cursor = 'pointer';
                // ドラッグイベントを削除（簡単のためページリロードでリセットする方針）
            });
        }
    }

    function makeDraggable(element) {
        let offsetX, offsetY;
        function onMouseDown(e) {
            e.preventDefault();
            element.classList.add('dragging');
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp, { once: true });
        }
        function onMouseMove(e) {
            const containerRect = spawnMapContainer.getBoundingClientRect();
            let newLeft = e.clientX - containerRect.left - offsetX;
            let newTop = e.clientY - containerRect.top - offsetY;
            newLeft = Math.max(0, Math.min(newLeft, containerRect.width - element.offsetWidth));
            newTop = Math.max(0, Math.min(newTop, containerRect.height - element.offsetHeight));
            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;
        }
        function onMouseUp() {
            element.classList.remove('dragging');
            document.removeEventListener('mousemove', onMouseMove);
            updateCoordOutput();
        }
        element.addEventListener('mousedown', onMouseDown);
    }

    function updateCoordOutput() {
        let outputText = 'const SPAWN_POINTS_COORDS = {\n';
        const spawnPoints = spawnMapContainer.querySelectorAll('.spawn-point');
        const containerRect = spawnMapContainer.getBoundingClientRect();
        const sortedPoints = Array.from(spawnPoints).sort((a, b) => parseInt(a.dataset.spawn) - parseInt(b.dataset.spawn));
        
        sortedPoints.forEach(point => {
            const pointNumber = point.dataset.spawn;
            const pointRect = point.getBoundingClientRect();
            const centerX = pointRect.left - containerRect.left + (pointRect.width / 2);
            const centerY = pointRect.top - containerRect.top + (pointRect.height / 2);
            const leftPercent = ((centerX / containerRect.width) * 100).toFixed(1);
            const topPercent = ((centerY / containerRect.height) * 100).toFixed(1);
            outputText += `    ${pointNumber}: { top: '${topPercent}%', left: '${leftPercent}%' },\n`;
        });
        outputText += '};';
        coordOutput.textContent = outputText;
    }

    // --- 初期化 & イベントリスナー設定 ---
    function initialize() {
        createIconGrid(bossIconsContainer, BOSSES, 'boss');
        createIconGrid(cataclysmIconsContainer, CATACLYSMS, 'cataclysm');

        bossIconsContainer.addEventListener('click', handleIconClick);
        cataclysmIconsContainer.addEventListener('click', handleIconClick);
        spawnMapContainer.addEventListener('click', handleSpawnPointClick);
        locationOptionsContainer.addEventListener('click', handleLocationClick);
        resetButton.addEventListener('click', resetAll);
        backButtons.forEach(button => button.addEventListener('click', handleBackClick));
        adjustmentButton.addEventListener('click', toggleAdjustmentMode);
        
        showStep('boss');
    }

    // ★★★ 最後に初期化を実行する ★★★
    initialize();
});