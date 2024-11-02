<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AFHIM App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>AFHIM App</h1>
        <div id="slideshow-container">
            <img id="slideshow-image" src="default.png" alt="Default Background">
        </div>
        <div class="controls">
            <input type="file" id="image-input" multiple accept="image/*">
            <button id="start-button">Start</button>
            <button id="stop-button">Stop</button>
            <button id="clear-button">Clear</button>
            <label for="interval-input">Set Interval (seconds): </label>
            <input type="number" id="interval-input" step="0.1" min="0.1" value="2">
			<label for="beep-toggle">Enable Beep Sound</label>
            <input type="checkbox" id="beep-toggle" checked>

            </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
