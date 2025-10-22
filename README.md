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

Pictures:
Login Page: 
<img width="434" height="889" alt="image" src="https://github.com/user-attachments/assets/cf61fea1-82f6-4bd2-b994-746d9126d6fb" />
<img width="1551" height="974" alt="image" src="https://github.com/user-attachments/assets/f59dbe23-7e87-45ce-b24c-c30305d7eedc" />
<img width="1548" height="979" alt="image" src="https://github.com/user-attachments/assets/7e87204e-c0c5-4cac-9488-b5bb24eea486" />
<img width="1558" height="997" alt="image" src="https://github.com/user-attachments/assets/b60c021c-5317-4273-9366-464b16c0eb76" />
<img width="1548" height="961" alt="image" src="https://github.com/user-attachments/assets/df42e72f-efe5-4d96-9e48-8b269ce64055" />

HomeScreen: 
Logged in as chef:
<img width="385" height="860" alt="image" src="https://github.com/user-attachments/assets/9ec30465-d094-4e38-8e7f-af14ed8d3939" />
Logged in as user
<img width="394" height="858" alt="image" src="https://github.com/user-attachments/assets/ee3421de-1c3f-43e6-9b0e-b1412c5e1fb8" />
code:
<img width="1557" height="939" alt="image" src="https://github.com/user-attachments/assets/034afed0-6219-4b89-98b6-feb8657505af" />
<img width="1561" height="996" alt="image" src="https://github.com/user-attachments/assets/fbf9833b-e0a0-4804-bd7b-269422074908" />
<img width="1562" height="970" alt="image" src="https://github.com/user-attachments/assets/fb36873b-ebfe-4195-b39b-e005432fd7eb" />
<img width="1561" height="977" alt="image" src="https://github.com/user-attachments/assets/2d088007-0362-4d91-a51e-33121e21c764" />
<img width="1546" height="984" alt="image" src="https://github.com/user-attachments/assets/46a398be-6384-4509-ab14-49f61607d321" />
<img width="1559" height="942" alt="image" src="https://github.com/user-attachments/assets/f7372c4d-170f-4135-87ba-1f86dca19911" />
<img width="1555" height="962" alt="image" src="https://github.com/user-attachments/assets/e5e5ab2a-21e7-47ab-9350-7bb0d8258aca" />
<img width="1557" height="973" alt="image" src="https://github.com/user-attachments/assets/be07a301-739a-44d8-a107-c5db46b772a8" />

Add dish:
<img width="387" height="862" alt="image" src="https://github.com/user-attachments/assets/918fbe5a-4a24-4f66-b934-b8d167b2eb50" />
code:
<img width="1562" height="989" alt="image" src="https://github.com/user-attachments/assets/1e6b8a3b-a8a8-47bf-ae61-efa592c84589" />
<img width="1564" height="977" alt="image" src="https://github.com/user-attachments/assets/9600ac73-d8c7-4fbe-af33-cee843ecaf4d" />
<img width="1551" height="978" alt="image" src="https://github.com/user-attachments/assets/b439042c-27c1-45ff-9fdd-1b7fc40f8808" />
<img width="1570" height="983" alt="image" src="https://github.com/user-attachments/assets/fe8ef9ba-2837-4149-af77-c486dd85e960" />

Remove dish:
<img width="385" height="854" alt="image" src="https://github.com/user-attachments/assets/f504f561-20f1-4ab9-aaaa-4be1e0cb9b3a" />
code:
<img width="1558" height="974" alt="image" src="https://github.com/user-attachments/assets/00986dfc-2be2-484f-b539-e783fac949bb" />
<img width="1555" height="988" alt="image" src="https://github.com/user-attachments/assets/12183935-261f-40d9-a6cb-35d91877a7ce" />
<img width="1556" height="983" alt="image" src="https://github.com/user-attachments/assets/e4312003-e8c4-4f87-8c7e-f6c8f9dbb626" />
<img width="1558" height="984" alt="image" src="https://github.com/user-attachments/assets/99db6fd7-03e7-4c51-bec3-53cda376ebdc" />
<img width="1556" height="969" alt="image" src="https://github.com/user-attachments/assets/e725065d-eeb9-4277-9f57-4b4b4dad831e" />

Help: 
<img width="392" height="866" alt="image" src="https://github.com/user-attachments/assets/14a9362d-b4bc-4472-a85b-661ce1a97749" />
<img width="1547" height="1004" alt="image" src="https://github.com/user-attachments/assets/90d191de-b041-4dac-b26e-75fdd64d953d" />
<img width="1555" height="975" alt="image" src="https://github.com/user-attachments/assets/98000cbf-a7e6-4adc-a07e-f42d5b1ed312" />
<img width="1560" height="972" alt="image" src="https://github.com/user-attachments/assets/2fa5efda-0564-4235-90cb-e5a54ccc0311" />
<img width="1550" height="984" alt="image" src="https://github.com/user-attachments/assets/d02ba458-7e14-4feb-b036-99b43d4c163a" />
<img width="1557" height="976" alt="image" src="https://github.com/user-attachments/assets/a8657648-288c-483d-8dd6-34ca6794afee" />
