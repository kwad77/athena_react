# PowerShell Script to Create Athena (Assistant) Project Structure

# Set the root directory for the Athena project
$rootDir = "G:\Athena_react\athena"

# Create root directory
New-Item -ItemType Directory -Force -Path $rootDir

# Function to create a file
function Create-File {
    param (
        [string]$path
    )
    if (!(Test-Path $path)) {
        New-Item -ItemType File -Force -Path $path
    }
}

# Create project structure
$directories = @(
    "src",
    "src\components",
    "src\hooks",
    "src\services",
    "src\utils",
    "src\types",
    "src\styles",
    "src\models",
    "src\contexts",
    "public",
    "docs"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path "$rootDir\$dir"
}

# Create files
$files = @(
    "src\App.tsx",
    "src\index.tsx",
    "src\components\AssistantInterface.tsx",
    "src\components\MessageList.tsx",
    "src\components\InputArea.tsx",
    "src\components\ResponseDisplay.tsx",
    "src\hooks\useAssistant.ts",
    "src\hooks\useConversation.ts",
    "src\services\AssistantService.ts",
    "src\services\ApiService.ts",
    "src\utils\messageUtils.ts",
    "src\utils\assistantUtils.ts",
    "src\types\index.ts",
    "src\types\assistant.ts",
    "src\styles\globals.css",
    "src\models\AssistantModel.ts",
    "src\contexts\AssistantContext.tsx",
    "public\index.html",
    "docs\README.md",
    ".env",
    "tsconfig.json",
    "package.json"
)

foreach ($file in $files) {
    Create-File "$rootDir\$file"
}

# Output success message
Write-Host "Athena project structure created successfully at $rootDir"