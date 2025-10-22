Christoffel Menu App
Overview

The Christoffel Menu App is a mobile application built using React Native and Expo Router. It provides an interactive restaurant menu management system that allows two types of users to access the app: Christoffel (Chef) and User.
The Chef can add, view, and remove dishes, while regular users can browse available dishes organized by course. The app also includes animated transitions, an elegant interface, and a help page explaining how to use the system.

Features
1. Login System

Users can select their role: Christoffel (Chef) or User.

On login, the selected role determines access to menu management features.

Includes animated fade-in and button press effects for a smooth UI experience.

2. Menu Management (Chef)

Add Dish: Enter name, description, course type, and price to add new dishes.

Remove Dish: Delete existing dishes from the menu.

Reset Menu: Clear the menu and start over.

Menu data is temporarily stored during runtime (resets when the app closes).

3. Menu Viewing (User)

Browse all dishes grouped by Starters, Mains, and Desserts.

View details such as dish description and price.

Organized and readable interface optimized for mobile screens.

4. Help Page

Explains how both user types interact with the app.

Includes helpful notes and tips.

Utilizes smooth fade-in and slide-in animations for enhanced readability.

5. Smooth Animations

Animated transitions on text, buttons, and views for improved user experience.

Fade-in and scale effects to highlight interaction feedback.

Reusable AnimatedButton component for consistent UI behavior.

Technologies Used

React Native – for cross-platform mobile UI development.

Expo Router – for easy and dynamic screen navigation.

TypeScript – for structured and type-safe React Native components.

React Native Animated API – for creating animations and transitions.

@react-native-picker/picker – for role selection in the login screen.

File Structure
ChristoffelMenuApp/
│
├── app/
│   ├── LoginScreen.tsx          # Login interface for user and chef
│   ├── HomeScreen.tsx           # Main page showing dishes and menu actions
│   ├── RemoveDishScreen.tsx     # Page for removing dishes from the menu
│   ├── HelpScreen.tsx           # Instructions and usage information
│   ├── AddDishScreen.tsx        # (If included) Page for adding dishes
│   └── assets/                  # Images or icons if applicable
│
├── components/
│   └── AnimatedButton.tsx       # Reusable animated button component
│
├── package.json
└── README.md

Installation and Setup

Clone the Repository

git clone https://github.com/yourusername/christoffel-menu-app.git
cd christoffel-menu-app


Install Dependencies

npm install


Run the App

npx expo start


This will open the Expo developer tools in your browser.
You can run the app on an emulator or scan the QR code using the Expo Go app on your mobile device.

How to Use
For Christoffel (Chef)

Log in as Christoffel (Chef).

Add new dishes using the Add Dish option.

View or remove dishes as needed.

Reset the menu to clear all items.

For Regular Users

Log in as User.

Browse the available dishes organized by course.

View dish details such as description and price.

Help Page

Access the Help section for detailed instructions and usage tips.

Design Notes

The background images are selected to create an elegant restaurant-themed appearance.

Colors use dark overlays for readability against light text.

Layouts are responsive to different screen sizes using ScrollView and FlatList.

Animations enhance interactivity without compromising performance.

Limitations

The app does not permanently store data (menu resets when the app closes).

Currently intended for demonstration or prototype purposes only.

Internet connection required for background images (hosted online).

Future Enhancements

Implement local storage or cloud database (e.g., Firebase) for persistent menu data.

Add authentication for secure Chef login.

Integrate an ordering system for customers.

Include image upload for each dish.

Author

Developed by: Christoffel (Chef)
Contributors: Sonav Naidoo
Technology: React Native, Expo Router, TypeScript
