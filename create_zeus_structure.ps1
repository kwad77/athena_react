# PowerShell Script to Create Zeus (Builder) Project Structure

# Set the root directory for the Zeus project
$rootDir = "G:\Athena_react\zeus"

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
    "src\components\admin",
    "src\hooks",
    "src\services",
    "src\utils",
    "src\types",
    "src\styles",
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
    "src\components\Dashboard.tsx",
    "src\components\admin\AssistantBuilder.tsx",
    "src\components\admin\ComponentSelector.tsx",
    "src\components\admin\ModelConfigurator.tsx",
    "src\components\shared\Navigation.tsx",
    "src\components\shared\AssistantCard.tsx",
    "src\hooks\useForm.ts",
    "src\hooks\useAssistantConfig.ts",
    "src\services\BuilderService.ts",
    "src\services\ApiService.ts",
    "src\utils\configUtils.ts",
    "src\utils\validationUtils.ts",
    "src\types\index.ts",
    "src\types\builder.ts",
    "src\styles\globals.css",
    "src\contexts\BuilderContext.tsx",
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
Write-Host "Zeus project structure created successfully at $rootDir"