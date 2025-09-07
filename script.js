document.addEventListener('DOMContentLoaded', () => {

    // --- データ定義 ---
    const BOSSES = ["アデレ", "カリゴ", "フレゴール", "グラディウス", "グノスター", "ナメレス", "リブラ", "マリス"];
    const CATACLYSMS = ["なし", "ノクラテオ", "火口", "山嶺", "腐れ森"];
    
    const SPAWN_POINTS_COORDS = {
        1: { top: '38.6%', left: '19.9%' }, 2: { top: '58.5%', left: '20.8%' },
        3: { top: '72.0%', left: '21.3%' }, 4: { top: '39.5%', left: '36.0%' },
        5: { top: '64.8%', left: '52.8%' }, 6: { top: '80.8%', left: '55.6%' },
        7: { top: '22.5%', left: '54.3%' }, 8: { top: '37.0%', left: '65.8%' },
        9: { top: '53.5%', left: '77.1%' }
    };

    // お客様の全ファイルリスト
    const ALL_MAP_FILES = [
        { filename: "processed_アデレ_なし_1_聖堂無・小砦無.png", memo: "" },
        { filename: "processed_アデレ_なし_1_野営地無・遺跡雷.png", memo: "" },
        { filename: "processed_アデレ_なし_2_聖堂無・野営地炎.png", memo: "" },
        { filename: "processed_アデレ_なし_2_野営地無・遺跡毒.png", memo: "" },
        { filename: "processed_アデレ_なし_3_聖堂炎・野営地炎.png", memo: "" },
        { filename: "processed_アデレ_なし_3_野営地無・遺跡血.png", memo: "" },
        { filename: "processed_アデレ_なし_4_遺跡氷・小砦魔.png", memo: "" },
        { filename: "processed_アデレ_なし_4_遺跡眠・遺跡毒.png", memo: "" },
        { filename: "processed_アデレ_なし_5_遺跡雷・聖堂無.png", memo: "" },
        { filename: "processed_アデレ_なし_6_小砦無・野営地無.png", memo: "" },
        { filename: "processed_アデレ_なし_6_聖堂聖・遺跡氷.png", memo: "" },
        { filename: "processed_アデレ_なし_6_野営地発狂・遺跡魔.png", memo: "" },
        { filename: "processed_アデレ_なし_7_遺跡氷・聖堂無.png", memo: "" },
        { filename: "processed_アデレ_なし_7_野営地無・聖堂無.png", memo: "" },
        { filename: "processed_アデレ_なし_8_遺跡氷・遺跡聖.png", memo: "" },
        { filename: "processed_アデレ_なし_8_野営地死・野営地発狂.png", memo: "" },
        { filename: "processed_アデレ_なし_8_野営地発狂・聖堂無.png", memo: "" },
        { filename: "processed_アデレ_なし_9_遺跡毒・小砦魔.png", memo: "" },
        { filename: "processed_アデレ_なし_9_遺跡毒・遺跡毒.png", memo: "" },
        { filename: "processed_アデレ_なし_9_野営地無・塔.png", memo: "" },
        { filename: "processed_アデレ_ノクラテオ_1_遺跡毒・聖堂無.png", memo: "" },
        { filename: "processed_アデレ_ノクラテオ_6_遺跡氷・遺跡死.png", memo: "" },
        { filename: "processed_アデレ_ノクラテオ_7_小砦無・聖堂炎.png", memo: "" },
        { filename: "processed_アデレ_ノクラテオ_7_野営地炎・聖堂無.png", memo: "" },
        { filename: "processed_アデレ_ノクラテオ_9_野営地無・遺跡聖.png", memo: "" },
        { filename: "processed_アデレ_山嶺_3_聖堂無・野営地雷.png", memo: "" },
        { filename: "processed_アデレ_山嶺_5_遺跡氷・小砦魔.png", memo: "" },
        { filename: "processed_アデレ_山嶺_8_聖堂無・遺跡眠.png", memo: "" },
        { filename: "processed_アデレ_山嶺_8_野営地無・遺跡魔.png", memo: "" },
        { filename: "processed_アデレ_山嶺_9_遺跡血・小砦魔.png", memo: "" },
        { filename: "processed_アデレ_火口_3_遺跡氷・聖堂無.png", memo: "" },
        { filename: "processed_アデレ_火口_5_遺跡氷・塔.png", memo: "" },
        { filename: "processed_アデレ_火口_5_野営地無・塔.png", memo: "" },
        { filename: "processed_アデレ_火口_6_野営地無・聖堂無.png", memo: "" },
        { filename: "processed_アデレ_火口_8_野営地無・聖堂炎.png", memo: "" },
        { filename: "processed_アデレ_腐れ森_2_小砦無・遺跡氷.png", memo: "" },
        { filename: "processed_アデレ_腐れ森_2_野営地無・小砦無.png", memo: "" },
        { filename: "processed_アデレ_腐れ森_4_聖堂無・小砦魔.png", memo: "" },
        { filename: "processed_アデレ_腐れ森_8_野営地炎・小砦無.png", memo: "" },
        { filename: "processed_アデレ_腐れ森_8_野営地無・遺跡聖.png", memo: "" },
        { filename: "processed_カリゴ_なし_1_野営地雷・小砦無・下塔.png", memo: "" },
        { filename: "processed_カリゴ_なし_1_野営地雷・小砦無・左塔.png", memo: "" },
        { filename: "processed_カリゴ_なし_2_小砦無・聖堂無.png", memo: "" },
        { filename: "processed_カリゴ_なし_2_遺跡氷・野営地無.png", memo: "" },
        { filename: "processed_カリゴ_なし_3_遺跡血・小砦魔.png", memo: "" },
        { filename: "processed_カリゴ_なし_3_遺跡雷・小砦無.png", memo: "" },
        { filename: "processed_カリゴ_なし_3_野営地炎・小砦無.png", memo: "" },
        { filename: "processed_カリゴ_なし_4_小砦無・遺跡聖.png", memo: "" },
        { filename: "processed_カリゴ_なし_4_野営地無・小砦魔.png", memo: "" },
        { filename: "processed_カリゴ_なし_5_聖堂聖・小砦無.png", memo: "" },
        { filename: "processed_カリゴ_なし_5_遺跡眠・遺跡雷.png", memo: "" },
        { filename: "processed_カリゴ_なし_5_野営地無・野営地無.png", memo: "" },
        { filename: "processed_カリゴ_なし_5_野営地発狂・遺跡眠.png", memo: "" },
        { filename: "processed_カリゴ_なし_6_小砦魔・遺跡聖.png", memo: "" },
        { filename: "processed_カリゴ_なし_7_小砦無・聖堂聖.png", memo: "" },
        { filename: "processed_カリゴ_なし_7_小砦魔・聖堂無.png", memo: "" },
        { filename: "processed_カリゴ_なし_8_野営地無・聖堂無.png", memo: "" },
        { filename: "processed_カリゴ_なし_9_聖堂炎・野営地無.png", memo: "" },
        { filename: "processed_カリゴ_なし_9_聖堂無・野営地無.png", memo: "" },
        { filename: "processed_カリゴ_なし_9_遺跡雷・遺跡死.png", memo: "" },
        { filename: "processed_カリゴ_ノクラテオ_1_小砦無・遺跡血.png", memo: "" },
        { filename: "processed_カリゴ_ノクラテオ_5_聖堂無・遺跡死.png", memo: "" },
        { filename: "processed_カリゴ_ノクラテオ_7_遺跡雷・聖堂無.png", memo: "" },
        { filename: "processed_カリゴ_ノクラテオ_9_遺跡死・聖堂無.png", memo: "" },
        { filename: "processed_カリゴ_ノクラテオ_9_遺跡死・聖堂無・下塔.png", memo: "" },
        { filename: "processed_カリゴ_山嶺_5_遺跡無・野営地無.png", memo: "" },
        { filename: "processed_カリゴ_山嶺_7_野営地無・聖堂聖.png", memo: "" },
        { filename: "processed_カリゴ_山嶺_8_聖堂炎・小砦無.png", memo: "" },
        { filename: "processed_カリゴ_山嶺_9_遺跡聖・小砦無.png", memo: "" },
        { filename: "processed_カリゴ_山嶺_9_遺跡血・聖堂無.png", memo: "" },
        { filename: "processed_カリゴ_火口_1_遺跡毒.png", memo: "" },
        { filename: "processed_カリゴ_火口_1_遺跡無・野営地発狂.png", memo: "" },
        { filename: "processed_カリゴ_火口_1_野営地炎・野営地無.png", memo: "" },
        { filename: "processed_カリゴ_火口_2_聖堂聖・塔.png", memo: "" },
        { filename: "processed_カリゴ_火口_8_小砦無・小砦魔.png", memo: "" },
        { filename: "processed_カリゴ_腐れ森_1_野営地雷・遺跡死.png", memo: "" },
        { filename: "processed_カリゴ_腐れ森_2_野営地無・遺跡氷.png", memo: "" },
        { filename: "processed_カリゴ_腐れ森_4_聖堂無・野営地無.png", memo: "" },
        { filename: "processed_カリゴ_腐れ森_4_野営地無・小砦魔.png", memo: "" },
        { filename: "processed_カリゴ_腐れ森_7_野営地発狂・聖堂無.png", memo: "" },
        { filename: "processed_グノスター_なし_1_遺跡雷・野営地雷.png", memo: "" },
        { filename: "processed_グノスター_なし_2_遺跡毒・野営地炎.png", memo: "" },
        { filename: "processed_グノスター_なし_2_野営地炎・遺跡無.png", memo: "" },
        { filename: "processed_グノスター_なし_3_遺跡無・野営地雷.png", memo: "" },
        { filename: "processed_グノスター_なし_4_聖堂炎・小砦魔.png", memo: "" },
        { filename: "processed_グノスター_なし_4_野営地雷・遺跡無.png", memo: "" },
        { filename: "processed_グノスター_なし_5_聖堂炎・遺跡聖.png", memo: "" },
        { filename: "processed_グノスター_なし_5_遺跡氷・野営地雷.png", memo: "" },
        { filename: "processed_グノスター_なし_5_野営地無・小砦無.png", memo: "" },
        { filename: "processed_グノスター_なし_6_小砦魔・野営地炎.png", memo: "" },
        { filename: "processed_グノスター_なし_6_聖堂無・遺跡魔.png", memo: "" },
        { filename: "processed_グノスター_なし_6_野営地炎・聖堂炎.png", memo: "" },
        { filename: "processed_グノスター_なし_7_野営地雷・聖堂無.png", memo: "" },
        { filename: "processed_グノスター_なし_8_小砦無・遺跡毒.png", memo: "" },
        { filename: "processed_グノスター_なし_8_遺跡毒・聖堂聖.png", memo: "" },
        { filename: "processed_グノスター_なし_8_遺跡眠・遺跡無.png", memo: "" },
        { filename: "processed_グノスター_なし_8_野営地炎・聖堂聖.png", memo: "" },
        { filename: "processed_グノスター_なし_9_遺跡氷・聖堂炎.png", memo: "" },
        { filename: "processed_グノスター_なし_9_遺跡氷・野営地無.png", memo: "" },
        { filename: "processed_グノスター_なし_9_遺跡眠・遺跡死.png", memo: "" },
        { filename: "processed_グノスター_ノクラテオ_1_遺跡氷・野営地炎.png", memo: "" },
        { filename: "processed_グノスター_ノクラテオ_5_遺跡無・野営地炎.png", memo: "" },
        { filename: "processed_グノスター_ノクラテオ_6_聖堂炎・野営地無.png", memo: "" },
        { filename: "processed_グノスター_ノクラテオ_8_聖堂聖・遺跡氷.png", memo: "" },
        { filename: "processed_グノスター_ノクラテオ_8_野営地無・小砦無.png", memo: "" },
        { filename: "processed_グノスター_山嶺_5_野営地無・遺跡雷.png", memo: "" },
        { filename: "processed_グノスター_山嶺_8_野営地無・聖堂無.png", memo: "" },
        { filename: "processed_グノスター_山嶺_9_遺跡死・野営地炎.png", memo: "" },
        { filename: "processed_グノスター_山嶺_9_遺跡氷・聖堂炎.png", memo: "" },
        { filename: "processed_グノスター_山嶺_9_野営地雷・小砦無.png", memo: "" },
        { filename: "processed_グノスター_火口_1_野営地炎・塔.png", memo: "" },
        { filename: "processed_グノスター_火口_2_野営地雷・小砦無.png", memo: "" },
        { filename: "processed_グノスター_火口_8_遺跡魔・聖堂無.png", memo: "" },
        { filename: "processed_グノスター_火口_9_聖堂無・野営地聖.png", memo: "" },
        { filename: "processed_グノスター_火口_9_野営地無・塔.png", memo: "" },
        { filename: "processed_グノスター_腐れ森_1_小砦無・野営地炎.png", memo: "" },
        { filename: "processed_グノスター_腐れ森_3_聖堂無・野営地無.png", memo: "" },
        { filename: "processed_グノスター_腐れ森_3_遺跡眠・聖堂無.png", memo: "" },
        { filename: "processed_グノスター_腐れ森_7_野営地炎・小砦無.png", memo: "" },
        { filename: "processed_グノスター_腐れ森_7_野営地無・小砦無.png", memo: "" },
        { filename: "processed_グラディウス_なし_1_遺跡死・遺跡毒.png", memo: "" },
        { filename: "processed_グラディウス_なし_2_小砦無・聖堂聖.png", memo: "" },
        { filename: "processed_グラディウス_なし_2_遺跡毒・遺跡氷.png", memo: "" },
        { filename: "processed_グラディウス_なし_3_小砦無・遺跡死.png", memo: "" },
        { filename: "processed_グラディウス_なし_3_遺跡毒・遺跡氷.png", memo: "" },
        { filename: "processed_グラディウス_なし_3_野営地炎・野営地炎.png", memo: "" },
        { filename: "processed_グラディウス_なし_3_野営地炎・野営地炎・教会スタート.png", memo: "" },
        { filename: "processed_グラディウス_なし_4_遺跡魔・遺跡魔.png", memo: "" },
        { filename: "processed_グラディウス_なし_4_野営地炎・遺跡死.png", memo: "" },
        { filename: "processed_グラディウス_なし_4_野営地雷・野営地発狂.png", memo: "" },
        { filename: "processed_グラディウス_なし_5_聖堂無・野営地無.png", memo: "" },
        { filename: "processed_グラディウス_なし_5_聖堂無・野営地雷.png", memo: "" },
        { filename: "processed_グラディウス_なし_5_遺跡無・野営地無.png", memo: "" },
        { filename: "processed_グラディウス_なし_6_遺跡血・小砦魔.png", memo: "" },
        { filename: "processed_グラディウス_なし_7_小砦無・聖堂炎.png", memo: "" },
        { filename: "processed_グラディウス_なし_7_野営地雷・小砦魔.png", memo: "" },
        { filename: "processed_グラディウス_なし_8_遺跡毒・遺跡毒.png", memo: "" },
        { filename: "processed_グラディウス_なし_8_野営地無・聖堂無.png", memo: "" },
        { filename: "processed_グラディウス_なし_9_聖堂聖・野営地無.png", memo: "" },
        { filename: "processed_グラディウス_なし_9_野営地炎・遺跡死.png", memo: "" },
        { filename: "processed_グラディウス_ノクラテオ_4_聖堂聖・野営地炎.png", memo: "" },
        { filename: "processed_グラディウス_ノクラテオ_5_野営地発狂・聖堂炎.png", memo: "" },
        { filename: "processed_グラディウス_ノクラテオ_5_野営地雷・遺跡魔.png", memo: "" },
        { filename: "processed_グラディウス_ノクラテオ_7_野営地無・小砦無.png", memo: "" },
        { filename: "processed_グラディウス_ノクラテオ_9_野営地無・小砦無.png", memo: "" },
        { filename: "processed_グラディウス_山嶺_2_聖堂聖・小砦無.png", memo: "" },
        { filename: "processed_グラディウス_山嶺_6_遺跡血・聖堂無.png", memo: "" },
        { filename: "processed_グラディウス_山嶺_8_遺跡死・野営地無.png", memo: "" },
        { filename: "processed_グラディウス_山嶺_8_遺跡無・小砦無.png", memo: "" },
        { filename: "processed_グラディウス_山嶺_8_遺跡血・小砦魔.png", memo: "" },
        { filename: "processed_グラディウス_火口_1_遺跡無・聖堂炎.png", memo: "" },
        { filename: "processed_グラディウス_火口_1_遺跡聖・遺跡雷.png", memo: "" },
        { filename: "processed_グラディウス_火口_3_野営地無・遺跡死.png", memo: "" },
        { filename: "processed_グラディウス_火口_5_小砦無・塔.png", memo: "" },
        { filename: "processed_グラディウス_火口_6_小砦無・塔.png", memo: "" },
        { filename: "processed_グラディウス_腐れ森_1_野営地雷・聖堂無.png", memo: "" },
        { filename: "processed_グラディウス_腐れ森_2_野営地無・遺跡雷.png", memo: "" },
        { filename: "processed_グラディウス_腐れ森_8_小砦無・野営地無.png", memo: "" },
        { filename: "processed_グラディウス_腐れ森_8_遺跡魔・小砦無.png", memo: "" },
        { filename: "processed_グラディウス_腐れ森_8_野営地発狂・遺跡眠.png", memo: "" },
        { filename: "processed_ナメレス_なし_1_聖堂炎・小砦無.png", memo: "" },
        { filename: "processed_ナメレス_なし_1_遺跡雷・遺跡雷.png", memo: "" },
        { filename: "processed_ナメレス_なし_2_遺跡氷・遺跡氷.png", memo: "" },
        { filename: "processed_ナメレス_なし_2_野営地発狂・遺跡毒.png", memo: "" },
        { filename: "processed_ナメレス_なし_3_小砦無・聖堂無.png", memo: "" },
        { filename: "processed_ナメレス_なし_3_遺跡雷・野営地発狂.png", memo: "" },
        { filename: "processed_ナメレス_なし_3_遺跡魔・小砦無.png", memo: "" },
        { filename: "processed_ナメレス_なし_4_小砦無・野営地炎.png", memo: "" },
        { filename: "processed_ナメレス_なし_4_聖堂聖・野営地無.png", memo: "" },
        { filename: "processed_ナメレス_なし_5_小砦無・野営地炎.png", memo: "" },
        { filename: "processed_ナメレス_なし_5_遺跡聖・聖堂炎.png", memo: "" },
        { filename: "processed_ナメレス_なし_5_野営地無・聖堂炎.png", memo: "" },
        { filename: "processed_ナメレス_なし_6_野営地炎・遺跡氷.png", memo: "" },
        { filename: "processed_ナメレス_なし_7_小砦無・聖堂無.png", memo: "" },
        { filename: "processed_ナメレス_なし_7_聖堂聖・小砦無.png", memo: "" },
        { filename: "processed_ナメレス_なし_7_遺跡毒・小砦無.png", memo: "" },
        { filename: "processed_ナメレス_なし_7_遺跡眠・小砦無.png", memo: "" },
        { filename: "processed_ナメレス_なし_8_野営地無・遺跡血.png", memo: "" },
        { filename: "processed_ナメレス_なし_9_小砦無・聖堂聖.png", memo: "" },
        { filename: "processed_ナメレス_なし_9_野営地無・野営地無.png", memo: "" },
        { filename: "processed_ナメレス_ノクラテオ_7_遺跡無・小砦無.png", memo: "" },
        { filename: "processed_ナメレス_ノクラテオ_8_小砦無・遺跡聖.png", memo: "" },
        { filename: "processed_ナメレス_ノクラテオ_8_聖堂炎・小砦無.png", memo: "" },
        { filename: "processed_ナメレス_ノクラテオ_9_遺跡魔・野営地無.png", memo: "" },
        { filename: "processed_ナメレス_ノクラテオ_9_野営地無・聖堂聖.png", memo: "" },
        { filename: "processed_ナメレス_山嶺_6_小砦無・野営地発狂.png", memo: "" },
        { filename: "processed_ナメレス_山嶺_6_遺跡雷・野営地無.png", memo: "" },
        { filename: "processed_ナメレス_山嶺_6_野営地発狂・聖堂無.png", memo: "" },
        { filename: "processed_ナメレス_山嶺_7_聖堂無・小砦魔.png", memo: "" },
        { filename: "processed_ナメレス_山嶺_8_小砦無・遺跡眠.png", memo: "" },
        { filename: "processed_ナメレス_火口_1_遺跡魔・小砦魔.png", memo: "" },
        { filename: "processed_ナメレス_火口_3_小砦無・塔.png", memo: "" },
        { filename: "processed_ナメレス_火口_5_遺跡氷・野営地発狂.png", memo: "" },
        { filename: "processed_ナメレス_火口_6_遺跡無・遺跡無.png", memo: "" },
        { filename: "processed_ナメレス_火口_8_野営地無・小砦無.png", memo: "" },
        { filename: "processed_ナメレス_腐れ森_1_遺跡死・野営地雷.png", memo: "" },
        { filename: "processed_ナメレス_腐れ森_1_遺跡雷・遺跡雷.png", memo: "" },
        { filename: "processed_ナメレス_腐れ森_2_遺跡雷・野営地無.png", memo: "" },
        { filename: "processed_ナメレス_腐れ森_7_野営地無・聖堂無.png", memo: "" },
        { filename: "processed_ナメレス_腐れ森_8_小砦無・野営地発狂.png", memo: "" },
        { filename: "processed_フレゴール_なし_1_遺跡無・小砦無.png", memo: "" },
        { filename: "processed_フレゴール_なし_1_遺跡眠・遺跡眠.png", memo: "" },
        { filename: "processed_フレゴール_なし_2_遺跡氷・遺跡氷.png", memo: "" },
        { filename: "processed_フレゴール_なし_2_野営地雷・遺跡無.png", memo: "" },
        { filename: "processed_フレゴール_なし_3_小砦無・遺跡眠.png", memo: "" },
        { filename: "processed_フレゴール_なし_3_聖堂聖・小砦無.png", memo: "" },
        { filename: "processed_フレゴール_なし_3_遺跡魔・聖堂聖.png", memo: "" },
        { filename: "processed_フレゴール_なし_3_野営地無・遺跡眠.png", memo: "" },
        { filename: "processed_フレゴール_なし_4_遺跡毒・遺跡毒.png", memo: "" },
        { filename: "processed_フレゴール_なし_4_遺跡毒・野営地炎.png", memo: "" },
        { filename: "processed_フレゴール_なし_6_遺跡眠・小砦無.png", memo: "" },
        { filename: "processed_フレゴール_なし_6_遺跡血・聖堂聖.png", memo: "" },
        { filename: "processed_フレゴール_なし_6_野営地無・遺跡雷.png", memo: "" },
        { filename: "processed_フレゴール_なし_6_野営地無・遺跡魔.png", memo: "" },
        { filename: "processed_フレゴール_なし_7_聖堂無・小砦無.png", memo: "" },
        { filename: "processed_フレゴール_なし_8_小砦無・遺跡死.png", memo: "" },
        { filename: "processed_フレゴール_なし_8_野営地炎・聖堂聖.png", memo: "" },
        { filename: "processed_フレゴール_なし_8_野営地無・遺跡氷.png", memo: "" },
        { filename: "processed_フレゴール_なし_9_小砦無・遺跡血.png", memo: "" },
        { filename: "processed_フレゴール_なし_9_野営地無・遺跡氷.png", memo: "" },
        { filename: "processed_フレゴール_ノクラテオ_1_小砦魔・聖堂無.png", memo: "" },
        { filename: "processed_フレゴール_ノクラテオ_1_野営地無・遺跡雷.png", memo: "" },
        { filename: "processed_フレゴール_ノクラテオ_5_遺跡雷・野営地炎.png", memo: "" },
        { filename: "processed_フレゴール_ノクラテオ_5_遺跡魔・遺跡血.png", memo: "" },
        { filename: "processed_フレゴール_ノクラテオ_5_野営地雷・野営地無.png", memo: "" },
        { filename: "processed_フレゴール_山嶺_2_小砦無・遺跡聖.png", memo: "" },
        { filename: "processed_フレゴール_山嶺_7_小砦魔・聖堂無.png", memo: "" },
        { filename: "processed_フレゴール_山嶺_9_野営地無・聖堂無.png", memo: "" },
        { filename: "processed_フレゴール_山嶺_9_野営地無・聖堂聖.png", memo: "" },
        { filename: "processed_フレゴール_山嶺_9_野営地発狂・遺跡眠.png", memo: "" },
        { filename: "processed_フレゴール_火口_1_小砦魔・遺跡雷.png", memo: "" },
        { filename: "processed_フレゴール_火口_2_遺跡氷・遺跡無.png", memo: "" },
        { filename: "processed_フレゴール_火口_3_小砦魔・遺跡無.png", memo: "" },
        { filename: "processed_フレゴール_火口_3_野営地発狂・塔.png", memo: "" },
        { filename: "processed_フレゴール_火口_8_遺跡毒・野営地無.png", memo: "" },
        { filename: "processed_フレゴール_腐れ森_2_野営地無・遺跡雷.png", memo: "" },
        { filename: "processed_フレゴール_腐れ森_2_野営地雷・遺跡死.png", memo: "" },
        { filename: "processed_フレゴール_腐れ森_4_野営地炎・聖堂無.png", memo: "" },
        { filename: "processed_フレゴール_腐れ森_7_野営地発狂・小砦無.png", memo: "" },
        { filename: "processed_フレゴール_腐れ森_8_野営地炎・聖堂炎.png", memo: "" },
        { filename: "processed_マリス_なし_1_小砦無・遺跡聖.png", memo: "" },
        { filename: "processed_マリス_なし_1_野営地発狂・聖堂炎.png", memo: "" },
        { filename: "processed_マリス_なし_1_野営地雷・遺跡毒.png", memo: "" },
        { filename: "processed_マリス_なし_2_小砦無・遺跡聖.png", memo: "" },
        { filename: "processed_マリス_なし_3_聖堂炎・野営地炎.png", memo: "" },
        { filename: "processed_マリス_なし_3_聖堂無・遺跡無.png", memo: "" },
        { filename: "processed_マリス_なし_3_遺跡死・小砦無.png", memo: "" },
        { filename: "processed_マリス_なし_3_野営地炎・遺跡聖.png", memo: "" },
        { filename: "processed_マリス_なし_4_野営地炎・小砦無.png", memo: "" },
        { filename: "processed_マリス_なし_5_野営地雷・遺跡毒.png", memo: "" },
        { filename: "processed_マリス_なし_6_遺跡毒・野営地炎.png", memo: "" },
        { filename: "processed_マリス_なし_6_遺跡聖・遺跡魔.png", memo: "" },
        { filename: "processed_マリス_なし_6_遺跡血・小砦魔.png", memo: "" },
        { filename: "processed_マリス_なし_7_小砦無・聖堂無.png", memo: "" },
        { filename: "processed_マリス_なし_7_遺跡無・小砦無.png", memo: "" },
        { filename: "processed_マリス_なし_7_遺跡眠・聖堂聖.png", memo: "" },
        { filename: "processed_マリス_なし_8_野営地炎・野営地発狂.png", memo: "" },
        { filename: "processed_マリス_なし_8_野営地発狂・遺跡毒.png", memo: "" },
        { filename: "processed_マリス_なし_9_小砦無・聖堂炎.png", memo: "" },
        { filename: "processed_マリス_なし_9_遺跡死・聖堂炎.png", memo: "" },
        { filename: "processed_マリス_ノクラテオ_1_遺跡眠・野営地炎.png", memo: "" },
        { filename: "processed_マリス_ノクラテオ_1_野営地無・遺跡血.png", memo: "" },
        { filename: "processed_マリス_ノクラテオ_4_小砦無・野営地無.png", memo: "" },
        { filename: "processed_マリス_ノクラテオ_6_聖堂無・野営地無.png", memo: "" },
        { filename: "processed_マリス_ノクラテオ_7_野営地雷・聖堂聖.png", memo: "" },
        { filename: "processed_マリス_山嶺_3_小砦無・遺跡氷.png", memo: "" },
        { filename: "processed_マリス_山嶺_3_野営地炎・聖堂炎.png", memo: "" },
        { filename: "processed_マリス_山嶺_6_小砦無・野営地炎.png", memo: "" },
        { filename: "processed_マリス_山嶺_6_遺跡無・小砦無.png", memo: "" },
        { filename: "processed_マリス_山嶺_9_野営地無・聖堂無.png", memo: "" },
        { filename: "processed_マリス_火口_1_野営地炎・塔.png", memo: "" },
        { filename: "processed_マリス_火口_5_遺跡血・塔.png", memo: "" },
        { filename: "processed_マリス_火口_5_野営地炎・塔.png", memo: "" },
        { filename: "processed_マリス_火口_6_小砦無・塔.png", memo: "" },
        { filename: "processed_マリス_火口_8_小砦無・遺跡毒.png", memo: "" },
        { filename: "processed_マリス_腐れ森_1_遺跡死・野営地炎.png", memo: "" },
        { filename: "processed_マリス_腐れ森_2_小砦無・遺跡眠.png", memo: "" },
        { filename: "processed_マリス_腐れ森_3_聖堂無・野営地無.png", memo: "" },
        { filename: "processed_マリス_腐れ森_3_遺跡血・小砦魔.png", memo: "" },
        { filename: "processed_マリス_腐れ森_8_聖堂無・野営地無.png", memo: "" },
        { filename: "processed_リブラ_なし_1_野営地炎・遺跡無.png", memo: "" },
        { filename: "processed_リブラ_なし_2_小砦無・野営地炎.png", memo: "" },
        { filename: "processed_リブラ_なし_2_聖堂無・遺跡血.png", memo: "" },
        { filename: "processed_リブラ_なし_2_遺跡雷・遺跡毒.png", memo: "" },
        { filename: "processed_リブラ_なし_3_小砦無・野営地無.png", memo: "" },
        { filename: "processed_リブラ_なし_3_遺跡死・聖堂無.png", memo: "" },
        { filename: "processed_リブラ_なし_4_聖堂炎・野営地無.png", memo: "" },
        { filename: "processed_リブラ_なし_4_遺跡死・野営地無.png", memo: "" },
        { filename: "processed_リブラ_なし_4_遺跡氷・遺跡毒.png", memo: "" },
        { filename: "processed_リブラ_なし_4_遺跡聖・遺跡魔.png", memo: "" },
        { filename: "processed_リブラ_なし_5_小砦無・遺跡氷.png", memo: "" },
        { filename: "processed_リブラ_なし_5_野営地無・野営地炎.png", memo: "" },
        { filename: "processed_リブラ_なし_5_野営地雷・聖堂無.png", memo: "" },
        { filename: "processed_リブラ_なし_6_塔.png", memo: "" },
        { filename: "processed_リブラ_なし_6_遺跡雷・野営地炎.png", memo: "" },
        { filename: "processed_リブラ_なし_7_遺跡魔・小砦魔.png", memo: "" },
        { filename: "processed_リブラ_なし_7_野営地雷・小砦無.png", memo: "" },
        { filename: "processed_リブラ_なし_8_遺跡氷・野営地炎.png", memo: "" },
        { filename: "processed_リブラ_なし_9_塔魔・遺跡雷.png", memo: "" },
        { filename: "processed_リブラ_なし_9_遺跡氷・野営地発狂.png", memo: "" },
        { filename: "processed_リブラ_ノクラテオ_1_遺跡毒・野営地発狂.png", memo: "" },
        { filename: "processed_リブラ_ノクラテオ_4_遺跡眠・野営地炎.png", memo: "" },
        { filename: "processed_リブラ_ノクラテオ_5_遺跡血・小砦魔.png", memo: "" },
        { filename: "processed_リブラ_ノクラテオ_6_小砦無・遺跡氷.png", memo: "" },
        { filename: "processed_リブラ_ノクラテオ_8_小砦無・野営地無.png", memo: "" },
        { filename: "processed_リブラ_山嶺_8_小砦無・野営地発狂.png", memo: "" },
        { filename: "processed_リブラ_山嶺_8_遺跡眠・小砦無.png", memo: "" },
        { filename: "processed_リブラ_山嶺_8_野営地炎・遺跡毒.png", memo: "" },
        { filename: "processed_リブラ_山嶺_8_野営地発狂・小砦魔.png", memo: "" },
        { filename: "processed_リブラ_山嶺_9_遺跡毒・小砦無.png", memo: "" },
        { filename: "processed_リブラ_火口_2_遺跡眠・塔.png", memo: "" },
        { filename: "processed_リブラ_火口_5_小砦魔・塔魔.png", memo: "" },
        { filename: "processed_リブラ_火口_6_小砦無・聖堂無.png", memo: "" },
        { filename: "processed_リブラ_火口_6_野営地雷・塔.png", memo: "" },
        { filename: "processed_リブラ_火口_9_野営地炎・遺跡毒.png", memo: "" },
        { filename: "processed_リブラ_腐れ森_1_野営地雷・聖堂無.png", memo: "" },
        { filename: "processed_リブラ_腐れ森_3_聖堂無・遺跡血.png", memo: "" },
        { filename: "processed_リブラ_腐れ森_3_遺跡眠・聖堂炎.png", memo: "" },
        { filename: "processed_リブラ_腐れ森_7_遺跡眠・聖堂炎.png", memo: "" },
          { filename: "processed_リブラ_腐れ森_8_野営地無・聖堂聖.png", memo: "" }
    ];

    // --- DOM要素の取得 ---
    let userSelection = { boss: null, cataclysm: null, spawnPoint: null };
    const steps = {
        step1: document.getElementById('step1-boss-selection'),
        step2: document.getElementById('step2-cataclysm-selection'),
        step3: document.getElementById('step3-spawn-selection'),
        step4: document.getElementById('step4-location-selection'),
        step5: document.getElementById('step5-result')
    };
    const bossIconsContainer = document.getElementById('boss-icons');
    const cataclysmIconsContainer = document.getElementById('cataclysm-icons');
    const spawnMapContainer = document.getElementById('spawn-map-container');
    const spawnMapImage = document.getElementById('spawn-map-image');
    const locationOptionsContainer = document.getElementById('location-options');
    const resultMapImage = document.getElementById('result-map-image');
    const resultFilename = document.getElementById('result-filename');
    const resultMemoElement = document.getElementById('result-memo');
    const resetButton = document.getElementById('reset-button');
    const backButtons = document.querySelectorAll('.back-button');

    // --- 関数の定義 ---
    function createIconGrid(container, items, type) {
        if (!container) return;
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

    function showStep(stepId) {
        Object.values(steps).forEach(step => {
            if(step) step.classList.remove('active');
        });
        const targetStep = document.getElementById(stepId);
        if(targetStep) {
            targetStep.classList.add('active');
        }
    }

    function handleIconClick(event) {
        const target = event.target.closest('.icon-item');
        if (!target) return;
        const type = target.dataset.type;
        const name = target.dataset.name;
        const container = target.parentElement;
        container.querySelectorAll('.icon-item').forEach(item => {
            item.classList.remove('selected');
        });
        target.classList.add('selected');
        if (type === 'boss') {
            userSelection.boss = name;
            showStep('step2-cataclysm-selection');
        } else if (type === 'cataclysm') {
            userSelection.cataclysm = name;
            spawnMapImage.src = `images/spawn-maps/${name}.png`;
            createSpawnPoints();
            showStep('step3-spawn-selection');
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
        if (!target) return;
        userSelection.spawnPoint = target.dataset.spawn;
        findAndDisplayLocationOptions(); 
    }

    function findAndDisplayLocationOptions() {
        const { boss, cataclysm, spawnPoint } = userSelection;
        if (!boss || !cataclysm || !spawnPoint) return;
        const prefix = `processed_${boss}_${cataclysm}_${spawnPoint}_`;
        const matchedFiles = ALL_MAP_FILES.filter(fileObject => fileObject.filename.startsWith(prefix));
        locationOptionsContainer.innerHTML = '';
        if (matchedFiles.length === 0) {
            locationOptionsContainer.textContent = '該当するマップパターンが見つかりませんでした。';
        } else {
            matchedFiles.forEach(fileObject => {
                const filename = fileObject.filename;
                const locationPart = filename.substring(prefix.length, filename.lastIndexOf('.png'));
                const itemDiv = document.createElement('div');
                itemDiv.className = 'location-item';
                itemDiv.dataset.filename = filename;
                const img = document.createElement('img');
                img.src = `images/previews/${filename}`;
                img.alt = `プレビュー: ${locationPart}`;
                const p = document.createElement('p');
                p.textContent = locationPart.replace(/_/g, ' ');
                itemDiv.appendChild(img);
                itemDiv.appendChild(p);
                locationOptionsContainer.appendChild(itemDiv);
            });
        }
        showStep('step4-location-selection');
    }

    function handleLocationClick(event) {
        const target = event.target.closest('.location-item'); 
        if (!target) return;
        const filename = target.dataset.filename;
        const fileObject = ALL_MAP_FILES.find(f => f.filename === filename);
        const memo = (fileObject && fileObject.memo && fileObject.memo.trim() !== "") ? fileObject.memo : "詳細情報はありません。";
        resultMapImage.src = `images/maps/${filename}`;
        resultFilename.textContent = filename;
        resultMemoElement.textContent = memo;
        resultMapImage.onerror = () => {
            resultMapImage.alt = "指定されたマップ画像が見つかりませんでした。";
            resultFilename.textContent = `エラー: ${filename} は見つかりませんでした。ファイル名や選択が正しいか確認してください。`;
        };
        resultMapImage.onload = () => { resultMapImage.alt = `特定されたマップ: ${filename}`; };
        showStep('step5-result');
    }

    function resetAll() {
        document.querySelectorAll('.icon-item.selected').forEach(item => item.classList.remove('selected'));
        userSelection = { boss: null, cataclysm: null, spawnPoint: null };
        showStep('step1-boss-selection');
    }

    function handleBackClick(event) {
        const targetStepId = event.target.dataset.step;
        showStep(targetStepId);
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

        showStep('step1-boss-selection');
    }
    
    initialize();
    // ===============================================
    // ★ 3. モーダル（ライトボックス）機能 ★
    // ===============================================
    const modalContainer = document.getElementById('modal-container');
    const modalImage = document.getElementById('modal-image');
    const closeModalButton = document.querySelector('.modal-close-button');

    // 結果のマップ画像がクリックされた時の処理
    resultMapImage.addEventListener('click', () => {
        if (resultMapImage.src) { // 画像が読み込まれていれば
            modalContainer.classList.add('show');
            modalImage.src = resultMapImage.src;
        }
    });

    // 「×」ボタンがクリックされた時の処理
    closeModalButton.addEventListener('click', () => {
        modalContainer.classList.remove('show');
    });

    // 背景がクリックされた時も閉じる
    modalContainer.addEventListener('click', (event) => {
        if (event.target === modalContainer) {
            modalContainer.classList.remove('show');
        }
    });

}); // ← この行が、元々のファイルの一番最後の行です