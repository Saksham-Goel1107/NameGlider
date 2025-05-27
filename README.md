# NameGlider

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-v0.79.2-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-v53.0.0-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-green.svg)](https://reactnative.dev/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/saksham-goel1107/NameGlider/graphs/commit-activity)

A secure and performant mobile application for managing large lists of data with advanced filtering, grouping, and sorting capabilities. Built with React Native, Expo, and TypeScript.

## 🌟 Features

- 🔐 Biometric authentication (Face ID/Touch ID)
- 📱 Native performance with virtualized lists
- 🎨 Smooth animations and transitions
- 🔍 Advanced search and filtering
- 📊 Multiple grouping options
- 🔄 Dynamic sorting capabilities
- 🎯 Optimized rendering for large datasets
- 📱 Cross-platform (iOS & Android)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

For iOS development:
- macOS
- Xcode
- iOS Simulator

For Android development:
- Android Studio
- Android SDK
- Android Emulator

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/Saksham-Goel1107/NameGlider.git
cd NameGlider
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on specific platform:
```bash
# For iOS
npm run ios

# For Android
npm run android

# For web
npm run web
```

## 🛠️ Built With

- [React Native](https://reactnative.dev/) - The mobile framework
- [Expo](https://expo.dev/) - Development platform
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Expo Router](https://docs.expo.dev/routing/introduction/) - Navigation
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animations
- [Expo Local Authentication](https://docs.expo.dev/versions/latest/sdk/local-authentication/) - Biometric auth

## 📱 App Structure

```
NameGlider/
├── app/                    # Main application screens
├── assets/                 # Static assets
├── components/             # Reusable components
├── constants/              # App constants
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript definitions
└── utils/                  # Utility functions
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Authentication
PRIVY_APP_ID=your_privy_app_id
PRIVY_PUBLIC_KEY=your_privy_secret_key

# App Configuration
APP_NAME=NameGlider
APP_SCHEME=myapp
```

### Expo Configuration

The app.json file contains Expo-specific configurations. Modify it according to your needs:

```json
{
  "expo": {
    "name": "NameGlider",
    "slug": "NameGlider",
    "version": "1.0.0",
    ...
  }
}
```

## 📈 Performance Optimizations

- Virtualized list implementation for handling large datasets
- Optimized re-renders using React.memo and useMemo
- Efficient list item recycling
- Minimal animations during scrolling
- Lazy loading of components

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 📦 Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Saksham Goel** - *Initial work* - [saksham-goel1107](https://github.com/Saksham-Goel1107)

## 🙏 Acknowledgments

- React Native community
- Expo team

## 📞 Support

For support, email sakshamgoel1107@gmail.com.