@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

REM --- 設定項目 ---
REM 処理対象の画像が入っているフォルダ
set TARGET_DIR=images\maps

REM 余白と判断する色の許容範囲 (0%が最も厳しい)
set FUZZ_PERCENT=1%
REM --- 設定はここまで ---

echo --- マップ画像の自動トリミングを開始します ---
echo.
echo 対象フォルダ: %TARGET_DIR%
echo.

REM 対象フォルダ内の全てのPNGファイルを処理
for %%f in ("%TARGET_DIR%\*.png") do (
    echo 処理中: %%~nxf
    
    REM ImageMagickのmagickコマンドを実行して、画像のフチの余白を自動でトリミング
    REM 「-fuzz」で色の許容範囲を指定し、「-trim」で実際に切り取る
    magick "%%f" -fuzz %FUZZ_PERCENT% -trim +repage "%%f"
)

echo.
echo --- 全ての処理が完了しました ---
pause