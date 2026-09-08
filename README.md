# Student Task Manager — React Native + TypeScript

A functional student task management application that runs as both a **mobile app** and a **responsive website** using Expo Web.

## Requirements demonstrated

- React Native: View, Text, TextInput, Button, Pressable, Image, ScrollView, FlatList, SafeAreaView, ActivityIndicator, Modal, Alert, Switch
- React Navigation: Native Stack + Bottom Tabs
- 5+ screens: Home, Tasks, Create, Task Details, Edit Task, Profile
- Navigation parameters: task ID passed from list to Details/Edit
- State management: `useState`, Context API
- User input and form validation
- Data parsing/filtering using `filter`, `map`, and search text
- CRUD-style task management: create, read, update, delete, complete/pending
- Responsive web layout through Expo Web

## Install

Open PowerShell in this project folder:

```powershell
npm install
```

## Run on Android emulator / phone

```powershell
npx expo start
```

Then press **a** in the terminal, or scan the QR code with Expo Go.

## Run as website

```powershell
npx expo start --web
```

The browser version uses the same React Native TypeScript source and React Navigation.

## If Expo is not installed

Do not run Expo commands from `C:\Windows\System32`. First enter this project's folder:

```powershell
cd "C:\Student Task Management APP"
npm install
npx expo start
```

If you extracted the ZIP somewhere else, use that folder path instead.

## Important

The initial task data is stored in React state/context for demonstration. It is not connected to a backend database yet.
