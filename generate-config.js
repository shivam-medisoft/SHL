const fs = require('fs');
const path = require('path');

// Paths
const templateFile = path.join(__dirname, 'dynamic/config.xml'); // Your template config.xml file
const appsFile = path.join(__dirname, 'app.json'); // JSON file with app details
const outputDir = path.join(__dirname, '/'); // Parent directory where new config.xml files will be saved

console.log("Template File Path: " + templateFile);
console.log("Output Directory: " + outputDir);

// Read template and app data
const template = fs.readFileSync(templateFile, 'utf-8');
const apps = JSON.parse(fs.readFileSync(appsFile, 'utf-8'));

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Generate config.xml for each app
apps.forEach((app) => {
    const appDir = path.join(outputDir); // Directory for each app's config.xml
    if (!fs.existsSync(appDir)) {
        fs.mkdirSync(appDir); // Create directory if it doesn't exist
    }

    // Replace placeholders in the template with actual app details
    const configContent = template
        .replace(/{{APP_NAME}}/g, app.name)
        .replace(/{{APP_DESCRIPTION}}/g, app.description)
        .replace(/{{ICON_PATH}}/g, app.icons);

    // Write the customized config.xml to the app folder
    const outputFilePath = path.join(appDir, 'config.xml');
    fs.writeFileSync(outputFilePath, configContent, 'utf-8');
    console.log(`Generated config.xml for: ${app.name} at ${outputFilePath}`);
});

console.log('All config.xml files generated successfully!');
