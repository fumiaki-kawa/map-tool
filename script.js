document.addEventListener('DOMContentLoaded', () => {
    
    // --- データ定義 ---
    const BOSSES = ["アデレ", "カリゴ", "フレゴール", "グラディウス", "グノスター", "ナメレス", "リブラ", "マリス"];
    const CATACLYSMS = ["なし", "ノクラテオ", "火口", "山嶺", "腐れ森"];
    
    const SPAWN_POINTS_COORDS = {
        1: { top: '35%', left: '15%' },
        2: { top: '55%', left: '20%' },
        3: { top: '70%', left: '15%' },
        4: { top: '40%', left: '30%' },
        5: { top: '70%', left: '45%' },
        6: { top: '85%', left: '55%' },
        7: { top: '25%', left: '60%' },
        8: { top: '45%', left: '70%' },
        9: { top: '60%', left: '85%' }
    };

    // ★★★ お客様から頂いた320個の全ファイル名リスト ★★★
    const ALL_MAP_FILES = [
        "リブラ_ノクラテオ_6_小砦無・遺跡氷_result.png", "リブラ_ノクラテオ_8_小砦無・野営地無_result.png", "リブラ_火口_2_遺跡眠・塔_result.png", "リブラ_火口_5_小砦魔・塔魔_result.png", "リブラ_火口_6_小砦無・聖堂無_result.png", "リブラ_火口_6_野営地雷・塔_result.png", "リブラ_火口_9_野営地炎・遺跡毒_result.png", "リブラ_山嶺_8_遺跡眠・小砦無_result.png", "リブラ_山嶺_8_小砦無・野営地発狂_result.png", "リブラ_山嶺_8_野営地炎・遺跡毒_result.png", "リブラ_山嶺_8_野営地発狂・小砦魔_result.png", "リブラ_山嶺_9_遺跡毒・小砦無_result.png", "リブラ_腐れ森_1_野営地雷・聖堂無_result.png", "リブラ_腐れ森_3_遺跡眠・聖堂炎_result.png", "リブラ_腐れ森_3_聖堂無・遺跡血_result.png", "リブラ_腐れ森_7_遺跡眠・聖堂炎_result.png", "リブラ_腐れ森_8_野営地無・聖堂聖_result.png", "アデレ_なし_1_聖堂無・小砦無_result.png", "アデレ_なし_1_野営地無・遺跡雷_result.png", "アデレ_なし_2_聖堂無・野営地炎_result.png", "アデレ_なし_2_野営地無・遺跡毒_result.png", "アデレ_なし_3_聖堂炎・野営地炎_result.png", "アデレ_なし_3_野営地無・遺跡血_result.png", "アデレ_なし_4_遺跡氷・小砦魔_result.png", "アデレ_なし_4_遺跡眠・遺跡毒_result.png", "アデレ_なし_5_遺跡雷・聖堂無_result.png", "アデレ_なし_6_遺跡無・野営地無_result.png", "アデレ_なし_6_聖堂聖・遺跡氷_result.png", "アデレ_なし_6_野営地発狂・遺跡魔_result.png", "アデレ_なし_7_遺跡氷・聖堂無_result.png", "アデレ_なし_7_野営地無・聖堂無_result.png", "アデレ_なし_8_遺跡死・野営地発狂_result.png", "アデレ_なし_8_遺跡氷・遺跡聖_result.png", "アデレ_なし_8_野営地発狂・聖堂無_result.png", "アデレ_なし_9_遺跡毒・遺跡毒_result.png", "アデレ_なし_9_遺跡毒・小砦魔_result.png", "アデレ_なし_9_野営地無・無_result.png", "アデレ_ノクラテオ_1_遺跡毒・聖堂無_result.png", "アデレ_ノクラテオ_6_遺跡氷・遺跡死_result.png", "アデレ_ノクラテオ_7_小砦無・聖堂炎_result.png", "アデレ_ノクラテオ_7_野営地炎・聖堂無_result.png", "アデレ_ノクラテオ_9_野営地無・遺跡聖_result.png", "アデレ_火口_3_遺跡氷・聖堂無_result.png", "アデレ_火口_5_遺跡魔・塔_result.png", "アデレ_火口_5_野営地無・塔無_result.png", "アデレ_火口_6_遺跡無・聖堂無_result.png", "アデレ_火口_8_野営地無・聖堂炎_result.png", "アデレ_山嶺_3_聖堂無・野営地雷_result.png", "アデレ_山嶺_5_遺跡氷・小砦魔_result.png", "アデレ_山嶺_8_聖堂無・遺跡眠_result.png", "アデレ_山嶺_8_野営地無・遺跡魔_result.png", "アデレ_山嶺_9_遺跡血・小砦魔_result.png", "アデレ_腐れ森_2_小砦無・遺跡氷_result.png", "アデレ_腐れ森_2_野営地無・小砦無_result.png", "アデレ_腐れ森_4_聖堂無・小砦魔_result.png", "アデレ_腐れ森_8_野営地炎・小砦無_result.png", "アデレ_腐れ森_8_野営地無・遺跡聖_result.png", "カリゴ_なし_1_野営地雷・小砦無・左教会_result.png", "カリゴ_なし_1_野営地雷・小砦無・左塔_result.png", "カリゴ_なし_2_野営地氷・野営地無_result.png", "カリゴ_なし_2_野営地無・聖堂無_result.png", "カリゴ_なし_3_遺跡血・小砦魔_result.png", "カリゴ_なし_3_野営地炎・小砦無_result.png", "カリゴ_なし_3_野営地雷・小砦無_result.png", "カリゴ_なし_4_小砦無・野営地聖_result.png", "カリゴ_なし_4_野営地無・小砦魔_result.png", "カリゴ_なし_5_遺跡眠・遺跡雷_result.png", "カリゴ_なし_5_聖堂聖・小砦無_result.png", "カリゴ_なし_5_野営地発狂・遺跡眠_result.png", "カリゴ_なし_5_野営地無・野営地無_result.png", "カリゴ_なし_6_小砦魔・遺跡聖_result.png", "カリゴ_なし_7_小砦魔・聖堂無_result.png", "カリゴ_なし_7_小砦無・聖堂聖_result.png", "カリゴ_なし_8_野営地無・聖堂無_result.png", "カリゴ_なし_9_遺跡雷・遺跡死_result.png", "カリゴ_なし_9_聖堂炎・野営地無_result.png", "カリゴ_なし_9_聖堂無・野営地無_result.png", "カリゴ_ノクラテオ_1_小砦無・遺跡血_result.png", "カリゴ_ノクラテオ_5_聖堂無・遺跡死_result.png", "カリゴ_ノクラテオ_7_野営地雷・聖堂無_result.png", "カリゴ_ノクラテオ_9_遺跡死・聖堂無_result.png", "カリゴ_ノクラテオ_9_野営地死・聖堂無_result.png", "カリゴ_火口_1_遺跡毒_result.png", "カリゴ_火口_1_遺跡無・野営地発狂_result.png", "カリゴ_火口_1_野営地炎・野営地無_result.png", "カリゴ_火口_2_聖堂聖・塔_result.png", "カリゴ_火口_8_小砦無・小砦魔_result.png", "カリゴ_山嶺_5_遺跡無・野営地無_result.png", "カリゴ_山嶺_7_野営地無・聖堂聖_result.png", "カリゴ_山嶺_8_聖堂炎・小砦無_result.png", "カリゴ_山嶺_9_遺跡血・聖堂無_result.png", "カリゴ_山嶺_9_遺跡聖・小砦無_result.png", "カリゴ_腐れ森_1_野営地雷・遺跡死_result.png", "カリゴ_腐れ森_2_野営地無・遺跡氷_result.png", "カリゴ_腐れ森_4_聖堂無・野営地無_result.png", "カリゴ_腐れ森_4_野営地無・小砦魔_result.png", "カリゴ_腐れ森_7_野営地発狂・聖堂無_result.png", "グノスター_なし_1_遺跡雷・野営地雷_result.png", "グノスター_なし_2_遺跡毒・野営地炎_result.png", "グノスター_なし_2_野営地炎・遺跡無_result.png", "グノスター_なし_3_遺跡無・野営地雷_result.png", "グノスター_なし_4_聖堂炎・小砦魔_result.png", "グノスター_なし_4_野営地雷・遺跡無_result.png", "グノスター_なし_5_遺跡氷・野営地雷_result.png", "グノスター_なし_5_聖堂炎・遺跡聖_result.png", "グノスター_なし_5_野営地無・小砦無_result.png", "グノスター_なし_6_小砦魔・野営地炎_result.png", "グノスター_なし_6_聖堂無・遺跡魔_result.png", "グノスター_なし_6_野営地炎・聖堂炎_result.png", "グノスター_なし_7_野営地雷・聖堂無_result.png", "グノスター_なし_8_遺跡毒・聖堂聖_result.png", "グノスター_なし_8_遺跡眠・遺跡無_result.png", "グノスター_なし_8_小砦無・遺跡毒_result.png", "グノスター_なし_8_野営地炎・聖堂聖_result.png", "グノスター_なし_9_遺跡氷・聖堂炎_result.png", "グノスター_なし_9_遺跡氷・野営地無_result.png", "グノスター_なし_9_遺跡眠・遺跡死_result.png", "グノスター_ノクラテオ_1_遺跡氷・野営地炎_result.png", "グノスター_ノクラテオ_5_遺跡無・聖堂炎_result.png", "グノスター_ノクラテオ_6_聖堂炎・野営地無_result.png", "グノスター_ノクラテオ_8_聖堂聖・遺跡氷_result.png", "グノスター_ノクラテオ_8_野営地無・小砦無_result.png", "グノスター_火口_1_野営地・塔炎_result.png", "グノスター_火口_2_野営地雷・小砦無_result.png", "グノスター_火口_8_遺跡魔・聖堂無_result.png", "グノスター_火口_9_聖堂無・聖堂聖_result.png", "グノスター_火口_9_野営地無・塔_result.png", "グノスター_山嶺_5_野営地無・遺跡雷_result.png", "グノスター_山嶺_8_野営地無・聖堂無_result.png", "グノスター_山嶺_9_遺跡死・野営地炎_result.png", "グノスター_山嶺_9_遺跡氷・聖堂炎_result.png", "グノスター_山嶺_9_野営地雷・小砦無_result.png", "グノスター_腐れ森_1_小砦無・野営地炎_result.png", "グノスター_腐れ森_3_遺跡眠・聖堂無_result.png", "グノスター_腐れ森_3_聖堂無・野営地無_result.png", "グノスター_腐れ森_7_野営地炎・小砦無_result.png", "グノスター_腐れ森_7_野営地無・小砦無_result.png", "グラディウス_なし_1_遺跡死・遺跡毒_result.png", "グラディウス_なし_2_遺跡毒・遺跡氷_result.png", "グラディウス_なし_2_小砦無・聖堂聖_result.png", "グラディウス_なし_3_遺跡毒・遺跡氷_result.png", "グラディウス_なし_3_小砦無・遺跡死_result.png", "グラディウス_なし_3_野営地炎・野営地炎_result.png", "グラディウス_なし_3_野営地炎・野営地炎・教会スタート_result.png", "グラディウス_なし_4_遺跡魔・遺跡魔_result.png", "グラディウス_なし_4_野営地炎・遺跡炎_result.png", "グラディウス_なし_4_野営地雷・野営地発狂_result.png", "グラディウス_なし_5_遺跡無・野営地無_result.png", "グラディウス_なし_5_聖堂無・野営地無_result.png", "グラディウス_なし_5_聖堂無・野営地雷_result.png", "グラディウス_なし_6_遺跡血・小砦魔_result.png", "グラディウス_なし_7_小砦無・聖堂炎_result.png", "グラディウス_なし_7_野営地雷・小砦魔_result.png", "グラディウス_なし_8_遺跡毒・遺跡毒_result.png", "グラディウス_なし_8_野営地無・聖堂無_result.png", "グラディウス_なし_9_聖堂聖・野営地無_result.png", "グラディウス_なし_9_野営地炎・遺跡死_result.png", "グラディウス_ノクラテオ_4_聖堂聖・野営地炎_result.png", "グラディウス_ノクラテオ_5_野営地発狂・聖堂炎_result.png", "グラディウス_ノクラテオ_5_野営地雷・遺跡魔_result.png", "グラディウス_ノクラテオ_7_野営地無・小砦無_result.png", "グラディウス_ノクラテオ_9_野営地無・小砦無_result.png", "グラディウス_火口_1_遺跡聖・遺跡雷_result.png", "グラディウス_火口_1_遺跡無・聖堂炎_result.png", "グラディウス_火口_3_野営地無・遺跡死_result.png", "グラディウス_火口_5_小砦無・野営地無_result.png", "グラディウス_火口_6_小砦無・塔_result.png", "グラディウス_山嶺_2_聖堂聖・小砦無_result.png", "グラディウス_山嶺_6_遺跡血・聖堂無_result.png", "グラディウス_山嶺_8_遺跡無・小砦無_result.png", "グラディウス_山嶺_8_小砦魔・聖堂無_result.png", "グラディウス_山嶺_8_野営地死・野営地無_result.png", "グラディウス_腐れ森_1_遺跡雷・聖堂無_result.png", "グラディウス_腐れ森_2_野営地無・遺跡雷_result.png", "グラディウス_腐れ森_8_遺跡魔・小砦無_result.png", "グラディウス_腐れ森_8_小砦無・野営地無_result.png", "グラディウス_腐れ森_8_野営地発狂・遺跡眠_result.png", "ナメレス_なし_1_遺跡雷・遺跡雷_result.png", "ナメレス_なし_1_聖堂炎・小砦無_result.png", "ナメレス_なし_2_遺跡氷・遺跡氷_result.png", "ナメレス_なし_2_野営地発狂・遺跡毒_result.png", "ナメレス_なし_3_遺跡魔・小砦無_result.png", "ナメレス_なし_3_遺跡雷・野営地発狂_result.png", "ナメレス_なし_3_聖堂無・小砦無_result.png", "ナメレス_なし_4_小砦無・野営地炎_result.png", "ナメレス_なし_4_聖堂聖・野営地無_result.png", "ナメレス_なし_5_遺跡聖・聖堂炎_result.png", "ナメレス_なし_5_小砦無・野営地炎_result.png", "ナメレス_なし_5_野営地無・聖堂炎_result.png", "ナメレス_なし_6_野営地炎・遺跡氷_result.png", "ナメレス_なし_7_遺跡毒・小砦無_result.png", "ナメレス_なし_7_小砦無・聖堂無_result.png", "ナメレス_なし_7_聖堂聖・小砦無_result.png", "ナメレス_なし_7_聖堂眠・小砦無_result.png", "ナメレス_なし_8_野営地無・遺跡血_result.png", "ナメレス_なし_9_小砦無・聖堂聖_result.png", "ナメレス_なし_9_野営地無・野営地無_result.png", "ナメレス_ノクラテオ_7_遺跡無・小砦無_result.png", "ナメレス_ノクラテオ_8_小砦無・遺跡聖_result.png", "ナメレス_ノクラテオ_8_聖堂炎・小砦無_result.png", "ナメレス_ノクラテオ_9_遺跡魔・野営地無_result.png", "ナメレス_ノクラテオ_9_野営地無・聖堂聖_result.png", "ナメレス_火口_1_遺跡魔・小砦無_result.png", "ナメレス_火口_3_小砦無・塔_result.png", "ナメレス_火口_5_遺跡氷・野営地発狂_result.png", "ナメレス_火口_6_遺跡無・遺跡無_result.png", "ナメレス_火口_8_野営地無・小砦無_result.png", "ナメレス_山嶺_6_遺跡雷・野営地無_result.png", "ナメレス_山嶺_6_小砦無・野営地発狂_result.png", "ナメレス_山嶺_6_野営地発狂・聖堂無_result.png", "ナメレス_山嶺_7_聖堂無・小砦魔_result.png", "ナメレス_山嶺_8_小砦無・遺跡眠_result.png", "ナメレス_腐れ森_1_遺跡死・野営地雷_result.png", "ナメレス_腐れ森_1_遺跡雷・遺跡雷_result.png", "ナメレス_腐れ森_2_遺跡雷・野営地無_result.png", "ナメレス_腐れ森_7_野営地無・聖堂無_result.png", "ナメレス_腐れ森_8_小砦無・野営地発狂_result.png", "フレゴール_なし_1_遺跡眠・遺跡眠_result.png", "フレゴール_なし_1_遺跡無・小砦無_result.png", "フレゴール_なし_2_遺跡氷・遺跡氷_result.png", "フレゴール_なし_2_野営地雷・遺跡無_result.png", "フレゴール_なし_3_遺跡魔・聖堂聖_result.png", "フレゴール_なし_3_小砦無・遺跡眠_result.png", "フレゴール_なし_3_聖堂聖・小砦無_result.png", "フレゴール_なし_3_野営地無・遺跡眠_result.png", "フレゴール_なし_4_遺跡毒・遺跡毒_result.png", "フレゴール_なし_4_遺跡毒・野営地炎_result.png", "フレゴール_なし_6_遺跡血・聖堂聖_result.png", "フレゴール_なし_6_遺跡眠・小砦無_result.png", "フレゴール_なし_6_野営地無・遺跡魔_result.png", "フレゴール_なし_6_野営地無・遺跡雷_result.png", "フレゴール_なし_7_遺跡眠・小砦無_result.png", "フレゴール_なし_8_小砦無・遺跡死_result.png", "フレゴール_なし_8_野営地炎・聖堂聖_result.png", "フレゴール_なし_8_野営地無・遺跡氷_result.png", "フレゴール_なし_9_小砦魔・遺跡血_result.png", "フレゴール_なし_9_野営地無・遺跡氷_result.png", "フレゴール_ノクラテオ_1_小砦魔・聖堂無_result.png", "フレゴール_ノクラテオ_1_野営地無・遺跡雷_result.png", "フレゴール_ノクラテオ_5_遺跡魔・遺跡血_result.png", "フレゴール_ノクラテオ_5_遺跡雷・野営地炎_result.png", "フレゴール_ノクラテオ_5_野営地雷・野営地無_result.png", "フレゴール_火口_1_小砦魔・遺跡雷_result.png", "フレゴール_火口_2_遺跡氷・遺跡無_result.png", "フレゴール_火口_3_小砦魔・遺跡無_result.png", "フレゴール_火口_3_野営地発狂・塔_result.png", "フレゴール_火口_8_遺跡毒・野営地無_result.png", "フレゴール_山嶺_2_小砦無・遺跡聖_result.png", "フレゴール_山嶺_7_小砦魔・聖堂無_result.png", "フレゴール_山嶺_9_野営地発狂・遺跡眠_result.png", "フレゴール_山嶺_9_野営地無・聖堂聖_result.png", "フレゴール_山嶺_9_野営地無・聖堂無_result.png", "フレゴール_腐れ森_2_野営地無・遺跡雷_result.png", "フレゴール_腐れ森_2_野営地雷・遺跡死_result.png", "フレゴール_腐れ森_4_野営地炎・聖堂無_result.png", "フレゴール_腐れ森_7_野営地発狂・小砦無_result.png", "フレゴール_腐れ森_8_野営地炎・聖堂炎_result.png", "マリス_なし_1_小砦無・遺跡聖_result.png", "マリス_なし_1_野営地発狂・聖堂炎_result.png", "マリス_なし_1_野営地雷・遺跡毒_result.png", "マリス_なし_2_小砦無・遺跡聖_result.png", "マリス_なし_3_遺跡死・小砦無_result.png", "マリス_なし_3_聖堂炎・野営地炎_result.png", "マリス_なし_3_聖堂無・遺跡無_result.png", "マリス_なし_3_野営地炎・遺跡聖_result.png", "マリス_なし_4_野営地炎・小砦無_result.png", "マリス_なし_5_野営地雷・遺跡毒_result.png", "マリス_なし_6_遺跡血・小砦魔_result.png", "マリス_なし_6_遺跡聖・遺跡魔_result.png", "マリス_なし_6_遺跡毒・野営地炎_result.png", "マリス_なし_7_遺跡眠・聖堂聖_result.png", "マリス_なし_7_遺跡無・小砦無_result.png", "マリス_なし_7_小砦無・聖堂無_result.png", "マリス_なし_8_野営地炎・野営地発狂_result.png", "マリス_なし_8_野営地発狂・遺跡毒_result.png", "マリス_なし_9_遺跡死・聖堂炎_result.png", "マリス_なし_9_小砦無・聖堂炎_result.png", "マリス_ノクラテオ_1_遺跡眠・野営地炎_result.png", "マリス_ノクラテオ_1_野営地無・遺跡血_result.png", "マリス_ノクラテオ_4_小砦無・野営地無_result.png", "マリス_ノクラテオ_6_聖堂無・野営地無_result.png", "マリス_ノクラテオ_7_野営地雷・聖堂聖_result.png", "マリス_火口_1_野営地炎・塔_result.png", "マリス_火口_5_遺跡血・塔_result.png", "マリス_火口_5_野営地炎・塔_result.png", "マリス_火口_6_小砦無・塔_result.png", "マリス_火口_8_小砦無・遺跡毒_result.png", "マリス_山嶺_3_小砦無・遺跡魔_result.png", "マリス_山嶺_3_野営地炎・聖堂炎_result.png", "マリス_山嶺_6_遺跡無・小砦無_result.png", "マリス_山嶺_6_小砦無・野営地炎_result.png", "マリス_山嶺_9_野営地無・聖堂無_result.png", "マリス_腐れ森_1_遺跡死・野営地炎_result.png", "マリス_腐れ森_2_小砦無・遺跡眠_result.png", "マリス_腐れ森_3_遺跡血・小砦魔_result.png", "マリス_腐れ森_3_聖堂無・野営地無_result.png", "マリス_腐れ森_8_聖堂無・野営地無_result.png", "リブラ_なし_1_野営地炎・遺跡無_result.png", "リブラ_なし_2_遺跡雷・遺跡毒_result.png", "リブラ_なし_2_小砦無・野営地炎_result.png", "リブラ_なし_2_聖堂無・遺跡血_result.png", "リブラ_なし_3_遺跡死・聖堂無_result.png", "リブラ_なし_3_小砦無・野営地無_result.png", "リブラ_なし_4_遺跡死・野営地無_result.png", "リブラ_なし_4_遺跡聖・遺跡魔_result.png", "リブラ_なし_4_遺跡氷・遺跡毒_result.png", "リブラ_なし_4_聖堂炎・野営地無_result.png", "リブラ_なし_5_小砦無・遺跡氷_result.png", "リブラ_なし_5_野営地無・野営地炎_result.png", "リブラ_なし_5_野営地雷・聖堂無_result.png", "リブラ_なし_6_遺跡雷・野営地炎_result.png", "リブラ_なし_6_塔_result.png", "リブラ_なし_7_遺跡魔・小砦魔_result.png", "リブラ_なし_7_野営地雷・小砦無_result.png", "リブラ_なし_8_遺跡氷・野営地炎_result.png", "リブラ_なし_9_遺跡氷・野営地発狂_result.png", "リブラ_なし_9_塔魔・遺跡雷_result.png", "リブラ_ノクラテオ_1_遺跡毒・野営地発狂_result.png", "リブラ_ノクラテオ_4_遺跡眠・野営地炎_result.png", "リブラ_ノクラテオ_5_遺跡血・小砦魔_result.png"
    ];

    let userSelection = { boss: null, cataclysm: null, spawnPoint: null, location: null };

    // (DOM要素の取得は省略)
    const steps = {
        boss: document.getElementById('step1-boss-selection'),
        cataclysm: document.getElementById('step2-cataclysm-selection'),
        spawn: document.getElementById('step3-spawn-selection'),
        location: document.getElementById('step4-location-selection'),
        result: document.getElementById('step5-result')
    };
    const bossIconsContainer = document.getElementById('boss-icons');
    const cataclysmIconsContainer = document.getElementById('cataclysm-icons');
    const spawnMapContainer = document.getElementById('spawn-map-container');
    const spawnMapImage = document.getElementById('spawn-map-image');
    const locationOptionsContainer = document.getElementById('location-options');
    const resultMapImage = document.getElementById('result-map-image');
    const resultFilename = document.getElementById('result-filename');
    const resetButton = document.getElementById('reset-button');
    const backButtons = document.querySelectorAll('.back-button');


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
            point.textContent = number;
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
        // ★★★ ここからが新しいロジック ★★★
        findAndDisplayLocationOptions(); 
    }

    // ★★★ 拠点情報の選択肢を、リストから正確に絞り込んで表示する関数 ★★★
    function findAndDisplayLocationOptions() {
        const { boss, cataclysm, spawnPoint } = userSelection;
        if (!boss || !cataclysm || !spawnPoint) return;

        // 検索用の接頭辞を作成 (例: "アデレ_なし_1_")
        const prefix = `${boss}_${cataclysm}_${spawnPoint}_`;

        // 全ファイル名リストから、条件に一致するものをフィルタリング
        const matchedFiles = ALL_MAP_FILES.filter(file => file.startsWith(prefix));

        locationOptionsContainer.innerHTML = ''; // コンテナをクリア

        if (matchedFiles.length === 0) {
            locationOptionsContainer.textContent = '該当するマップパターンが見つかりませんでした。';
        } else {
            matchedFiles.forEach(filename => {
                // ファイル名から拠点情報部分を抽出
                // "アデレ_なし_1_" と "_result.png" の部分を取り除く
                const locationPart = filename.substring(prefix.length, filename.lastIndexOf('_result.png'));
                
                const button = document.createElement('button');
                button.className = 'location-button';
                button.textContent = locationPart; // ボタンのテキストは拠点情報のみ
                button.dataset.filename = filename; // データとして完全なファイル名を保持
                locationOptionsContainer.appendChild(button);
            });
        }
        showStep('location');
    }

    function handleLocationClick(event) {
        const target = event.target.closest('.location-button');
        if (!target) return;

        // ボタンに保持させておいた完全なファイル名を取得
        const filename = target.dataset.filename;
        
        // 結果を表示
        resultMapImage.src = `images/maps/${filename}`;
        resultFilename.textContent = filename;

        resultMapImage.onerror = () => {
            resultMapImage.alt = "指定されたマップ画像が見つかりませんでした。";
            resultFilename.textContent = `エラー: ${filename} は見つかりませんでした。ファイル名や選択が正しいか確認してください。`;
        };
        resultMapImage.onload = () => { resultMapImage.alt = `特定されたマップ: ${filename}`; };
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

    // --- イベントリスナーの設定 ---
    bossIconsContainer.addEventListener('click', handleIconClick);
    cataclysmIconsContainer.addEventListener('click', handleIconClick);
    spawnMapContainer.addEventListener('click', handleSpawnPointClick);
    locationOptionsContainer.addEventListener('click', handleLocationClick);
    resetButton.addEventListener('click', resetAll);
    backButtons.forEach(button => button.addEventListener('click', handleBackClick));

    // --- 初期化実行 ---
    function initialize() {
        createIconGrid(bossIconsContainer, BOSSES, 'boss');
        createIconGrid(cataclysmIconsContainer, CATACLYSMS, 'cataclysm');
        showStep('boss');
    }

    initialize();
});