# Dictionary Extension

This is a browser extension that allows users to search for word definitions and phonetics using an online dictionary API.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/BakangMonei/my-first-browser-extension
   ```

2. Navigate to the project directory:
    ```
    cd my-first-browser-extension
    ```

3. Install dependencies:
     ```
    npm i
    ```

### Development

To run the extension in DevMode:

1. Build the extension:
    ```
    npm run build
    ```

2. Load the extension in your browser:

    - Open your browser (e.g., Chrome, Firefox).
    - Navigate to chrome://extensions/ (for Chrome) or about:addons (for Firefox).
    - Enable **Developer mode**.
    - Click on "Load unpacked" or "Load temporary add-on".
    - Select the build directory within your project folder.


3. The extension should now be installed and ready to use in DevMode.

### Usage
Once the extension is installed and enabled, you can use it to search for word definitions:

**1. Typing Word**
- Click on the extension icon in your browser toolbar to open the popup.
- Type a word into the search input field.
- Click the "Search" button or press Enter to search for the word.
- View the results displayed in the popup.

**2. Pronouncing Words**

- Click on the "Listen" icon next to the phonetic transcription of a word.
- The audio pronunciation will be played.

### Built With

    **ReactJs:** JavaScript library for building user interfaces.
    **Tailwind CSS:** A utility-first CSS framework for rapid UI development.

## Author

Monei Bakang Mothuti