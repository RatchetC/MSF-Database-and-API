# MSF 2017: Database and API

Welcome to the MSF 2017: Database and API repository.

## Contents

> [Project Brief](#project-brief)  

> [System Overview](#system-overview)  
>> [Event Creator App](#event-creator-app)  
>> [Registrar App](#registrar-app)  
>> [Observer App](#observer-app)  

> Download APKs
>> [EventCreator App](https://drive.google.com/open?id=16ACxTJ5gqT4dSrTy9JEe09SC0yALR9cg)
>> [Registrar App](https://drive.google.com/open?id=1ET4Y9_AZyH1hTPjIBYIrQWzPMQ3pqDJV)
>> [Observer App](https://drive.google.com/open?id=1zdV_mdOEKzlAuOaGGOCg7aqUIzRMpUDg)

> [Required Software](#required-software)  
>> [NodeJS](#nodejs)  
>> [Cordova](#cordova)  
>> [Ionic](#ionic)  
>> [Java](#java)  
>> [Android Studio](#android-studio)  

> [Download the apps](#download-the-apps)  

> [Running the Event Creator App in your Browser](#running-the-event-creator-app-in-your-browser)  

> [Running the apps in an Android Emulator](#running-the-apps-in-an-android-emulator)  

> [Running the apps on an Android device](#running-the-apps-on-an-android-device)  
>> [Requirements](#requirements)  
>> [Running an Ionic app on your device](#running-an-ionic-app-on-your-device)  

## Project Brief

The project brief can be found **[here](https://github.com/RatchetC/MSF-Database-and-API/blob/master/docs/Briefs/msf2017databaseandapi.pdf)**

## Project Design
The project design was done by the RatchetC team, on Trello. You can find it [here](https://trello.com/msf2017dbapi)

## System Overview

## [Restlet API](https://cloud.restlet.com/api/apis/26858/versions/1/swagger-ui/index.html?url=/api/apis/26858/versions/1/swagger2?revision=deployed)
This API is provided by the Restlet cloud service. It is free-tier.
The Apps all use this API to store events, activities and their data.
You can find the API definition file [here](https://github.com/RatchetC/MSF-Database-and-API/blob/master/code/server_api/definition.json)

This product consists of three mobile apps, which are used together to manage an event. The apps are made with Cordova and Ionic.

### **[Event Creator App](https://github.com/RatchetC/EventCreatorApp)**

The first app, the Event Creator App is used to create events and store them in the database. It can also be used to create activities and assign activities to the events that the user creates.

### **[Registrar App](https://github.com/RatchetC/RegistrarApp)**

The second app, the Registrar App allows a person to register people to the event under nicknames that are selected randomly from a large pool of nicknames. The user would register the members of the public when they show up on the day of the event.

### **[Observer App](https://github.com/RatchetC/ObserverApp)**

The third app, the Observer App allows a member of the team running the event, that is also stationed at one of the activities that the members of the public can take part in, to record how well each member of the public did at that particular activity and send this record to the database where it will be stored. The activities that the members of the public can take part in are defined when the administrator in the group of people running the event, creates the event and assigns activities to the event.

## Required software

### NodeJS

NodeJS is required to download and install Cordova and Ionic. Download it **[here](https://nodejs.org)**

### Cordova

To install Cordova please ensure that you have installed NodeJS and that npm was installed along with it (it should be).
You can do this by running the `node -v` and the `npm -v` commands in either the Command Prompt (Windows) or the Terminal (Mac/Linux).
Once you've confirmed that NodeJS and npm are installed on your machine, you can run the `npm install -g cordova` command to install Cordova onto your machine.

Cordova Installation :

```bash
$ node -v
v8.9.0
$ npm -v
v5.5.1
$ npm install -g cordova
```

### Ionic

Ionic is a framework built on top of Cordova that makes it easier to create cross platform mobile apps with one code base consisting of web technologies.
To install Ionic you can simply follow the same process as installing **[Cordova](###Cordova)**
Check if NodeJS and npm are installed and then run the `npm install -g ionic` command.
Running this command before you have installed Cordova is fine as you will be prompted to confirm whether you want Cordova installed alongside with Ionic or not. Simply say yes and Cordova will be installed before Ionic to ensure that there aren't any problems.

Ionic installation :

```bash
$ node -v
v8.9.0
$ npm -v
v5.5.1
$ npm install -g ionic
```

### Java

The Java Development Kit is required to build and run the apps on android. You can download and install it **[here](http://www.oracle.com/technetwork/java/javase/downloads/index.html)**.

### Android Studio

The Android SDK is also needed to build and run the apps on Android and the best way to install it is to download Android Studio and use the SDK Manager to download the minimum SDK for the apps which is Android 4.4 KitKat. You can download Android Studio **[here](https://developer.android.com/studio/index.html)**.

## Download the apps

Download the project as a zip file and unzip into the folder you want to keep it in or clone this repository from GitHub. You can clone the repository easily using **[GitHub Desktop](https://desktop.github.com/)** or any other version control system software, e.g. **[SourceTree](https://www.sourcetreeapp.com/)**.

## Running the Event Creator App in your Browser

```bash
cd ~/Documents/GitHub/RegistrarApp
ionic serve
```

## Running the apps in an Android Emulator

Before you can run the project on an android device you must have the Android studio downloaded.
You must create a project in Android Studio ( it can be an empty project as you are only doing this to get access to the AVD manager ) and open the AVD Manager and create the virtual device that you want to run the apps on. You can find a guide to doing this **[here](https://developer.android.com/studio/run/managing-avds.html)**
Once you have done this, you can navigate to the top level folder of the Ionic app and run the `ionic cordova emulate android` command to emulate the app in the android emulator that you set up earlier.

```bash
ionic cordova emulate android
```

## Running the apps on an Android device

### Requirements

Android device
Please make sure that USB debugging is turned on, on your device and that it is connected to the computer. To see if the computer detects your device, after connecting it to the computer with a USB cable, run the `adb devices` command.

JDK and Android SDK PATH variables
The JAVA_HOME PATH variable must be set to the location of your Java Develpoment Kit installation.
The ANDROID_HOME PATH variable must be set to the location of your Android Software Development Kit installation.
A guide to set PATH variables can be found **[here](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#setting-environment-variables)**

### Running the apps on your Android Device

Navigate to the top level folder of the apps and run the `ionic cordova platform` command. This should show you a list of platforms that you have installed and a list of platforms that are available for installation. If android is not already installed, ( which it shouldn't be if this is the first time that you are running one of the apps on a device ), run the `ionic cordova platform add android` command to download and add the android platform. Once that is finished, run the `ionic cordova run android` command to build and run the app on your Android device.

```bash
ionic cordova platform
ionic cordova platform add android
ionic cordova run android
```
