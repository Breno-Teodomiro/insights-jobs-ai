@echo off
echo ======================================
echo  DEPLOY NA VERCEL - Insights Jobs AI
echo ======================================
echo.
echo Verificando Vercel CLI...
npx vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI nao encontrado
    echo.
    echo Instalando Vercel CLI...
    npm install -g vercel
)

echo.
echo ======================================
echo  Fazendo deploy em PRODUCAO...
echo ======================================
echo.
npx vercel --prod --force

echo.
echo ======================================
echo  Deploy concluido!
echo ======================================
echo.
pause
