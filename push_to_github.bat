@echo off
set "PATH=%LOCALAPPDATA%\MinGit\cmd;%PATH%"
echo ==========================================================
echo   ATPL Group - Pushing Code to GitHub Repository
echo   Target: https://github.com/raihanabanu231-maker/ATPL-website.git
echo ==========================================================
echo.
git add .
git commit -m "feat: complete ATPL Industry 4.0 responsive website with 12-station robot tour and hardware/software suite"
git branch -M main
git remote set-url origin https://github.com/raihanabanu231-maker/ATPL-website.git 2>nul || git remote add origin https://github.com/raihanabanu231-maker/ATPL-website.git
echo.
echo Pushing to branch main...
git push -u origin main
echo.
echo ==========================================================
echo   Push process completed!
echo ==========================================================
pause
