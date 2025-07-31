@echo off
setlocal enabledelayedexpansion

REM --- ★★★ お客様が設定する項目 ★★★ ---
REM 入力元フォルダ (320枚のマップ画像がある場所)
set INPUT_DIR=images\maps

REM 出力先フォルダ (プレビュー画像を保存する場所)
set OUTPUT_DIR=images\previews

REM 切り抜くサイズ (横幅 x 縦幅) - ステップBで調べた数値を入力
set CROP_WIDTH=560
set CROP_HEIGHT=560

REM 切り抜く位置のオフセット (通常は0のままでOK)
set CROP_OFFSET_X=200
set CROP_OFFSET_Y=200
REM --- 設定はここまで ---

if not exist "%OUTPUT_DIR%" (
    echo "%OUTPUT_DIR%" フォルダを作成します...
    mkdir "%OUTPUT_DIR%"
)

echo --- プレビュー画像の自動生成を開始します ---
echo.
echo 入力元: %INPUT_DIR%
echo 出力先: %OUTPUT_DIR%
echo サイズ: %CROP_WIDTH%x%CROP_HEIGHT%
echo.

for %%f in ("%INPUT_DIR%\*.png") do (
    echo 処理中: %%~nxf
    magick "%%f" -gravity NorthEast -crop %CROP_WIDTH%x%CROP_HEIGHT%+%CROP_OFFSET_X%+%CROP_OFFSET_Y% +repage "%OUTPUT_DIR%\%%~nxf"
)

echo.
echo --- 全ての処理が完了しました ---
pause