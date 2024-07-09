$body = @{
    message = "Hello"
    model = "llama2"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3001/api/chat" -Method POST -Body $body -ContentType "application/json"