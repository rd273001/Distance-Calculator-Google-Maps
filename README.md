# Google Maps Distance Calculator

## Table of Contents

- [Google Maps Distance Calculator](#google-maps-distance-calculator)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Demo](#demo)
  - [Technologies](#technologies)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Overview

Google Maps Distance Calculator is a web application that allows users to calculate the distance between an origin and a destination with multiple stops in between. The app uses Google Maps API to display the route and calculate the distance.

## Features

- Add multiple stops along the route.
- Autocomplete suggestions for locations using Google Places API.
- Calculate the total distance of the route.
- Display the route on Google Maps.
- Remove stops from the route.
- Responsive design for both desktop and mobile devices.

## Demo

![Live Website](https://distance-calculator-google-maps.netlify.app/)

## Technologies

- React
- Google Maps APIs
  - Maps JavaScript API
  - Places API
  - Directions API
- @react-google-maps/api
- @reach/combobox

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/google-maps-distance-calculator.git
    cd google-maps-distance-calculator
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

    OR

    ```sh
    yarn
    ```

3. Create a `.env` file in the root directory and add your Google Maps API key:

    ```env
    GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    ```

4. Start the development server:

    ```sh
    npm start
    ```

    OR

    ```sh
    yarn start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Enter the origin and destination locations.
3. Add multiple stops by clicking the "Add another stop" button.
4. Click the "Calculate" button to display the route and distance.

## Contributing

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add new feature').
5. Push to the branch (git push origin feature-branch).
6. Create a pull request.

## License

This project is licensed under the MIT License.
