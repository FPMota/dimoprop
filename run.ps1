$ErrorActionPreference = "Stop"

$projectRoot = Join-Path $PSScriptRoot "obras-app"

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error "npm nao foi encontrado. Instala o Node.js em https://nodejs.org/ e abre um novo PowerShell."
}

if (-not (Test-Path (Join-Path $projectRoot "package.json"))) {
    Write-Error "O projeto nao foi encontrado em $projectRoot."
}

Push-Location $projectRoot
try {
    if (-not (Test-Path "node_modules")) {
        Write-Host "A instalar dependencias..." -ForegroundColor Yellow
        npm install
    }

    $appUrl = "http://localhost:3000"

    $existingServer = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
    if ($existingServer) {
        Write-Host "O Dino ja esta a correr em $appUrl." -ForegroundColor Yellow
        Start-Process $appUrl
        return
    }

    Write-Host "A abrir o Dino em $appUrl ..." -ForegroundColor Green
    Start-Process $appUrl

    Write-Host "A iniciar o servidor ..." -ForegroundColor Green
    npm run dev
}
finally {
    Pop-Location
}
