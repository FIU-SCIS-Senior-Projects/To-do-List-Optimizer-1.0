# To-do List Optimizer

This is a software-engineering project, lead by Dr. Ross from SCIS.   The idea is to create an intelligent to-do list application with optimization in mind. For example, say someone needs to go to the pharmacy (CVS), dry-cleaning, groceries, and other items. What would be the best approach to accomplish this. Could the application provide a suggested order given additional information.  Think of it as a Waze app for tasks/location/to-do's/honey-do's.   Another use of this application could be that you are visiting another city. Maybe you were sent to do some work by your company. You still need to accomplish a few items to do. You have limited amount of time. How can this application optimizes your to-do list. Should it consider traffic? etc.   Given this is the first semester for this Project, Dr. Ross will like to have a limited amount of students and there may be a selection process to it.



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

```
git clone https://github.com/FIU-SCIS-Senior-Projects/To-do-List-Optimizer-1.0.git
```

### Prerequisites
This system was developed and tested using Mac OS. The instructions below are
meant to be used in Mac OS.
Some tools are required to work on the app.

  * Xcode
  * brew
  * node
  * watchman
  * react native cli
  * yarn

# Installing Xcode

  Installing Xcode is simple. Go to the app store and in the search bar type Xcode. When the result
  pops, press install.

# Installing Brew
In order to install node you are going to need to install brew in your mac.

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Once brew is install we can go ahead and install node and yarn

# Installing Node
```
brew install node
```

The system uses node npm 4.6.1. We need to make sure we are using this version in order to avoid
compatibility issues with React Native

```
npm install -g npm@4.6.1
```

# Installing yarn

```
brew install yarn
```

# Installing watchman

Watchman is a tool by Facebook for watching changes in the filesystem. It is highly recommended you install it for better performance.

```
brew install watchman
```

# Installing react native cli
Node comes with npm, which lets you install the React Native command line interface.

```
npm install -g react-native-cli
```


### Installing

# Installing Client
From the root directory move to the client folder to install the dependencies.

```
cd Code/Client/
```

To install the dependencies run

```
yarn install
```

Since we are using native code for iOS we need to link the native libraries.

```
react-native link
```

Now all the client dependencies should be Install. In order to run the app in iOS emulator
run:

```
react-native run-ios
```

# Installing Server
From the root directory move to the client folder to install the dependencies.

```
cd Code/Server/
```

To install the dependencies run

```
npm install
```

Now all the client dependencies should be Install. In order to run the server run:

```
react-native run-ios
```

## Built With

* [React Native](https://facebook.github.io/react-native/) - The mobile framework used
* [Yarn](https://yarnpkg.com/en/) - Dependency Management
* [Express](https://expressjs.com) - Used in the server for the restful API


## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Manuel Garcia**    - *Initial work* - [Ricardos12](https://github.com/ricardos12)
* **Salvador Ricardo** - *Initial work* - [Mgarc729](https://github.com/mgarc729)
* **Daniel Gonzalez**  - *Initial work* - [Dglez](https://github.com/dglez)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to Dr. Monique Ross for all her support during this journey
