@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

REM --- ★★★ お客様の測定値を反映した最終設定 ★★★ ---
REM 処理対象の画像が入っているフォルダ
set INPUT_DIR=images\maps
set OUTPUT_DIR=images\previews

REM ★ 測定した座標から算出したサイズ
set CROP_WIDTH=990
set CROP_HEIGHT=840

REM ★ 測定した左上隅の座標
set CROP_OFFSET_X=1400
set CROP_OFFSET_Y=460
REM --- 設定はここまで ---

if not exist "%OUTPUT_DIR%" ( mkdir "%OUTPUT_DIR%" )

echo --- プレビュー画像の精密自動生成を開始します ---
echo サイズ: %CROP_WIDTH%x%CROP_HEIGHT%
echo 位置: %CROP_OFFSET_X%, %CROP_OFFSET_Y%
echo.

for %%f in ("%INPUT_DIR%\*.png") do (
    echo 処理中: %%~nxf
    
    REM 精密な切り抜き命令
    magick "%%f" -crop %CROP_WIDTH%x%CROP_HEIGHT%+%CROP_OFFSET_X%+%CROP_OFFSET_Y% +repage "%OUTPUT_DIR%\%%~nxf"
)

echo.
echo --- 全ての処理が完了しました ---
pause