# PowerShell script to update HTML files with header and footer one at a time

# Get all HTML files except header.html and footer.html
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" | Where-Object { $_.Name -notin @("header.html", "footer.html") }

foreach ($file in $htmlFiles) {
    Write-Host "`nDo you want to update $($file.Name)? (Y/N)"
    $response = Read-Host
    
    if ($response -eq 'Y' -or $response -eq 'y') {
        Write-Host "Processing $($file.Name)..."
        
        # Read the file content
        $content = Get-Content -Path $file.FullName -Raw
        
        # Add required CSS files if not present
        if (-not ($content -match "header\.css")) {
            $content = $content -replace "(<link rel=""stylesheet"" href=""[^""]+"">)", "`$1`n    <link rel=""stylesheet"" href=""header.css"">"
        }
        if (-not ($content -match "footer\.css")) {
            $content = $content -replace "(<link rel=""stylesheet"" href=""[^""]+"">)", "`$1`n    <link rel=""stylesheet"" href=""footer.css"">"
        }
        
        # Add index.js if not present
        if (-not ($content -match "index\.js")) {
            $content = $content -replace "(</body>)", "    <script src=""index.js""></script>`n`$1"
        }
        
        # Remove all old header content
        $content = $content -replace "(?s)<div class=""top-bar"">.*?</nav>", "<!-- Header will be loaded here -->`n    <div id=""header""></div>"
        $content = $content -replace "(?s)<header>.*?</header>", "<!-- Header will be loaded here -->`n    <div id=""header""></div>"
        $content = $content -replace "(?s)<div class=""header-container"">.*?</div>", "<!-- Header will be loaded here -->`n    <div id=""header""></div>"
        
        # Remove all old footer content
        $content = $content -replace "(?s)<footer>.*?</footer>", "<!-- Footer will be loaded here -->`n    <div id=""footer""></div>"
        $content = $content -replace "(?s)<div class=""footer-container"">.*?</div>", "<!-- Footer will be loaded here -->`n    <div id=""footer""></div>"
        
        # Remove header-related CSS
        $content = $content -replace "(?s)/\* Header styles \*/.*?/\* End header styles \*/", ""
        $content = $content -replace "(?s)/\* Navbar styles \*/.*?/\* End navbar styles \*/", ""
        $content = $content -replace "(?s)/\* Logo section \*/.*?/\* End logo section \*/", ""
        $content = $content -replace "(?s)/\* Top bar styles \*/.*?/\* End top bar styles \*/", ""
        $content = $content -replace "(?s)/\* Header section \*/.*?/\* End header section \*/", ""
        
        # Remove footer-related CSS
        $content = $content -replace "(?s)/\* Footer styles \*/.*?/\* End footer styles \*/", ""
        $content = $content -replace "(?s)/\* Footer section \*/.*?/\* End footer section \*/", ""
        
        # Remove specific header and footer CSS classes
        $headerFooterClasses = @(
            ".top-bar",
            ".header-container",
            ".logo-container",
            ".logo",
            ".subtitle",
            ".logo-bar",
            ".headerline",
            ".navbar",
            ".navbar-container",
            ".navbar-nav",
            ".nav-item",
            ".nav-link",
            ".dropdown-menu",
            ".dropdown-item",
            "footer",
            ".footer-container",
            ".footer-grid",
            ".footer-section",
            ".footer-title",
            ".footer-text",
            ".footer-links",
            ".footer-bottom",
            ".footer-social",
            ".header",
            ".header-content",
            ".header-logo",
            ".header-nav",
            ".header-menu",
            ".header-dropdown",
            ".footer",
            ".footer-content",
            ".footer-logo",
            ".footer-nav",
            ".footer-menu",
            ".footer-dropdown"
        )
        
        foreach ($class in $headerFooterClasses) {
            $content = $content -replace "(?s)$class\s*{[^}]*}", ""
        }
        
        # Remove any remaining header/footer related HTML elements
        $headerFooterElements = @(
            "<div class=""top-bar"">",
            "<div class=""header-container"">",
            "<div class=""logo-container"">",
            "<div class=""logo"">",
            "<div class=""subtitle"">",
            "<div class=""logo-bar"">",
            "<div class=""headerline"">",
            "<nav class=""navbar"">",
            "<div class=""navbar-container"">",
            "<ul class=""navbar-nav"">",
            "<li class=""nav-item"">",
            "<a class=""nav-link"">",
            "<ul class=""dropdown-menu"">",
            "<li class=""dropdown-item"">",
            "<footer>",
            "<div class=""footer-container"">",
            "<div class=""footer-grid"">",
            "<div class=""footer-section"">",
            "<h3 class=""footer-title"">",
            "<p class=""footer-text"">",
            "<div class=""footer-links"">",
            "<div class=""footer-bottom"">",
            "<div class=""footer-social"">"
        )
        
        foreach ($element in $headerFooterElements) {
            $content = $content -replace [regex]::Escape($element), ""
        }
        
        # Clean up any empty lines that might have been created
        $content = $content -replace "`r`n`r`n`r`n", "`r`n`r`n"
        
        # Save the updated content
        Set-Content -Path $file.FullName -Value $content
        
        Write-Host "Updated $($file.Name)"
        Write-Host "Please check the file and verify the changes. Press Enter to continue to the next file..."
        Read-Host
    }
}

Write-Host "`nAll files have been processed!" 